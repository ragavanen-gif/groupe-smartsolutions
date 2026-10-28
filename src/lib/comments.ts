import { createClient } from "@supabase/supabase-js";

export type ProjectComment = {
  id: string;
  project_id: string;
  author: string;
  message: string;
  rating: number | null;
  created_at: string;
};

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
