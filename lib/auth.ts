import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "voi_admin_session";

export function getJwtSecretKey() {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return new TextEncoder().encode(s);
  if (process.env.NODE_ENV === "development") {
    return new TextEncoder().encode("dev-only-session-secret-key-min-32");
  }
  throw new Error("SESSION_SECRET must be set (min 16 characters)");
}

export async function verifyAdminPassword(
  email: string,
  password: string,
  passwordHash: string
) {
  const ok = await bcrypt.compare(password, passwordHash);
  if (!ok) return false;
  const expected = process.env.ADMIN_EMAIL ?? "admin@voi.local";
  return email.toLowerCase() === expected.toLowerCase();
}

export async function createSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecretKey());
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getJwtSecretKey());
    return true;
  } catch {
    return false;
  }
}
