import { NextRequest, NextResponse } from "next/server";
import { currentUser, sameOrigin, type CatalogueUser } from "./auth";

export async function adminGuard(request: NextRequest, mutation = false): Promise<CatalogueUser | NextResponse> {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Administrator required" }, { status: 403 });
  if (mutation && !sameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  return user;
}

export function isResponse(value: CatalogueUser | NextResponse): value is NextResponse { return value instanceof NextResponse; }
