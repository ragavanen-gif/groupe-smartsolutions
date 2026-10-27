import type { MetadataRoute } from "next";
import { branches } from "@/lib/utils";

const BASE = "https://groupesmartsolutions.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    "",
    "/accompagnements",
    "/solutions-digitales",
    "/acquisition-patrimoine",
    "/ecosysteme",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const branchPages = branches.map((b) => ({
    url: `${BASE}/branches/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...branchPages];
}
