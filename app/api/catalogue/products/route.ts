import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/catalogue/auth";
import { publishedProduct, searchPublished } from "@/lib/catalogue/products";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const user = await currentUser(); if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const sku = request.nextUrl.searchParams.get("sku");
  const products = sku ? [await publishedProduct(sku)].filter(Boolean) : await searchPublished(request.nextUrl.searchParams.get("q") || "", request.nextUrl.searchParams.get("category") || "");
  return NextResponse.json({ products: products.map(product => ({ sku: product!.sku, category: product!.category, data: product!.published_data })) }, { headers: { "Cache-Control": "private, no-store" } });
}
