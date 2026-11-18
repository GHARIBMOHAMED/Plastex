import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import CareerWireframe from "./career-wireframe";
import CareerApplicationForm from "./career-application-form";
import { careerJobs } from "./jobs";

export const metadata: Metadata = {
  title: "Carrières",
  description: "PLASTEX MAROC recrute un(e) Comptable Confirmé(e) et un(e) Chargé(e) de Logistique à Tanger. Consultez les offres et postulez en ligne.",
  alternates: { canonical: "/careers/", languages: { fr: "/careers/", en: "/en/careers/" } },
  openGraph: { locale: "fr_MA", title: "Carrières chez Plastex Maroc", description: "Participez à la fabrication des composants qui font avancer les véhicules." },
};

export default function CareersPage() {
  return (
    <>
      <section className="career-hero" data-enter aria-labelledby="career-title">
        <div className="container career-hero-grid">
          <div className="career-hero-copy">
            <span className="career-kicker">PLASTEX MAROC / CARRIÈRES</span>
            <h1 id="career-title">Un travail qui<br />nous fait avancer.</h1>
            <p>Rejoignez celles et ceux qui travaillent sur les composants de freinage et d’embrayage à Tanger. Apportez votre expérience, votre curiosité et le goût du travail bien fait.</p>
            <a href="#career-openings">Voir les offres <ArrowDownIcon size={22} aria-hidden="true" /></a>
          </div>
          <CareerWireframe />
        </div>
        <span className="career-hero-index">01 / REJOINDRE PLASTEX</span>
      </section>

      <section className="career-intro" aria-labelledby="career-intro-title">
        <div className="container career-intro-grid">
          <span>NOTRE TRAVAIL</span>
          <div>
            <h2 id="career-intro-title">Le travail bien fait commence avec des personnes attentives aux détails.</h2>
            <p>Nos équipes travaillent dans la production, la qualité, la logistique et la relation client. Chaque pièce a sa fonction. Chaque demande mérite une réponse précise.</p>
          </div>
        </div>
      </section>

      <section className="career-photo-section" aria-label="Notre environnement de travail">
        <div className="container career-photo-grid">
          <div className="career-photo"><Image src="/images/factory-film.webp" alt="Atelier d’usinage illustratif de composants automobiles" fill sizes="(max-width: 760px) 100vw, 60vw" /><span>Images d’illustration</span></div>
          <div className="career-photo-copy"><span>DE TANGER</span><p>Production, approvisionnement et échanges techniques se retrouvent dans le travail que nous accomplissons ensemble.</p><Link href="/expertise/production/">Découvrir notre production <ArrowRightIcon size={20} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="career-openings" id="career-openings" aria-labelledby="career-openings-title">
        <div className="container">
          <div className="career-section-head"><span>02 / OPPORTUNITÉS</span><h2 id="career-openings-title">Nos offres d’emploi.</h2></div>
          {careerJobs.length > 0 ? (
            <div className="career-jobs">
              {careerJobs.map((job) => <article className="career-job" key={job.id} lang="fr"><div><span>{job.location}{job.type ? ` / ${job.type}` : ""}</span><h3>{job.title}</h3><p>{job.summary}</p><h4>Profil recherché</h4><ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul><p className="career-job-email">Vous pouvez aussi transmettre votre CV à <a href={`mailto:Plastexmarochasna@gmail.com?subject=${encodeURIComponent(`Candidature - ${job.title}`)}`}>Plastexmarochasna@gmail.com</a>.</p></div><Link href={`/careers/?job=${job.id}#apply`}>Postuler en ligne <ArrowRightIcon size={24} aria-hidden="true" /></Link></article>)}
            </div>
          ) : (
            <div className="career-empty"><p>Aucun poste n’est publié actuellement. Nous accueillons néanmoins les candidatures spontanées pertinentes.</p><a href="#apply">Présentez-vous <ArrowRightIcon size={22} aria-hidden="true" /></a></div>
          )}
        </div>
      </section>

      <section className="career-apply" id="apply" aria-labelledby="career-apply-title">
        <div className="container career-apply-grid">
          <div className="career-apply-intro"><span>03 / VOTRE CANDIDATURE</span><h2 id="career-apply-title">Parlez-nous de votre parcours.</h2><p>Transmettez votre CV et décrivez brièvement votre expérience. Votre candidature est conservée de manière privée et examinée par une personne.</p><p>Nous extrayons le texte des CV pour faciliter la recherche de candidatures. Ce système ne prend aucune décision de recrutement.</p></div>
          <CareerApplicationForm jobs={careerJobs} />
        </div>
      </section>
    </>
  );
}
