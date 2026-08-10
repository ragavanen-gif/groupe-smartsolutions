import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { branches, getBranch } from "@/lib/utils";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return { title: "Branche introuvable" };
  return {
    title: `${branch.name} — ${branch.tagline}`,
    description: branch.description,
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const accent = branch.color;

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="relative isolate bg-ivory pt-32 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(90% 70% at 85% -10%, ${accent}1f, transparent 55%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            href="/#solutions"
            className="inline-flex items-center gap-2 text-sm text-plum-700 transition-colors hover:text-pink"
          >
            <ArrowLeft size={16} /> Toutes les solutions
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ color: accent, backgroundColor: `${accent}1f` }}
              >
                {branch.domain} · {branch.status}
              </span>
              <h1 className="mt-6 font-heading text-4xl font-extrabold text-plum-900 sm:text-6xl">
                {branch.name}
              </h1>
              <p className="mt-3 font-heading text-xl font-medium" style={{ color: accent }}>
                {branch.tagline}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum-700/85">
                {branch.longDescription}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={branch.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: accent }}
                >
                  S'inscrire sur {branch.name} <ArrowUpRight size={17} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/20 px-7 py-3.5 text-sm font-semibold text-plum-800 transition-colors hover:border-pink hover:text-pink"
                >
                  En savoir plus
                </Link>
              </div>
              <p className="mt-3 text-xs text-plum-400">
                L'inscription se fait sur le site {branch.name}.
              </p>
            </div>

            {/* Pour qui */}
            <aside className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white p-7 shadow-card">
              <span
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: accent }}
              />
              <div className="flex items-center gap-2" style={{ color: accent }}>
                <Users size={18} />
                <span className="eyebrow">Pour qui&nbsp;?</span>
              </div>
              <ul className="mt-5 space-y-4">
                {branch.audience.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-plum-700">
                    <span
                      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: `${accent}22`, color: accent }}
                    >
                      <Check size={12} />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-plum/10 pt-6">
                {branch.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-plum/15 px-3 py-1 text-xs text-plum-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-pink-dark">Fonctionnalités</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
            Ce que {branch.name} vous apporte
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {branch.features.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-plum/10 bg-white p-7 shadow-card"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl text-plum-900"
                  style={{ backgroundColor: `${accent}26` }}
                >
                  <Check size={18} style={{ color: accent }} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-plum-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">
                  {f.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[32px] px-8 py-16 text-center text-white sm:px-16"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.2),transparent_55%)]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                Prêt à essayer {branch.name}&nbsp;?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Créez votre compte sur {branch.name} et lancez-vous en quelques
                minutes.
              </p>
              <a
                href={branch.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{ color: accent }}
              >
                S'inscrire sur {branch.name} <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
