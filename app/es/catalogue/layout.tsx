import type { Metadata } from "next";
import "../../catalogue/catalogue.css";
export const metadata: Metadata = { title: "Catálogo para socios | Plastex Maroc", robots: { index: false, follow: false } };
export default function CatalogueLayout({ children }: { children: React.ReactNode }) { return children; }
