import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { branches, expertises, site } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-plum/10 bg-sand text-plum-700">
      <div className="brand-bar h-1 w-full" />
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-plum-700/80">
              Les solutions pour créer, développer et valoriser votre richesse.
              Accompagnement, conseil et solutions digitales pour concrétiser vos
              projets.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-pink-dark hover:text-pink"
            >
              <Mail size={16} /> {site.email}
            </a>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-plum-900">
              Expertises
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {expertises.map((e) => (
                <li key={e.slug}>
                  <Link href={e.href} className="hover:text-pink">
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-plum-900">
              Écosystème
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {branches.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/branches/${b.slug}`}
                    className="inline-flex items-center gap-1 hover:text-pink"
                  >
                    {b.name} <ArrowUpRight size={14} />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ecosysteme" className="hover:text-pink">
                  Tout l&apos;écosystème
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-plum-900">
              Le groupe
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/a-propos" className="hover:text-pink">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-pink">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-pink">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-pink">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-plum/10 pt-6 text-xs text-plum-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Groupe Smart Solutions. Tous droits réservés.</p>
          <Link href="/admin" className="hover:text-pink">Espace admin</Link>
        </div>
      </div>
    </footer>
  );
}
