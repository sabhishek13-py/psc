import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-ink">
      <div className="w-full max-w-sm">
        <div className="text-[11px] uppercase tracking-wider text-teal font-mono mb-3 text-center">
          Restricted
        </div>
        <h1 className="font-display text-2xl text-bone text-center mb-8">Admin sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}
