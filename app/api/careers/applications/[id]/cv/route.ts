import { isAdminAuthorized, loadApplicationCv } from "../../../../../careers/application-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const type = new URL(request.url).searchParams.get("type");
  if (type !== "pdf" && type !== "docx") return new Response("Invalid file type", { status: 400 });
  const file = await loadApplicationCv(id, type);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": type === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="application-${id}.${type}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
