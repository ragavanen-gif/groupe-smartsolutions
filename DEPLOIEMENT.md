# Déploiement — Smart Solutions

Site Next.js hébergé **gratuitement sur Vercel**. Domaines gérés chez
**Hostinger** : **`groupesmartsolutions.com`** (adresse principale du site) et
**`groupesmartsolutions.fr`** (redirigé vers le `.com` ; sert aussi pour
l'email `contact@groupesmartsolutions.fr`).

---

## Étape 1 — Mettre le site en ligne sur Vercel

Le plus simple (sans ligne de commande) :

1. Créer un compte gratuit sur **https://vercel.com** (bouton « Sign Up »).
2. Mettre le code sur **GitHub** :
   - Créer un compte GitHub si besoin, puis un dépôt vide (ex. `smart-solutions`).
   - Envoyer le dossier `smart-solutions/` dans ce dépôt.
3. Sur Vercel : **Add New → Project → Import** le dépôt GitHub.
   - Vercel détecte Next.js tout seul : laisser les réglages par défaut, cliquer **Deploy**.
4. En ~2 min, le site est en ligne sur une adresse `xxx.vercel.app`.

> Alternative en ligne de commande (si tu préfères) : dans le dossier `smart-solutions/`,
> lancer `npx vercel` et suivre les questions.

---

## Étape 2 — Brancher le domaine Hostinger

1. Sur Vercel : projet → **Settings → Domains → Add** → saisir
   `groupesmartsolutions.com` (Vercel proposera d'ajouter `www` automatiquement).
   Ajouter aussi `groupesmartsolutions.fr` et le régler en **Redirect → groupesmartsolutions.com**.
2. Vercel affiche les **enregistrements DNS** à créer. En général :

   | Type  | Nom / Hôte | Valeur                     |
   |-------|------------|----------------------------|
   | A     | `@`        | `76.76.21.21`              |
   | CNAME | `www`      | `cname.vercel-dns.com`     |

   > ⚠️ Utiliser **les valeurs exactes affichées par Vercel** (elles peuvent différer).
   > Ces enregistrements sont à créer **pour les deux domaines** (`.com` et `.fr`)
   > dans leurs zones DNS respectives chez Hostinger.

3. Chez **Hostinger** : hPanel → **Domaines → DNS / Nameservers → Gérer les
   enregistrements DNS**. Ajouter les enregistrements ci-dessus (supprimer un
   éventuel ancien enregistrement `A` sur `@` qui pointe ailleurs).
4. Attendre la propagation (quelques minutes à quelques heures). Vercel passe le
   domaine en « Valid » et met le HTTPS automatiquement.

---

## Étape 3 — Activer l'envoi d'emails (Resend)

Tant que ce n'est pas fait, le formulaire ouvre simplement le logiciel de mail du
visiteur (repli automatique). Pour un envoi automatique dans ta boîte :

1. Créer un compte gratuit sur **https://resend.com**.
2. **Domains → Add Domain** → `groupesmartsolutions.fr`.
3. Resend affiche des enregistrements DNS (SPF, DKIM, parfois un MX). Les ajouter
   chez **Hostinger** (même écran DNS qu'à l'étape 2).
4. Une fois le domaine « Verified », créer une **API Key** (API Keys → Create).
5. Sur Vercel : projet → **Settings → Environment Variables**, ajouter :

   | Nom                  | Valeur                                                   |
   |----------------------|----------------------------------------------------------|
   | `RESEND_API_KEY`     | la clé copiée depuis Resend                              |
   | `CONTACT_TO_EMAIL`   | `contact@groupesmartsolutions.fr`                        |
   | `CONTACT_FROM_EMAIL` | `Smart Solutions <contact@groupesmartsolutions.fr>`      |

6. **Redéployer** (Vercel → Deployments → Redeploy) pour prendre en compte les clés.

À partir de là, chaque message du formulaire arrive dans la boîte
`contact@groupesmartsolutions.fr`.

---

## À compléter avant la mise en ligne publique

- Contenu des pages **Mentions légales** et **Confidentialité** (placeholders `[…]`).
- **URLs réelles** de GO PRESTA et Learneezy (dans `src/lib/utils.ts`, champ `externalUrl`).
- Remplacer le logo SVG reconstitué par le **fichier officiel** si besoin (dans `public/`).
