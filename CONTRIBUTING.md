# Contribuer

Décrire les anomalies et proposer les changements dans le [dépôt du fork](https://github.com/RangedCompany/ech0-vercel). Suivre la [procédure privée](SECURITY.md) pour les problèmes de sécurité.

1. Partir d’une branche dédiée. Le [guide de développement](docs/dev/development.md) liste les outils requis.
2. Limiter la modification à son objectif et documenter les effets sur la configuration, les données et les utilisateurs.
3. Avant toute pull request, exécuter `just check`, `go build ./...` et `pnpm -C web build`. Pour les tests du portage, voir [la reproduction des contrôles](docs/VERCEL_MIGRATION.md#reproduire-les-contrôles).
4. Régénérer Wire avec `just wire` après une modification du graphe. Régénérer OpenAPI avec `just openapi` après une modification des routes ou des structures et inclure `internal/openapi/openapi.yaml`. Mettre à jour les doublures avec `just mocks` si les interfaces changent.
5. Dans la pull request, indiquer le contexte, les modifications et les validations exécutées. Mettre à jour le [journal des changements](CHANGELOG.md) si la modification concerne l’exploitation.

Les contributions sont distribuées sous [AGPL-3.0 ou ultérieure](LICENSE). Lire la [procédure de publication native](docs/dev/release-process.md) avant de créer un tag.
