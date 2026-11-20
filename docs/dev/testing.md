# Tests

| Cible | Commande |
| --- | --- |
| Go | `go test ./...` |
| Concurrence Go | `just test-race` |
| Vue | `pnpm -C web test:unit` |
| Client CLI | `bun test`, depuis `apps/cli` |
| File Vercel | `node --test scripts/vercel/schedule.test.js` |
| Vérifications avant PR | `just check` |

Le mode natif utilise un compilateur C et un frontend présent sous `template/dist`. Le workflow de compatibilité et les [commandes de recette locale](../VERCEL_MIGRATION.md#reproduire-les-contrôles) couvrent deux processus, un sqld temporaire, un stockage simulé et des passkeys Chromium. La recette utilise une base et un bucket dédiés.
