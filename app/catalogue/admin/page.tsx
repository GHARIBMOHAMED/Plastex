import type { Metadata } from "next";
import { requireUser } from "@/lib/catalogue/auth";
import AdminClient from "./admin-client";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administration du catalogue | Plastex Maroc", robots: { index: false, follow: false } };
export default async function Page() { await requireUser("fr", "admin"); return <AdminClient />; }
