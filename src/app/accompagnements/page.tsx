import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, Rocket, TrendingUp, UserCheck, GraduationCap, ClipboardList } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Nos accompagnements — conseil, coaching & formation",
  description:
    "Accompagnement à la création et au développement d'entreprise, coaching, formation et accompagnement de projets. Groupe Smart Solutions vous aide à avancer, étape par étape.",
};

const offres = [
  {
    icon: Rocket,
    title: "Création d'entreprise",
    public: "Porteurs de projets et futurs entrepreneurs",
    probleme: "Un projet en tête, mais un chemin encore flou pour le lancer.",
    objectifs: ["Cadrer et valider l'idée", "Structurer le projet", "Préparer le lancement"],
  },
  {
    icon: TrendingUp,
    title: "Développement d'activité",
    public: "Entrepreneurs et entreprises en croissance",
    probleme: "Une activité qui doit franchir un cap et gagner en structure.",
    objectifs: ["Clarifier la stratégie", "Développer le commercial", "Optimiser l'organisation"],
  },
  {
    icon: UserCheck,
    title: "Coaching",
    public: "Particuliers, entrepreneurs et équipes",
    probleme: "Le besoin d'un regard extérieur pour décider et avancer.",
    objectifs: ["Prendre du recul", "Structurer sa réflexion", "Passer à l'action"],
  },
  {
    icon: GraduationCap,
    title: "Formation",
    public: "Professionnels et équipes",
    probleme: "Des compétences à acquérir ou à transmettre pour progresser.",
    objectifs: ["Monter en compétences", "Gagner en méthode", "Ancrer les acquis dans la durée"],
  },
  {
    icon: ClipboardList,
    title: "Accompagnement de projets",
    public: "Toute personne ou organisation avec un projet concret",
    probleme: "Un projet à mener de bout en bout, sans s'éparpiller.",
    objectifs: ["Définir le cap", "Piloter les étapes", "Sécuriser la mise en œuvre"],
  },
];

export default function AccompagnementsPage() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />
      <PageHero
        eyebrow="Nos accompagnements"
        title="Un accompagnement adapté à chaque étape de votre projet"
        subtitle="Du premier cadrage jusqu'à la mise en œuvre, nous combinons conseil, coaching et formation pour vous aider à avancer avec méthode."
      />

      <section className="bg-ivory pb-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {offres.map((o) => (
              <article
                key={o.title}
                className="flex flex-col rounded-3xl border border-plum/10 bg-white p-8 shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-pink/10 text-pink-dark">
                    <o.icon size={22} />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-plum-900">{o.title}</h2>
                </div>

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">Pour qui</dt>
                    <dd className="mt-1 text-plum-800">{o.public}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">Le besoin</dt>
                    <dd className="mt-1 text-plum-700/85">{o.probleme}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum-400">Objectifs</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5">
                        {o.objectifs.map((obj) => (
                          <li key={obj} className="flex items-start gap-2 text-plum-700">
                            <Check size={15} className="mt-0.5 shrink-0 text-pink" /> {obj}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:text-pink-dark"
                  >
                    En discuter <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-plum/10 bg-white p-5 text-center text-sm text-plum-700/75">
            Le périmètre, le déroulé et les livrables de chaque accompagnement sont
            définis ensemble, selon votre situation et vos objectifs. Parlons-en
            pour construire la formule la plus adaptée.
          </p>
        </div>
      </section>

      <CtaBand
        title="Un projet à faire avancer ?"
        text="Présentez-nous votre situation : on identifie ensemble le bon accompagnement."
        cta="Prendre contact"
      />

      <Footer />
    </main>
  );
}
