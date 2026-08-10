import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { site } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles de Smart Solutions.",
};

export default function ConfidentialitePage() {
  return (
    <LegalShell title="Politique de confidentialité" updatedAt="août 2026">
      <p>
        Smart Solutions accorde une grande importance à la protection de vos
        données personnelles. Cette politique explique quelles données nous
        collectons, pourquoi, et quels sont vos droits, conformément au
        Règlement général sur la protection des données (RGPD).
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        <strong>[RAISON SOCIALE]</strong> — [ADRESSE]. Contact :{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nous collectons uniquement les données que vous nous transmettez via le
        formulaire de contact :
      </p>
      <ul>
        <li>nom et prénom&nbsp;;</li>
        <li>adresse email&nbsp;;</li>
        <li>société (facultatif)&nbsp;;</li>
        <li>objet et contenu de votre message.</li>
      </ul>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données sont utilisées uniquement pour répondre à votre demande et
        assurer le suivi de notre échange. La base légale est votre{" "}
        <strong>consentement</strong> et l'intérêt légitime de l'éditeur à
        traiter les demandes qui lui sont adressées.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les messages sont conservés le temps nécessaire au traitement de votre
        demande, puis archivés ou supprimés au maximum sous [12 / 24 / 36] mois.
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées aux seules équipes de Smart Solutions. Elles
        transitent par notre prestataire d'envoi d'emails <strong>Resend</strong>{" "}
        (<a href="https://resend.com" target="_blank" rel="noopener noreferrer">resend.com</a>)
        et notre hébergeur, et ne sont ni vendues ni cédées à des tiers à des
        fins commerciales.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, de
        limitation et d'opposition au traitement de vos données. Pour l'exercer,
        écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez
        également introduire une réclamation auprès de la CNIL
        (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site n'utilise pas de cookies publicitaires ni de traceurs
        marketing. <em>[À mettre à jour si des outils de mesure d'audience sont
        ajoutés ultérieurement.]</em>
      </p>
    </LegalShell>
  );
}
