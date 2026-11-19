import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condiciones de uso",
  description: "Condiciones de uso del sitio web de Plastex Maroc.",
  alternates: { canonical: "/es/terms/", languages: { fr: "/terms/", en: "/en/terms/", es: "/es/terms/" } },
};

export default function TermsPage() {
  return (
    <article className="legal-page container">
      <div className="eyebrow dark"><span className="eyebrow-line" /> INFORMACIÓN LEGAL</div>
      <h1>Condiciones de uso<span className="period">.</span></h1>
      <p className="legal-date">Última actualización: 16 de noviembre de 2026</p>
      <h2>Información del sitio web</h2>
      <p>Este sitio web presenta a Plastex Maroc y sus productos con fines informativos. Las descripciones de los productos pueden cambiar. Confirme con nuestro equipo comercial las especificaciones, disponibilidad, precios e idoneidad antes de realizar un pedido.</p>
      <h2>Uso del contenido</h2>
      <p>Los textos, gráficos y elementos de marca del sitio web pertenecen a Plastex Maroc o a sus respectivos titulares. Puede consultar este contenido para evaluar una posible relación comercial. Su reproducción o reutilización comercial requiere autorización previa por escrito.</p>
      <h2>Consultas</h2>
      <p>El envío de una consulta no constituye un contrato de compraventa. Cualquier acuerdo de suministro depende de una oferta independiente y de condiciones comerciales pactadas.</p>
      <h2>Enlaces externos</h2>
      <p>Los enlaces a sitios web externos se ofrecen por comodidad. Sus contenidos y prácticas son responsabilidad de sus respectivos operadores.</p>
      <h2>Contacto</h2>
      <p>Si tiene preguntas sobre este sitio web, escriba a <a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a>.</p>
    </article>
  );
}
