import { NextRequest, NextResponse } from "next/server";
import { adminGuard, isResponse } from "@/lib/catalogue/api";
import { query } from "@/lib/catalogue/db";
import { validateSourceUrl } from "@/lib/catalogue/source-url";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const user = await adminGuard(request); if (isResponse(user)) return user;
  const runs = await query("SELECT id, source_url, status, error, created_at, finished_at FROM catalogue_crawl_runs ORDER BY created_at DESC LIMIT 50");
  const proposals = await query(`SELECT m.id, m.status, m.score, m.matched_codes, m.conflicts,
    p.sku, s.source_url, s.extracted_data, s.fetched_at
    FROM catalogue_match_proposals m JOIN catalogue_products p ON p.id = m.product_id
    JOIN catalogue_source_records s ON s.id = m.source_record_id ORDER BY s.fetched_at DESC LIMIT 100`);
  const staged = await query("SELECT source_url, supplier_code, category, fetched_at FROM catalogue_source_records ORDER BY fetched_at DESC LIMIT 50");
  return NextResponse.json({ runs, proposals, staged }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: NextRequest) {
  const user = await adminGuard(request, true); if (isResponse(user)) return user;
  const body = await request.json().catch(() => ({}));
  if (body.action === "start") {
    let sourceUrl: string;
    try { sourceUrl = validateSourceUrl(String(body.sourceUrl || "")).href; }
    catch { return NextResponse.json({ error: "Enter a valid HTTPS JNBK/NiBK catalogue URL" }, { status: 400 }); }
    const active = await query<{ id: string }>("SELECT id FROM catalogue_crawl_runs WHERE status IN ('queued','running') LIMIT 1");
    if (active.length) return NextResponse.json({ error: "Another crawl is queued or running" }, { status: 409 });
    const rows = await query("INSERT INTO catalogue_crawl_runs(source_url,status,requested_by) VALUES ($1,'queued',$2) RETURNING id", [sourceUrl, user.id]);
    return NextResponse.json({ run: rows[0] }, { status: 202 });
  }
  if (body.action === "review") {
    if (!["reviewed", "rejected"].includes(body.status)) return NextResponse.json({ error: "Invalid review status" }, { status: 400 });
    const rows = await query("UPDATE catalogue_match_proposals SET status = $2, reviewed_by = $3, reviewed_at = now() WHERE id = $1 RETURNING id", [body.id, body.status, user.id]);
    if (!rows.length) return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    return NextResponse.json({ proposal: rows[0] });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
