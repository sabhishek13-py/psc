"use client";

import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "@/app/actions/admin-auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState<AdminLoginState, FormData>(adminLogin, undefined);

  return (
    <form action={action} className="rounded-2xl border border-line bg-ink-raised/40 p-6 space-y-4">
      <div>
        <label htmlFor="password" className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-sm text-bone outline-none focus:border-teal transition-colors"
        />
      </div>
      {state?.error && <p className="text-[13px] text-amber-soft">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-teal text-ink font-medium text-sm py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
