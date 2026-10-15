# ScienceLab — plateforme web éducative

Prototype Next.js pour une plateforme de laboratoire virtuel destinée aux 10–16 ans : comptes parent, profils enfants, six expériences simulées, carnet de progression et assistant pédagogique IA.

## Fonctions incluses

- Interface responsive ordinateur/tablette/mobile.
- Inscription et connexion par e-mail/mot de passe via Supabase Auth.
- Profils enfants (prénom/pseudonyme, âge 10–16 ans, avatar).
- Six ateliers interactifs : chimie moléculaire, physique, électronique, informatique, robotique, espace & maths.
- Quiz, points XP, carnet de progression.
- Assistant IA côté serveur, avec consignes pédagogiques adaptées à l’âge et garde-fous de sécurité.
- Schéma SQL et Row Level Security pour que chaque parent n’accède qu’à ses propres profils et données.

## Prérequis

- Node.js 20 ou plus récent
- Un projet Supabase
- Une clé API OpenAI pour activer l’assistant IA

## Démarrage local

1. Décompresser l’archive et ouvrir le dossier dans un terminal.
2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Créer `.env.local` à partir de `.env.example` et renseigner :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - optionnellement `OPENAI_MODEL` (par défaut `gpt-4o-mini`)

4. Dans Supabase, ouvrir **SQL Editor**, exécuter le contenu de `supabase/schema.sql`.
5. Dans Supabase Auth, configurer les URLs locales et de production. Pour les comptes parent, il est recommandé de laisser la confirmation d’e-mail activée en production.
6. Démarrer l’application :

   ```bash
   npm run dev
   ```

7. Ouvrir `http://localhost:3000`.

## Déploiement

Le projet peut être déployé sur Vercel ou une plateforme compatible Next.js. Ajouter les variables d’environnement dans les paramètres du projet de déploiement et configurer les URLs de redirection Supabase pour le domaine final.

## Points importants avant une mise en production

- Le code fourni est un socle fonctionnel à configurer, tester et déployer : aucun compte Supabase ni service IA n’est créé automatiquement par l’archive.
- La clé OpenAI doit rester exclusivement côté serveur (`OPENAI_API_KEY`) et ne jamais être exposée avec un préfixe `NEXT_PUBLIC_`.
- Pour une plateforme utilisée par des mineurs, ajouter avant lancement une politique de confidentialité, les modalités de consentement parental adaptées au pays, une durée de conservation des données, une procédure de suppression/export, une limitation d’usage/coût de l’API et une revue de sécurité.
- Les simulations sont des modèles éducatifs simplifiés et ne remplacent pas les consignes d’un enseignant ou d’un adulte pour des expériences réelles.
- La première version conserve l’historique des expériences et des scores ; l’historique complet des conversations IA n’est pas sauvegardé en base.

## Structure

- `app/page.tsx` : interface, navigation, comptes, profils et expériences
- `app/api/assistant/route.ts` : endpoint serveur de l’assistant IA
- `app/globals.css` : design responsive
- `lib/supabase.ts` : client Supabase
- `supabase/schema.sql` : tables et règles de sécurité
- `.env.example` : variables requises

## PhET simulation integrations

The upgraded lab interface includes embedded PhET HTML5 simulations for:
- Reactants, Products and Leftovers (`reactants-products-and-leftovers`)
- States of Matter (`states-of-matter`)
- Circuit Construction Kit: DC (`circuit-construction-kit-dc`)

These simulations are loaded from PhET's hosted HTML5 pages in an iframe; they are not copied into this repository. An internet connection is required. PhET attribution and licensing terms apply; review the terms for each simulation before redistributing or using them in a commercial offering. If an embed fails on a device or locale, open the simulation directly from https://phet.colorado.edu/en/simulations.

The embedded PhET labs are interactive external simulations. Their internal measurements are not automatically read by ScienceLab; students complete the ScienceLab quiz separately to record mission progress.
