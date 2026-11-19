import { hash } from "bcryptjs";
import { Pool } from "pg";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const email = (process.env.BOOTSTRAP_ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD || "";
const name = (process.env.BOOTSTRAP_ADMIN_NAME || "Plastex administrator").trim();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 14) throw new Error("Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD (at least 14 characters)");
async function main() {
  const db = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const existing = await db.query("SELECT id FROM catalogue_users WHERE email = $1", [email]);
    if (existing.rowCount) throw new Error("This administrator already exists; bootstrap does not reset passwords");
    await db.query("INSERT INTO catalogue_users(email,name,company,role,password_hash) VALUES ($1,$2,'Plastex Maroc','admin',$3)", [email, name, await hash(password, 12)]);
    process.stdout.write(`Created administrator ${email}\n`);
  } finally { await db.end(); }
}
main().catch(error => { process.stderr.write(`${error}\n`); process.exitCode = 1; });
