import Link from "next/link";
import { Logo } from "@/components/site/Logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-ivory px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_-10%,rgba(233,30,99,0.10),transparent_60%)]" />
      <Link href="/" className="relative mb-8">
        <Logo variant="dark" className="h-12" />
      </Link>
      <div className="relative flex w-full justify-center">{children}</div>
      <Link
        href="/"
        className="relative mt-8 text-sm text-plum-400 transition-colors hover:text-pink"
      >
        ← Retour au site
      </Link>
    </main>
  );
}
