import { createHash, randomBytes } from "node:crypto";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { query } from "./db";
import type { Locale, Role } from "./types";

const cookieName = "plastex_partner_session";
const sessionDays = 14;

export type CatalogueUser = { id: string; email: string; name: string; company: string; role: Role; active: boolean };
const sha = (value: string) => createHash("sha256").update(value).digest("hex");

export async function currentUser(): Promise<CatalogueUser | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const rows = await query<CatalogueUser>(
    `SELECT u.id, u.email, u.name, u.company, u.role, u.active FROM catalogue_sessions s
     JOIN catalogue_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now() AND u.active = true`, [sha(token)]);
  return rows[0] || null;
}

export async function requireUser(locale: Locale, role?: Role): Promise<CatalogueUser> {
  const user = await currentUser();
  if (!user) redirect(`${locale === "fr" ? "" : `/${locale}`}/catalogue/login/`);
  if (role && user.role !== role) redirect(`${locale === "fr" ? "" : `/${locale}`}/catalogue/`);
  return user;
}

export function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function signIn(email: string, password: string, request: NextRequest): Promise<boolean> {
  const normalized = email.trim().toLowerCase().slice(0, 320);
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const key = sha(`${ip}:${normalized}`);
  const attempts = await query<{ count: string }>(
    "SELECT count(*)::text AS count FROM catalogue_login_attempts WHERE ip_hash = $1 AND occurred_at > now() - interval '15 minutes'", [key]);
  if (Number(attempts[0]?.count || 0) >= 6) return false;
  const users = await query<CatalogueUser & { password_hash: string }>(
    "SELECT id, email, name, company, role, active, password_hash FROM catalogue_users WHERE email = $1", [normalized]);
  const user = users[0];
  const valid = !!user?.active && await compare(password, user.password_hash);
  if (!valid) {
    await query("INSERT INTO catalogue_login_attempts(ip_hash) VALUES ($1)", [key]);
    return false;
  }
  await query("DELETE FROM catalogue_login_attempts WHERE ip_hash = $1", [key]);
  const token = randomBytes(32).toString("hex");
  await query("INSERT INTO catalogue_sessions(token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '14 days')", [sha(token), user.id]);
  (await cookies()).set(cookieName, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
    path: "/", maxAge: sessionDays * 24 * 60 * 60,
  });
  return true;
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (token) await query("DELETE FROM catalogue_sessions WHERE token_hash = $1", [sha(token)]);
  jar.delete(cookieName);
}
