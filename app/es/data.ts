export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://plastex-maroc-components.effervescentninja32.chatgpt.site";

export const products = {
  "brake-discs": {
    eyebrow: "BRAKING COMPONENTS / 01",
    name: "Brake discs",
    headline: "Control in every rotation.",
    intro:
      "Brake disc solutions for buyers seeking dependable sourcing and clear technical conversations. Tell us your vehicle application, dimensions, and volume requirements to start an enquiry.",
    detail: "Built for the demands of the road",
    copy: "Plastex Maroc works in braking and friction products from Tangier, Morocco. Our team can discuss brake disc requirements with distributors and professional buyers across international markets.",
    points: [
      "Application-based enquiries",
      "Technical specification review",
      "Export-focused commercial support",
    ],
    illustration: "brake",
    seo: "Brake Discs | Plastex Maroc",
    description:
      "Explore brake discs from Plastex Maroc in Tangier. Contact our commercial team about applications, specifications, and international supply.",
  },
  "clutch-discs": {
    eyebrow: "CLUTCH COMPONENTS / 02",
    name: "Clutch discs",
    headline: "Power, precisely transferred.",
    intro:
      "Clutch discs and friction expertise for professional automotive supply. Share your application and technical requirements with our team in Tangier.",
    detail: "A heritage in friction",
    copy: "Plastex Maroc manufactures friction products for clutches and assembles clutch discs. We support discussions around passenger vehicle and heavy vehicle applications.",
    points: [
      "Clutch friction expertise",
      "Passenger and heavy vehicle enquiries",
      "Commercial support for export markets",
    ],
    illustration: "clutch",
    seo: "Clutch Discs | Plastex Maroc",
    description:
      "Discover Plastex Maroc clutch discs and friction expertise. Enquire about applications and international supply from Tangier, Morocco.",
  },
  "brake-drums": {
    eyebrow: "BRAKING COMPONENTS / 03",
    name: "Brake drums",
    headline: "Confidence across the range.",
    intro:
      "Brake drums for professional sourcing programmes, with semi-finished work carried out by Plastex Maroc. Discuss your fitment and supply needs with our commercial team.",
    detail: "A broader braking offer",
    copy: "Alongside its manufactured friction products, Plastex Maroc resells brake drums and carries out semi-finished work. Our team can help buyers define the right enquiry for their market.",
    points: [
      "Brake drum sourcing",
      "Semi-finished work by Plastex Maroc",
      "Specification-led enquiries",
    ],
    illustration: "drum",
    seo: "Brake Drums | Plastex Maroc",
    description:
      "Explore brake drums supplied by Plastex Maroc, including semi-finished work in Tangier. Contact the team for professional sourcing enquiries.",
  },
  "brake-pads": {
    eyebrow: "BRAKING COMPONENTS / 04",
    name: "Brake pads",
    headline: "A closer look at friction.",
    intro: "Brake pads are part of the Plastex Maroc product range. Share your application, part reference, and supply requirements with our team.",
    detail: "Start with the right reference",
    copy: "Our team can review brake pad enquiries from professional buyers. Send us the part reference, required quantity, and destination market to begin a conversation.",
    points: ["Part reference enquiries", "Application and quantity review", "International commercial support"],
    illustration: "pads",
    seo: "Brake Pads | Plastex Maroc",
    description: "Explore brake pads in the Plastex Maroc range. Contact our Tangier team about part references, applications, and supply requirements.",
  },
} as const;

export const productLinks = [
  {
    href: "/es/brake-discs/",
    label: "Brake discs",
    number: "01",
    description: "Precision in motion",
  },
  {
    href: "/es/clutch-discs/",
    label: "Clutch discs",
    number: "02",
    description: "Power in connection",
  },
  {
    href: "/es/brake-drums/",
    label: "Brake drums",
    number: "03",
    description: "Strength in every turn",
  },
  {
    href: "/es/brake-pads/",
    label: "Brake pads",
    number: "04",
    description: "Friction in focus",
  },
];
