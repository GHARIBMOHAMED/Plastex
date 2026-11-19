import { randomBytes } from "node:crypto";
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { hash } from "bcryptjs";
import EmbeddedPostgres from "embedded-postgres";
import { Pool } from "pg";

const localDir = path.join(process.cwd(), ".local-catalogue");
const dataDir = path.join(localDir, "db");
const credentialFile = path.join(localDir, "credentials.json");
const port = 55432;
const webPort = Number(process.env.LOCAL_CATALOGUE_WEB_PORT || 3001);
const user = "plastex";
const dbPassword = "plastex-local-development-only";
const databaseUrl = `postgresql://${user}:${dbPassword}@127.0.0.1:${port}/postgres`;

async function main() {
  await mkdir(localDir, { recursive: true });
  const pg = new EmbeddedPostgres({ databaseDir: dataDir, user, password: dbPassword, port, persistent: true, autoRehydrateSymlinks: true, postgresFlags: ["-c", "listen_addresses=127.0.0.1"], onLog: () => {}, onError: error => process.stderr.write(`${error}\n`) });
  if (!existsSync(path.join(dataDir, "PG_VERSION"))) await pg.initialise();
  await pg.start();
  try {
  const db = new Pool({ connectionString: databaseUrl });
  const schema = await readFile(path.join(process.cwd(), "db", "catalogue.sql"), "utf8");
  await db.query(schema);
  let adminPassword = "";
  const existing = await db.query("SELECT id FROM catalogue_users WHERE email = 'admin@local.test'");
  if (!existing.rowCount) {
    adminPassword = randomBytes(18).toString("base64url");
    await db.query("INSERT INTO catalogue_users(email,name,company,role,password_hash) VALUES ('admin@local.test','Local administrator','Plastex Maroc','admin',$1)", [await hash(adminPassword, 12)]);
    await writeFile(credentialFile, JSON.stringify({ email: "admin@local.test", password: adminPassword }, null, 2), { flag: "wx" });
  } else {
    const credentials = JSON.parse(await readFile(credentialFile, "utf8"));
    adminPassword = credentials.password;
  }
  await db.end();
  process.stdout.write(`Local catalogue ready. Admin: admin@local.test / ${adminPassword}\n`);
  process.stdout.write(`Open http://localhost:${webPort}/catalogue/login/\n`);
  const env = { ...process.env, DATABASE_URL: databaseUrl, CATALOGUE_UPLOAD_DIR: path.join(localDir, "uploads") };
  const children: ChildProcess[] = [
    spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(webPort)], { cwd: process.cwd(), env, stdio: "inherit" }),
    spawn(process.execPath, ["--import", "tsx", "scripts/catalogue-worker.ts"], { cwd: process.cwd(), env, stdio: "inherit" }),
  ];
  let closing = false;
  async function close() {
    if (closing) return; closing = true;
    for (const child of children) child.kill();
    await pg.stop(); process.exit(0);
  }
  process.on("SIGINT", close); process.on("SIGTERM", close);
  for (const child of children) child.on("exit", code => { if (!closing && code) close(); });
  } catch (error) { await pg.stop(); throw error; }
}
main().catch(error => { process.stderr.write(`Local catalogue failed: ${error instanceof Error ? error.stack : String(error)}\n`); process.exitCode = 1; });
