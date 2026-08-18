import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const ADMIN_COOKIE = "ss_admin";
const ALG = "HS256";

function secretKey() {
  const s = process.env.AUTH_SECRET;
  if (!s) return null;
  return new TextEncoder().encode(s);
}

/** Crée un jeton de session signé (valable 7 jours). */
export async function createSession(email: string): Promise<string | null> {
  const key = secretKey();
  if (!key) return null;
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

/** Vérifie un jeton de session ; renvoie le payload ou null. */
export async function verifySession(token?: string): Promise<JWTPayload | null> {
  const key = secretKey();
  if (!token || !key) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}
