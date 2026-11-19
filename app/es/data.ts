export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://plastex-maroc-components.effervescentninja32.chatgpt.site";

export const products = {
  "brake-discs": {
    eyebrow: "COMPONENTES DE FRENADO / 01",
    name: "Discos de freno",
    headline: "Control en cada giro.",
    intro:
      "Discos de freno para compradores que buscan un suministro fiable y un diálogo técnico claro. Indíquenos la aplicación, las dimensiones y el volumen previsto para iniciar su consulta.",
    detail: "Pensados para las exigencias de la carretera",
    copy: "Desde Tánger, Plastex Maroc trabaja con productos de frenado y fricción. Nuestro equipo trata las necesidades de discos de freno con distribuidores y compradores profesionales de mercados internacionales.",
    points: [
      "Consultas basadas en la aplicación",
      "Revisión de especificaciones técnicas",
      "Asistencia comercial para exportación",
    ],
    illustration: "brake",
    seo: "Discos de freno | Plastex Maroc",
    description:
      "Descubra los discos de freno de Plastex Maroc en Tánger. Consulte a nuestro equipo sobre aplicaciones, especificaciones y suministro internacional.",
  },
  "clutch-discs": {
    eyebrow: "COMPONENTES DE EMBRAGUE / 02",
    name: "Discos de embrague",
    headline: "Potencia transmitida con precisión.",
    intro:
      "Discos de embrague y experiencia en fricción para el suministro profesional de automoción. Comparta su aplicación y requisitos técnicos con nuestro equipo de Tánger.",
    detail: "Experiencia en fricción",
    copy: "Plastex Maroc fabrica productos de fricción para embragues y ensambla discos de embrague. Atendemos consultas para aplicaciones de vehículos ligeros y pesados.",
    points: [
      "Experiencia en fricción de embrague",
      "Consultas para vehículos ligeros y pesados",
      "Asistencia comercial para mercados de exportación",
    ],
    illustration: "clutch",
    seo: "Discos de embrague | Plastex Maroc",
    description:
      "Descubra los discos de embrague y la experiencia en fricción de Plastex Maroc. Consulte sobre aplicaciones y suministro internacional desde Tánger.",
  },
  "brake-drums": {
    eyebrow: "COMPONENTES DE FRENADO / 03",
    name: "Tambores de freno",
    headline: "Confianza en toda la gama.",
    intro:
      "Tambores de freno para compradores profesionales, con trabajos de semiacabado realizados por Plastex Maroc. Consulte sus referencias y necesidades de suministro con nuestro equipo.",
    detail: "Una oferta de frenado más amplia",
    copy: "Además de los productos de fricción que fabrica, Plastex Maroc revende tambores de freno y realiza trabajos de semiacabado. Nuestro equipo ayuda a los compradores a definir sus necesidades.",
    points: [
      "Suministro de tambores de freno",
      "Semiacabado realizado por Plastex Maroc",
      "Consultas basadas en especificaciones",
    ],
    illustration: "drum",
    seo: "Tambores de freno | Plastex Maroc",
    description:
      "Descubra los tambores de freno suministrados por Plastex Maroc y los trabajos de semiacabado en Tánger. Contacte con el equipo para consultas profesionales.",
  },
  "brake-pads": {
    eyebrow: "COMPONENTES DE FRENADO / 04",
    name: "Pastillas de freno",
    headline: "La fricción de cerca.",
    intro: "Las pastillas de freno forman parte de la gama de Plastex Maroc. Indique a nuestro equipo la aplicación, la referencia y sus necesidades de suministro.",
    detail: "Empiece por la referencia adecuada",
    copy: "Nuestro equipo estudia las consultas de pastillas de freno de compradores profesionales. Envíenos la referencia, la cantidad necesaria y el mercado de destino.",
    points: ["Consultas por referencia de pieza", "Revisión de aplicación y cantidad", "Asistencia comercial internacional"],
    illustration: "pads",
    seo: "Pastillas de freno | Plastex Maroc",
    description: "Descubra las pastillas de freno de la gama Plastex Maroc. Consulte a nuestro equipo de Tánger sobre referencias, aplicaciones y suministro.",
  },
} as const;

export const productLinks = [
  {
    href: "/es/brake-discs/",
    label: "Discos de freno",
    number: "01",
    description: "Precisión en movimiento",
  },
  {
    href: "/es/clutch-discs/",
    label: "Discos de embrague",
    number: "02",
    description: "Potencia en cada conexión",
  },
  {
    href: "/es/brake-drums/",
    label: "Tambores de freno",
    number: "03",
    description: "Solidez en cada giro",
  },
  {
    href: "/es/brake-pads/",
    label: "Pastillas de freno",
    number: "04",
    description: "La fricción en primer plano",
  },
];
