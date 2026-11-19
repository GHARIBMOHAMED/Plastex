import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import CareerWireframe from "./career-wireframe";
import CareerApplicationForm from "./career-application-form";
import { careerJobs } from "./jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Plastex Maroc busca un contable con experiencia y un responsable de logística en Tánger. Consulte las ofertas y presente su candidatura.",
  alternates: { canonical: "/es/careers/", languages: { fr: "/careers/", en: "/en/careers/", es: "/es/careers/" } },
  openGraph: { locale: "es_ES", title: "Trabaje en Plastex Maroc", description: "Trabaje con los componentes que mantienen el movimiento." },
};

export default function CareersPage() {
  return (
    <>
      <section className="career-hero" data-enter aria-labelledby="career-title">
        <div className="container career-hero-grid">
          <div className="career-hero-copy">
            <span className="career-kicker">PLASTEX MAROC / EMPLEO</span>
            <h1 id="career-title">Un trabajo que<br />nos mueve.</h1>
            <p>Únase al equipo que trabaja con componentes de freno y embrague en Tánger. Aporte su experiencia, sus preguntas y sus ganas de hacer bien las cosas.</p>
            <a href="#career-openings">Ver oportunidades <ArrowDownIcon size={22} aria-hidden="true" /></a>
          </div>
          <CareerWireframe />
        </div>
        <span className="career-hero-index">01 / ÚNASE A PLASTEX</span>
      </section>

      <section className="career-intro" aria-labelledby="career-intro-title">
        <div className="container career-intro-grid">
          <span>NUESTRO TRABAJO</span>
          <div>
            <h2 id="career-intro-title">El buen trabajo empieza con personas que cuidan los detalles.</h2>
            <p>Nuestros equipos trabajan en producción, calidad, logística y atención al cliente. Cada pieza tiene una función y cada consulta es una oportunidad para precisar los detalles.</p>
          </div>
        </div>
      </section>

      <section className="career-photo-section" aria-label="Nuestro entorno de trabajo">
        <div className="container career-photo-grid">
          <div className="career-photo"><Image src="/images/factory-film.webp" alt="Taller ilustrativo de mecanizado de componentes de automoción" fill sizes="(max-width: 760px) 100vw, 60vw" /><span>Imágenes ilustrativas</span></div>
          <div className="career-photo-copy"><span>DESDE TÁNGER</span><p>La producción, el suministro y el diálogo técnico se encuentran en un mismo lugar: el trabajo que hacemos juntos.</p><Link href="/es/expertise/production/">Conozca nuestra producción <ArrowRightIcon size={20} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="career-openings" id="career-openings" aria-labelledby="career-openings-title">
        <div className="container">
          <div className="career-section-head"><span>02 / OPORTUNIDADES</span><h2 id="career-openings-title">Ofertas abiertas.</h2></div>
          {careerJobs.length > 0 ? (
            <div className="career-jobs">
              {careerJobs.map((job) => <article className="career-job" key={job.id}><div><span>{job.location}{job.type ? ` / ${job.type}` : ""}</span><h3 lang="fr">{job.title}</h3><p>{job.summary}</p><h4>Requisitos</h4><ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul><p className="career-job-email">También puede enviar su CV a <a href={`mailto:Plastexmarochasna@gmail.com?subject=${encodeURIComponent(`Candidature - ${job.title}`)}`}>Plastexmarochasna@gmail.com</a>.</p></div><Link href={`/es/careers/?job=${job.id}#apply`}>Presentar candidatura <ArrowRightIcon size={24} aria-hidden="true" /></Link></article>)}
            </div>
          ) : (
            <div className="career-empty"><p>No hay ofertas publicadas actualmente. Puede enviar una candidatura espontánea si su experiencia se relaciona con nuestra actividad.</p><a href="#apply">Preséntese <ArrowRightIcon size={22} aria-hidden="true" /></a></div>
          )}
        </div>
      </section>

      <section className="career-apply" id="apply" aria-labelledby="career-apply-title">
        <div className="container career-apply-grid">
          <div className="career-apply-intro"><span>03 / SU CANDIDATURA</span><h2 id="career-apply-title">Cuéntenos qué puede aportar.</h2><p>Comparta su CV y un resumen de su experiencia. Su candidatura se guarda de forma privada y la revisa una persona.</p><p>Extraemos texto para facilitar la búsqueda de candidaturas. Esta herramienta nunca toma decisiones de contratación.</p></div>
          <CareerApplicationForm jobs={careerJobs} />
        </div>
      </section>
    </>
  );
}
