import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { EcosystemLists } from "@/components/site/EcosystemLists";

export const metadata: Metadata = {
  title: "Notre écosystème — GO PRESTA, Learneezy & nos réalisations",
  description:
    "Groupe Smart Solutions est la marque mère d'un écosystème de solutions : nos propres projets (GO PRESTA, Learneezy) et les solutions développées pour nos partenaires.",
};

// Rendu dynamique : reflète les projets/partenaires gérés en admin.
export const dynamic = "force-dynamic";

export default function EcosystemePage() {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />
      <PageHero
        eyebrow="Notre écosystème"
        title="Nos projets et nos réalisations partenaires"
        subtitle="Groupe Smart Solutions porte la vision d'ensemble : nos propres solutions, et celles que nous concevons sur mesure pour nos partenaires."
      />

      <section className="bg-ivory pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <EcosystemLists />
        </div>
      </section>

      <CtaBand
        title="Une question sur l'une de nos solutions ?"
        text="Dites-nous ce que vous cherchez : on vous oriente vers la bonne solution."
        cta="Nous contacter"
      />
      <Footer />
    </main>
  );
}
