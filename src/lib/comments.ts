import { createClient } from "@supabase/supabase-js";

export type ProjectComment = {
  id: string;
  project_id: string;
  author: string;
  message: string;
  rating: number | null;
  created_at: string;
};

export type RatingStat = { count: number; avg: number | null };

/** Statistiques d'avis (nombre + note moyenne) par projet. */
export async function getRatingStats(): Promise<Record<string, RatingStat>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await sb.from("project_comments").select("project_id, rating").limit(5000);
    const acc: Record<string, { count: number; sum: number; rated: number }> = {};
    for (const row of (data as { project_id: string; rating: number | null }[]) ?? []) {
      const s = (acc[row.project_id] ??= { count: 0, sum: 0, rated: 0 });
      s.count += 1;
      if (row.rating != null) {
        s.sum += row.rating;
        s.rated += 1;
      }
    }
    const out: Record<string, RatingStat> = {};
    for (const [id, s] of Object.entries(acc)) {
      out[id] = { count: s.count, avg: s.rated ? s.sum / s.rated : null };
    }
    return out;
  } catch {
    return {};
  }
}

/** Lecture publique des avis d'un projet. */
export async function getComments(projectId: string): Promise<ProjectComment[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await sb
      .from("project_comments")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(200);
    return (data as ProjectComment[]) ?? [];
  } catch {
    return [];
  }
}
