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
    location: "Tánger, Marruecos",
    summary: "PLASTEX MAROC busca un profesional de contabilidad con experiencia para su equipo de Tánger. Se requiere incorporación inmediata.",
    requirements: [
      "Formación Bac+4/5 en gestión financiera, contabilidad o un campo equivalente.",
      "De tres a cuatro años de experiencia en un puesto similar, preferiblemente en el sector industrial.",
      "Excelente dominio de la contabilidad marroquí y buen conocimiento de los principios contables anglosajones.",
      "Excelente nivel oral y escrito de francés e inglés.",
      "Dominio de Excel, Word, PowerPoint y del programa contable SAGE.",
    ],
  },
  {
    id: "charge-logistique-tanger",
    title: "Chargé(e) de Logistique",
    location: "Tánger, Marruecos",
    summary: "PLASTEX MAROC busca un responsable de logística para su equipo de Tánger. Se requiere incorporación inmediata.",
    requirements: [
      "Formación Bac+3/5 en logística, cadena de suministro o un campo equivalente.",
      "De dos a cuatro años de experiencia en un puesto similar, preferiblemente en un entorno industrial.",
      "Buen conocimiento de las operaciones de importación y exportación, el transporte y la gestión de existencias.",
      "Dominio de Microsoft Office y herramientas ERP.",
      "Buen nivel de francés e inglés.",
    ],
  },
];

export const careerAreas = [
  "Producción y mecanizado",
  "Calidad y ensayos",
  "Logística y transporte",
  "Ventas y atención al cliente",
  "Ingeniería y mantenimiento",
  "Finanzas y contabilidad",
  "Otro",
] as const;
