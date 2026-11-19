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
import MenuDismiss from "../menu-dismiss";
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
    brake: { file: "brake-disc-cutout.png", alt: "Ilustración de un disco de freno plateado" },
    clutch: { file: "clutch-lining-cutout.png", alt: "Ilustración de un forro de fricción de embrague tejido" },
    drum: { file: "brake-drum-cutout.png", alt: "Ilustración de un tambor de freno negro" },
    pads: { file: "brake-pads-cutout.png", alt: "Ilustración de dos pastillas de freno" },
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
      aria-label={`${label} espacio para vídeo con imagen ilustrativa`}
    >
      <img src={poster} alt="" decoding="async" />
      <div className="video-placeholder-badge">
        <FilmSlateIcon size={22} aria-hidden="true" />
        <span>{label}</span>
        <strong>ESPACIO PARA VÍDEO</strong>
      </div>
    </div>
  );
}

function MenuPanel() {
  return (
    <>
      <div className="menu-panel-top">
        <Link className="menu-panel-brand" href="/es/" aria-label="Inicio de Plastex Maroc">
          <Image src="/images/plastex-logo.png" alt="" width={182} height={47} />
        </Link>
        <div className="menu-panel-actions">
          <Link href="/es/contact/">Contacto</Link>
          <Link href="/es/careers/">Únete a nosotros</Link>
        </div>
      </div>
      <div className="menu-panel-columns">
        <div className="menu-panel-column"><strong>Plastex</strong><Link href="/es/">Inicio</Link><Link href="/es/our-story/">Nuestra historia</Link><Link href="/es/careers/">Únete a nosotros</Link><Link href="/es/contact/">Contacto</Link></div>
        <div className="menu-panel-column"><strong>Productos</strong>{productLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/es/catalogue/login/">Catálogo para socios</Link></div>
        <div className="menu-panel-column"><strong>Experiencia</strong><Link href="/es/expertise/">Nuestra experiencia</Link><Link href="/es/expertise/production/">Producción</Link><Link href="/es/expertise/logistics/">Logística</Link><Link href="/es/expertise/transport/">Transporte</Link></div>
        <div className="menu-panel-column"><strong>Calidad</strong><Link href="/es/faq/">Preguntas y respuestas</Link><Link href="/es/contact/">Solicitar certificados</Link></div>
        <div className="menu-panel-column"><strong>Información</strong><Link href="/es/privacy/">Política de privacidad</Link><Link href="/es/terms/">Condiciones de uso</Link></div>
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <MenuDismiss />
      <Link className="brand" href="/es/" aria-label="Inicio de Plastex Maroc">
        <Image src="/images/plastex-logo.png" alt="" width={182} height={47} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <Link href="/es/">Inicio</Link>
        {productLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/es/contact/" className="header-contact">
        Hablemos <Arrow diagonal />
      </Link>
      <LanguageSwitcher />
      <details className="desktop-menu">
        <summary>Menú <span aria-hidden="true">+</span></summary>
        <nav aria-label="Navegación ampliada"><MenuPanel /></nav>
      </details>
      <details className="mobile-menu">
        <summary aria-label="Menú">
          Menú <PlusIcon className="mobile-menu-plus" size={22} weight="light" aria-hidden="true" />
        </summary>
        <nav aria-label="Navegación móvil"><MenuPanel /></nav>
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
            <Link className="footer-brand" href="/es/" aria-label="Inicio de Plastex Maroc">
              <BrandMark className="footer-brand-mark" />
            </Link>
            <span>Pensado para el<br />movimiento.</span>
          </div>
          <nav className="footer-legal" aria-label="Información legal">
            <Link href="/es/privacy/">Política de privacidad</Link>
            <Link href="/es/terms/">Condiciones de uso</Link>
          </nav>
        </div>

        <div className="footer-main">
          <div className="footer-columns">
            <nav className="footer-column" aria-label="Descubrir Plastex">
              <h2>Descubrir</h2>
              <Link href="/es/expertise/">Nuestra experiencia</Link>
              <Link href="/es/our-story/">Nuestra historia</Link>
              <Link href="/es/careers/">Únete a nosotros</Link>
              <Link href="/es/faq/">FAQ</Link>
              <Link href="/es/contact/">Contacto</Link>
            </nav>
            <nav className="footer-column" aria-label="Nuestras capacidades">
              <h2>Capacidades</h2>
              <Link href="/es/expertise/production/">Producción</Link>
              <Link href="/es/expertise/logistics/">Logística</Link>
              <Link href="/es/expertise/transport/">Transporte</Link>
            </nav>
            <nav className="footer-column" aria-label="Nuestros productos">
              <h2>Productos</h2>
              {productLinks.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <Link href="/es/catalogue/login/">Catálogo para socios</Link>
            </nav>
            <div className="footer-column footer-contact-details">
              <h2>Datos de la empresa</h2>
              <span>Tánger, Marruecos</span>
              <a href="tel:+212539351136">+212 539 351 136</a>
              <a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a>
            </div>
            <div className="footer-column footer-reach">
              <h2>Nuestra presencia</h2>
              <span>Europa</span>
              <span>Asia</span>
              <span>África</span>
            </div>
          </div>

          <div className="footer-main-bottom">
            <div className="footer-copyright">
              <span className="footer-color-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>Plastex Maroc © {new Date().getFullYear()}</span>
            </div>
            <Link className="footer-endmark" href="/es/" aria-label="Volver al inicio de Plastex Maroc">
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
            Construyamos lo que
            <br />
            <em>nos hace avanzar.</em>
          </h2>
        </div>
        <Link
          href="/es/contact/"
          className="circle-link"
          aria-label="Contactar con Plastex Maroc"
        >
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
