import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { HomeVideoForm } from "@/components/admin/HomeVideoForm";

export const metadata: Metadata = {
  title: "Vidéo d'accueil — Administration",
  robots: { index: false, follow: false },
};

export default function AdminVideoPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3 lg:px-8">
          <Link href="/admin" aria-label="Tableau de bord">
            <Logo variant="dark" className="h-9" />
          </Link>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-plum-700 transition-colors hover:text-pink"
        >
          <ArrowLeft size={16} /> Retour au tableau de bord
        </Link>

        <h1 className="mt-6 font-heading text-3xl font-bold text-plum-900">
          Gérer la vidéo d&apos;accueil
        </h1>
        <p className="mt-2 text-plum-700/80">
          Collez le lien d&apos;une vidéo (YouTube, Vimeo ou fichier .mp4) et
          activez-la pour l&apos;afficher en haut de la page d&apos;accueil.
        </p>

        <div className="mt-8">
          <HomeVideoForm />
        </div>
      </div>
    </main>
  );
}
