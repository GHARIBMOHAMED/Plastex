import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { adminGuard, isResponse } from "@/lib/catalogue/api";
import { query } from "@/lib/catalogue/db";
export const dynamic = "force-dynamic";
type UserRow = { id: string; email: string; name: string; company: string; role: string; active: boolean; created_at: string };
export async function GET(request: NextRequest) {
  const user = await adminGuard(request); if (isResponse(user)) return user;
  const users = await query<UserRow>("SELECT id, email, name, company, role, active, created_at FROM catalogue_users ORDER BY created_at DESC");
  return NextResponse.json({ users }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: NextRequest) {
  const admin = await adminGuard(request, true); if (isResponse(admin)) return admin;
  const body = await request.json().catch(() => ({}));
  if (body.action === "create") {
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const password = String(body.password || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || !company || password.length < 14 || !["partner", "admin"].includes(body.role)) return NextResponse.json({ error: "Enter valid account details and a password of at least 14 characters" }, { status: 400 });
    try {
      const users = await query<UserRow>("INSERT INTO catalogue_users(email, name, company, role, password_hash) VALUES ($1,$2,$3,$4,$5) RETURNING id, email, name, company, role, active, created_at", [email, name.slice(0, 120), company.slice(0, 120), body.role, await hash(password, 12)]);
      return NextResponse.json({ user: users[0] }, { status: 201 });
    } catch (error) { if ((error as { code?: string }).code === "23505") return NextResponse.json({ error: "Email already exists" }, { status: 409 }); throw error; }
  }
  if (body.action === "set-active") {
    if (body.id === admin.id) return NextResponse.json({ error: "Cannot deactivate your own account" }, { status: 400 });
    const rows = await query<UserRow>("UPDATE catalogue_users SET active = $2 WHERE id = $1 RETURNING id, email, name, company, role, active, created_at", [body.id, body.active === true]);
    if (!rows.length) return NextResponse.json({ error: "Account not found" }, { status: 404 });
    if (!body.active) await query("DELETE FROM catalogue_sessions WHERE user_id = $1", [body.id]);
    return NextResponse.json({ user: rows[0] });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
