import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCustomerSession } from "@/lib/customer-session";
import GoogleLogo from "@/components/icons/GoogleLogo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  if (await getCustomerSession()) {
    redirect(next || "/");
  }

  const googleHref = `/api/auth/google${next ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <Image src="/logo.png" alt="PSComputers" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
          <span className="font-display text-[15px] tracking-tight text-bone">PSComputers</span>
        </Link>

        <div className="rounded-2xl border border-line bg-ink-raised/40 p-8 text-center">
          <h1 className="font-display text-2xl text-bone mb-2">Sign in</h1>
          <p className="text-sm text-bone-faint mb-8">
            Use your Google account to track orders, save your wishlist, and check repair status.
          </p>

          {error && (
            <p className="text-[13px] text-amber-soft mb-4">
              Couldn&apos;t sign you in. Please try again.
            </p>
          )}

          <a
            href={googleHref}
            className="w-full inline-flex items-center justify-center gap-3 rounded-lg border border-line bg-bone text-ink font-medium text-sm py-2.5 px-4 hover:bg-white transition-colors"
          >
            <GoogleLogo className="h-[18px] w-[18px]" />
            Continue with Google
          </a>

          <p className="text-[11px] text-bone-faint mt-6 leading-relaxed">
            By continuing, you agree to PSComputers&apos; Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
