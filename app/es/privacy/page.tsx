import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Plastex Maroc la información enviada a través de este sitio web.",
  alternates: { canonical: "/es/privacy/", languages: { fr: "/privacy/", en: "/en/privacy/", es: "/es/privacy/" } },
};

export default function PrivacyPage() {
  return (
    <article className="legal-page container">
      <div className="eyebrow dark"><span className="eyebrow-line" /> INFORMACIÓN LEGAL</div>
      <h1>Política de privacidad<span className="period">.</span></h1>
      <p className="legal-date">Última actualización: 16 de noviembre de 2026</p>
      <h2>Información que nos envía</h2>
      <p>Si nos contacta por correo electrónico, recibimos los datos que decide facilitarnos, como su nombre, datos de contacto profesional, necesidades de producto y mensaje. Los utilizamos para responder a su consulta y gestionar la correspondencia comercial relacionada.</p>
      <h2>Funcionamiento del sitio web</h2>
      <p>El sitio web no permite crear cuentas. Su proveedor de alojamiento puede tratar datos técnicos habituales, como la dirección IP y los registros de solicitudes, para servir y proteger el sitio.</p>
      <h2>Candidaturas de empleo</h2>
      <p>Si presenta una candidatura mediante la página de empleo, guardamos de forma privada sus datos de contacto, respuestas y CV para su revisión. El sitio extrae texto para búsquedas e indicios de palabras clave relacionadas con el trabajo. Estos indicios no determinan la selección: una persona revisa las candidaturas. Puede contactarnos para consultar sus datos o solicitar su eliminación.</p>
      <h2>Uso compartido y conservación</h2>
      <p>Utilizamos la información de consultas y candidaturas únicamente para la finalidad con la que se presentó, o cuando lo exija la ley. Las candidaturas se conservan en almacenamiento privado del servidor hasta que nuestro equipo las revise y elimine. Conservamos la correspondencia comercial durante el tiempo necesario para su finalidad y las obligaciones aplicables.</p>
      <h2>Sus preguntas</h2>
      <p>Para consultar sus datos o solicitar una corrección o eliminación cuando corresponda, escriba a <a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a>.</p>
    </article>
  );
}
