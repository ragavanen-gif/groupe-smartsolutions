"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/utils";

const projectTypes = [
  "Création d'entreprise",
  "Développement d'activité",
  "Coaching",
  "Formation",
  "Acquisition & patrimoine",
  "Solution digitale (site, app, outil)",
  "Événementiel (GO PRESTA)",
  "Autre / je ne sais pas encore",
];

const budgets = [
  "Je ne sais pas encore",
  "Moins de 1 000 €",
  "1 000 – 5 000 €",
  "5 000 – 15 000 €",
  "Plus de 15 000 €",
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function buildMailto(d: Record<string, string>) {
    const body = [
      `Nom : ${d.name}`,
      `Email : ${d.email}`,
      d.company ? `Société : ${d.company}` : null,
      `Type de projet : ${d.projectType}`,
      d.budget ? `Budget indicatif : ${d.budget}` : null,
      d.availability ? `Disponibilité : ${d.availability}` : null,
      "",
      d.message,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(
      `[Projet] ${d.projectType} — ${d.name}`
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    if (!data.consent) {
      setErrorMsg("Merci d'accepter le traitement de vos données pour continuer.");
      setStatus("error");
      return;
    }

    // "subject" attendu par l'API : on y mappe le type de projet.
    data.subject = data.projectType;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 503) {
        window.location.href = buildMailto(data);
        setStatus("sent");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setErrorMsg(json.error || "L'envoi a échoué. Merci de réessayer.");
      setStatus("error");
    } catch {
      window.location.href = buildMailto(data);
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-card">
        <CheckCircle2 className="text-pink" size={44} />
        <h3 className="mt-5 font-heading text-2xl font-bold text-plum-900">
          Demande envoyée&nbsp;!
        </h3>
        <p className="mt-3 max-w-sm text-plum-700/80">
          Merci pour votre message. Nous revenons vers vous rapidement pour
          échanger sur votre projet.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-plum/10 bg-white p-7 shadow-card sm:p-9"
    >
      {/* honeypot anti-spam (masqué) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet *" htmlFor="name">
          <input id="name" name="name" required className={inputCls} placeholder="Jean Dupont" />
        </Field>
        <Field label="Email *" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputCls} placeholder="jean@exemple.fr" />
        </Field>
        <Field label="Société (optionnel)" htmlFor="company">
          <input id="company" name="company" className={inputCls} placeholder="Votre entreprise" />
        </Field>
        <Field label="Type de projet *" htmlFor="projectType">
          <select id="projectType" name="projectType" className={inputCls} defaultValue={projectTypes[0]}>
            {projectTypes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget indicatif (optionnel)" htmlFor="budget">
          <select id="budget" name="budget" className={inputCls} defaultValue={budgets[0]}>
            {budgets.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Disponibilité souhaitée (optionnel)" htmlFor="availability">
          <input id="availability" name="availability" className={inputCls} placeholder="Ex. en semaine, en journée…" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Décrivez votre besoin *" htmlFor="message">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Parlez-nous de votre projet, de votre situation et de vos objectifs…"
          />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-plum-700/85">
        <input type="checkbox" name="consent" value="oui" className="mt-0.5 h-4 w-4 accent-pink" />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma demande,
          conformément à la{" "}
          <a href="/confidentialite" className="text-pink-dark underline hover:text-pink">
            politique de confidentialité
          </a>
          . Elles ne sont ni revendues ni cédées.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            Envoyer ma demande <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
        {label}
      </span>
      {children}
    </label>
  );
}
