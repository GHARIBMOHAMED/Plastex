import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/catalogue/auth";
import { query } from "@/lib/catalogue/db";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser(); if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { id } = await params;
  const rows = await query<{ file_name: string; mime_type: string }>("SELECT file_name, mime_type FROM catalogue_photos WHERE id = $1", [id]);
  if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (user.role !== "admin") {
    const visible = await query<{ id: string }>("SELECT id FROM catalogue_products WHERE published_data->>'photoId' = $1 LIMIT 1", [id]);
    if (!visible.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const file = await readFile(path.join(process.env.CATALOGUE_UPLOAD_DIR || path.join(process.cwd(), "private", "catalogue-uploads"), rows[0].file_name));
    return new NextResponse(file, { headers: { "Content-Type": rows[0].mime_type, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return NextResponse.json({ error: "File missing" }, { status: 404 }); }
}
