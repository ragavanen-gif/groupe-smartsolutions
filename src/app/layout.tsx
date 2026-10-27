import type { Metadata } from "next";
import { Montserrat, Jost } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://groupesmartsolutions.fr"),
  title: {
    default: "Groupe Smart Solutions — Créer, développer & valoriser vos projets",
    template: "%s · Groupe Smart Solutions",
  },
  description:
    "Groupe Smart Solutions accompagne particuliers et entreprises : création et développement d'entreprise, coaching, formation, acquisition & patrimoine et solutions digitales. GO PRESTA et Learneezy font partie de son écosystème.",
  keywords: [
    "Groupe Smart Solutions",
    "accompagnement entreprise",
    "création d'entreprise",
    "conseil",
    "coaching professionnel",
    "formation",
    "solutions digitales",
    "création de site internet",
    "automatisation",
    "GO PRESTA",
    "Learneezy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Groupe Smart Solutions",
    description:
      "Les solutions pour créer, développer et valoriser votre richesse : accompagnement, conseil, formation et solutions digitales.",
    type: "website",
    locale: "fr_FR",
    url: "https://groupesmartsolutions.fr",
    siteName: "Groupe Smart Solutions",
  },
  icons: {
    icon: "/logo-mark.png",
  },
};

export const viewport = {
  themeColor: "#faf7fb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
