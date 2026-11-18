import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  FilmSlateIcon,
} from "@phosphor-icons/react/ssr";
import { productLinks } from "./data";
import BrandMark from "./brand-mark";
import MenuDismiss from "./menu-dismiss";
import LanguageSwitcher from "../language-switcher";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? <ArrowUpRightIcon size={20} /> : <ArrowRightIcon size={20} />}
    </span>
  );
}

export function ProductGraphic({
  type = "brake",
  small = false,
}: {
  type?: "brake" | "clutch" | "drum" | "pads";
  small?: boolean;
}) {
  const products = {
    brake: { file: "brake-disc-cutout.png", alt: "Silver brake disc rotor illustration" },
    clutch: { file: "clutch-lining-cutout.png", alt: "Woven clutch friction lining illustration" },
    drum: { file: "brake-drum-cutout.png", alt: "Black brake drum illustration" },
    pads: { file: "brake-pads-cutout.png", alt: "Pair of brake pads illustration" },
  };
  const product = products[type];

  return (
    <div className={`product-graphic ${type} ${small ? "small" : ""}`}>
      <img
        src={`/images/${product.file}`}
        alt={product.alt}
        loading={small ? "lazy" : "eager"}
        decoding="async"
      />
    </div>
  );
}

export function VideoPlaceholder({
  poster,
  label,
  variant = "inline",
}: {
  poster: string;
  label: string;
  variant?: "inline" | "hero";
}) {
  return (
    <div
      className={`video-placeholder ${variant}`}
      role="img"
      aria-label={`${label} video placeholder with illustrative image`}
    >
      <img src={poster} alt="" decoding="async" />
      <div className="video-placeholder-badge">
        <FilmSlateIcon size={22} aria-hidden="true" />
        <span>{label}</span>
        <strong>VIDEO PLACEHOLDER</strong>
      </div>
    </div>
  );
}

function MenuPanel() {
  return (
    <>
      <div className="menu-panel-top">
        <Link className="menu-panel-brand" href="/en/" aria-label="Plastex Maroc home">
          <Image src="/images/plastex-logo.png" alt="" width={182} height={47} />
        </Link>
        <div className="menu-panel-actions">
          <Link href="/en/contact/">Contact</Link>
          <Link href="/en/careers/">Join us</Link>
        </div>
      </div>
      <div className="menu-panel-columns">
        <div className="menu-panel-column"><strong>Plastex</strong><Link href="/en/">Home</Link><Link href="/en/our-story/">Our story</Link><Link href="/en/careers/">Join us</Link><Link href="/en/contact/">Contact</Link></div>
        <div className="menu-panel-column"><strong>Products</strong>{productLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div className="menu-panel-column"><strong>Expertise</strong><Link href="/en/expertise/">Our expertise</Link><Link href="/en/expertise/production/">Production</Link><Link href="/en/expertise/logistics/">Logistics</Link><Link href="/en/expertise/transport/">Transport</Link></div>
        <div className="menu-panel-column"><strong>Quality</strong><Link href="/en/faq/">Questions and answers</Link><Link href="/en/contact/">Request certificates</Link></div>
        <div className="menu-panel-column"><strong>Information</strong><Link href="/en/privacy/">Privacy policy</Link><Link href="/en/terms/">Terms of use</Link></div>
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <MenuDismiss />
      <Link className="brand" href="/en/" aria-label="Plastex Maroc home">
        <Image src="/images/plastex-logo.png" alt="" width={182} height={47} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/en/">Home</Link>
        {productLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/en/contact/" className="header-contact">
        Let’s talk <Arrow diagonal />
      </Link>
      <LanguageSwitcher />
      <details className="desktop-menu">
        <summary>Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Expanded navigation"><MenuPanel /></nav>
      </details>
      <details className="mobile-menu">
        <summary aria-label="Menu">
          <span></span>
          <span></span>
        </summary>
        <nav aria-label="Mobile navigation"><MenuPanel /></nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-left">
          <div className="footer-identity">
            <Link className="footer-brand" href="/en/" aria-label="Plastex Maroc home">
              <BrandMark className="footer-brand-mark" />
            </Link>
            <span>Made for<br />motion.</span>
          </div>
          <nav className="footer-legal" aria-label="Legal information">
            <Link href="/en/privacy/">Privacy policy</Link>
            <Link href="/en/terms/">Terms of use</Link>
          </nav>
        </div>

        <div className="footer-main">
          <div className="footer-columns">
            <nav className="footer-column" aria-label="Explore Plastex">
              <h2>Explore</h2>
              <Link href="/en/expertise/">Our expertise</Link>
              <Link href="/en/our-story/">Our story</Link>
              <Link href="/en/careers/">Join us</Link>
              <Link href="/en/faq/">FAQ</Link>
              <Link href="/en/contact/">Contact</Link>
            </nav>
            <nav className="footer-column" aria-label="Our capabilities">
              <h2>Capabilities</h2>
              <Link href="/en/expertise/production/">Production</Link>
              <Link href="/en/expertise/logistics/">Logistics</Link>
              <Link href="/en/expertise/transport/">Transport</Link>
            </nav>
            <nav className="footer-column" aria-label="Our products">
              <h2>Products</h2>
              {productLinks.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </nav>
            <div className="footer-column footer-contact-details">
              <h2>Company details</h2>
              <span>Tangier, Morocco</span>
              <a href="tel:+212539351136">+212 539 351 136</a>
              <a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a>
            </div>
            <div className="footer-column footer-reach">
              <h2>Our reach</h2>
              <span>Europe</span>
              <span>Asia</span>
              <span>Africa</span>
            </div>
          </div>

          <div className="footer-main-bottom">
            <div className="footer-copyright">
              <span className="footer-color-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>Plastex Maroc © {new Date().getFullYear()}</span>
            </div>
            <Link className="footer-endmark" href="/en/" aria-label="Back to Plastex Maroc home">
              <BrandMark />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="contact-orb" />
      <div className="container contact-band-inner">
        <div>
          <h2>
            Let’s build what
            <br />
            <em>moves next.</em>
          </h2>
        </div>
        <Link
          href="/en/contact/"
          className="circle-link"
          aria-label="Contact Plastex Maroc"
        >
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
