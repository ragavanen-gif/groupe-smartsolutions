import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Star, MessageSquare } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CommentForm } from "@/components/site/CommentForm";
import { getEcoItem } from "@/lib/settings";
import { getComments } from "@/lib/comments";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const found = await getEcoItem(id);
  if (!found) return { title: "Projet introuvable" };
  return {
    title: found.item.name,
    description: found.item.description,
  };
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={15} className={n <= value ? "fill-pink text-pink" : "text-plum-200"} />
      ))}
    </span>
  );
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = await getEcoItem(id);
  if (!found) notFound();

  const { item } = found;
  const comments = await getComments(id);
  const dateFmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });
  const isInternal = item.url?.startsWith("/");

  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />

      {/* En-tête projet */}
      <section className="relative bg-ivory pt-32 pb-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(90% 70% at 85% -10%, ${item.color}1f, transparent 55%)` }}
        />
        <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
          <Link href="/ecosysteme" className="inline-flex items-center gap-2 text-sm text-plum-700 transition-colors hover:text-pink">
            <ArrowLeft size={16} /> Tout l&apos;écosystème
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {item.category && (
              <p className="eyebrow" style={{ color: item.color }}>
                {item.category}
              </p>
            )}
            {item.status && (
              <span
                className="rounded-full px-3 py-0.5 text-xs font-semibold"
                style={{ color: item.color, backgroundColor: `${item.color}1f` }}
              >
                {item.status}
              </span>
            )}
          </div>

          <h1 className="mt-2 font-heading text-4xl font-extrabold text-plum-900 sm:text-5xl">
            {item.name}
          </h1>
          <div className="mt-5 h-1.5 w-24 rounded-full" style={{ backgroundColor: item.color }} />
          {item.description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-plum-700/85">{item.description}</p>
          )}

          {item.url &&
            (isInternal ? (
              <Link
                href={item.url}
                className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: item.color }}
              >
                En savoir plus <ArrowUpRight size={15} />
              </Link>
            ) : (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: item.color }}
              >
                Visiter le site <ArrowUpRight size={15} />
              </a>
            ))}
        </div>
      </section>

      {/* Avis */}
      <section className="bg-ivory pb-24">
        <div className="mx-auto grid max-w-4xl gap-10 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-plum-900">
              <MessageSquare size={20} className="text-pink-dark" />
              <h2 className="font-heading text-xl font-bold">
                Avis {comments.length > 0 && <span className="text-plum-400">({comments.length})</span>}
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {comments.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-plum/15 bg-white p-6 text-sm text-plum-700/70">
                  Aucun avis pour le moment. Soyez le premier à partager votre expérience.
                </p>
              ) : (
                comments.map((c) => (
                  <article key={c.id} className="rounded-2xl border border-plum/10 bg-white p-5 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-heading font-bold text-plum-900">{c.author}</span>
                      {c.rating ? <Stars value={c.rating} /> : null}
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-plum-700/85">{c.message}</p>
                    <p className="mt-3 text-xs text-plum-400">{dateFmt.format(new Date(c.created_at))}</p>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <CommentForm projectId={id} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
