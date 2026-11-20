# Documentation d’Ech0 Vercel

## Installer et exploiter

- [Déploiement sur Vercel](../DEPLOYMENT.md)
- [Migration SQLite vers Turso, restauration et compatibilité](VERCEL_MIGRATION.md)
- [Utiliser Ech0](usage/utiliser-ech0.md)
- [Confidentialité des données de l’instance](legal/confidentialite.md)
- [Variables d’environnement et réglages](usage/configuration.md)
- [Stockage des médias](usage/storage-migration.md) et [format Capsule](usage/capsule.md)
- [MCP](usage/mcp-usage.md), [découverte des agents](usage/agent-discovery.md) et [webhooks](usage/webhook-usage.md)

## Développer

- [Démarrage local](dev/development.md), [architecture](dev/architecture-overview.md) et [tests](dev/testing.md)
- [Authentification](dev/auth-design.md), [scopes des jetons](dev/access-token-scope-design.md) et [autorisation MCP](dev/mcp-authorization-design.md)
- [Routes HTTP](dev/huma-raw-gin-endpoints.md), [configuration interne](dev/config-and-settings-architecture.md), [internationalisation](dev/i18n-contract.md) et [journaux](dev/logging.md)
- [Travaux asynchrones](dev/job-runner-design.md), [snapshots](dev/snapshot-design.md), [conception de Capsule](dev/capsule/capsule-design.md) et [format Capsule](dev/capsule/spec.md)
- [Boucle d’agent](dev/agent-toolcall-design.md), [Copilot](dev/llm-chat-design.md) et [client CLI](dev/cli-design.md)
- [Dates et fuseaux](dev/timezone-design.md), [tableaux d’administration](dev/table-design-standard.md) et [métadonnées de partage](dev/seo-sharing.md)
- [Contribuer](../CONTRIBUTING.md), [publier une version native](dev/release-process.md) et [mentions de licence](legal/agpl-compliance.md)

La base amont du portage est le commit `a9445bb44e762ca9101cae51ea1d31b070114e9c`.
