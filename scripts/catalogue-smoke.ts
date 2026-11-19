import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";

const base = "http://localhost:3001";
const sku = "TEST-RN2255V";
const partnerEmail = "partner-smoke@local.test";
const db = new Pool({ connectionString: "postgresql://plastex:plastex-local-development-only@127.0.0.1:55432/postgres" });
async function request(url: string, cookie = "", options: RequestInit = {}) {
  return fetch(`${base}${url}`, { redirect: "manual", ...options, headers: { ...(cookie ? { Cookie: cookie } : {}), ...(options.method && options.method !== "GET" ? { Origin: base } : {}), ...options.headers } });
}
async function login(email: string, password: string) {
  const response = await request("/api/catalogue/session/", "", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  assert.equal(response.status, 200, `sign in ${email}`);
  return (response.headers.get("set-cookie") || "").split(";")[0];
}
async function adminPost(pathname: string, cookie: string, body: object) {
  const response = await request(pathname, cookie, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json();
  assert.ok(response.ok, `${pathname}: ${response.status} ${JSON.stringify(result)}`);
  return result;
}
async function main() {
  const credentials = JSON.parse(await readFile(path.join(process.cwd(), ".local-catalogue", "credentials.json"), "utf8"));
  let partnerId = "";
  try {
    assert.equal((await request("/api/catalogue/products/")).status, 401);
    assert.equal((await request("/catalogue/")).status, 307);
    const admin = await login(credentials.email, credentials.password);
    assert.equal((await request("/api/catalogue/admin/products/", admin)).status, 200);
    const partner = await adminPost("/api/catalogue/admin/users/", admin, { action: "create", email: partnerEmail, name: "Smoke test", company: "Local test only", role: "partner", password: "TemporaryTestPassword2026!" });
    partnerId = partner.user.id;
    const buyer = await login(partnerEmail, "TemporaryTestPassword2026!");
    assert.equal((await request("/api/catalogue/admin/products/", buyer)).status, 403);
    await adminPost("/api/catalogue/admin/products/", admin, { action: "create", sku, category: "brake-discs" });
    assert.equal((await request(`/api/catalogue/products/?sku=${sku}`, buyer).then(r => r.json())).products.length, 0);
    const data = { title: { fr: "Pièce de test", en: "Test part", es: "Pieza de prueba" }, description: { fr: "Données de test uniquement.", en: "Test data only.", es: "Solo datos de prueba." }, oeCodes: ["4G0 615 301 A"], specifications: [{ name: "Outter Ø", value: "356" }], fitments: [{ make: "TEST", model: "TEST" }], photoId: null };
    await adminPost("/api/catalogue/admin/products/", admin, { action: "save", sku, data });
    assert.equal((await request(`/api/catalogue/products/?sku=${sku}`, buyer).then(r => r.json())).products.length, 0);
    await adminPost("/api/catalogue/admin/products/", admin, { action: "publish", sku });
    assert.equal((await request(`/api/catalogue/products/?sku=${sku}`, buyer).then(r => r.json())).products.length, 1);
    for (const [path, title] of [["/catalogue/", "Pièce de test"], ["/en/catalogue/", "Test part"], ["/es/catalogue/", "Pieza de prueba"]]) {
      const response = await request(`${path}?q=${sku}`, buyer); assert.equal(response.status, 200); assert.ok((await response.text()).includes(title));
    }
    const detail = await request(`/en/catalogue/${sku}/`, buyer); assert.equal(detail.status, 200); assert.ok((await detail.text()).includes(`/en/contact/?part=${sku}`));
    const crawl = await adminPost("/api/catalogue/admin/crawls/", admin, { action: "start", sourceUrl: "https://www.jnbk-brakes.com/catalogue/cars/brake/49960252/RN2255V" });
    let result: { runs: { id: string; status: string; error: string | null }[]; proposals: { sku: string; matched_codes: string[] }[] } | null = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await request("/api/catalogue/admin/crawls/", admin).then(r => r.json());
      if (result?.runs.find(r => r.id === crawl.run.id)?.status !== "queued" && result?.runs.find(r => r.id === crawl.run.id)?.status !== "running") break;
    }
    const run = result?.runs.find(r => r.id === crawl.run.id);
    assert.equal(run?.status, "completed", run?.error || "crawl did not finish");
    assert.ok(result?.proposals.some(p => p.sku === sku && p.matched_codes.includes("4G0 615 301 A")));
    await adminPost("/api/catalogue/admin/products/", admin, { action: "unpublish", sku });
    assert.equal((await request(`/api/catalogue/products/?sku=${sku}`, buyer).then(r => r.json())).products.length, 0);
    await adminPost("/api/catalogue/admin/users/", admin, { action: "set-active", id: partnerId, active: false });
    assert.equal((await request("/api/catalogue/products/", buyer)).status, 401);
    const sitemap = await request("/sitemap.xml").then(r => r.text()); assert.ok(!sitemap.includes("/catalogue/"));
    const robots = await request("/robots.txt").then(r => r.text()); assert.ok(robots.includes("Disallow: /catalogue/"));
    process.stdout.write("Local smoke passed: protected access, publication, FR/EN/ES search, enquiry link, RN2255V match, revocation and indexing.\n");
  } finally {
    await db.query("DELETE FROM catalogue_products WHERE sku = $1", [sku]);
    if (partnerId) await db.query("DELETE FROM catalogue_users WHERE id = $1", [partnerId]);
    await db.end();
  }
}
main().catch(error => { process.stderr.write(`${error.stack || error}\n`); process.exitCode = 1; });
