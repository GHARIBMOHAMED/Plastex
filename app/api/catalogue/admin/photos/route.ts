import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { adminGuard, isResponse } from "@/lib/catalogue/api";
import { query } from "@/lib/catalogue/db";
export const dynamic = "force-dynamic";
const uploadDir = () => process.env.CATALOGUE_UPLOAD_DIR || path.join(process.cwd(), "private", "catalogue-uploads");
export async function POST(request: NextRequest) {
  const user = await adminGuard(request, true); if (isResponse(user)) return user;
  const form = await request.formData(); const file = form.get("photo");
  if (!(file instanceof File) || file.size > 8_000_000 || file.size < 100) return NextResponse.json({ error: "Upload an image below 8 MB" }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  const mime = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? "image/png"
    : bytes.subarray(0, 3).equals(Buffer.from([255,216,255])) ? "image/jpeg"
    : bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" ? "image/webp" : "";
  if (!mime) return NextResponse.json({ error: "Only PNG, JPEG and WebP images are supported" }, { status: 400 });
  const id = randomUUID(); const ext = mime === "image/png" ? "png" : mime === "image/jpeg" ? "jpg" : "webp";
  await mkdir(uploadDir(), { recursive: true }); await writeFile(path.join(uploadDir(), `${id}.${ext}`), bytes, { flag: "wx" });
  await query("INSERT INTO catalogue_photos(id,file_name,mime_type,uploaded_by) VALUES ($1,$2,$3,$4)", [id, `${id}.${ext}`, mime, user.id]);
  return NextResponse.json({ id }, { status: 201 });
}
