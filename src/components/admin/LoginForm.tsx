"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          password: fd.get("password"),
        }),
      });
      if (res.ok) {
        router.replace(next);
        router.refresh();
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Connexion impossible.");
      setStatus("idle");
    } catch {
      setError("Erreur réseau. Merci de réessayer.");
      setStatus("idle");
    }
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl border border-plum/10 bg-white p-8 shadow-card"
    >
      <div className="brand-bar mx-auto mb-6 h-1.5 w-16 rounded-full" />
      <h1 className="text-center font-heading text-2xl font-bold text-plum-900">
        Espace administration
      </h1>
      <p className="mt-2 text-center text-sm text-plum-700/70">
        Connectez-vous pour piloter vos outils.
      </p>

      <div className="mt-7 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className={inputCls}
            placeholder="admin@groupesmartsolutions.fr"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
            Mot de passe
          </span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
            placeholder="••••••••"
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Connexion…
          </>
        ) : (
          <>
            Se connecter <LogIn size={16} />
          </>
        )}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25";
