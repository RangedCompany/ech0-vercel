# Site documentaire

Ce site React Router affiche les guides français directement depuis les fichiers Markdown du dépôt. Les modifier dans `docs/` ou à la racine.

```sh
pnpm -C site install --frozen-lockfile
pnpm -C site dev
pnpm -C site build
```

Le résultat statique est produit dans `site/build/client`. L’hébergement doit renvoyer la page SPA pour les routes documentaires.
