import { query } from "./db";
import { normalizeCode, type Product } from "./types";

export async function searchPublished(search: string, category: string): Promise<Product[]> {
  const q = search.trim().slice(0, 100);
  const normalized = normalizeCode(q);
  const allowedCategory = ["brake-discs", "clutch-discs", "brake-drums", "brake-pads"].includes(category) ? category : "";
  return query<Product>(
    `SELECT * FROM catalogue_products p WHERE published_data IS NOT NULL
     AND ($1 = '' OR category = $1)
     AND ($2 = '' OR sku ILIKE '%' || $2 || '%'
       OR EXISTS (SELECT 1 FROM jsonb_array_elements_text(p.published_data->'oeCodes') AS code
          WHERE regexp_replace(upper(code), '[^A-Z0-9]', '', 'g') LIKE '%' || $3 || '%')
       OR EXISTS (SELECT 1 FROM jsonb_array_elements(p.published_data->'fitments') AS fit
          WHERE (fit->>'make') ILIKE '%' || $2 || '%' OR (fit->>'model') ILIKE '%' || $2 || '%'))
     ORDER BY sku LIMIT 100`, [allowedCategory, q, normalized]);
}

export async function publishedProduct(sku: string): Promise<Product | null> {
  const rows = await query<Product>("SELECT * FROM catalogue_products WHERE sku = $1 AND published_data IS NOT NULL", [sku]);
  return rows[0] || null;
}

export async function adminProducts(): Promise<Product[]> {
  return query<Product>("SELECT * FROM catalogue_products ORDER BY updated_at DESC LIMIT 500");
}

