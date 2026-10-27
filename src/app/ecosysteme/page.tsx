import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { branches } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notre écosystème — GO PRESTA, Learneezy & Groupe Smart Solutions",
  description:
    "Groupe Smart Solutions est la marque mère d'un écosystème de solutions spécialisées : GO PRESTA (événementiel) et Learneezy (formation), avec d'autres à venir.",
};

export default function EcosystemePage() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />
      <PageHero
        eyebrow="Notre écosystème"
        title="Une marque mère, des solutions spécialisées"
        subtitle="Groupe Smart Solutions porte la vision et la cohérence de l'ensemble. Chaque marque spécialisée répond à un besoin précis, avec son propre savoir-faire."
      />

      <section className="bg-ivory pb-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="space-y-6">
            {branches.map((b) => (
              <article
                key={b.slug}
                className="relative grid gap-6 overflow-hidden rounded-3xl border border-plum/10 bg-white p-8 shadow-card lg:grid-cols-[1.4fr_1fr] lg:p-10"
              >
                <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: b.color }} />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="eyebrow" style={{ color: b.color }}>{b.domain}</p>
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-semibold"
                      style={{ color: b.color, backgroundColor: `${b.color}1f` }}
                    >
                      {b.status}
                    </span>
                  </div>
                  <h2 className="mt-2 font-heading text-3xl font-extrabold text-plum-900">{b.name}</h2>
                  <p className="mt-1 font-heading text-lg font-medium text-plum-700">{b.tagline}</p>
                  <p className="mt-4 max-w-xl leading-relaxed text-plum-700/85">{b.longDescription}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {b.tags.map((t) => (
                      <span key={t} className="rounded-full border border-plum/15 px-3 py-1 text-xs text-plum-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={`/branches/${b.slug}`}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                      style={{ backgroundColor: b.color }}
                    >
                      En savoir plus <ArrowRight size={15} />
                    </Link>
                    <a
                      href={b.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-plum/20 px-6 py-3 text-sm font-semibold text-plum-800 transition-colors hover:border-pink hover:text-pink"
                    >
                      Site officiel <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>

                <aside className="rounded-2xl border border-plum/10 bg-ivory p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">Pour qui</p>
                  <ul className="mt-4 space-y-3 text-sm text-plum-700">
                    {b.audience.map((a) => (
                      <li key={a} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </aside>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-plum-400">
            De nouvelles marques spécialisées pourront rejoindre l&apos;écosystème
            lorsqu&apos;elles répondront à un besoin réel.
          </p>
        </div>
      </section>

      <CtaBand
        title="Une question sur l'une de nos marques ?"
        text="Dites-nous ce que vous cherchez : on vous oriente vers la bonne solution."
        cta="Nous contacter"
      />
      <Footer />
    </main>
  );
}
