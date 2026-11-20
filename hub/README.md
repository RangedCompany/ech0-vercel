# Hub

Le Hub est une application Vue qui fusionne les publications publiques de plusieurs instances. Il charge son registre dans `public/hub.json` puis interroge chaque instance depuis le navigateur. Chaque instance doit autoriser l’origine du Hub par CORS et répondre à `/healthz`.

```sh
pnpm -C hub install --frozen-lockfile
pnpm -C hub dev
pnpm -C hub build
```

Cette application a son propre build. Le [déploiement de l’instance Ech0](../DEPLOYMENT.md) ne dépend pas du Hub.
