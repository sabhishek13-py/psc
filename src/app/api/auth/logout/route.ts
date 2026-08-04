import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { destroyCustomerSession } from "@/lib/customer-session";

export async function POST(request: NextRequest) {
  await destroyCustomerSession();
  return NextResponse.redirect(new URL("/", request.nextUrl.origin));
}
