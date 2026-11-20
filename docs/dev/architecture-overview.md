# Architecture d’Ech0

Ech0 associe une application Vue 3 et une API Go. Vite compile l’interface dans `template/dist` et le paquet `template` l’embarque dans le binaire. `web/` est l’interface de l’instance. Le site documentaire et le Hub sont des applications indépendantes.

| Entrée | Exécution | État durable |
| --- | --- | --- |
| `cmd/ech0` | Cobra, serveur Gin et gestionnaires de travaux dans le même processus | SQLite, sqlite-vec, fichiers locaux ou S3 |
| `cmd/api` | Service Go Vercel réutilisant le graphe Wire et le routeur | libSQL, bucket privé et états de travaux partagés |
| `deployment/queue` | Réveil quotidien et livraison des messages Vercel Queues | Baux et avancement dans libSQL |

## Démarrage et requêtes

En mode natif, `bootstrap` charge la configuration et initialise la journalisation avant Cobra. `di.BuildApp` assemble le graphe et `pkg/app` démarre le gestionnaire de travaux, le planificateur et le serveur. Le registre des événements installe les abonnements puis les retire lors de l’arrêt. En mode Vercel, `cmd/api` lit `PORT` et délègue au service réutilisable décrit dans le [suivi du portage](../VERCEL_MIGRATION.md).

Les routes JSON suivent **middleware → handler → service → repository → base**. Le handler construit un `commonModel.Result[T]`. Huma décrit le contrat et `humares.Wrap` adapte l’enveloppe et les erreurs. Gin conserve les flux SSE et WebSocket, les transferts binaires et les protocoles OAuth et MCP. Les postures d’authentification sous `internal/router` définissent en même temps la sécurité OpenAPI et les middlewares.

- `echo`, `comment`, `file` et `connect` gèrent les publications, les interactions et les médias.
- `user`, `auth`, `access`, `oauthserver` et `setting` gèrent l’identité, les autorisations et les paramètres. Le vocabulaire des scopes vit dans `internal/authz`.
- `embedding` et `copilot` indexent et interrogent les textes. `internal/agent` encapsule les fournisseurs LLM et exécute les outils injectés par Copilot.
- `internal/mcp` est le point d’entrée des clients MCP. Son dispatch valide les scopes avant la délégation aux services.
- `migrator` pilote les imports et exports. `web` sert les ressources Vue et produit côté Go les métadonnées des pages publiques.

## État et effets secondaires

`wire.go` décrit les dépendances et `wire_gen.go` contient la génération. Le suivi des visiteurs, le stockage et la gestion des travaux doivent chacun partager une seule instance par processus. Les réglages durables sont enregistrés dans le KV et les variables d’amorçage sont chargées par `internal/config`.

`internal/event` contient les types d’événements. Busen distribue les événements locaux par type Go. En mode Vercel, les mutations prises en charge écrivent aussi leurs effets dans une outbox transactionnelle et le worker les reprend avec un bail. Les notifications, webhooks, réindexations, statistiques et captures distantes disposent d’un état partagé.

VireFS abstrait les fichiers locaux et le stockage S3. Les fichiers sont adressés par une clé. En mode direct, une réservation privée précède le PUT signé, la finalisation vérifie les octets, puis une transaction publie les métadonnées. L’application garde le contrôle de la visibilité à la lecture.
