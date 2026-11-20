# Exporter et importer une Capsule

Une Capsule est un dossier ou un ZIP contenant les publications en Markdown, leurs médias et une projection publique du site. Elle sert à déplacer ou publier le contenu. Une sauvegarde complète de l’instance utilise un snapshot et une copie séparée des objets externes.

Depuis le répertoire de l’instance native :

```sh
ech0 export capsule -o ./capsule
ech0 check ./capsule
ech0 import capsule ./capsule --dry-run
ech0 import capsule ./capsule
ech0 build ./capsule -o ./dist
```

`--zip` produit une archive à l’export. `--include-private` inclut les publications privées et doit aussi être activé à l’import pour les conserver. La Capsule ne contient ni comptes ni secrets d’authentification. Stocker tout export privé dans un emplacement protégé.

Le panneau d’administration natif propose aussi les imports et exports Capsule. Le portage durable de ces opérations pour Vercel reste en cours. Voir la [spécification](../dev/capsule/spec.md) et le [suivi du portage](../VERCEL_MIGRATION.md).
