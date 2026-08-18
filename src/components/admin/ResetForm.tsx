"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ResetForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setStatus("sending");
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setStatus("idle");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl border border-plum/10 bg-white p-8 shadow-card"
    >
      <div className="brand-bar mx-auto mb-6 h-1.5 w-16 rounded-full" />
      <h1 className="text-center font-heading text-2xl font-bold text-plum-900">
        Nouveau mot de passe
      </h1>
      <p className="mt-2 text-center text-sm text-plum-700/70">
        Choisis un nouveau mot de passe pour ton compte.
      </p>

      <div className="mt-7 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
            Nouveau mot de passe
          </span>
          <input
            name="password"
            type="password"
            required
            autoComplete="new-password"
            className={inputCls}
            placeholder="Au moins 8 caractères"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
            Confirmer
          </span>
          <input
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
            className={inputCls}
            placeholder="Répète le mot de passe"
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
            <Loader2 size={16} className="animate-spin" /> Enregistrement…
          </>
        ) : (
          <>
            Enregistrer <KeyRound size={16} />
          </>
        )}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25";
