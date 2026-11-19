import type { Metadata } from "next";
import "./catalogue.css";
export const metadata: Metadata = { title: "Catalogue partenaires | Plastex Maroc", robots: { index: false, follow: false } };
export default function CatalogueLayout({ children }: { children: React.ReactNode }) { return children; }
