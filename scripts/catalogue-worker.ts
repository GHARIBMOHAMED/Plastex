import { Pool } from "pg";
import { crawlSource, validateSourceUrl } from "../lib/catalogue/crawler";
import { proposeMatches, type SourceRecord } from "../lib/catalogue/matching";
import type { Product } from "../lib/catalogue/types";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function nextRun() {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const run = (await client.query<{ id: string; source_url: string }>("SELECT id, source_url FROM catalogue_crawl_runs WHERE status = 'queued' ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1")).rows[0];
    if (run) await client.query("UPDATE catalogue_crawl_runs SET status = 'running', started_at = now() WHERE id = $1", [run.id]);
    await client.query("COMMIT"); return run;
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
}

async function processRun(run: { id: string; source_url: string }) {
  try {
    const url = validateSourceUrl(run.source_url);
    const record = await crawlSource(url.href);
    if (url.hostname.endsWith("nibk.jp")) {
      const prior = (await db.query<{ extracted_data: SourceRecord }>("SELECT extracted_data FROM catalogue_source_records WHERE source_url LIKE 'https://%jnbk-brakes.com/%' AND supplier_code = $1", [record.supplierCode])).rows;
      const equivalent = prior.some(row => row.extracted_data.category === record.category && row.extracted_data.references.some(code => record.references.some(other => code.replace(/\W/g, "").toUpperCase() === other.replace(/\W/g, "").toUpperCase())));
      if (!equivalent) throw new Error("NiBK record was not confirmed equivalent to an existing JNBK record; no fallback accepted");
    }
    const source = (await db.query<{ id: string }>(`INSERT INTO catalogue_source_records(source_url, supplier_code, category, extracted_data, fetched_at)
      VALUES ($1,$2,$3,$4,now()) ON CONFLICT (source_url) DO UPDATE SET supplier_code = EXCLUDED.supplier_code, category = EXCLUDED.category, extracted_data = EXCLUDED.extracted_data, fetched_at = now() RETURNING id`,
      [record.sourceUrl, record.supplierCode, record.category, JSON.stringify(record)])).rows[0];
    const products = (await db.query<Product>("SELECT * FROM catalogue_products")).rows;
    const matches = proposeMatches(record, products);
    for (const match of matches) await db.query(`INSERT INTO catalogue_match_proposals(product_id, source_record_id, status, score, matched_codes, conflicts)
      VALUES ($1,$2,'pending',$3,$4,$5) ON CONFLICT (product_id, source_record_id) DO UPDATE SET status = 'pending', score = EXCLUDED.score, matched_codes = EXCLUDED.matched_codes, conflicts = EXCLUDED.conflicts, reviewed_by = NULL, reviewed_at = NULL`,
      [match.productId, source.id, match.score, JSON.stringify(match.matchedCodes), JSON.stringify(match.conflicts)]);
    await db.query("UPDATE catalogue_crawl_runs SET status = 'completed', finished_at = now() WHERE id = $1", [run.id]);
    process.stdout.write(`Completed ${run.source_url}; ${matches.length} proposed matches\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await db.query("UPDATE catalogue_crawl_runs SET status = 'failed', error = $2, finished_at = now() WHERE id = $1", [run.id, message.slice(0, 2000)]);
    process.stderr.write(`Failed ${run.source_url}: ${message}\n`);
  }
}

async function main() {
  while (true) { const run = await nextRun(); if (run) await processRun(run); else await pause(5000); }
}
main().catch(error => { process.stderr.write(`${error}\n`); process.exit(1); });
