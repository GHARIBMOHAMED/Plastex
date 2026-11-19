import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  FilmSlateIcon,
  PlusIcon,
} from "@phosphor-icons/react/ssr";
import { productLinks } from "./data";
import BrandMark from "./brand-mark";
import MenuDismiss from "./menu-dismiss";
import LanguageSwitcher from "./language-switcher";

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
    brake: { file: "brake-disc-cutout.png", alt: "Illustration d’un disque de frein argenté" },
    clutch: { file: "clutch-lining-cutout.png", alt: "Illustration d’une garniture de friction d’embrayage tissée" },
    drum: { file: "brake-drum-cutout.png", alt: "Illustration d’un tambour de frein noir" },
    pads: { file: "brake-pads-cutout.png", alt: "Illustration de deux plaquettes de frein" },
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
      aria-label={`${label}  : emplacement vidéo avec image d’illustration`}
    >
      <img src={poster} alt="" decoding="async" />
      <div className="video-placeholder-badge">
        <FilmSlateIcon size={22} aria-hidden="true" />
        <span>{label}</span>
        <strong>EMPLACEMENT VIDÉO</strong>
      </div>
    </div>
  );
}

function MenuPanel() {
  return (
    <>
      <div className="menu-panel-top">
        <Link className="menu-panel-brand" href="/" aria-label="Accueil Plastex Maroc">
          <Image src="/images/plastex-logo.png" alt="" width={182} height={47} />
        </Link>
        <div className="menu-panel-actions">
          <Link href="/contact/">Contact</Link>
          <Link href="/careers/">Rejoignez-nous</Link>
        </div>
      </div>
      <div className="menu-panel-columns">
        <div className="menu-panel-column"><strong>Plastex</strong><Link href="/">Accueil</Link><Link href="/our-story/">Notre histoire</Link><Link href="/careers/">Rejoignez-nous</Link><Link href="/contact/">Contact</Link></div>
        <div className="menu-panel-column"><strong>Produits</strong>{productLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/catalogue/login/">Catalogue partenaires</Link></div>
        <div className="menu-panel-column"><strong>Expertise</strong><Link href="/expertise/">Notre expertise</Link><Link href="/expertise/production/">Production</Link><Link href="/expertise/logistics/">Logistique</Link><Link href="/expertise/transport/">Transport</Link></div>
        <div className="menu-panel-column"><strong>Qualité</strong><Link href="/faq/">Questions et réponses</Link><Link href="/contact/">Demander les certificats</Link></div>
        <div className="menu-panel-column"><strong>Informations</strong><Link href="/privacy/">Politique de confidentialité</Link><Link href="/terms/">Conditions d’utilisation</Link></div>
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <MenuDismiss />
      <Link className="brand" href="/" aria-label="Accueil Plastex Maroc">
        <Image src="/images/plastex-logo.png" alt="" width={182} height={47} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        <Link href="/">Accueil</Link>
        {productLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/contact/" className="header-contact">
        Parlons-en <Arrow diagonal />
      </Link>
      <LanguageSwitcher />
      <details className="desktop-menu">
        <summary>Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Navigation développée"><MenuPanel /></nav>
      </details>
      <details className="mobile-menu">
        <summary aria-label="Menu">
          Menu <PlusIcon className="mobile-menu-plus" size={22} weight="light" aria-hidden="true" />
        </summary>
        <nav aria-label="Navigation mobile"><MenuPanel /></nav>
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
            <Link className="footer-brand" href="/" aria-label="Accueil Plastex Maroc">
              <BrandMark className="footer-brand-mark" />
            </Link>
            <span>Conçu pour<br />le mouvement.</span>
          </div>
          <nav className="footer-legal" aria-label="Informations légales">
            <Link href="/privacy/">Politique de confidentialité</Link>
            <Link href="/terms/">Conditions d’utilisation</Link>
          </nav>
        </div>

        <div className="footer-main">
          <div className="footer-columns">
            <nav className="footer-column" aria-label="Découvrir Plastex">
              <h2>Découvrir</h2>
              <Link href="/expertise/">Notre expertise</Link>
              <Link href="/our-story/">Notre histoire</Link>
              <Link href="/careers/">Rejoignez-nous</Link>
              <Link href="/faq/">FAQ</Link>
              <Link href="/contact/">Contact</Link>
            </nav>
            <nav className="footer-column" aria-label="Nos savoir-faire">
              <h2>Savoir-faire</h2>
              <Link href="/expertise/production/">Production</Link>
              <Link href="/expertise/logistics/">Logistique</Link>
              <Link href="/expertise/transport/">Transport</Link>
            </nav>
            <nav className="footer-column" aria-label="Nos produits">
              <h2>Produits</h2>
              {productLinks.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <Link href="/catalogue/login/">Catalogue partenaires</Link>
            </nav>
            <div className="footer-column footer-contact-details">
              <h2>Coordonnées de l’entreprise</h2>
              <span>Tanger, Maroc</span>
              <a href="tel:+212539351136">+212 539 351 136</a>
              <a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a>
            </div>
            <div className="footer-column footer-reach">
              <h2>Notre présence</h2>
              <span>Europe</span>
              <span>Asie</span>
              <span>Afrique</span>
            </div>
          </div>

          <div className="footer-main-bottom">
            <div className="footer-copyright">
              <span className="footer-color-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>Plastex Maroc © {new Date().getFullYear()}</span>
            </div>
            <Link className="footer-endmark" href="/" aria-label="Retour à l’accueil Plastex Maroc">
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
            Construisons ce qui
            <br />
            <em>nous fait avancer.</em>
          </h2>
        </div>
        <Link
          href="/contact/"
          className="circle-link"
          aria-label="Contacter Plastex Maroc"
        >
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
