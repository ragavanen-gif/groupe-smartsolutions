import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Compass,
  Hammer,
  LifeBuoy,
  Building2,
  Check,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Icon } from "@/components/site/Icon";
import { HomeVideo } from "@/components/site/HomeVideo";
import { branches, expertises, parcours } from "@/lib/utils";

// Rendu dynamique : l'accueil lit toujours la vidéo définie en admin, à jour.
export const dynamic = "force-dynamic";

const approche = [
  { icon: Search, title: "Comprendre", text: "Nous partons de votre besoin réel, de vos objectifs et de vos contraintes." },
  { icon: Compass, title: "Structurer", text: "Nous définissons une stratégie claire et les étapes pour y parvenir." },
  { icon: Hammer, title: "Accompagner", text: "Nous mobilisons les compétences, les ressources et les bons outils." },
  { icon: LifeBuoy, title: "Concrétiser", text: "Nous restons à vos côtés jusqu'à la mise en œuvre des solutions." },
];

const methode = [
  { step: "01", title: "Comprendre le besoin", text: "Un échange pour cerner votre situation, vos ambitions et vos priorités." },
  { step: "02", title: "Définir une stratégie", text: "Un plan adapté à votre contexte, avec des objectifs et un cap clairs." },
  { step: "03", title: "Construire la solution", text: "Accompagnement, méthode ou outil : nous mettons en place ce qui répond au besoin." },
  { step: "04", title: "Accompagner la mise en œuvre", text: "Un suivi pour transformer la décision en résultats concrets." },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />

      {/* ---------------- HERO ---------------- */}
      <section className="relative isolate flex min-h-[90vh] items-center bg-ivory">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(233,30,99,0.14),transparent_70%)]" />
          <div className="absolute right-40 top-48 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(41,171,226,0.10),transparent_70%)]" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(52,194,74,0.08),transparent_70%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-5 pt-32 pb-20 text-center lg:px-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink/25 bg-pink/10 px-4 py-1.5 text-xs font-semibold text-pink-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-pink" />
              Accompagnement · Conseil · Solutions
            </span>

            <h1 className="mx-auto mt-7 max-w-4xl font-heading text-4xl font-extrabold leading-[1.07] text-plum-900 sm:text-6xl">
              Vos ambitions méritent les
              <br className="hidden sm:block" /> bonnes <span className="text-gradient-pink">solutions</span>.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-plum-700/85">
              Entreprendre, développer votre activité, valoriser votre patrimoine
              ou concevoir les outils qui vous feront avancer : nous vous aidons à
              transformer vos projets en réalisations concrètes.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#parcours"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(233,30,99,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Trouver ma solution <ArrowRight size={17} />
              </Link>
              <Link
                href="/#expertises"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/20 px-7 py-3.5 text-sm font-semibold text-plum-800 transition-colors hover:border-pink hover:text-pink"
              >
                Découvrir nos expertises
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- VIDÉO (gérée en admin) ---------------- */}
      <HomeVideo />

      {/* ---------------- PARCOURS ---------------- */}
      <section id="parcours" className="border-t border-plum/5 bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Par où commencer&nbsp;?</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              De quelle solution avez-vous besoin&nbsp;?
            </h2>
            <p className="mt-4 text-plum-700/80">
              Choisissez ce qui vous ressemble, on vous oriente vers le bon
              accompagnement.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {parcours.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="group relative overflow-hidden rounded-2xl border border-plum/10 bg-ivory p-6 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: p.color }} />
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: p.color }}
                >
                  <Icon name={p.icon} size={20} />
                </div>
                <p className="mt-4 font-heading text-base font-bold leading-snug text-plum-900">
                  {p.label}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pink transition-transform group-hover:translate-x-1">
                  Continuer <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LE GROUPE / APPROCHE ---------------- */}
      <section id="groupe" className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Le groupe</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              Un objectif. Plusieurs chemins pour y parvenir.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-plum-700/85">
              Groupe Smart Solutions accompagne les particuliers, les porteurs de
              projets, les entrepreneurs et les entreprises — avec une même
              méthode&nbsp;: comprendre, structurer, accompagner et concrétiser.
            </p>
            <div className="brand-bar mx-auto mt-6 h-1.5 w-24 rounded-full" />
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approche.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-plum/10 bg-white p-7 text-center transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-plum-900 text-white">
                  <a.icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-plum-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EXPERTISES ---------------- */}
      <section id="expertises" className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Nos expertises</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              Quatre domaines, un même écosystème
            </h2>
            <p className="mt-4 text-plum-700/80">
              Chaque domaine répond à un besoin précis. Ensemble, ils couvrent
              votre projet de la réflexion à la réalisation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {expertises.map((e) => (
              <Link
                key={e.slug}
                href={e.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-plum/10 bg-white p-8 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: e.color }} />
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: e.color }}
                >
                  <Icon name={e.icon} size={22} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-plum-900">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{e.short}</p>
                <ul className="mt-5 space-y-2">
                  {e.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-plum-700">
                      <Check size={15} className="mt-0.5 shrink-0" style={{ color: e.color }} /> {n}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pink transition-transform group-hover:translate-x-1">
                  En savoir plus <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MÉTHODE ---------------- */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Notre méthode</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              De l&apos;idée à la réalisation
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methode.map((m) => (
              <div key={m.step} className="relative rounded-2xl border border-plum/10 bg-white p-7">
                <span className="font-heading text-5xl font-extrabold text-plum/10">{m.step}</span>
                <h3 className="-mt-4 font-heading text-lg font-bold text-plum-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-700/80">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ÉCOSYSTÈME ---------------- */}
      <section id="ecosysteme" className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Notre écosystème</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
              Une marque mère, des solutions spécialisées
            </h2>
            <p className="mt-4 text-plum-700/80">
              Groupe Smart Solutions porte la vision d&apos;ensemble. Nos marques
              spécialisées répondent à des besoins précis.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {branches.map((b) => (
              <Link
                key={b.slug}
                href={`/branches/${b.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-plum/10 bg-white p-8 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: b.color }} />
                <span
                  className="absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ color: b.color, backgroundColor: `${b.color}1f` }}
                >
                  {b.status}
                </span>
                <p className="eyebrow" style={{ color: b.color }}>{b.domain}</p>
                <h3 className="mt-2 font-heading text-3xl font-extrabold text-plum-900">{b.name}</h3>
                <p className="mt-1 font-heading text-lg font-medium text-plum-700">{b.tagline}</p>
                <p className="mt-4 max-w-md leading-relaxed text-plum-700/80">{b.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pink transition-transform group-hover:translate-x-1">
                  Découvrir {b.name} <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-plum-400">
            De nouvelles marques spécialisées pourront rejoindre l&apos;écosystème
            selon les besoins.
          </p>
        </div>
      </section>

      {/* ---------------- ENTREPRISES ---------------- */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-plum-900/5 px-4 py-1.5 text-xs font-semibold text-plum-700">
                <Building2 size={15} /> Entreprises &amp; professionnels
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
                Structurez, développez, outillez votre activité
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-plum-700/85">
                Nous accompagnons les entreprises et les professionnels qui veulent
                avancer — avec de la stratégie, des compétences et des outils
                adaptés à leurs enjeux.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-plum-900 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Discutons de vos enjeux <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Développer leur activité",
                "Structurer leur stratégie",
                "Former leurs équipes",
                "Améliorer leurs processus",
                "Concevoir des outils numériques",
                "Gagner du temps au quotidien",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-start gap-3 rounded-2xl border border-plum/10 bg-white p-4 text-sm font-medium text-plum-800"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-pink" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONVERSION ---------------- */}
      <section className="bg-ivory pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-pink to-pink-dark px-8 py-16 text-center text-white sm:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                Parlons de votre projet
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Chaque projet est différent. Présentez-nous votre besoin et nous
                vous aiderons à identifier les solutions adaptées.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-pink-dark shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Présenter mon projet <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
