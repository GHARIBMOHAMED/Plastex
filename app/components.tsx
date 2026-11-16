import Link from "next/link";
import { productLinks } from "./data";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

export function ProductGraphic({
  type = "brake",
  small = false,
}: {
  type?: "brake" | "clutch" | "drum";
  small?: boolean;
}) {
  const holes = Array.from({ length: type === "clutch" ? 8 : 12 }, (_, i) => i);
  return (
    <div
      className={`product-graphic ${type} ${small ? "small" : ""}`}
      aria-hidden="true"
    >
      <div className="graphic-glow" />
      <svg viewBox="0 0 600 600" role="presentation">
        <defs>
          <radialGradient id={`metal-${type}`} cx="38%" cy="28%" r="75%">
            <stop offset="0" stopColor="#eff3ef" />
            <stop offset=".18" stopColor="#9fa9a8" />
            <stop offset=".43" stopColor="#3d4749" />
            <stop offset=".68" stopColor="#aab3b2" />
            <stop offset=".9" stopColor="#293237" />
            <stop offset="1" stopColor="#c8cfcb" />
          </radialGradient>
          <radialGradient id={`core-${type}`}>
            <stop offset="0" stopColor="#151c1e" />
            <stop offset=".55" stopColor="#414b4c" />
            <stop offset="1" stopColor="#0b1114" />
          </radialGradient>
          <filter
            id={`shadow-${type}`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="16"
              dy="26"
              stdDeviation="22"
              floodColor="#000"
              floodOpacity=".58"
            />
          </filter>
        </defs>
        <g filter={`url(#shadow-${type})`}>
          <circle
            cx="300"
            cy="300"
            r={type === "drum" ? 240 : 232}
            fill="#151c1e"
            stroke="#a2aeaf"
            strokeWidth="8"
          />
          <circle
            cx="300"
            cy="300"
            r={type === "drum" ? 214 : 220}
            fill={`url(#metal-${type})`}
            stroke="#dae0dc"
            strokeWidth="2"
          />
          {type === "drum" && (
            <circle
              cx="300"
              cy="300"
              r="175"
              fill="#242d2f"
              stroke="#8e999b"
              strokeWidth="13"
            />
          )}
          {type === "clutch" && (
            <>
              <circle
                cx="300"
                cy="300"
                r="183"
                fill="#252c2d"
                stroke="#919e9d"
                strokeWidth="7"
              />
              {holes.map((i) => (
                <path
                  key={i}
                  d="M 275 92 L 325 92 L 315 178 L 285 178 Z"
                  transform={`rotate(${i * 45} 300 300)`}
                  fill="#c7cecb"
                  stroke="#5c6665"
                  strokeWidth="4"
                />
              ))}
            </>
          )}
          {type === "brake" && (
            <>
              <circle
                cx="300"
                cy="300"
                r="171"
                fill="none"
                stroke="#263032"
                strokeWidth="12"
              />
              <circle
                cx="300"
                cy="300"
                r="194"
                fill="none"
                stroke="#d8ded9"
                strokeOpacity=".45"
                strokeWidth="2"
              />
            </>
          )}
          {type !== "clutch" &&
            holes.map((i) => (
              <circle
                key={i}
                cx="300"
                cy={type === "drum" ? "122" : "120"}
                r={type === "drum" ? "9" : "11"}
                transform={`rotate(${i * 30} 300 300)`}
                fill="#172023"
                stroke="#d7e1dd"
                strokeOpacity=".75"
                strokeWidth="2"
              />
            ))}
          <circle
            cx="300"
            cy="300"
            r={type === "clutch" ? 90 : 108}
            fill={`url(#core-${type})`}
            stroke="#b5c1bd"
            strokeWidth="9"
          />
          <circle
            cx="300"
            cy="300"
            r={type === "clutch" ? 49 : 62}
            fill="#101719"
            stroke="#a1adab"
            strokeWidth="5"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <circle
              key={i}
              cx="300"
              cy="225"
              r="8"
              transform={`rotate(${i * 60} 300 300)`}
              fill="#0d1517"
              stroke="#d2dcd6"
              strokeWidth="2"
            />
          ))}
          <circle
            cx="300"
            cy="300"
            r="27"
            fill="#828e8d"
            stroke="#dce3dd"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Plastex Maroc home">
        <span className="brand-mark">
          <span />
        </span>
        <span>
          PLASTEX<span className="brand-light"> MAROC</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/">Home</Link>
        {productLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/contact/" className="header-contact">
        Let’s talk <Arrow diagonal />
      </Link>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          <span></span>
          <span></span>
        </summary>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          {productLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact/">Contact</Link>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand" href="/">
            <span className="brand-mark">
              <span />
            </span>
            <span>
              PLASTEX<span className="brand-light"> MAROC</span>
            </span>
          </Link>
          <p>
            Friction expertise from Tangier, Morocco.
            <br />
            Connecting industry across continents.
          </p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          {productLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span className="footer-label">Company</span>
          <Link href="/faq/">FAQ</Link>
          <Link href="/contact/">Contact</Link>
          <Link href="/privacy/">Privacy policy</Link>
          <Link href="/terms/">Terms of use</Link>
        </div>
        <div>
          <span className="footer-label">Get in touch</span>
          <a href="mailto:commercial@plastexmaroc.com">
            commercial@plastexmaroc.com
          </a>
          <a href="tel:+212539351136">+212 539 351 136</a>
          <span>Tangier, Morocco</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Plastex Maroc</span>
        <span>Made for motion.</span>
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
          <div className="eyebrow">
            <span className="eyebrow-line" /> THE NEXT MOVE
          </div>
          <h2>
            Let’s build what
            <br />
            <em>moves next.</em>
          </h2>
        </div>
        <Link
          href="/contact/"
          className="circle-link"
          aria-label="Contact Plastex Maroc"
        >
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
