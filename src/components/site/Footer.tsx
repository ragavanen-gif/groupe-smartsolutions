import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { branches, site } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-plum/10 bg-sand text-plum-700">
      <div className="brand-bar h-1 w-full" />
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-plum-700/80">
              Nous transformons les problématiques en solutions.
              Accompagnement, conseil et solutions digitales pour permettre à
              chacun d'avancer.
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
              Le groupe
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/#groupe" className="hover:text-pink">Qui sommes-nous</Link></li>
              <li><Link href="/#approche" className="hover:text-pink">Notre approche</Link></li>
              <li><Link href="/#solutions" className="hover:text-pink">Nos solutions</Link></li>
              <li><Link href="/contact" className="hover:text-pink">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-plum-900">
              Nos solutions
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {branches.map((b) => (
                <li key={b.name}>
                  <Link
                    href={`/branches/${b.slug}`}
                    className="inline-flex items-center gap-1 hover:text-pink"
                  >
                    {b.name} <ArrowUpRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-plum/10 pt-6 text-xs text-plum-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Smart Solutions. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-pink">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-pink">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
