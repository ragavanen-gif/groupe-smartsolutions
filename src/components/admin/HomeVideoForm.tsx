"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Video } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type State = "loading" | "ready" | "saving" | "saved" | "error";

export function HomeVideoForm() {
  const supabase = createClient();
  const [state, setState] = useState<State>("loading");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "home_video")
        .maybeSingle();
      if (error) {
        setError(
          "La table « site_settings » n'existe pas encore. Exécute le script SQL fourni dans Supabase, puis recharge cette page."
        );
        setState("error");
        return;
      }
      const v = (data?.value ?? {}) as { url?: string; enabled?: boolean; title?: string };
      setUrl(v.url || "");
      setTitle(v.title || "");
      setEnabled(Boolean(v.enabled));
      setState("ready");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setState("saving");
    setError("");
    const { error } = await supabase.from("site_settings").upsert({
      key: "home_video",
      value: { url: url.trim(), title: title.trim(), enabled },
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setError(error.message);
      setState("error");
      return;
    }
    setState("saved");
    setTimeout(() => setState("ready"), 2500);
  }

  if (state === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-3xl border border-plum/10 bg-white p-8 text-plum-700">
        <Loader2 size={18} className="animate-spin" /> Chargement…
      </div>
    );
  }

  return (
    <form onSubmit={save} className="rounded-3xl border border-plum/10 bg-white p-7 shadow-card sm:p-9">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-pink/10 text-pink-dark">
          <Video size={20} />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-plum-900">Vidéo d&apos;accueil</h2>
          <p className="text-sm text-plum-700/70">Affichée en haut de la page d&apos;accueil.</p>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
            Lien de la vidéo (YouTube, Vimeo ou fichier .mp4)
          </span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={inputCls}
            placeholder="https://www.youtube.com/watch?v=…"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
            Titre au-dessus de la vidéo (optionnel)
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCls}
            placeholder="Ex. Découvrez Groupe Smart Solutions"
          />
        </label>

        <label className="flex items-center gap-3 text-sm font-medium text-plum-800">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 accent-pink"
          />
          Afficher la vidéo sur le site
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "saving"}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {state === "saving" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Enregistrement…
          </>
        ) : state === "saved" ? (
          "Enregistré ✓"
        ) : (
          <>
            Enregistrer <Save size={16} />
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-plum-400">
        La modification apparaît sur le site public en moins d&apos;une minute.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25";
