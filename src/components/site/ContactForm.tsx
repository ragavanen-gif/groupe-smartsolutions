"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/utils";

const subjects = [
  "Décrire une problématique",
  "Conseil & accompagnement",
  "Créer une solution digitale",
  "Question sur GO PRESTA",
  "Question sur Learneezy",
  "Autre",
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function buildMailto(data: Record<string, string>) {
    const body = [
      `Nom : ${data.name}`,
      `Email : ${data.email}`,
      data.company ? `Société : ${data.company}` : null,
      `Sujet : ${data.subject}`,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(
      `[Contact] ${data.subject} — ${data.name}`
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

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

      // Service pas encore configuré → repli : on ouvre le client mail.
      if (res.status === 503) {
        window.location.href = buildMailto(data);
        setStatus("sent");
        return;
      }

      const json = await res.json().catch(() => ({}));
      setErrorMsg(json.error || "L'envoi a échoué. Merci de réessayer.");
      setStatus("error");
    } catch {
      // Erreur réseau → repli mailto également.
      window.location.href = buildMailto(data);
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-plum/10 bg-white p-12 text-center shadow-card">
        <CheckCircle2 className="text-pink" size={44} />
        <h3 className="mt-5 font-heading text-2xl font-bold text-plum-900">
          Message envoyé&nbsp;!
        </h3>
        <p className="mt-3 max-w-sm text-plum-700/80">
          Merci pour votre message. L'équipe Smart Solutions vous recontacte sous
          48h ouvrées.
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
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" htmlFor="name">
          <input id="name" name="name" required className={inputCls} placeholder="Jean Dupont" />
        </Field>
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputCls} placeholder="jean@exemple.fr" />
        </Field>
        <Field label="Société (optionnel)" htmlFor="company">
          <input id="company" name="company" className={inputCls} placeholder="Votre entreprise" />
        </Field>
        <Field label="Sujet" htmlFor="subject">
          <select id="subject" name="subject" className={inputCls} defaultValue={subjects[0]}>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Votre message" htmlFor="message">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Décrivez votre besoin en quelques lignes…"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            Envoyer le message <Send size={16} />
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
