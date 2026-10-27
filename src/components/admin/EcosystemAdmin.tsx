"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { defaultProjects, defaultPartners, ECO_COLORS, type EcoItem } from "@/lib/utils";

type State = "loading" | "ready" | "saving" | "saved" | "error";

function newItem(): EcoItem {
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `item-${Date.now()}`,
    name: "",
    category: "",
    description: "",
    url: "",
    status: "",
    color: ECO_COLORS[0].value,
  };
}

export function EcosystemAdmin() {
  const supabase = createClient();
  const [state, setState] = useState<State>("loading");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<EcoItem[]>([]);
  const [partners, setPartners] = useState<EcoItem[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "ecosystem")
        .maybeSingle();
      if (error) {
        setError(
          "La table « site_settings » n'existe pas encore. Exécute le script SQL fourni dans Supabase, puis recharge."
        );
        setState("error");
        return;
      }
      const v = data?.value as { projects?: EcoItem[]; partners?: EcoItem[] } | undefined;
      setProjects(Array.isArray(v?.projects) ? v!.projects : defaultProjects);
      setPartners(Array.isArray(v?.partners) ? v!.partners : defaultPartners);
      setState("ready");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(list: "projects" | "partners", id: string, field: keyof EcoItem, value: string) {
    const setter = list === "projects" ? setProjects : setPartners;
    setter((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }
  function remove(list: "projects" | "partners", id: string) {
    const setter = list === "projects" ? setProjects : setPartners;
    setter((prev) => prev.filter((it) => it.id !== id));
  }
  function add(list: "projects" | "partners") {
    const setter = list === "projects" ? setProjects : setPartners;
    setter((prev) => [...prev, newItem()]);
  }

  async function save() {
    setState("saving");
    setError("");
    const clean = (arr: EcoItem[]) =>
      arr
        .filter((it) => it.name.trim())
        .map((it) => ({
          ...it,
          name: it.name.trim(),
          category: it.category.trim(),
          description: it.description.trim(),
          url: it.url?.trim() || "",
          status: it.status?.trim() || "",
        }));
    const { error } = await supabase.from("site_settings").upsert({
      key: "ecosystem",
      value: { projects: clean(projects), partners: clean(partners) },
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
    <div className="space-y-10">
      {error && (
        <p className="rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink-dark">{error}</p>
      )}

      <ListEditor
        title="Mes projets"
        subtitle="Les solutions créées par le groupe. Les 2 premières sont affichées, le reste derrière « Voir plus »."
        items={projects}
        list="projects"
        onUpdate={update}
        onRemove={remove}
        onAdd={add}
      />

      <ListEditor
        title="Partenaires"
        subtitle="Les solutions développées pour vos partenaires. Même affichage « 2 + voir plus »."
        items={partners}
        list="partners"
        onUpdate={update}
        onRemove={remove}
        onAdd={add}
      />

      <div className="sticky bottom-4 flex items-center gap-4 rounded-2xl border border-plum/10 bg-white/95 p-4 shadow-card backdrop-blur">
        <button
          onClick={save}
          disabled={state === "saving"}
          className="inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
        >
          {state === "saving" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Enregistrement…
            </>
          ) : state === "saved" ? (
            "Enregistré ✓"
          ) : (
            <>
              Enregistrer les modifications <Save size={16} />
            </>
          )}
        </button>
        <span className="text-xs text-plum-400">Visible sur le site immédiatement après enregistrement.</span>
      </div>
    </div>
  );
}

function ListEditor({
  title,
  subtitle,
  items,
  list,
  onUpdate,
  onRemove,
  onAdd,
}: {
  title: string;
  subtitle: string;
  items: EcoItem[];
  list: "projects" | "partners";
  onUpdate: (l: "projects" | "partners", id: string, f: keyof EcoItem, v: string) => void;
  onRemove: (l: "projects" | "partners", id: string) => void;
  onAdd: (l: "projects" | "partners") => void;
}) {
  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-plum-900">{title}</h2>
      <p className="mt-1 text-sm text-plum-700/70">{subtitle}</p>

      <div className="mt-5 space-y-4">
        {items.map((it, i) => (
          <div key={it.id} className="rounded-2xl border border-plum/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">
                Bloc {i + 1}
              </span>
              <button
                onClick={() => onRemove(list, it.id)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-pink-dark hover:bg-pink/10"
              >
                <Trash2 size={14} /> Supprimer
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Nom *">
                <input value={it.name} onChange={(e) => onUpdate(list, it.id, "name", e.target.value)} className={inp} placeholder="Ex. GO PRESTA" />
              </Field>
              <Field label="Catégorie">
                <input value={it.category} onChange={(e) => onUpdate(list, it.id, "category", e.target.value)} className={inp} placeholder="Ex. Événementiel" />
              </Field>
            </div>

            <div className="mt-3">
              <Field label="Description">
                <textarea value={it.description} onChange={(e) => onUpdate(list, it.id, "description", e.target.value)} rows={2} className={`${inp} resize-none`} placeholder="Une phrase de présentation." />
              </Field>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="Lien (optionnel)">
                <input value={it.url || ""} onChange={(e) => onUpdate(list, it.id, "url", e.target.value)} className={inp} placeholder="https://… ou /branches/…" />
              </Field>
              <Field label="Badge (optionnel)">
                <input value={it.status || ""} onChange={(e) => onUpdate(list, it.id, "status", e.target.value)} className={inp} placeholder="Ex. En ligne" />
              </Field>
              <Field label="Couleur">
                <select value={it.color} onChange={(e) => onUpdate(list, it.id, "color", e.target.value)} className={inp}>
                  {ECO_COLORS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onAdd(list)}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-plum/25 px-5 py-2.5 text-sm font-semibold text-plum-700 transition-colors hover:border-pink hover:text-pink"
      >
        <Plus size={16} /> Ajouter un bloc
      </button>
    </section>
  );
}

const inp =
  "w-full rounded-xl border border-plum/15 bg-ivory px-3.5 py-2.5 text-sm text-plum-900 outline-none transition-colors placeholder:text-plum-400 focus:border-pink focus:ring-2 focus:ring-pink/25";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.1em] text-plum-400">{label}</span>
      {children}
    </label>
  );
}
