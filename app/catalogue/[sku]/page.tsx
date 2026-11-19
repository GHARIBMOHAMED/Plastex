import { CatalogueDetail } from "@/lib/catalogue/views";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ sku: string }> }) { return <CatalogueDetail locale="fr" sku={(await params).sku} />; }
