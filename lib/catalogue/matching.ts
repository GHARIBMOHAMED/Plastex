import { normalizeCode, type Category, type Product, type Specification } from "./types";

export type SourceRecord = {
  sourceUrl: string;
  supplierCode: string;
  category: Category | null;
  title: string;
  references: string[];
  specifications: Specification[];
  applications: string[];
  tables: { heading: string; rows: string[][] }[];
  retrievedAt: string;
};

export type Match = { productId: string; score: number; matchedCodes: string[]; conflicts: string[] };

function normValue(value: string): string {
  return value.toLowerCase().replace(/,/g, ".").replace(/\s+/g, "").replace(/[^a-z0-9.]/g, "");
}

export function proposeMatches(source: SourceRecord, products: Product[]): Match[] {
  if (!source.category) return [];
  const sourceCodes = new Set(source.references.map(normalizeCode).filter(Boolean));
  const matches = products.flatMap(product => {
    if (product.category !== source.category) return [];
    const matchedCodes = product.draft_data.oeCodes.filter(code => sourceCodes.has(normalizeCode(code)));
    if (!matchedCodes.length) return [];
    const conflicts: string[] = [];
    for (const spec of product.draft_data.specifications) {
      const sourceSpec = source.specifications.find(candidate => normValue(candidate.name) === normValue(spec.name));
      if (sourceSpec && normValue(`${spec.value}${spec.unit || ""}`) !== normValue(`${sourceSpec.value}${sourceSpec.unit || ""}`)) conflicts.push(`${spec.name}: Plastex ${spec.value} ${spec.unit || ""} / source ${sourceSpec.value} ${sourceSpec.unit || ""}`);
    }
    return [{ productId: product.id, score: matchedCodes.length * 20 + 50, matchedCodes, conflicts }];
  });
  if (matches.length > 1) for (const match of matches) match.conflicts.push("Ambiguous OE reference: multiple Plastex products match this source record");
  return matches;
}
