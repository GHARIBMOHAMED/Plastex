import { crawlSource } from "../lib/catalogue/crawler";
const url = process.argv[2] || "https://www.jnbk-brakes.com/catalogue/cars/brake/49960252/RN2255V";
async function main() {
  try {
    const record = await crawlSource(url);
    process.stdout.write(JSON.stringify({ supplierCode: record.supplierCode, category: record.category, title: record.title, references: record.references, specifications: record.specifications, applications: record.applications, tables: record.tables.map(table => ({ heading: table.heading, rows: table.rows.slice(0, 12) })), retrievedAt: record.retrievedAt }, null, 2) + "\n");
  } catch (error) { process.stderr.write(`Pilot failed: ${error instanceof Error ? error.message : String(error)}\n`); process.exitCode = 1; }
}
main();
