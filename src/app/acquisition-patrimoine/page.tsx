import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Target, Calculator, GitCompare, Users, Info } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Acquisition & Patrimoine — clarifier et préparer votre projet",
  description:
    "Clarifiez vos objectifs et préparez votre projet d'acquisition, étape par étape, avec méthode et prudence. Orientation vers des professionnels spécialisés lorsque nécessaire.",
};

const etapes = [
  { icon: Target, title: "Clarifier les objectifs", text: "Mettre au clair ce que vous souhaitez vraiment accomplir et pourquoi." },
  { icon: Calculator, title: "Préparer le budget", text: "Faire le point sur votre situation et votre capacité, en amont." },
  { icon: GitCompare, title: "Analyser des scénarios", text: "Comparer plusieurs options pour éclairer votre décision." },
  { icon: Users, title: "Orienter au bon moment", text: "Vous diriger vers des professionnels spécialisés lorsque c'est nécessaire." },
];

export default function AcquisitionPatrimoinePage() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />
      <PageHero
        eyebrow="Acquisition & Patrimoine"
        title="Préparer sereinement votre projet d'acquisition"
        subtitle="Nous vous aidons à clarifier vos objectifs et à structurer votre réflexion, avec méthode et prudence, avant de vous engager."
      />

      <section className="bg-ivory pb-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((e) => (
              <article key={e.title} className="rounded-3xl border border-plum/10 bg-white p-7 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-plum-900 text-white">
                  <e.icon size={22} />
                </div>
                <h2 className="mt-5 font-heading text-lg font-bold text-plum-900">{e.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{e.text}</p>
              </article>
            ))}
          </div>

          {/* Avertissement de prudence */}
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-plum/15 bg-sand p-7">
            <div className="flex items-center gap-2 text-plum-900">
              <Info size={18} className="text-pink-dark" />
              <h3 className="font-heading text-base font-bold">Notre cadre d&apos;intervention</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-plum-700/85">
              Notre rôle est de vous aider à <strong className="text-plum-900">clarifier
              et préparer</strong> votre projet. Nous ne promettons aucun rendement,
              aucune plus-value ni aucune rentabilité. Nous ne fournissons pas de
              prestations réglementées (conseil en investissement, transaction,
              crédit…) : lorsque votre projet le nécessite, nous vous orientons vers
              des <strong className="text-plum-900">professionnels qualifiés et
              habilités</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Qualification */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="rounded-3xl border border-plum/10 bg-white p-8 text-center shadow-card sm:p-10">
            <p className="eyebrow text-pink-dark">Qualifier votre projet</p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-plum-900 sm:text-3xl">
              Faisons le point sur votre projet
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-plum-700/80">
              Quelques questions nous aident à comprendre votre situation et à voir
              comment nous pouvons vous être utile.
            </p>
            <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-left text-sm text-plum-700">
              {[
                "Quel est votre objectif principal ?",
                "À quelle échéance souhaitez-vous avancer ?",
                "Où en êtes-vous dans votre réflexion ?",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check size={15} className="mt-0.5 shrink-0 text-pink" /> {t}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Qualifier mon projet <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
