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
  title: {
    default: "Smart Solutions — Conseil & solutions digitales",
    template: "%s · Smart Solutions",
  },
  description:
    "Smart Solutions est un groupe qui accompagne ses clients et met à disposition des plateformes clés en main, spécialisé en formation, IA, digital et événementiel. Go Presta et Learnezy sont deux de ses branches.",
  keywords: [
    "Smart Solutions",
    "conseil digital",
    "accompagnement",
    "plateformes SaaS",
    "formation",
    "intelligence artificielle",
    "événementiel",
    "Go Presta",
    "Learnezy",
  ],
  openGraph: {
    title: "Smart Solutions — Conseil & solutions digitales",
    description:
      "Nous transformons les problématiques en solutions : accompagnement, conseil et solutions digitales.",
    type: "website",
    locale: "fr_FR",
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
