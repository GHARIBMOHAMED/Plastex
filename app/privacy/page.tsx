import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Plastex Maroc traite les informations transmises par ce site.",
  alternates: { canonical: "/privacy/", languages: { fr: "/privacy/", en: "/en/privacy/", es: "/es/privacy/" } },
};
export default function PrivacyPage() {
  return (
    <article className="legal-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> MENTIONS LÉGALES
      </div>
      <h1>
        Politique de confidentialité<span className="period">.</span>
      </h1>
      <p className="legal-date">Dernière mise à jour : 16 novembre 2026</p>
      <h2>Les informations que vous nous transmettez</h2>
      <p>
        Lorsque vous nous contactez par e-mail, nous recevons les informations que vous choisissez de fournir, comme votre nom, vos coordonnées professionnelles, vos besoins en produits et votre message. Nous les utilisons pour répondre à votre demande et gérer les échanges professionnels qui en découlent.
      </p>
      <h2>Fonctionnement du site</h2>
      <p>
        Le site ne propose pas de création de compte. Son hébergeur peut traiter des données techniques habituelles, comme l’adresse IP et les journaux de requêtes, pour fournir et sécuriser le service.
      </p>
      <h2>Candidatures</h2>
      <p>
        Si vous postulez depuis la page Carrières, nous conservons vos coordonnées, vos réponses et votre CV dans un espace privé pour examiner votre candidature. Le site extrait le texte du CV et des mots-clés liés aux compétences pour faciliter la recherche. Ces indications ne décident pas de la sélection : chaque candidature est examinée par une personne. Contactez-nous pour toute question ou demande de suppression.
      </p>
      <h2>Partage et conservation</h2>
      <p>
        Nous utilisons les informations des demandes et candidatures uniquement pour la finalité de leur transmission, ou lorsque la loi l’exige. Les candidatures sont conservées dans un espace privé sur le serveur jusqu’à leur examen et leur suppression par notre équipe. Les échanges professionnels sont conservés aussi longtemps que nécessaire à leur finalité et aux obligations applicables.
      </p>
      <h2>Vos questions</h2>
      <p>
        Pour poser une question sur vos données ou demander leur rectification ou suppression lorsque cela s’applique, écrivez à{" "}
        <a href="mailto:commercial@plastexmaroc.com">
          commercial@plastexmaroc.com
        </a>
        .
      </p>
    </article>
  );
}
