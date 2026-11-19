import { CatalogueIndex } from "@/lib/catalogue/views";
export const dynamic = "force-dynamic";
export default function Page({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) { return <CatalogueIndex locale="es" searchParams={searchParams} />; }
