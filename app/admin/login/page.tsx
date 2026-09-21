"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-offwhite px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-gold/40 bg-white p-8 shadow-gold"
      >
        <h1 className="font-heading text-xl font-bold text-navy">
          NPF <span className="text-gold-dark">TV</span> Admin
        </h1>
        <p className="mt-1 text-sm text-navy-dark/70">
          Sign in to manage site content.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gold-dark">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-navy/20 bg-white px-3 py-2 text-navy-dark outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gold-dark">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-navy/20 bg-white px-3 py-2 text-navy-dark outline-none focus:border-gold"
            />
          </div>

          {error && (
            <p className="text-sm text-crimson" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-navy py-2 font-heading font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </form>
    </main>
  );
}
