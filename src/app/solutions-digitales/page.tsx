import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Globe,
  Wrench,
  Workflow,
  Smartphone,
  LayoutDashboard,
  Puzzle,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Solutions digitales — sites, applications & automatisation",
  description:
    "Création de sites internet, d'outils métier, d'applications et de solutions sur mesure. Automatisez vos processus et dotez votre activité des bons outils numériques.",
};

const solutions = [
  { icon: Globe, title: "Sites internet", text: "Sites vitrines et plateformes performantes, pensés pour convertir et évoluer." },
  { icon: Wrench, title: "Outils métier", text: "Des outils taillés pour votre activité, qui simplifient votre quotidien." },
  { icon: Workflow, title: "Automatisation", text: "Supprimez les tâches répétitives et gagnez un temps précieux." },
  { icon: Smartphone, title: "Applications & logiciels", text: "Applications web et logiciels sur mesure, du cadrage à la mise en ligne." },
  { icon: LayoutDashboard, title: "Tableaux de bord", text: "Visualisez vos données clés pour décider plus vite et mieux." },
  { icon: Puzzle, title: "Solutions personnalisées", text: "Un besoin spécifique ? On conçoit la solution qui y répond." },
];

const etapes = [
  { step: "01", title: "Votre besoin", text: "Vous décrivez votre contexte et votre objectif." },
  { step: "02", title: "Cadrage & devis", text: "Nous définissons le périmètre et vous proposons un devis clair." },
  { step: "03", title: "Conception", text: "Nous construisons la solution par itérations." },
  { step: "04", title: "Mise en ligne & suivi", text: "Déploiement, prise en main et évolutions dans le temps." },
];

export default function SolutionsDigitalesPage() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />
      <PageHero
        eyebrow="Solutions digitales"
        title="Les outils numériques qui vous font avancer"
        subtitle="Sites, applications, automatisations, outils métier : nous concevons des solutions digitales sur mesure, utiles et évolutives."
      />

      {/* Catalogue */}
      <section className="bg-ivory pb-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <article
                key={s.title}
                className="rounded-3xl border border-plum/10 bg-white p-8 shadow-card transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green/15 text-plum-900">
                  <s.icon size={22} />
                </div>
                <h2 className="mt-5 font-heading text-lg font-bold text-plum-900">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Déroulé */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Comment ça se passe</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              De votre besoin à la solution en ligne
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((e) => (
              <div key={e.step} className="rounded-2xl border border-plum/10 bg-white p-7">
                <span className="font-heading text-5xl font-extrabold text-plum/10">{e.step}</span>
                <h3 className="-mt-4 font-heading text-lg font-bold text-plum-900">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{e.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-plum/10 bg-white p-8 text-center">
            <h3 className="font-heading text-xl font-bold text-plum-900">
              Décrivez votre projet, recevez un devis
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-plum-700/80">
              Les tarifs dépendent du périmètre de chaque projet. Présentez-nous
              votre besoin et nous vous proposons une estimation adaptée.
            </p>
            <ul className="mx-auto mt-5 flex max-w-md flex-col gap-2 text-left text-sm text-plum-700">
              {["Un interlocuteur dédié", "Un périmètre clair et un devis détaillé", "Des solutions évolutives"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check size={15} className="mt-0.5 shrink-0 text-pink" /> {t}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Demander un devis <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
