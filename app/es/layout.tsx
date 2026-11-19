import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: { type: "website", locale: "es_ES", siteName: "Plastex Maroc" },
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
