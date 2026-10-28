import { createClient } from "@supabase/supabase-js";
import {
  defaultProjects,
  defaultPartners,
  type Ecosystem,
  type EcoItem,
} from "@/lib/utils";

export type HomeVideo = { url: string; enabled: boolean; title?: string };

function anonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Lecture publique de l'écosystème (projets + partenaires). Repli : valeurs par défaut. */
export async function getEcosystem(): Promise<Ecosystem> {
  const fallback: Ecosystem = { projects: defaultProjects, partners: defaultPartners };
  const sb = anonClient();
  if (!sb) return fallback;
  try {
    const { data } = await sb
      .from("site_settings")
      .select("value")
      .eq("key", "ecosystem")
      .maybeSingle();
    const v = data?.value as Partial<Ecosystem> | undefined;
    if (!v) return fallback;
    const projects = Array.isArray(v.projects) ? (v.projects as EcoItem[]) : fallback.projects;
    const partners = Array.isArray(v.partners) ? (v.partners as EcoItem[]) : fallback.partners;
    return { projects, partners };
  } catch {
    return fallback;
  }
}

/** Retrouve un projet / partenaire par son identifiant (toutes listes confondues). */
export async function getEcoItem(
  id: string
): Promise<{ item: EcoItem; kind: "project" | "partner" } | null> {
  const { projects, partners } = await getEcosystem();
  const p = projects.find((x) => x.id === id);
  if (p) return { item: p, kind: "project" };
  const q = partners.find((x) => x.id === id);
  if (q) return { item: q, kind: "partner" };
  return null;
}

const FALLBACK: HomeVideo = { url: "", enabled: false, title: "" };

/** Lecture publique du réglage de la vidéo d'accueil (clé anon). */
export async function getHomeVideo(): Promise<HomeVideo> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK;
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await sb
      .from("site_settings")
      .select("value")
      .eq("key", "home_video")
      .maybeSingle();
    const v = (data?.value ?? {}) as Partial<HomeVideo>;
    return {
      url: v.url?.trim() || "",
      enabled: Boolean(v.enabled),
      title: v.title || "",
    };
  } catch {
    // table absente ou erreur réseau : on masque simplement la vidéo.
    return FALLBACK;
  }
}

/** Transforme une URL en source lisible (iframe YouTube/Vimeo ou balise video). */
export function getEmbed(raw: string): { type: "iframe" | "video" | null; src: string } {
  const url = (raw || "").trim();
  if (!url) return { type: null, src: "" };

  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { type: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };

  if (/\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(url)) return { type: "video", src: url };

  // Par défaut, on tente un iframe (URL d'intégration déjà prête).
  return { type: "iframe", src: url };
}
