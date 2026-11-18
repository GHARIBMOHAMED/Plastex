export type CareerJob = {
  id: string;
  title: string;
  location: string;
  type?: string;
  summary: string;
  requirements: string[];
};

// Only roles supplied by Plastex Maroc are published here.
export const careerJobs: CareerJob[] = [
  {
    id: "comptable-confirme-tanger",
    title: "Comptable Confirmé(e)",
    location: "Tangier, Morocco",
    summary: "PLASTEX MAROC is recruiting an experienced accountant for its Tangier team. Immediate availability is required.",
    requirements: [
      "Bac+4/5 degree in financial management, accounting, or an equivalent field.",
      "Three to four years in a similar role, preferably in industry.",
      "Excellent knowledge of Moroccan accounting and sound knowledge of Anglo-Saxon accounting principles.",
      "Excellent spoken and written French and English.",
      "Strong command of Excel, Word, PowerPoint, and SAGE accounting software.",
    ],
  },
  {
    id: "charge-logistique-tanger",
    title: "Chargé(e) de Logistique",
    location: "Tangier, Morocco",
    summary: "PLASTEX MAROC is recruiting a logistics officer for its Tangier team. Immediate availability is required.",
    requirements: [
      "Bac+3/5 degree in logistics, supply chain, or an equivalent field.",
      "Two to four years in a similar role, preferably in an industrial setting.",
      "Good knowledge of import/export operations, transport, and stock management.",
      "Proficiency with Microsoft Office and ERP tools.",
      "Good French and English proficiency.",
    ],
  },
];

export const careerAreas = [
  "Production and machining",
  "Quality and testing",
  "Logistics and transport",
  "Sales and customer support",
  "Engineering and maintenance",
  "Finance and accounting",
  "Other",
] as const;
