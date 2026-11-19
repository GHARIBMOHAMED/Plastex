import type { Metadata } from "next";
import "../../catalogue/catalogue.css";
export const metadata: Metadata = { title: "Partner catalogue | Plastex Maroc", robots: { index: false, follow: false } };
export default function CatalogueLayout({ children }: { children: React.ReactNode }) { return children; }
