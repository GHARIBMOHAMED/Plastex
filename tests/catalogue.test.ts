import test from "node:test";
import assert from "node:assert/strict";
import { extractSource, validateSourceUrl } from "../lib/catalogue/crawler";
import { proposeMatches, type SourceRecord } from "../lib/catalogue/matching";
import { blankData, cleanProductData, validateForPublish, type Product } from "../lib/catalogue/types";

const sourceUrl = "https://www.jnbk-brakes.com/catalogue/cars/brake/49960252/RN2255V";
const exampleHtml = `<html><head><title>RN2255V</title></head><body><h1>Brake Disc RN2255V</h1><h2>Cross Reference</h2><table><tr><th>Maker</th><th>OE code</th></tr><tr><td>Example</td><td>40-20 019</td></tr></table><h2>Specification</h2><table><tr><th>Diameter</th><td>280</td><td>mm</td></tr></table><h2>Application</h2><table><tr><td>Example</td><td>Model A</td></tr></table></body></html>`;
const observedJnbkMarkup = `<html><body><h2 class="search-title">ROTOR DISC » RN2255V</h2><div class="detail__characteristics"><div class="detail__specification"><div class="str"><div class="param-title">Outter Ø</div><div class="param-field">356</div></div></div><div class="detail__plate"><div class="str"><div class="owner">VAG</div><div class="field">4G0 615 301 A</div></div></div></div><table><tr><td>03.11~10.18</td><td>2000</td><td>CGLD</td><td>SDN / AVNT</td></tr></table></body></html>`;
function part(id: string, category: Product["category"], codes: string[], diameter = "280"): Product {
  const data = blankData(); data.oeCodes = codes; data.specifications = [{ name: "Diameter", value: diameter, unit: "mm" }];
  return { id, sku: id, category, draft_data: data, published_data: null, published_at: null, updated_at: "" };
}

test("extracts the RN2255V-shaped pilot fixture without importing supplier copy or images", () => {
  const record = extractSource(exampleHtml, sourceUrl);
  assert.equal(record.supplierCode, "RN2255V");
  assert.equal(record.category, "brake-discs");
  assert.ok(record.references.includes("40-20 019"));
  assert.deepEqual(record.specifications[0], { name: "Diameter", value: "280", unit: "mm" });
  assert.equal(record.applications.length, 1);
});

test("parses the observed RN2255V page structure", () => {
  const record = extractSource(observedJnbkMarkup, sourceUrl);
  assert.equal(record.category, "brake-discs");
  assert.ok(record.references.includes("4G0 615 301 A"));
  assert.ok(record.specifications.some(spec => spec.name === "Outter Ø" && spec.value === "356"));
  assert.equal(record.applications.length, 1);
});

test("exact OE code and category propose one match", () => {
  const source = extractSource(exampleHtml, sourceUrl);
  const matches = proposeMatches(source, [part("PTX-01", "brake-discs", ["4020019"]), part("PTX-02", "brake-pads", ["4020019"])]);
  assert.equal(matches.length, 1); assert.equal(matches[0].productId, "PTX-01"); assert.deepEqual(matches[0].conflicts, []);
});

test("ambiguous, missing and dimension-conflicting matches are flagged", () => {
  const source: SourceRecord = extractSource(exampleHtml, sourceUrl);
  assert.deepEqual(proposeMatches(source, [part("PTX-00", "brake-discs", ["UNRELATED"])]), []);
  const ambiguous = proposeMatches(source, [part("PTX-01", "brake-discs", ["4020019"]), part("PTX-03", "brake-discs", ["40 20 019"])]);
  assert.equal(ambiguous.length, 2); assert.ok(ambiguous.every(match => match.conflicts.some(value => value.includes("Ambiguous"))));
  const conflicting = proposeMatches(source, [part("PTX-04", "brake-discs", ["4020019"], "300")]);
  assert.ok(conflicting[0].conflicts.some(value => value.includes("Diameter")));
});

test("publication requires approved information in all three languages", () => {
  const data = cleanProductData(blankData());
  assert.ok(validateForPublish(data).length >= 3);
  data.title = { fr: "Disque", en: "Disc", es: "Disco" };
  data.description = { fr: "Description", en: "Description", es: "Descripción" };
  data.oeCodes = ["123"]; data.specifications = [{ name: "Diamètre", value: "280", unit: "mm" }];
  assert.deepEqual(validateForPublish(data), []);
});

test("crawler accepts only approved catalogue hosts and paths", () => {
  assert.equal(validateSourceUrl(sourceUrl).hostname, "www.jnbk-brakes.com");
  assert.throws(() => validateSourceUrl("http://www.jnbk-brakes.com/catalogue/cars/x"));
  assert.throws(() => validateSourceUrl("https://evil.example/catalogue/cars/x"));
  assert.throws(() => validateSourceUrl("https://www.jnbk-brakes.com/private"));
});
