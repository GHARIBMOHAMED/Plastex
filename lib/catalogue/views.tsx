import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { requireUser } from "./auth";
import { catalogueCopy, localePrefix } from "./copy";
import { publishedProduct, searchPublished } from "./products";
import { categoryLabels } from "./categories";
import { categories, type Locale } from "./types";
import LoginForm from "@/app/catalogue/login-form";
import SignOutButton from "@/app/catalogue/sign-out-button";

export async function CatalogueLogin({ locale }: { locale: Locale }) {
  const c = catalogueCopy[locale];
  return <main className="catalogue-shell catalogue-login-shell" id="main-content">
    <div className="catalogue-login-frame">
      <div><p className="catalogue-kicker">{c.eyebrow} / 01</p><h1>{c.login}</h1><p>{c.restricted}</p></div>
      <LoginForm locale={locale} />
    </div>
  </main>;
}

export async function CatalogueIndex({ locale, searchParams }: { locale: Locale; searchParams: Promise<{ q?: string; category?: string }> }) {
  const user = await requireUser(locale);
  const { q = "", category = "" } = await searchParams;
  const products = await searchPublished(q, category);
  const c = catalogueCopy[locale];
  const base = `${localePrefix(locale)}/catalogue/`;
  return <main className="catalogue-shell" id="main-content">
    <div className="catalogue-topline"><span>{c.eyebrow}</span><span>{user.company || user.name} <SignOutButton locale={locale} /></span></div>
    <div className="catalogue-intro"><div><h1>{c.title}</h1><p>{c.intro}</p></div>{user.role === "admin" && <Link className="catalogue-admin-link" href="/catalogue/admin/">{c.admin} <ArrowRightIcon size={18} /></Link>}</div>
    <form className="catalogue-search" action={base} method="get">
      <label><MagnifyingGlassIcon size={24} aria-hidden="true" /><span className="sr-only">{c.search}</span><input name="q" defaultValue={q} placeholder={c.search} /></label>
      <select name="category" defaultValue={category} aria-label={c.all}><option value="">{c.all}</option>{categories.map(key => <option key={key} value={key}>{categoryLabels[key][locale]}</option>)}</select>
      <button type="submit">{c.submit} <ArrowRightIcon size={18} /></button>
    </form>
    <div className="catalogue-result-head"><h2>{c.results}</h2><span>{String(products.length).padStart(2, "0")}</span></div>
    {products.length ? <div className="catalogue-grid">{products.map(product => {
      const data = product.published_data!;
      return <Link className="catalogue-card" href={`${base}${encodeURIComponent(product.sku)}/`} key={product.id}>
        <div className="catalogue-card-image">{data.photoId ? <img src={`/api/catalogue/photos/${data.photoId}/`} alt={data.title[locale]} /> : <span>{c.noPhoto}</span>}</div>
        <div className="catalogue-card-meta"><span>{categoryLabels[product.category][locale]}</span><ArrowRightIcon size={20} /></div>
        <h3>{data.title[locale]}</h3><p>{product.sku}</p>
      </Link>;
    })}</div> : <p className="catalogue-empty">{c.empty}</p>}
  </main>;
}

export async function CatalogueDetail({ locale, sku }: { locale: Locale; sku: string }) {
  await requireUser(locale);
  const product = await publishedProduct(sku);
  if (!product) notFound();
  const data = product.published_data!;
  const c = catalogueCopy[locale];
  const base = `${localePrefix(locale)}/catalogue/`;
  const contact = `${localePrefix(locale)}/contact/?part=${encodeURIComponent(product.sku)}`;
  return <main className="catalogue-shell catalogue-detail" id="main-content">
    <Link className="catalogue-back" href={base}>← {c.back}</Link>
    <div className="catalogue-detail-hero"><div><p className="catalogue-kicker">{categoryLabels[product.category][locale]} / {product.sku}</p><h1>{data.title[locale]}</h1><p>{data.description[locale]}</p><Link className="catalogue-enquiry" href={contact}>{c.enquiry} <ArrowRightIcon size={20} /></Link></div>
      <div className="catalogue-detail-image">{data.photoId ? <img src={`/api/catalogue/photos/${data.photoId}/`} alt={data.title[locale]} /> : <span>{c.noPhoto}</span>}</div>
    </div>
    <div className="catalogue-detail-data"><section><h2>{c.oe}</h2><ul>{data.oeCodes.map(code => <li key={code}>{code}</li>)}</ul></section><section><h2>{c.specs}</h2><dl>{data.specifications.map((spec, index) => <div key={index}><dt>{spec.name}</dt><dd>{spec.value} {spec.unit || ""}</dd></div>)}</dl></section><section><h2>{c.fitments}</h2>{data.fitments.length ? <ul>{data.fitments.map((fit, index) => <li key={index}>{fit.make} {fit.model} {fit.years} {fit.note}</li>)}</ul> : <p>—</p>}</section></div>
  </main>;
}
