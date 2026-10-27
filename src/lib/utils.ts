import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const site = {
  name: "Smart Solutions",
  tagline: "Groupe de conseil & de solutions digitales",
  email: "contact@groupesmartsolutions.fr",
  domain: "groupesmartsolutions.fr",
  phone: "+33 (0)1 84 80 00 00",
  address: "France",
} as const;

export type Branch = {
  slug: string;
  name: string;
  domain: string;
  /** URL externe du produit (inscription / accès) */
  externalUrl: string;
  /** URL de la page d'administration de l'outil (vide si pas encore dispo) */
  adminUrl: string;
  color: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: readonly string[];
  status: string;
  audience: readonly string[];
  features: readonly { title: string; text: string }[];
};

/** Solutions du groupe */
export const branches: readonly Branch[] = [
  {
    slug: "go-presta",
    name: "GO PRESTA",
    domain: "Événementiel",
    externalUrl: "https://gopresta.fr",
    adminUrl: "https://gopresta.fr/admin",
    color: "#e91e63",
    tagline: "L'événementiel, plus simplement.",
    description:
      "Une marketplace dédiée à l'événementiel pour rechercher et réserver prestataires, salles, matériel et services.",
    longDescription:
      "Une marketplace dédiée à l'événementiel qui permet de rechercher et réserver des prestataires, des salles, du matériel et des services. Pour les professionnels, GO PRESTA permet également de développer leur visibilité, recevoir des réservations et gérer leur activité.",
    tags: ["Marketplace", "Réservation", "Prestataires"],
    status: "En ligne",
    audience: [
      "Organisateurs particuliers & professionnels",
      "Prestataires de l'événementiel",
      "Salles & loueurs de matériel",
    ],
    features: [
      { title: "Rechercher & réserver", text: "Prestataires, salles, matériel et services au même endroit, avec disponibilités en temps réel." },
      { title: "Développer sa visibilité", text: "Les professionnels présentent leur activité et se font trouver par de nouveaux clients." },
      { title: "Recevoir des réservations", text: "Un flux de demandes qualifiées et un paiement sécurisé de bout en bout." },
      { title: "Gérer son activité", text: "Un espace pour piloter ses prestations, son calendrier et ses échanges." },
    ],
  },
  {
    slug: "learneezy",
    name: "Learneezy",
    domain: "Formation",
    externalUrl: "https://learneezy.com",
    adminUrl: "",
    color: "#29abe2",
    tagline: "Apprendre. Transmettre. Évoluer.",
    description:
      "Une plateforme d'apprentissage en ligne pensée pour faciliter la formation et rendre l'éducation plus accessible grâce au digital.",
    longDescription:
      "Une plateforme d'apprentissage en ligne pensée pour faciliter la formation et proposer une expérience éducative accessible grâce au digital. Pour apprendre, transmettre et évoluer, à son rythme.",
    tags: ["E-learning", "Formation", "Digital"],
    status: "En développement",
    audience: [
      "Apprenants & professionnels",
      "Formateurs & organismes de formation",
      "Entreprises formant leurs équipes",
    ],
    features: [
      { title: "Apprendre en ligne", text: "Des contenus accessibles partout, pour se former à son rythme." },
      { title: "Transmettre son savoir", text: "Des outils pour créer et diffuser ses propres formations." },
      { title: "Une expérience digitale", text: "Une pédagogie repensée pour le numérique, simple et engageante." },
      { title: "Évoluer durablement", text: "Un suivi de progression pour ancrer les compétences dans le temps." },
    ],
  },
] as const;

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  Domaines d'expertise du groupe                                     */
/* ------------------------------------------------------------------ */

export type Expertise = {
  slug: string;
  /** clé d'icône (mappée vers lucide dans les composants) */
  icon: string;
  title: string;
  short: string;
  needs: readonly string[];
  href: string;
  /** accent (palette de marque) */
  color: string;
};

export const expertises: readonly Expertise[] = [
  {
    slug: "business",
    icon: "rocket",
    title: "Business & Entrepreneuriat",
    short:
      "Créer, structurer et développer votre activité, avec une stratégie claire et des actions concrètes.",
    needs: [
      "Lancer ou cadrer un projet d'entreprise",
      "Structurer et développer son activité",
      "Clarifier sa stratégie commerciale",
    ],
    href: "/accompagnements",
    color: "#e91e63",
  },
  {
    slug: "coaching-formation",
    icon: "graduation",
    title: "Coaching & Formation",
    short:
      "Monter en compétences et avancer, grâce au coaching, aux formations et à des méthodes transmissibles.",
    needs: [
      "Être accompagné individuellement",
      "Se former ou former ses équipes",
      "Gagner en méthode et en confiance",
    ],
    href: "/accompagnements",
    color: "#29abe2",
  },
  {
    slug: "acquisition-patrimoine",
    icon: "home",
    title: "Acquisition & Patrimoine",
    short:
      "Clarifier et préparer un projet d'acquisition, étape par étape, avec prudence et méthode.",
    needs: [
      "Clarifier ses objectifs",
      "Préparer un projet d'acquisition",
      "Être orienté au bon moment",
    ],
    href: "/acquisition-patrimoine",
    color: "#5f2b60",
  },
  {
    slug: "digital",
    icon: "code",
    title: "Digital & Solutions technologiques",
    short:
      "Concevoir les outils qui vous font avancer : sites, applications, automatisations et solutions sur mesure.",
    needs: [
      "Créer un site ou une application",
      "Automatiser et gagner du temps",
      "Doter son activité d'outils métier",
    ],
    href: "/solutions-digitales",
    color: "#34c24a",
  },
];

/** Les 4 parcours « de quelle solution ai-je besoin ? » */
export const parcours = [
  {
    icon: "rocket",
    label: "Je veux créer ou développer mon activité",
    href: "/accompagnements",
    color: "#e91e63",
  },
  {
    icon: "graduation",
    label: "Je veux me former ou être accompagné",
    href: "/accompagnements",
    color: "#29abe2",
  },
  {
    icon: "home",
    label: "Je veux préparer un projet d'acquisition",
    href: "/acquisition-patrimoine",
    color: "#5f2b60",
  },
  {
    icon: "code",
    label: "Je veux créer un outil ou une solution numérique",
    href: "/solutions-digitales",
    color: "#34c24a",
  },
] as const;

/** Navigation principale du site */
export const mainNav = [
  { label: "Nos accompagnements", href: "/accompagnements" },
  { label: "Nos solutions", href: "/solutions-digitales" },
  { label: "Notre écosystème", href: "/ecosysteme" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;
