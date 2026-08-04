import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OAUTH_STATE_COOKIE } from "@/lib/customer-token";
import { createCustomerSession } from "@/lib/customer-session";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

function decodeIdToken(idToken: string) {
  const [, payload] = idToken.split(".");
  if (!payload) throw new Error("Malformed id_token");
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const loginErrorUrl = new URL("/login?error=1", request.nextUrl.origin);

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const stateCookieRaw = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (!code || !returnedState || !stateCookieRaw) {
    return NextResponse.redirect(loginErrorUrl);
  }

  let expectedState: string;
  let next = "/";
  try {
    const parsed = JSON.parse(stateCookieRaw);
    expectedState = parsed.state;
    next = typeof parsed.next === "string" ? parsed.next : "/";
  } catch {
    return NextResponse.redirect(loginErrorUrl);
  }

  if (returnedState !== expectedState) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`;

  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const tokenData = await tokenRes.json();
  const idToken = tokenData.id_token as string | undefined;
  if (!idToken) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const claims = decodeIdToken(idToken);
  const validAudience = claims.aud === clientId;
  const validIssuer = claims.iss === "https://accounts.google.com" || claims.iss === "accounts.google.com";
  const notExpired = typeof claims.exp === "number" && Date.now() < claims.exp * 1000;

  if (!validAudience || !validIssuer || !notExpired || !claims.email) {
    return NextResponse.redirect(loginErrorUrl);
  }

  await createCustomerSession({
    sub: claims.sub,
    email: claims.email,
    name: claims.name || claims.email,
    picture: claims.picture,
  });

  const response = NextResponse.redirect(new URL(next, request.nextUrl.origin));
  response.cookies.delete(OAUTH_STATE_COOKIE);
  return response;
}
