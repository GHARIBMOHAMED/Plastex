import { NextRequest, NextResponse } from "next/server";
import { adminGuard, isResponse } from "@/lib/catalogue/api";
import { query } from "@/lib/catalogue/db";
import { adminProducts } from "@/lib/catalogue/products";
import { blankData, categories, cleanProductData, validateForPublish, type Product } from "@/lib/catalogue/types";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await adminGuard(request); if (isResponse(user)) return user;
  return NextResponse.json({ products: await adminProducts() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const user = await adminGuard(request, true); if (isResponse(user)) return user;
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || "");
  const sku = String(body.sku || "").trim().toUpperCase();
  if (!/^[A-Z0-9][A-Z0-9._/-]{1,79}$/.test(sku)) return NextResponse.json({ error: "Invalid part number" }, { status: 400 });
  if (action === "create") {
    if (!categories.includes(body.category)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    try {
      const rows = await query<Product>("INSERT INTO catalogue_products(sku, category, draft_data) VALUES ($1, $2, $3) RETURNING *", [sku, body.category, JSON.stringify(blankData())]);
      return NextResponse.json({ product: rows[0] }, { status: 201 });
    } catch (error) {
      if ((error as { code?: string }).code === "23505") return NextResponse.json({ error: "Part number already exists" }, { status: 409 });
      throw error;
    }
  }
  const existing = await query<Product>("SELECT * FROM catalogue_products WHERE sku = $1", [sku]);
  if (!existing[0]) return NextResponse.json({ error: "Part not found" }, { status: 404 });
  if (action === "save") {
    let data; try { data = cleanProductData(body.data); } catch { return NextResponse.json({ error: "Invalid product data" }, { status: 400 }); }
    if (data.photoId) {
      const photo = await query<{ id: string }>("SELECT id FROM catalogue_photos WHERE id = $1", [data.photoId]);
      if (!photo.length) return NextResponse.json({ error: "Unknown photo" }, { status: 400 });
    }
    const rows = await query<Product>("UPDATE catalogue_products SET draft_data = $2, updated_at = now() WHERE sku = $1 RETURNING *", [sku, JSON.stringify(data)]);
    return NextResponse.json({ product: rows[0] });
  }
  if (action === "publish") {
    const errors = validateForPublish(existing[0].draft_data);
    if (errors.length) return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    const rows = await query<Product>("UPDATE catalogue_products SET published_data = draft_data, published_at = now(), updated_at = now() WHERE sku = $1 RETURNING *", [sku]);
    return NextResponse.json({ product: rows[0] });
  }
  if (action === "unpublish") {
    const rows = await query<Product>("UPDATE catalogue_products SET published_data = NULL, published_at = NULL, updated_at = now() WHERE sku = $1 RETURNING *", [sku]);
    return NextResponse.json({ product: rows[0] });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
