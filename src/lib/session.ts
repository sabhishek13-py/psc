import "server-only";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, createAdminToken, verifyAdminToken } from "@/lib/admin-token";

export { ADMIN_SESSION_COOKIE, verifyAdminToken };

export async function createAdminSession() {
  const { token, expiresAt } = createAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthed() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
