"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ForgotForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();

    setStatus("sending");
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/callback?next=/admin/reset`,
    });

    if (error) {
      setError(error.message);
      setStatus("idle");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="w-full max-w-md rounded-3xl border border-plum/10 bg-white p-8 text-center shadow-card">
        <MailCheck className="mx-auto text-pink" size={44} />
        <h1 className="mt-4 font-heading text-2xl font-bold text-plum-900">
          Email envoyé
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-plum-700/80">
          Si un compte existe avec cette adresse, tu recevras un lien pour
          définir un nouveau mot de passe. Pense à vérifier tes spams.
        </p>
        <Link
          href="/admin/login"
          className="mt-6 inline-block text-sm text-pink-dark hover:text-pink"
        >
          ← Retour à la connexion
        </Link>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl border border-plum/10 bg-white p-8 shadow-card"
    >
      <div className="brand-bar mx-auto mb-6 h-1.5 w-16 rounded-full" />
      <h1 className="text-center font-heading text-2xl font-bold text-plum-900">
        Mot de passe oublié
      </h1>
      <p className="mt-2 text-center text-sm text-plum-700/70">
        Entre ton email, on t&apos;envoie un lien de réinitialisation.
      </p>

      <label className="mt-7 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25"
          placeholder="contact@groupesmartsolutions.fr"
        />
      </label>

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
            <Loader2 size={16} className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            Envoyer le lien <Send size={16} />
          </>
        )}
      </button>

      <div className="mt-5 text-center">
        <Link
          href="/admin/login"
          className="text-sm text-plum-400 transition-colors hover:text-pink"
        >
          ← Retour à la connexion
        </Link>
      </div>
    </form>
  );
}
