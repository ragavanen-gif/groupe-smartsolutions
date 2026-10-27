export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-ivory pt-32 pb-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_-10%,rgba(233,30,99,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <p className="eyebrow text-pink-dark">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.1] text-plum-900 sm:text-5xl">
          {title}
        </h1>
        <div className="brand-bar mt-5 h-1.5 w-24 rounded-full" />
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-plum-700/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
