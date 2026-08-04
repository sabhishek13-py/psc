"use server";

import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { createAdminSession, destroyAdminSession } from "@/lib/session";

export type AdminLoginState = { error?: string } | undefined;

function passwordsMatch(input: string, expected: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function adminLogin(_prevState: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "Admin login is not configured. Set ADMIN_PASSWORD." };
  }

  if (!password || !passwordsMatch(password, expected)) {
    return { error: "Incorrect password." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function adminLogout() {
  await destroyAdminSession();
  redirect("/admin/login");
}
