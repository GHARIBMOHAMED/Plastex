import type { Category } from "./types";
export const categoryLabels: Record<Category, Record<"fr" | "en" | "es", string>> = {
  "brake-discs": { fr: "Disques de frein", en: "Brake discs", es: "Discos de freno" },
  "clutch-discs": { fr: "Disques d’embrayage", en: "Clutch discs", es: "Discos de embrague" },
  "brake-drums": { fr: "Tambours de frein", en: "Brake drums", es: "Tambores de freno" },
  "brake-pads": { fr: "Plaquettes de frein", en: "Brake pads", es: "Pastillas de freno" },
};
