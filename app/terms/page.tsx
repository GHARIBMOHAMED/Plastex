import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Conditions d’utilisation",
  description: "Conditions régissant l’utilisation du site Plastex Maroc.",
  alternates: { canonical: "/terms/", languages: { fr: "/terms/", en: "/en/terms/" } },
};
export default function TermsPage() {
  return (
    <article className="legal-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> MENTIONS LÉGALES
      </div>
      <h1>
        Conditions d’utilisation<span className="period">.</span>
      </h1>
      <p className="legal-date">Dernière mise à jour : 16 novembre 2026</p>
      <h2>Informations du site</h2>
      <p>
        Ce site présente Plastex Maroc et ses produits à titre d’information générale. Les descriptions des produits peuvent évoluer. Confirmez les spécifications, la disponibilité, les prix et l’adéquation à votre usage auprès de notre équipe commerciale avant toute commande.
      </p>
      <h2>Utilisation du contenu</h2>
      <p>
        Les textes, graphismes et éléments de marque du site appartiennent à Plastex Maroc ou à leurs titulaires respectifs. Vous pouvez les consulter dans le cadre de votre évaluation professionnelle. Toute reproduction ou réutilisation commerciale nécessite une autorisation écrite préalable.
      </p>
      <h2>Demandes</h2>
      <p>
        L’envoi d’une demande ne crée pas de contrat d’achat. Tout accord d’approvisionnement repose sur un devis distinct et des conditions commerciales convenues.
      </p>
      <h2>Liens externes</h2>
      <p>
        Les liens vers des sites externes sont fournis pour votre commodité. Leur contenu et leurs pratiques relèvent de leurs exploitants respectifs.
      </p>
      <h2>Contact</h2>
      <p>
        Pour toute question concernant ce site, écrivez à{" "}
        <a href="mailto:commercial@plastexmaroc.com">
          commercial@plastexmaroc.com
        </a>
        .
      </p>
    </article>
  );
}
