import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createSession, ADMIN_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

/** Comparaison à temps constant (via SHA-256 pour éviter la fuite de longueur). */
function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { error: "L'espace admin n'est pas encore configuré (variables d'environnement manquantes)." },
      { status: 503 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = (body.password || "").trim();

  const ok =
    email.length > 0 &&
    password.length > 0 &&
    safeEqual(email, adminEmail.trim().toLowerCase()) &&
    safeEqual(password, adminPassword.trim());

  if (!ok) {
    return NextResponse.json(
      { error: "Email ou mot de passe incorrect." },
      { status: 401 }
    );
  }

  const token = await createSession(email);
  if (!token) {
    return NextResponse.json({ error: "Erreur de session." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
