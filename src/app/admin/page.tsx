import Link from "next/link";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { branches } from "@/lib/utils";
import { verifySession, ADMIN_COOKIE } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const store = await cookies();
  const session = await verifySession(store.get(ADMIN_COOKIE)?.value);
  const email = (session?.sub as string) || "admin";

  return (
    <main className="min-h-screen bg-ivory">
      {/* Barre admin */}
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo variant="dark" className="h-9" />
            <span className="hidden rounded-full bg-plum-900 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm text-plum-700 hover:text-pink sm:inline">
              Voir le site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="flex items-center gap-2 text-pink-dark">
          <ShieldCheck size={18} />
          <span className="eyebrow">Poste de pilotage</span>
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold text-plum-900 sm:text-4xl">
          Bonjour 👋
        </h1>
        <p className="mt-2 text-plum-700/80">
          Connecté en tant que <strong className="text-plum-900">{email}</strong>.
          Choisissez un outil pour accéder à son administration.
        </p>

        {/* Cartes outils */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {branches.map((b) => {
            const available = Boolean(b.adminUrl);
            return (
              <article
                key={b.slug}
                className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white p-8 shadow-card"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: b.color }}
                />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="eyebrow" style={{ color: b.color }}>
                      {b.domain}
                    </p>
                    <h2 className="mt-1 font-heading text-2xl font-extrabold text-plum-900">
                      {b.name}
                    </h2>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ color: b.color, backgroundColor: `${b.color}1f` }}
                  >
                    {b.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-plum-700/80">
                  {b.description}
                </p>

                {available ? (
                  <a
                    href={b.adminUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: b.color }}
                  >
                    Ouvrir l&apos;administration <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-plum/15 px-6 py-3 text-sm font-medium text-plum-400">
                    <Clock size={15} /> Administration bientôt disponible
                  </span>
                )}
              </article>
            );
          })}

          {/* Emplacement futur outil */}
          <article className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-plum/20 bg-white/50 p-8 text-center">
            <p className="font-heading text-lg font-bold text-plum-400">
              Nouvel outil
            </p>
            <p className="mt-1 text-sm text-plum-400">
              Vos prochaines solutions apparaîtront ici.
            </p>
          </article>
        </div>

        <p className="mt-10 rounded-2xl border border-plum/10 bg-white p-5 text-sm text-plum-700/70">
          🔐 Pour l&apos;instant, chaque outil conserve sa propre connexion. La
          <strong className="text-plum-900"> connexion unique (SSO)</strong> —
          un seul identifiant pour tout — pourra être ajoutée dans une prochaine
          étape.
        </p>
      </div>
    </main>
  );
}
