import { readFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const sql = await readFile(path.join(process.cwd(), "db", "catalogue.sql"), "utf8");
    await pool.query(sql);
    process.stdout.write("Catalogue schema ready\n");
  } finally { await pool.end(); }
}
main().catch(error => { process.stderr.write(`${error}\n`); process.exitCode = 1; });
