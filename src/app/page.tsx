import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  HeartHandshake,
  Hammer,
  Compass,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { branches } from "@/lib/utils";

const approach = [
  {
    icon: Search,
    color: "#e91e63",
    title: "Comprendre",
    text: "Chaque situation est différente. Nous prenons le temps d'identifier votre problématique, vos objectifs et vos contraintes.",
  },
  {
    icon: HeartHandshake,
    color: "#29abe2",
    title: "Accompagner",
    text: "Nous vous aidons à structurer votre réflexion et à mettre en place des actions concrètes.",
  },
  {
    icon: Hammer,
    color: "#34c24a",
    title: "Construire",
    text: "Lorsqu'une problématique est partagée par tout un secteur, nous allons plus loin en développant des outils capables d'y répondre.",
  },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />

      {/* ---------------- HERO ---------------- */}
      <section className="relative isolate flex min-h-[90vh] items-center bg-ivory">
        {/* décor coloré léger */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(233,30,99,0.14),transparent_70%)]" />
          <div className="absolute right-40 top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(41,171,226,0.12),transparent_70%)]" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(52,194,74,0.10),transparent_70%)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 pt-32 pb-20 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink/25 bg-pink/10 px-4 py-1.5 text-xs font-semibold text-pink-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-pink" />
              Accompagnement · Conseil · Solutions digitales
            </span>

            <h1 className="mt-7 font-heading text-4xl font-extrabold leading-[1.05] text-plum-900 sm:text-6xl lg:text-[3.9rem]">
              Nous transformons les
              <br />
              <span className="text-gradient-pink">problématiques</span> en
              <br />
              solutions.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-plum-700/85">
              Chaque activité rencontre ses propres défis. Chez{" "}
              <strong className="text-plum-900">Smart Solutions</strong>, notre
              mission est de comprendre ces problématiques, d'accompagner celles
              et ceux qui les rencontrent et de construire des solutions
              concrètes pour leur permettre d'avancer.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#groupe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Découvrir Smart Solutions <ArrowRight size={17} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/20 px-7 py-3.5 text-sm font-semibold text-plum-800 transition-colors hover:border-pink hover:text-pink"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Carte écosystème (claire) */}
          <div className="relative hidden lg:block">
            <div className="animate-floaty rounded-[26px] border border-plum/10 bg-white p-6 shadow-soft">
              <div className="brand-bar h-1.5 w-16 rounded-full" />
              <p className="eyebrow mt-4 text-plum-400">Notre écosystème</p>
              <div className="mt-4 space-y-4">
                {branches.map((b) => (
                  <div
                    key={b.name}
                    className="rounded-2xl border border-plum/10 bg-ivory p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-lg font-bold text-plum-900">
                        {b.name}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold"
                        style={{ color: b.color, backgroundColor: `${b.color}1f` }}
                      >
                        {b.domain}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-plum-700/80">
                      {b.tagline}
                    </p>
                  </div>
                ))}
                <p className="px-1 pt-1 text-sm text-plum-400">
                  … et de nouvelles solutions à venir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- UNE PROBLÉMATIQUE, UNE SOLUTION ---------------- */}
      <section id="groupe" className="border-t border-plum/5 bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow text-pink-dark">Le groupe</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
                Une problématique.
                <br />
                Une solution adaptée.
              </h2>
              <div className="brand-bar mt-6 h-1.5 w-24 rounded-full" />
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-plum-700/85">
              <p>
                Smart Solutions accompagne les particuliers, entrepreneurs,
                professionnels et organisations dans les problématiques qu'ils
                rencontrent au quotidien.
              </p>
              <p>
                Notre rôle ne consiste pas à proposer une réponse toute faite.{" "}
                <strong className="text-plum-900">
                  Nous commençons par comprendre.
                </strong>
              </p>
              <p>
                Nous analysons la situation, identifions les blocages et
                recherchons la solution la plus adaptée :{" "}
                <span className="font-medium text-plum-900">
                  conseil, accompagnement, méthode ou outil digital.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- NOTRE APPROCHE ---------------- */}
      <section id="approche" className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-pink-dark">Notre approche</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              Comprendre, accompagner, construire
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {approach.map((a, i) => (
              <article
                key={a.title}
                className="relative overflow-hidden rounded-2xl border border-plum/10 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: a.color }}
                />
                <span className="font-heading text-5xl font-extrabold text-plum/10">
                  0{i + 1}
                </span>
                <div
                  className="-mt-6 grid h-12 w-12 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: a.color }}
                >
                  <a.icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-plum-900">
                  {a.title}
                </h3>
                <p className="mt-2 leading-relaxed text-plum-700/80">{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SOLUTIONS ---------------- */}
      <section id="solutions" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-pink-dark">Nos solutions</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              Des solutions nées de besoins réels
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-plum-700/85">
              Smart Solutions développe progressivement un écosystème de
              solutions spécialisées. Aujourd'hui, nous intervenons notamment
              dans deux univers&nbsp;: l'événementiel et la formation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {branches.map((b) => (
              <Link
                key={b.name}
                href={`/branches/${b.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-plum/10 bg-ivory p-8 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: b.color }}
                />
                <span
                  className="absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ color: b.color, backgroundColor: `${b.color}1f` }}
                >
                  {b.status}
                </span>
                <p className="eyebrow" style={{ color: b.color }}>
                  {b.domain}
                </p>
                <h3 className="mt-2 font-heading text-3xl font-extrabold text-plum-900">
                  {b.name}
                </h3>
                <p className="mt-1 font-heading text-lg font-medium text-plum-700">
                  {b.tagline}
                </p>
                <p className="mt-4 max-w-md leading-relaxed text-plum-700/80">
                  {b.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-plum/15 bg-white px-3 py-1 text-xs text-plum-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                    style={{ color: b.color }}
                  >
                    Découvrir {b.name} <ArrowUpRight size={16} />
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-plum-400">
                    Une solution Smart Solutions
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ET DEMAIN ---------------- */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="eyebrow text-pink-dark">Et demain&nbsp;?</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
            GO PRESTA et Learneezy ne sont qu'un début.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-plum-700/85">
            Smart Solutions a vocation à identifier de nouvelles problématiques
            et à développer progressivement de nouvelles réponses dans différents
            secteurs.
          </p>
          <blockquote className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-plum/10 bg-white p-8 shadow-card">
            <div className="brand-bar absolute inset-x-0 top-0 h-1.5" />
            <Compass className="mx-auto text-pink" size={28} />
            <p className="mt-4 font-heading text-xl font-semibold text-plum-900 sm:text-2xl">
              Créer un écosystème dans lequel chaque problématique peut trouver
              sa solution.
            </p>
            <footer className="mt-3 text-sm uppercase tracking-[0.18em] text-plum-400">
              Notre vision
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ---------------- CTA FINAL ---------------- */}
      <section className="bg-ivory pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-pink to-pink-dark px-8 py-16 text-center text-white sm:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="relative mx-auto max-w-2xl">
              <MessageCircle className="mx-auto" size={32} />
              <h2 className="mt-5 font-heading text-3xl font-bold sm:text-4xl">
                Vous avez une problématique&nbsp;?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Vous n'avez pas besoin de savoir exactement de quel service vous
                avez besoin. Parlez-nous simplement de votre situation — nous
                chercherons ensemble la solution la plus adaptée.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-pink-dark shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Parler de mon projet <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
