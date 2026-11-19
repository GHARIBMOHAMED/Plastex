import type { Metadata } from "next";
import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { Arrow } from "../components";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Plastex Maroc products, sourcing enquiries, and international supply.",
  alternates: { canonical: "/en/faq/", languages: { fr: "/faq/", en: "/en/faq/", es: "/es/faq/" } },
};
const questions = [
  [
    "What products can I enquire about?",
    "You can contact us about brake discs, clutch discs, brake drums, and brake pads. Share the vehicle application or part reference so our commercial team can review your request.",
  ],
  [
    "Does Plastex Maroc manufacture every product shown?",
    "Plastex Maroc manufactures brake and clutch friction products. Brake drums are supplied through resale, with semi-finished work carried out by Plastex Maroc. Ask our team for the production or sourcing details of a specific brake pad reference.",
  ],
  [
    "Can international buyers contact your team?",
    "Yes. Plastex Maroc works with professional partners across Europe, Asia, and Africa. Contact our commercial team with your destination market and requirements.",
  ],
  [
    "What details should I include in an enquiry?",
    "Include the product type, vehicle or equipment application, part numbers or drawings if available, expected volume, and destination country.",
  ],
  [
    "Where is Plastex Maroc located?",
    "Plastex Maroc is based in the industrial zone on Route de Tétouan in Tangier, Morocco.",
  ],
];
export default function FaqPage() {
  return (
    <section className="inner-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> SUPPORT
      </div>
      <h1>
        Questions<span className="period">.</span>
        <br />
        <em>Answered.</em>
      </h1>
      <div className="faq-layout">
        <p>
          Find the information you need to begin a conversation with our team.
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
        Have a different question?{" "}
        <Link href="/en/contact/">
          Contact our team <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
