# Interface Vue

`web/` contient l’interface de l’instance Ech0. Vite transmet les requêtes de développement au serveur Go sur le port 6277 et écrit le build de production dans `template/dist`.

```sh
pnpm -C web install --frozen-lockfile
pnpm -C web dev
pnpm -C web test:unit
pnpm -C web i18n:check
pnpm -C web build
```

Utiliser les [tokens de thème](src/themes/TOKEN_GUIDE.md) pour les styles et le [contrat de traduction](../docs/dev/i18n-contract.md) pour les textes. Le [guide de développement](../docs/dev/development.md) décrit le démarrage de Go.
