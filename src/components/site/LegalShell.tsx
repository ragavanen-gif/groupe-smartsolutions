import { Header } from "./Header";
import { Footer } from "./Footer";

export function LegalShell({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <main className="overflow-x-hidden bg-ivory">
      <Header />

      <section className="relative bg-ivory pt-32 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_-10%,rgba(233,30,99,0.10),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-plum-900 sm:text-5xl">
            {title}
          </h1>
          <div className="brand-bar mt-5 h-1.5 w-24 rounded-full" />
          <p className="mt-4 text-sm text-plum-400">
            Dernière mise à jour&nbsp;: {updatedAt}
          </p>
        </div>
      </section>

      <section className="bg-ivory pb-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="legal space-y-6 text-plum-700/90">{children}</div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
