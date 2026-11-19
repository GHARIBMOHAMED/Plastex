export const categories = ["brake-discs", "clutch-discs", "brake-drums", "brake-pads"] as const;
export type Category = (typeof categories)[number];
export type Locale = "fr" | "en" | "es";
export type Role = "partner" | "admin";

export type Specification = { name: string; value: string; unit?: string };
export type Fitment = { make: string; model: string; years?: string; note?: string };
export type ProductData = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  oeCodes: string[];
  specifications: Specification[];
  fitments: Fitment[];
  photoId: string | null;
};
export type Product = {
  id: string;
  sku: string;
  category: Category;
  draft_data: ProductData;
  published_data: ProductData | null;
  published_at: string | null;
  updated_at: string;
};

export function blankData(): ProductData {
  return { title: { fr: "", en: "", es: "" }, description: { fr: "", en: "", es: "" }, oeCodes: [], specifications: [], fitments: [], photoId: null };
}

export function normalizeCode(value: string): string {
  return value.normalize("NFKC").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function cleanProductData(input: unknown): ProductData {
  if (!input || typeof input !== "object") throw new Error("Invalid product data");
  const obj = input as Record<string, unknown>;
  const title = obj.title as Record<string, unknown> | undefined;
  const description = obj.description as Record<string, unknown> | undefined;
  const localized = (source: Record<string, unknown> | undefined) => ({
    fr: String(source?.fr || "").trim().slice(0, 2000),
    en: String(source?.en || "").trim().slice(0, 2000),
    es: String(source?.es || "").trim().slice(0, 2000),
  });
  const arr = (value: unknown) => Array.isArray(value) ? value.slice(0, 100) : [];
  return {
    title: localized(title), description: localized(description),
    oeCodes: [...new Set(arr(obj.oeCodes).map(v => String(v).trim().slice(0, 80)).filter(Boolean))],
    specifications: arr(obj.specifications).map(v => ({ name: String(v?.name || "").trim().slice(0, 120), value: String(v?.value || "").trim().slice(0, 120), unit: String(v?.unit || "").trim().slice(0, 40) })).filter(v => v.name && v.value),
    fitments: arr(obj.fitments).map(v => ({ make: String(v?.make || "").trim().slice(0, 100), model: String(v?.model || "").trim().slice(0, 100), years: String(v?.years || "").trim().slice(0, 40), note: String(v?.note || "").trim().slice(0, 250) })).filter(v => v.make && v.model),
    photoId: typeof obj.photoId === "string" && /^[0-9a-f-]{36}$/i.test(obj.photoId) ? obj.photoId : null,
  };
}

export function validateForPublish(data: ProductData): string[] {
  const errors: string[] = [];
  for (const locale of ["fr", "en", "es"] as const) {
    if (!data.title[locale]) errors.push(`Missing ${locale} title`);
    if (!data.description[locale]) errors.push(`Missing ${locale} description`);
  }
  if (!data.oeCodes.length) errors.push("At least one approved OE code is required");
  if (!data.specifications.length) errors.push("At least one approved specification is required");
  return errors;
}
