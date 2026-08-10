import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Smart Solutions : parlez-nous de votre problématique, nous chercherons ensemble la solution la plus adaptée.",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="relative bg-ivory pt-32 pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_-10%,rgba(233,30,99,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-pink-dark">Contact</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-plum-900 sm:text-5xl">
            Parlons de votre projet
          </h1>
          <div className="brand-bar mt-5 h-1.5 w-24 rounded-full" />
          <p className="mt-5 max-w-xl text-lg text-plum-700/85">
            Parlez-nous simplement de votre situation — nous chercherons
            ensemble la solution la plus adaptée. Réponse sous 48h.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-plum-900">
              Nos coordonnées
            </h2>
            <div className="mt-8 space-y-6">
              <ContactRow icon={<Mail size={20} />} label="Email">
                <a href={`mailto:${site.email}`} className="hover:text-pink-dark">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={<MapPin size={20} />} label="Localisation">
                {site.address}
              </ContactRow>
              <ContactRow icon={<Clock size={20} />} label="Délai de réponse">
                Sous 48h ouvrées
              </ContactRow>
            </div>

            <div className="mt-10 rounded-2xl border border-plum/10 bg-white p-6">
              <p className="text-sm leading-relaxed text-plum-700/80">
                Vous cherchez à vous inscrire sur l'une de nos solutions&nbsp;?
                Rendez-vous directement sur la page concernée —
                <strong className="text-plum-900"> GO PRESTA</strong> ou
                <strong className="text-plum-900"> Learneezy</strong>.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pink/10 text-pink-dark">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-[0.16em] text-plum-400">
          {label}
        </div>
        <div className="mt-1 text-plum-900">{children}</div>
      </div>
    </div>
  );
}
