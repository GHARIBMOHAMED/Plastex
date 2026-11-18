export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://plastex-maroc-components.effervescentninja32.chatgpt.site";

export const products = {
  "brake-discs": {
    eyebrow: "COMPOSANTS DE FREINAGE / 01",
    name: "Disques de frein",
    headline: "La maîtrise à chaque rotation.",
    intro:
      "Des disques de frein pour les acheteurs professionnels qui recherchent un approvisionnement fiable et un échange technique clair. Indiquez-nous l’application, les dimensions et les volumes souhaités.",
    detail: "Conçus pour les exigences de la route",
    copy: "Depuis Tanger, Plastex Maroc travaille dans les produits de freinage et de friction. Notre équipe échange avec les distributeurs et les acheteurs professionnels sur leurs besoins en disques de frein, au Maroc comme à l’international.",
    points: [
      "Demandes fondées sur l’application",
      "Examen des spécifications techniques",
      "Accompagnement commercial à l’export",
    ],
    illustration: "brake",
    seo: "Brake Discs | Plastex Maroc",
    description:
      "Découvrez les disques de frein de Plastex Maroc à Tanger. Contactez notre équipe commerciale pour vos applications, spécifications et besoins d’approvisionnement international.",
  },
  "clutch-discs": {
    eyebrow: "COMPOSANTS D’EMBRAYAGE / 02",
    name: "Disques d’embrayage",
    headline: "La puissance transmise avec précision.",
    intro:
      "Disques d’embrayage et expertise en friction pour les professionnels de l’automobile. Présentez votre application et vos exigences techniques à notre équipe de Tanger.",
    detail: "Une expertise en friction",
    copy: "Plastex Maroc fabrique des produits de friction pour embrayages et assemble des disques d’embrayage. Nous étudions les applications pour véhicules légers et poids lourds.",
    points: [
      "Expertise en friction d’embrayage",
      "Demandes pour véhicules légers et poids lourds",
      "Accompagnement commercial à l’export",
    ],
    illustration: "clutch",
    seo: "Clutch Discs | Plastex Maroc",
    description:
      "Découvrez les disques d’embrayage et l’expertise en friction de Plastex Maroc. Échangez avec notre équipe de Tanger sur vos applications et vos besoins à l’international.",
  },
  "brake-drums": {
    eyebrow: "COMPOSANTS DE FREINAGE / 03",
    name: "Tambours de frein",
    headline: "La confiance sur toute la gamme.",
    intro:
      "Tambours de frein destinés aux acheteurs professionnels, avec des opérations de semi-finition réalisées par Plastex Maroc. Parlez de vos références et de vos besoins à notre équipe commerciale.",
    detail: "Une offre de freinage élargie",
    copy: "En complément de ses produits de friction fabriqués à Tanger, Plastex Maroc revend des tambours de frein et réalise des opérations de semi-finition. Notre équipe aide les acheteurs à préciser leurs demandes.",
    points: [
      "Approvisionnement en tambours de frein",
      "Opérations de semi-finition par Plastex Maroc",
      "Demandes fondées sur les spécifications",
    ],
    illustration: "drum",
    seo: "Brake Drums | Plastex Maroc",
    description:
      "Découvrez les tambours de frein proposés par Plastex Maroc, avec des opérations de semi-finition à Tanger. Contactez notre équipe pour vos besoins professionnels.",
  },
  "brake-pads": {
    eyebrow: "COMPOSANTS DE FREINAGE / 04",
    name: "Plaquettes de frein",
    headline: "La friction au cœur du sujet.",
    intro: "Les plaquettes de frein font partie de la gamme Plastex Maroc. Transmettez à notre équipe votre application, votre référence et vos besoins d’approvisionnement.",
    detail: "Tout commence par la bonne référence",
    copy: "Notre équipe étudie les demandes de plaquettes de frein des acheteurs professionnels. Envoyez-nous la référence, la quantité souhaitée et le marché de destination.",
    points: ["Demandes par référence produit", "Examen de l’application et des quantités", "Accompagnement commercial international"],
    illustration: "pads",
    seo: "Brake Pads | Plastex Maroc",
    description: "Découvrez les plaquettes de frein de la gamme Plastex Maroc. Contactez notre équipe à Tanger au sujet des références, applications et besoins d’approvisionnement.",
  },
} as const;

export const productLinks = [
  {
    href: "/brake-discs/",
    label: "Disques de frein",
    number: "01",
    description: "La précision en mouvement",
  },
  {
    href: "/clutch-discs/",
    label: "Disques d’embrayage",
    number: "02",
    description: "La puissance en liaison",
  },
  {
    href: "/brake-drums/",
    label: "Tambours de frein",
    number: "03",
    description: "La solidité à chaque tour",
  },
  {
    href: "/brake-pads/",
    label: "Plaquettes de frein",
    number: "04",
    description: "La friction au premier plan",
  },
];
