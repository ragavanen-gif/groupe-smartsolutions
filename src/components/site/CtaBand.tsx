import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand({
  title = "Parlons de votre projet",
  text = "Chaque projet est différent. Présentez-nous votre besoin et nous vous aiderons à identifier les solutions adaptées.",
  cta = "Présenter mon projet",
  href = "/contact",
}: {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-pink to-pink-dark px-8 py-14 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/90">{text}</p>
            <Link
              href={href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-pink-dark shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {cta} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
