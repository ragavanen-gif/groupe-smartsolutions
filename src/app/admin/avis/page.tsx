import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { CommentsAdmin } from "@/components/admin/CommentsAdmin";

export const metadata: Metadata = {
  title: "Avis — Administration",
  robots: { index: false, follow: false },
};

export default function AdminAvisPage() {
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

      <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-plum-700 transition-colors hover:text-pink"
        >
          <ArrowLeft size={16} /> Retour au tableau de bord
        </Link>

        <h1 className="mt-6 font-heading text-3xl font-bold text-plum-900">
          Avis reçus
        </h1>
        <p className="mt-2 text-plum-700/80">
          Les commentaires laissés par les visiteurs sur vos projets. Vous pouvez
          supprimer ceux que vous ne souhaitez pas afficher.
        </p>

        <div className="mt-8">
          <CommentsAdmin />
        </div>
      </div>
    </main>
  );
}
