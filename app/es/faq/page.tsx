import type { Metadata } from "next";
import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { Arrow } from "../components";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a preguntas frecuentes sobre los productos, las consultas de suministro y la actividad internacional de Plastex Maroc.",
  alternates: { canonical: "/es/faq/", languages: { fr: "/faq/", en: "/en/faq/", es: "/es/faq/" } },
};
const questions = [
  [
    "¿Sobre qué productos puedo consultar?",
    "Puede consultarnos sobre discos de freno, discos de embrague, tambores y pastillas de freno. Indique la aplicación del vehículo o la referencia de la pieza para que nuestro equipo comercial estudie su solicitud.",
  ],
  [
    "¿Fabrica Plastex Maroc todos los productos mostrados?",
    "Plastex Maroc fabrica productos de fricción para frenos y embragues. Los tambores de freno se revenden y Plastex Maroc realiza trabajos de semiacabado. Consulte a nuestro equipo sobre la fabricación o el suministro de una referencia concreta de pastillas de freno.",
  ],
  [
    "¿Pueden contactar compradores internacionales?",
    "Sí. Plastex Maroc trabaja con profesionales de Europa, Asia y África. Indique a nuestro equipo comercial su mercado de destino y sus necesidades.",
  ],
  [
    "¿Qué datos debo incluir en una consulta?",
    "Incluya el tipo de producto, la aplicación del vehículo o equipo, referencias o planos si dispone de ellos, el volumen previsto y el país de destino.",
  ],
  [
    "¿Dónde se encuentra Plastex Maroc?",
    "Plastex Maroc se encuentra en la zona industrial de la Route de Tétouan, en Tánger, Marruecos.",
  ],
];
export default function FaqPage() {
  return (
    <section className="inner-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> AYUDA
      </div>
      <h1>
        Preguntas<span className="period">.</span>
        <br />
        <em>Respuestas.</em>
      </h1>
      <div className="faq-layout">
        <p>
          Encuentre la información necesaria para iniciar una conversación con nuestro equipo.
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
        ¿Tiene otra pregunta?{" "}
        <Link href="/es/contact/">
          Contacte con nuestro equipo <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
