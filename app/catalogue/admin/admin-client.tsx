"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PlusIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { blankData, categories, type Category, type Product, type ProductData } from "@/lib/catalogue/types";
import { categoryLabels } from "@/lib/catalogue/categories";

type Account = { id: string; email: string; name: string; company: string; role: string; active: boolean };
type Run = { id: string; source_url: string; status: string; error: string | null; created_at: string };
type Proposal = { id: string; sku: string; source_url: string; status: string; score: number; matched_codes: string[]; conflicts: string[]; extracted_data: { title: string; specifications: { name: string; value: string; unit?: string }[]; references: string[]; applications: string[] } };
type Staged = { source_url: string; supplier_code: string; category: string; fetched_at: string };

async function post(url: string, body: unknown) {
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Request failed");
  return result;
}
const lineRows = (input: string, count: number) => input.split("\n").map(line => line.split("|").map(part => part.trim())).filter(row => row[0] && row[1]).slice(0, 100).map(row => row.slice(0, count));

export default function AdminClient() {
  const [tab, setTab] = useState<"products" | "matching" | "accounts">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState<ProductData>(blankData());
  const [oeText, setOeText] = useState("");
  const [specText, setSpecText] = useState("");
  const [fitText, setFitText] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [newSku, setNewSku] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("brake-discs");
  const [sourceUrl, setSourceUrl] = useState("https://www.jnbk-brakes.com/catalogue/cars/brake/49960252/RN2255V");
  const product = products.find(item => item.sku === selected);

  const refresh = useCallback(async () => {
    const [p, u, c] = await Promise.all([
      fetch("/api/catalogue/admin/products/", { cache: "no-store" }),
      fetch("/api/catalogue/admin/users/", { cache: "no-store" }),
      fetch("/api/catalogue/admin/crawls/", { cache: "no-store" }),
    ]);
    if (!p.ok || !u.ok || !c.ok) throw new Error("Could not load catalogue administration");
    const [productsResult, usersResult, crawlsResult] = await Promise.all([p.json(), u.json(), c.json()]);
    setProducts(productsResult.products); setAccounts(usersResult.users); setRuns(crawlsResult.runs); setProposals(crawlsResult.proposals); setStaged(crawlsResult.staged);
  }, []);
  useEffect(() => { refresh().catch(err => setError(err.message)); }, [refresh]);
  useEffect(() => { if (product) {
    setDraft(product.draft_data);
    setOeText(product.draft_data.oeCodes.join("\n"));
    setSpecText(product.draft_data.specifications.map(v => `${v.name} | ${v.value} | ${v.unit || ""}`).join("\n"));
    setFitText(product.draft_data.fitments.map(v => `${v.make} | ${v.model} | ${v.years || ""} | ${v.note || ""}`).join("\n"));
  } }, [selected, product?.updated_at]);

  async function action(task: () => Promise<unknown>, success: string) {
    setBusy(true); setError(""); setMessage("");
    try { await task(); await refresh(); setMessage(success); }
    catch (err) { setError(err instanceof Error ? err.message : "Action failed"); }
    finally { setBusy(false); }
  }
  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await action(async () => { const result = await post("/api/catalogue/admin/products/", { action: "create", sku: newSku, category: newCategory }); setSelected(result.product.sku); setNewSku(""); }, "Produit créé comme brouillon.");
  }
  async function productAction(kind: "save" | "publish" | "unpublish") {
    if (!selected) return;
    const data: ProductData = { ...draft,
      oeCodes: oeText.split("\n").map(value => value.trim()).filter(Boolean),
      specifications: lineRows(specText, 3).map(row => ({ name: row[0], value: row[1], unit: row[2] || "" })),
      fitments: lineRows(fitText, 4).map(row => ({ make: row[0], model: row[1], years: row[2] || "", note: row[3] || "" })),
    };
    await action(async () => { if (kind === "publish") await post("/api/catalogue/admin/products/", { action: "save", sku: selected, data }); await post("/api/catalogue/admin/products/", { action: kind, sku: selected, data }); }, kind === "publish" ? "Version approuvée et publiée." : kind === "unpublish" ? "Produit retiré du catalogue partenaire." : "Brouillon enregistré.");
  }
  async function upload(file: File) {
    setBusy(true); setError("");
    try { const form = new FormData(); form.set("photo", file); const response = await fetch("/api/catalogue/admin/photos/", { method: "POST", body: form }); const result = await response.json(); if (!response.ok) throw new Error(result.error); setDraft(value => ({ ...value, photoId: result.id })); setMessage("Photo téléchargée. Enregistrez puis publiez pour la rendre visible."); }
    catch (err) { setError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    await action(() => post("/api/catalogue/admin/users/", { action: "create", email: form.get("email"), name: form.get("name"), company: form.get("company"), role: form.get("role"), password: form.get("password") }), "Compte créé. Transmettez le mot de passe par un canal privé.");
    event.currentTarget.reset();
  }

  return <main className="catalogue-shell catalogue-admin" id="main-content">
    <a className="catalogue-back" href="/catalogue/"><ArrowLeftIcon size={18} /> Catalogue partenaires</a>
    <div className="catalogue-intro"><div><p className="catalogue-kicker">PLASTEX / ADMINISTRATION</p><h1>Gérer le catalogue</h1><p>Les brouillons, photos et rapprochements fournisseurs restent privés jusqu’à publication.</p></div></div>
    <nav className="catalogue-admin-tabs" aria-label="Administration du catalogue">
      <button type="button" aria-current={tab === "products" ? "page" : undefined} onClick={() => setTab("products")}>Produits <span>{products.length}</span></button>
      <button type="button" aria-current={tab === "matching" ? "page" : undefined} onClick={() => setTab("matching")}>Sources et rapprochements <span>{proposals.filter(p => p.status === "pending").length}</span></button>
      <button type="button" aria-current={tab === "accounts" ? "page" : undefined} onClick={() => setTab("accounts")}>Comptes <span>{accounts.length}</span></button>
    </nav>
    {message && <p className="catalogue-admin-status" role="status">{message}</p>}{error && <p className="catalogue-admin-error" role="alert">{error}</p>}
    {tab === "products" && <div className="catalogue-admin-grid"><aside>
      <h2>Références Plastex</h2><form className="catalogue-admin-create" onSubmit={createProduct}><label>Nouvelle référence<input value={newSku} onChange={e => setNewSku(e.target.value)} required placeholder="Code Plastex" /></label><select value={newCategory} onChange={e => setNewCategory(e.target.value as Category)} aria-label="Catégorie">{categories.map(key => <option value={key} key={key}>{categoryLabels[key].fr}</option>)}</select><button disabled={busy}><PlusIcon size={18} /> Créer le brouillon</button></form>
      <div className="catalogue-admin-list">{products.map(item => <button className={item.sku === selected ? "is-selected" : ""} type="button" key={item.id} onClick={() => setSelected(item.sku)}><strong>{item.sku}</strong><span>{categoryLabels[item.category].fr} · {item.published_data ? "Publié" : "Brouillon"}</span></button>)}</div>
    </aside><section className="catalogue-admin-editor">{product ? <>
      <div className="catalogue-editor-head"><div><p className="catalogue-kicker">{categoryLabels[product.category].fr}</p><h2>{product.sku}</h2><span>{product.published_data ? "Version publiée en ligne" : "Non publié"}</span></div><div className="catalogue-editor-actions"><button type="button" disabled={busy} onClick={() => productAction("save")}>Enregistrer</button><button type="button" disabled={busy} onClick={() => productAction("publish")}><CheckIcon size={18} /> Approuver et publier</button>{product.published_data && <button type="button" disabled={busy} onClick={() => productAction("unpublish")}>Retirer</button>}</div></div>
      <div className="catalogue-editor-locales">{(["fr", "en", "es"] as const).map(locale => <fieldset key={locale}><legend>{locale.toUpperCase()}</legend><label>Nom du produit<input value={draft.title[locale]} onChange={e => setDraft(value => ({ ...value, title: { ...value.title, [locale]: e.target.value } }))} /></label><label>Description approuvée<textarea rows={4} value={draft.description[locale]} onChange={e => setDraft(value => ({ ...value, description: { ...value.description, [locale]: e.target.value } }))} /></label></fieldset>)}</div>
      <div className="catalogue-editor-fields"><label>Codes OE approuvés <small>Un code par ligne</small><textarea rows={5} value={oeText} onChange={e => setOeText(e.target.value)} /></label><label>Caractéristiques approuvées <small>Nom | valeur | unité, une ligne par caractéristique</small><textarea rows={5} value={specText} onChange={e => setSpecText(e.target.value)} /></label><label>Applications approuvées <small>Marque | modèle | années | note</small><textarea rows={5} value={fitText} onChange={e => setFitText(e.target.value)} /></label><label className="catalogue-upload"><UploadSimpleIcon size={22} /> Photo produit approuvée<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { if (e.target.files?.[0]) upload(e.target.files[0]); }} />{draft.photoId && <span>Photo chargée · {draft.photoId}</span>}</label></div>
    </> : <p>Sélectionnez une référence ou créez un brouillon.</p>}</section></div>}
    {tab === "matching" && <div className="catalogue-admin-section"><h2>Importer une référence fournisseur</h2><p>La recherche commence par JNBK. NiBK n’est accepté que si un enregistrement JNBK équivalent existe déjà. Une seule page est lue par lancement, en respectant robots.txt.</p><form className="catalogue-crawl-form" onSubmit={e => { e.preventDefault(); action(() => post("/api/catalogue/admin/crawls/", { action: "start", sourceUrl }), "Extraction ajoutée à la file d’attente."); }}><label>URL du catalogue JNBK / NiBK<input type="url" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} required /></label><button disabled={busy}>Lancer l’extraction <ArrowRightIcon size={18} /></button></form><button type="button" className="catalogue-refresh" onClick={() => refresh().catch(err => setError(err.message))}>Actualiser les résultats</button>
      <div className="catalogue-admin-subgrid"><section><h3>Exécutions</h3>{runs.map(run => <article key={run.id}><strong>{run.status}</strong><span>{run.source_url}</span>{run.error && <p className="catalogue-admin-error">{run.error}</p>}</article>)}</section><section><h3>Sources privées</h3>{staged.map(item => <article key={item.source_url}><strong>{item.supplier_code}</strong><span>{item.category || "Catégorie inconnue"} · {new Date(item.fetched_at).toLocaleDateString("fr-FR")}</span><small>{item.source_url}</small></article>)}</section></div>
      <h3>Rapprochements à vérifier</h3>{proposals.length ? proposals.map(item => <article className="catalogue-proposal" key={item.id}><div><strong>{item.sku} ↔ {item.extracted_data.title || item.source_url}</strong><span>{item.status} · code OE: {item.matched_codes.join(", ")}</span><small>{item.source_url}</small></div>{item.conflicts.length > 0 && <ul className="catalogue-conflicts">{item.conflicts.map((conflict, index) => <li key={index}>{conflict}</li>)}</ul>}<details><summary>Voir les données extraites</summary><p>Références: {item.extracted_data.references.join(", ") || "—"}</p><p>Dimensions: {item.extracted_data.specifications.map(s => `${s.name}: ${s.value} ${s.unit || ""}`).join(" · ") || "—"}</p><p>Applications: {item.extracted_data.applications.join(" · ") || "—"}</p></details><div className="catalogue-proposal-actions"><button disabled={busy} onClick={() => action(() => post("/api/catalogue/admin/crawls/", { action: "review", id: item.id, status: "reviewed" }), "Rapprochement marqué comme vérifié. Modifiez et publiez le produit séparément.")}>Marquer vérifié</button><button disabled={busy} onClick={() => action(() => post("/api/catalogue/admin/crawls/", { action: "review", id: item.id, status: "rejected" }), "Rapprochement rejeté.")}>Rejeter</button></div></article>) : <p>Aucun rapprochement proposé. Ajoutez les codes OE Plastex avant de lancer une extraction.</p>}
    </div>}
    {tab === "accounts" && <div className="catalogue-admin-section"><h2>Accès individuels</h2><form className="catalogue-account-form" onSubmit={createAccount}><label>Nom<input name="name" required /></label><label>Entreprise<input name="company" required /></label><label>E-mail<input name="email" type="email" required /></label><label>Rôle<select name="role"><option value="partner">Partenaire</option><option value="admin">Administrateur</option></select></label><label>Mot de passe initial<input name="password" type="password" minLength={14} required /></label><button disabled={busy}>Créer le compte <PlusIcon size={18} /></button></form><div className="catalogue-account-list">{accounts.map(item => <article key={item.id}><div><strong>{item.name}</strong><span>{item.company} · {item.email} · {item.role}</span></div><button type="button" disabled={busy} onClick={() => action(() => post("/api/catalogue/admin/users/", { action: "set-active", id: item.id, active: !item.active }), item.active ? "Accès révoqué et sessions supprimées." : "Compte réactivé.")}>{item.active ? "Révoquer" : "Réactiver"}</button></article>)}</div></div>}
  </main>;
}
