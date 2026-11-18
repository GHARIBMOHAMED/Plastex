import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: { type: "website", locale: "en_US", siteName: "Plastex Maroc" },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
