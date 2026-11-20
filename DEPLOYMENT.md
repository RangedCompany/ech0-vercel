# Déployer Ech0 sur Vercel

Le projet Vercel utilise la racine du dépôt. [vercel.json](vercel.json) déclare le service Go, le consommateur Node.js de Vercel Queues et le cron quotidien. Ce guide décrit une instance de recette. La [matrice de compatibilité](docs/VERCEL_MIGRATION.md) détaille les vérifications avant une mise en production.

1. Créer une base libSQL de recette dans Turso et générer un jeton limité à cette base. Renseigner les variables Turso et exécuter `ech0 prepare-libsql` avec le binaire natif de la révision à déployer.
2. Créer un bucket R2 privé et une clé S3 dédiée. Dans CORS, autoriser l’origine HTTPS de l’application, les méthodes `PUT`, `GET` et `HEAD` et les en-têtes `Content-Type`, `If-None-Match` et `Range`. Prévoir une règle d’abandon des envois multipart incomplets.
3. Renseigner l’environnement Preview à partir de [l’exemple de configuration](.env.example). Choisir des valeurs distinctes pour `JWT_SECRET` et `CRON_SECRET`. Conserver le secret JWT entre déploiements et fournir `CRON_SECRET` aux deux services. Vercel fournit `ECH0_SERVICE_URL` au consommateur par la liaison interne.
4. Déployer une preview à accès restreint. Vérifier `/healthz`, `/api/openapi.json`, l’interface et une route profonde. Créer le compte propriétaire puis vérifier la connexion après un démarrage à froid, l’envoi et la lecture de médias privés, la livraison par la file et un export web.

## Mettre à jour ou migrer

Avant une mise à jour, sauvegarder la base et le bucket séparément. Tester la nouvelle révision sur une copie et préparer son schéma avec `ech0 prepare-libsql` avant de basculer le trafic. Pour convertir une installation SQLite, transférer les médias et vérifier un retour vers SQLite, suivre la [procédure de migration et de restauration](docs/VERCEL_MIGRATION.md#migrer-une-base-sqlite-et-répéter-une-restauration).

Pour le développement et le mode natif, voir le [démarrage avec SQLite](docs/dev/development.md).
