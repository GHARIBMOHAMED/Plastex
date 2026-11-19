import type { Metadata } from "next";
import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { Arrow } from "../components";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Réponses aux questions courantes sur les produits Plastex Maroc, les demandes d’approvisionnement et l’offre internationale.",
  alternates: { canonical: "/faq/", languages: { fr: "/faq/", en: "/en/faq/", es: "/es/faq/" } },
};
const questions = [
  [
    "Quels produits puis-je demander?",
    "Vous pouvez nous contacter pour des disques de frein, des disques d’embrayage, des tambours et des plaquettes de frein. Précisez l’application du véhicule ou la référence afin que notre équipe commerciale étudie votre demande.",
  ],
  [
    "Plastex Maroc fabrique-t-elle tous les produits présentés?",
    "Plastex Maroc fabrique des produits de friction pour freins et embrayages. Les tambours de frein sont revendus, avec des opérations de semi-finition réalisées par Plastex Maroc. Pour une référence de plaquettes précise, demandez à notre équipe les détails de fabrication ou d’approvisionnement.",
  ],
  [
    "Les acheteurs internationaux peuvent-ils vous contacter?",
    "Oui. Plastex Maroc travaille avec des partenaires professionnels en Europe, en Asie et en Afrique. Précisez à notre équipe commerciale votre marché de destination et vos besoins.",
  ],
  [
    "Quelles informations inclure dans une demande?",
    "Indiquez le type de produit, l’application du véhicule ou de l’équipement, les références ou plans disponibles, le volume prévu et le pays de destination.",
  ],
  [
    "Où se trouve Plastex Maroc?",
    "Plastex Maroc est située dans la zone industrielle de la route de Tétouan, à Tanger, au Maroc.",
  ],
];
export default function FaqPage() {
  return (
    <section className="inner-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> ASSISTANCE
      </div>
      <h1>
        Questions<span className="period">.</span>
        <br />
        <em>Réponses.</em>
      </h1>
      <div className="faq-layout">
        <p>
          Trouvez les informations nécessaires pour échanger avec notre équipe.
        </p>
        <div className="faq-list">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>
                  <PlusIcon size={22} aria-hidden="true" />
                </span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="faq-cta">
        Vous avez une autre question?{" "}
        <Link href="/contact/">
          Contacter notre équipe <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
