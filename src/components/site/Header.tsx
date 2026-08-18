"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Le groupe", href: "/#groupe" },
  { label: "Notre approche", href: "/#approche" },
  { label: "Nos solutions", href: "/#solutions" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-plum/10 bg-ivory/95 shadow-[0_6px_24px_-16px_rgba(43,15,46,0.5)] backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Accueil Smart Solutions">
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-plum-700 transition-colors hover:text-pink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-700 transition-colors hover:text-pink"
          >
            <LogIn size={16} /> Connexion
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-pink px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(233,30,99,0.5)] transition-transform hover:-translate-y-0.5"
          >
            Nous contacter
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-plum/15 text-plum-900 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-plum/10 bg-white p-4 shadow-card md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-plum-700 hover:bg-sand hover:text-pink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-plum-700 hover:bg-sand hover:text-pink"
            >
              <LogIn size={16} /> Connexion
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-pink px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
