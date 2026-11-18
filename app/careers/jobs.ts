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
    location: "Tanger, Maroc",
    summary: "PLASTEX MAROC recrute un(e) Comptable Confirmé(e) pour renforcer son équipe à Tanger. Disponibilité immédiate.",
    requirements: [
      "Formation supérieure Bac+4/5 en gestion financière, comptabilité ou équivalent.",
      "3 à 4 ans d’expérience dans un poste similaire, idéalement dans le secteur industriel.",
      "Excellente maîtrise de la comptabilité marocaine et bonne connaissance des normes et principes comptables anglo-saxons.",
      "Maîtrise parfaite du français et de l’anglais, à l’oral comme à l’écrit.",
      "Très bonne maîtrise d’Excel, Word et PowerPoint, ainsi que des logiciels de comptabilité SAGE.",
    ],
  },
  {
    id: "charge-logistique-tanger",
    title: "Chargé(e) de Logistique",
    location: "Tanger, Maroc",
    summary: "PLASTEX MAROC recrute un(e) Chargé(e) de Logistique pour renforcer son équipe à Tanger. Disponibilité immédiate.",
    requirements: [
      "Bac+3/5 en logistique, supply chain ou équivalent.",
      "2 à 4 ans d’expérience dans un poste similaire, idéalement en milieu industriel.",
      "Bonne maîtrise des opérations d’import/export, du transport et de la gestion des stocks.",
      "Maîtrise du Pack Office et des outils ERP.",
      "Bon niveau en français et en anglais.",
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
