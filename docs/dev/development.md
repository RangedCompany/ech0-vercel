# Développement local

Prérequis du dépôt : Go 1.27.4, un compilateur C avec CGO et les en-têtes SQLite, Node.js 26, pnpm 12.16.1 et `just` avec Bash. Sous Windows, utiliser de préférence un environnement Linux pour reproduire les builds et tests du portage.

```sh
pnpm -C web install --frozen-lockfile
pnpm -C web build
export CGO_ENABLED=1
go build -o ./ech0 ./cmd/ech0
./ech0 serve
```

Ouvrir `http://localhost:6277`. Le premier compte devient propriétaire. Pour conserver les sessions entre deux redémarrages, définir `JWT_SECRET` dans l’environnement ou dans le fichier local `.env`. Le [guide des réglages](../usage/configuration.md) décrit les valeurs par défaut.

Pour le rechargement de Vue, lancer `just web dev` dans un second terminal et ouvrir `http://localhost:5173`. Vite transmet les appels API à Go. `just dev` relance le serveur avec Air.

Pour reproduire le mode Vercel avec sqld et deux processus, suivre les [commandes de recette](../VERCEL_MIGRATION.md#reproduire-les-contrôles).
