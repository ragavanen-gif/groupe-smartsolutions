import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { site } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Smart Solutions.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalShell title="Mentions légales" updatedAt="août 2026">
      <p>
        Les présentes mentions légales s'appliquent au site accessible à
        l'adresse <strong>{site.domain}</strong>.
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>Raison sociale : <strong>[RAISON SOCIALE]</strong></li>
        <li>Forme juridique : [SAS / SARL / …]</li>
        <li>Capital social : [MONTANT] €</li>
        <li>Siège social : [ADRESSE COMPLÈTE]</li>
        <li>RCS : [VILLE] [NUMÉRO]</li>
        <li>SIRET : [NUMÉRO SIRET]</li>
        <li>N° TVA intracommunautaire : [FR XX XXX XXX XXX]</li>
        <li>Directeur de la publication : [NOM DU RESPONSABLE]</li>
        <li>Contact : <a href={`mailto:${site.email}`}>{site.email}</a></li>
      </ul>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave
        #4133, Walnut, CA 91789, États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
        <br />
        <em>[À adapter si l'hébergeur diffère.]</em>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments du site (textes, visuels, logo, marque « Smart
        Solutions », charte graphique) est protégé par le droit de la propriété
        intellectuelle. Toute reproduction ou représentation, totale ou
        partielle, sans autorisation écrite préalable est interdite.
      </p>

      <h2>Marques et solutions</h2>
      <p>
        Les solutions <strong>GO PRESTA</strong> et <strong>Learneezy</strong>{" "}
        sont éditées par le groupe. Les liens vers ces plateformes renvoient
        vers des sites tiers disposant de leurs propres conditions
        d'utilisation.
      </p>

      <h2>Responsabilité</h2>
      <p>
        L'éditeur s'efforce d'assurer l'exactitude des informations diffusées
        sur le site mais ne saurait être tenu responsable des erreurs,
        omissions ou d'une indisponibilité temporaire du service.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site, écrivez à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
