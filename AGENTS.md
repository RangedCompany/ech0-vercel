# Travailler sur Ech0 Vercel

Lire d’abord [l’architecture](docs/dev/architecture-overview.md) et, pour les changements côté Vercel, [le suivi du portage](docs/VERCEL_MIGRATION.md).

## Commandes

- `just run` ou `just dev` démarre le serveur sur le port 6277. `just web dev` démarre Vite sur 5173 avec un proxy vers Go.
- `just web build` compile Vue dans `template/dist`, embarqué par Go. `just build` crée le binaire natif.
- `just test`, `just test-race` et `just web test` lancent les suites. Pour un fichier Vue, utiliser `pnpm -C web exec vitest run chemin.spec.ts`.
- Avant une pull request, lancer `just check`, `go build ./...` et `pnpm -C web build`. Les contrôles couvrent les en-têtes SPDX, le formatage, les lints, OpenAPI et l’i18n.
- Après une modification du graphe, lancer `just wire`. Après modification des interfaces couvertes par mockery, lancer `just mocks`. Après modification des routes ou des DTO, lancer `just openapi` et inclure `internal/openapi/openapi.yaml`.

## Conventions de code

- Garder les dépendances dans l’ordre handler → service → repository → base. Utiliser les alias transverses `xxxHandler`, `xxxService`, `xxxRepository`, `xxxModel` et `xxxUtil`.
- Partager une seule instance de `visitor.Tracker`, `storage.Manager` et `job.Manager` depuis la racine Wire.
- Les routes JSON déclarent types et posture Huma. `humares.Wrap` adapte les résultats `commonModel.Result[T]`. SSE, WebSocket, multipart, téléchargements, captcha, OAuth et MCP utilisent les routes Gin brutes. La posture doit garder OpenAPI et l’autorisation à l’exécution synchronisés.
- `POST /api/comments/integration` exige le scope `comment:write` et une audience autorisée. Cette route n’applique pas le captcha ni le jeton de formulaire public.
- Garder `auth`, `authz`, `access` et `oauthserver` distincts. Les droits d’écriture et de suppression sont séparés. `echo:private` régit l’accès au contenu privé. Les opérations de gestion de compte et de jetons exigent une session.
- Les documents de découverte se lisent directement depuis le KV via `coreSetting.System.Get`. `DisableAgentDiscovery` garde sa logique inversée pour les anciens réglages. `/mcp/server-card` reste en dehors du groupe authentifié. Une route inconnue sous `/.well-known/` doit rendre 404.
- Publier les effets transverses via les événements. Sur libSQL, conserver l’écriture transactionnelle de l’outbox et l’idempotence entre exécutions. La règle des types purs dans `internal/event` s’applique aux deux modes.
- Utiliser `internal/util/log` avec le champ `module`, des clés de traduction dans Vue et un en-tête SPDX dans chaque fichier Go, TypeScript et Vue.
- Préserver les garanties d’accès aux médias, les références par clé, les réglages S3 persistés et le format de restauration. Le mode natif et le mode Vercel partagent le routeur et les formats métier.

## Dépôts sur git.rangedace.fr

Réessayer quelques fois en cas d’échec Git intermittent. Diagnostiquer directement les erreurs d’authentification, conflits, arguments invalides et refus d’envoi non fast-forward.
