import { NextRequest, NextResponse } from "next/server";
import { currentUser, sameOrigin, signIn, signOut } from "@/lib/catalogue/auth";
export const dynamic = "force-dynamic";
export async function GET() { const user = await currentUser(); return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (typeof body.email !== "string" || typeof body.password !== "string") return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const valid = await signIn(body.email, body.password, request);
  return valid ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  await signOut(); return NextResponse.json({ ok: true });
}
