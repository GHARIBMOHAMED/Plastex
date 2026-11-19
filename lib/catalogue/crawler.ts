import { CheerioCrawler, PlaywrightCrawler } from "crawlee";
import { load, type CheerioAPI } from "cheerio";
import { categories, type Category } from "./types";
import type { SourceRecord } from "./matching";
import { validateSourceUrl } from "./source-url";
export { validateSourceUrl } from "./source-url";

const text = (value: string) => value.replace(/\s+/g, " ").trim();
function inferCategory(value: string): Category | null {
  const lower = value.toLowerCase();
  if (/brake\s*(disc|disk|rotor)|rotor\s*disc|disc\s*rotor/.test(lower)) return "brake-discs";
  if (/clutch\s*(disc|disk|lining)/.test(lower)) return "clutch-discs";
  if (/brake\s*drum/.test(lower)) return "brake-drums";
  if (/brake\s*pad/.test(lower)) return "brake-pads";
  return null;
}

export function extractSource(html: string, sourceUrl: string): SourceRecord {
  const $: CheerioAPI = load(html);
  $("script,style,noscript,svg,nav,footer,header").remove();
  const title = text($("h1, h2.search-title").first().text() || $("title").first().text());
  const supplierCode = decodeURIComponent(new URL(sourceUrl).pathname.split("/").filter(Boolean).at(-1) || "").toUpperCase();
  const tables: SourceRecord["tables"] = [];
  const specifications: SourceRecord["specifications"] = [];
  const references = new Set<string>();
  const applications: string[] = [];
  $(".detail__specification .str").each((_, row) => {
    const name = text($(row).find(".param-title").first().text());
    const value = text($(row).find(".param-field").first().text());
    if (name && value) specifications.push({ name, value });
  });
  $(".detail__plate .str").each((_, row) => {
    const code = text($(row).find(".field").first().text());
    if (code) references.add(code);
  });
  $("table").each((_, table) => {
    const heading = text($(table).prevAll("h1,h2,h3,h4").first().text() || $(table).parent().prevAll("h1,h2,h3,h4").first().text());
    const rows: string[][] = [];
    $(table).find("tr").each((_, row) => {
      const cells = $(row).children("th,td").map((_, cell) => text($(cell).text())).get().filter(Boolean);
      if (cells.length) rows.push(cells);
    });
    if (rows.length) tables.push({ heading, rows: rows.slice(0, 500) });
    const kind = heading.toLowerCase();
    for (const row of rows) {
      if (row.length < 2) continue;
      if (/^\d{2}\.\d{2}~\d{2}\.\d{2}$/.test(row[0])) applications.push(row.slice(0, 4).join(" · "));
      if (/cross|reference|oem|oe\s*(number|code)/i.test(kind) || /^(oe|oem|cross reference)/i.test(row[0])) {
        for (const cell of row.slice(1)) if (/^[A-Za-z0-9][A-Za-z0-9 ._/-]{2,60}$/.test(cell)) references.add(cell);
      } else if (/spec|dimension|technical|size/i.test(kind)) {
        specifications.push({ name: row[0], value: row[1], unit: row[2] || "" });
      } else if (/application|vehicle|fitment|car model/i.test(kind)) {
        applications.push(row.join(" · "));
      }
    }
  });
  // Some catalogue pages use definition lists rather than tables.
  $(".detail__characteristics dt").each((_, dt) => {
    const name = text($(dt).text()); const value = text($(dt).next("dd").text());
    if (name && value) {
      if (/^(oe|oem|cross reference)/i.test(name)) references.add(value);
      else specifications.push({ name, value });
    }
  });
  const breadcrumb = text($("[aria-label*=breadcrumb], .breadcrumb, .breadcrumbs").first().text());
  const category = inferCategory(`${breadcrumb} ${title} ${$("h2").first().text()}`);
  return { sourceUrl, supplierCode, category, title, references: [...references].slice(0, 500), specifications: specifications.slice(0, 200), applications: applications.slice(0, 500), tables: tables.slice(0, 40), retrievedAt: new Date().toISOString() };
}

export async function crawlSource(rawUrl: string): Promise<SourceRecord> {
  const url = validateSourceUrl(rawUrl);
  let html = "";
  const common = { maxRequestsPerCrawl: 1, maxConcurrency: 1, maxRequestRetries: 0, requestHandlerTimeoutSecs: 35, navigationTimeoutSecs: 25, respectRobotsTxtFile: true, maxRequestsPerMinute: 6 };
  const crawler = new CheerioCrawler({ ...common, requestHandler: async ({ $ }) => { html = $.html(); } });
  await crawler.run([url.href]);
  if (!html) throw new Error("No page retrieved. It may be blocked by robots.txt or inaccessible.");
  let record = extractSource(html, url.href);
  if (!record.title && !record.tables.length) {
    // Browser rendering is used only when the HTML response contains no usable catalogue content.
    let rendered = "";
    const browserCrawler = new PlaywrightCrawler({ ...common, launchContext: { launchOptions: { headless: true } }, requestHandler: async ({ page }) => { rendered = await page.content(); } });
    await browserCrawler.run([url.href]);
    if (!rendered) throw new Error("JavaScript rendering failed or source access is restricted");
    record = extractSource(rendered, url.href);
  }
  if (!record.title && !record.tables.length) throw new Error("Source page has no usable catalogue record");
  if (!categories.includes(record.category as Category)) throw new Error("Could not verify product category from source page");
  return record;
}
