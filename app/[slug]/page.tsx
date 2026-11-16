import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ContactBand, ProductGraphic } from "../components";
import { products } from "../data";

type Slug = keyof typeof products;

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug as Slug];
  if (!product) return {};
  return {
    title: product.seo,
    description: product.description,
    alternates: { canonical: `/${slug}/` },
    openGraph: { title: product.seo, description: product.description },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug as Slug];
  if (!product) notFound();
  return (
    <>
      <section className="product-hero">
        <div className="hero-grid" />
        <div className="container product-hero-inner">
          <div className="product-hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> {product.eyebrow}
            </div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>{product.name}</span>
            </div>
            <h1>
              {product.name}
              <span className="period">.</span>
            </h1>
            <p className="product-tagline">{product.headline}</p>
            <p className="product-intro">{product.intro}</p>
            <Link href="/contact/" className="button-primary">
              Discuss your requirements <Arrow diagonal />
            </Link>
          </div>
          <div className="product-hero-art">
            <div className="art-ring ring-one" />
            <div className="art-ring ring-two" />
            <ProductGraphic type={product.illustration} />
            <span className="art-label">
              PLASTEX / {product.name.toUpperCase()}
            </span>
          </div>
        </div>
      </section>
      <section className="product-detail container">
        <div className="section-topline">
          <span className="eyebrow dark">
            <span className="eyebrow-line" /> THE DETAILS
          </span>
          <span className="section-index">SPECIFICATION-LED SOURCING</span>
        </div>
        <div className="detail-grid">
          <h2>
            {product.detail}
            <span className="period">.</span>
          </h2>
          <div>
            <p className="large-copy">{product.copy}</p>
            <ul className="detail-list">
              {product.points.map((point) => (
                <li key={point}>
                  <span>↗</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="enquiry-strip">
        <div className="container">
          <span>HAVE A PART NUMBER OR TECHNICAL BRIEF?</span>
          <Link href="/contact/">
            Send an enquiry <Arrow diagonal />
          </Link>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
