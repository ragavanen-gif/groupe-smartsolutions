"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { EcoItem } from "@/lib/utils";

type Comment = {
  id: string;
  project_id: string;
  author: string;
  message: string;
  rating: number | null;
  created_at: string;
};

export function CommentsAdmin() {
  const supabase = createClient();
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const dateFmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" });

  useEffect(() => {
    (async () => {
      const [{ data: cs, error: ce }, { data: eco }] = await Promise.all([
        supabase.from("project_comments").select("*").order("created_at", { ascending: false }).limit(300),
        supabase.from("site_settings").select("value").eq("key", "ecosystem").maybeSingle(),
      ]);
      if (ce) {
        setError(
          "La table « project_comments » n'existe pas encore. Lancez le script SQL fourni dans Supabase."
        );
        setState("error");
        return;
      }
      const v = eco?.value as { projects?: EcoItem[]; partners?: EcoItem[] } | undefined;
      const map: Record<string, string> = {};
      [...(v?.projects ?? []), ...(v?.partners ?? [])].forEach((it) => (map[it.id] = it.name));
      setNames(map);
      setComments((cs as Comment[]) ?? []);
      setState("ready");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function remove(id: string) {
    const prev = comments;
    setComments((c) => c.filter((x) => x.id !== id));
    const { error } = await supabase.from("project_comments").delete().eq("id", id);
    if (error) {
      setComments(prev);
      setError(error.message);
    }
  }

  if (state === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-3xl border border-plum/10 bg-white p-8 text-plum-700">
        <Loader2 size={18} className="animate-spin" /> Chargement…
      </div>
    );
  }

  if (state === "error") {
    return <p className="rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">{error}</p>;
  }

  if (comments.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-plum/15 bg-white p-6 text-sm text-plum-700/70">
        Aucun avis pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">{error}</p>}
      {comments.map((c) => (
        <article key={c.id} className="rounded-2xl border border-plum/10 bg-white p-5 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-plum-900">{c.author}</span>
                {c.rating ? (
                  <span className="inline-flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={13} className={n <= (c.rating || 0) ? "fill-pink text-pink" : "text-plum-200"} />
                    ))}
                  </span>
                ) : null}
              </div>
              <Link
                href={`/projet/${c.project_id}`}
                target="_blank"
                className="mt-0.5 inline-flex items-center gap-1 text-xs text-pink-dark hover:text-pink"
              >
                {names[c.project_id] || c.project_id} <ExternalLink size={11} />
              </Link>
            </div>
            <button
              onClick={() => remove(c.id)}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-pink-dark hover:bg-pink/10"
            >
              <Trash2 size={14} /> Supprimer
            </button>
          </div>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-plum-700/85">{c.message}</p>
          <p className="mt-2 text-xs text-plum-400">{dateFmt.format(new Date(c.created_at))}</p>
        </article>
      ))}
    </div>
  );
}
