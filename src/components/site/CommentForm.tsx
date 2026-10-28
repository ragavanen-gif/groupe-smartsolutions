"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Star, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function CommentForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const author = String(fd.get("author") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!author || !message) {
      setError("Merci d'indiquer votre nom et votre commentaire.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    const supabase = createClient();
    const { error } = await supabase.from("project_comments").insert({
      project_id: projectId,
      author: author.slice(0, 120),
      message: message.slice(0, 2000),
      rating: rating || null,
    });
    if (error) {
      setError(
        error.message.includes("project_comments")
          ? "Les avis ne sont pas encore activés (table manquante). Lancez le script SQL fourni."
          : error.message
      );
      setStatus("error");
      return;
    }
    setStatus("sent");
    router.refresh();
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-plum/10 bg-white p-8 text-center shadow-card">
        <CheckCircle2 className="text-pink" size={40} />
        <h3 className="mt-4 font-heading text-xl font-bold text-plum-900">Merci pour votre avis !</h3>
        <p className="mt-2 text-sm text-plum-700/80">Votre commentaire a bien été publié.</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-plum/10 bg-white p-7 shadow-card">
      <h3 className="font-heading text-lg font-bold text-plum-900">Laisser un commentaire</h3>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-5">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
          Votre note (optionnel)
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n === rating ? 0 : n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
              className="p-0.5"
            >
              <Star
                size={24}
                className={(hover || rating) >= n ? "fill-pink text-pink" : "text-plum-200"}
              />
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
          Votre nom
        </span>
        <input name="author" required className={inp} placeholder="Jean Dupont" />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
          Votre commentaire
        </span>
        <textarea name="message" required rows={4} className={`${inp} resize-none`} placeholder="Partagez votre expérience…" />
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">{error}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            Publier mon avis <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}

const inp =
  "w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25";
