import type { Metadata } from "next";
import { Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "À propos — Groupe Smart Solutions",
  description:
    "Groupe Smart Solutions accompagne particuliers et entreprises pour créer, développer et valoriser leurs projets. Découvrez notre vision, notre mission et nos valeurs.",
};

const valeurs = [
  { icon: Compass, title: "Comprendre d'abord", text: "Nous partons toujours de votre besoin réel avant de proposer une solution." },
  { icon: ShieldCheck, title: "Honnêteté & prudence", text: "Pas de promesses irréalistes. Des conseils clairs et mesurés." },
  { icon: Sparkles, title: "Des solutions concrètes", text: "Nous privilégions ce qui produit des résultats tangibles." },
  { icon: HeartHandshake, title: "Un accompagnement durable", text: "Nous restons à vos côtés, de la réflexion à la mise en œuvre." },
];

export default function AProposPage() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />
      <PageHero
        eyebrow="À propos"
        title="Les solutions pour créer, développer et valoriser votre richesse"
        subtitle="Groupe Smart Solutions accompagne les particuliers, les porteurs de projets, les entrepreneurs et les entreprises dans la concrétisation de leurs ambitions."
      />

      <section className="bg-ivory pb-8">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-plum/10 bg-white p-8 shadow-card">
              <h2 className="font-heading text-xl font-bold text-plum-900">Notre vision</h2>
              <p className="mt-3 leading-relaxed text-plum-700/85">
                Construire un écosystème capable d&apos;accompagner chacun, de la
                réflexion initiale jusqu&apos;à la mise en œuvre de son projet —
                selon le besoin et le service concerné.
              </p>
            </div>
            <div className="rounded-3xl border border-plum/10 bg-white p-8 shadow-card">
              <h2 className="font-heading text-xl font-bold text-plum-900">Notre mission</h2>
              <p className="mt-3 leading-relaxed text-plum-700/85">
                Aider nos clients à concrétiser leurs projets en combinant
                stratégie, compétences, accompagnement et solutions concrètes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Nos valeurs</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              Ce qui guide notre travail
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valeurs.map((v) => (
              <div key={v.title} className="rounded-2xl border border-plum/10 bg-white p-7 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-pink/10 text-pink-dark">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-base font-bold text-plum-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="eyebrow text-pink-dark">Notre approche</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
            Orientés vers les solutions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-plum-700/85">
            Comprendre les besoins, définir une stratégie adaptée, fournir les
            compétences et les outils nécessaires, puis accompagner la mise en
            œuvre. Une méthode simple, au service de résultats concrets — pour les
            particuliers comme pour les entreprises.
          </p>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
