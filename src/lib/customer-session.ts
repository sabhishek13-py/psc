import "server-only";
import { cookies } from "next/headers";
import {
  CUSTOMER_SESSION_COOKIE,
  createCustomerToken,
  verifyCustomerToken,
  type CustomerProfile,
} from "@/lib/customer-token";

export async function createCustomerSession(profile: CustomerProfile) {
  const { token, expiresAt } = createCustomerToken(profile);
  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroyCustomerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_SESSION_COOKIE);
}

export async function getCustomerSession(): Promise<CustomerProfile | null> {
  const cookieStore = await cookies();
  return verifyCustomerToken(cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value);
}
