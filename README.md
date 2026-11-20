# Ech0 Vercel

Ech0 est un microblog personnel pour publier des notes, des liens et des médias sur un fil que l’on peut suivre par RSS et commenter. Ce fork adapte Ech0, le projet de L1nSn0w, à Vercel et conserve un mode natif pour le développement et l’exploitation locale.

| | Ech0 amont | Ce fork sur Vercel |
| --- | --- | --- |
| Serveur | Processus Go permanent qui embarque Vue | Service Go Vercel qui sert le même frontend et les mêmes routes Gin |
| Base | Fichier SQLite avec sqlite-vec | Base libSQL hébergée sur Turso, avec recherche vectorielle exacte |
| Médias | Disque local ou stockage S3 | Bucket R2 privé, envoi direct vérifié et lecture autorisée par l’application |
| Traitements | Bus et planificateur du processus | Travaux persistés dans libSQL, Vercel Queues et cron de rattrapage |
| Sauvegardes | ZIP produit par le serveur natif | Export web repris par lots, ZIP publié dans R2 avec lien signé |

Le port a été testé localement sur deux processus. La recette hébergée Vercel/Turso/R2, dont les connexions longues et les quotas, reste à faire. Les imports Ech0 et Capsule ainsi que l’export Capsule utilisent encore les traitements natifs.

## Démarrer

- Pour déployer une instance de recette ou migrer des données, suivre le [guide de déploiement](DEPLOYMENT.md) et consulter la [matrice de compatibilité et les résultats des tests](docs/VERCEL_MIGRATION.md).
- Pour travailler avec SQLite en local, suivre le [guide de développement](docs/dev/development.md). Après compilation de Vue et du serveur Go, lancer `ech0 serve` et ouvrir `http://localhost:6277`. Le premier compte devient propriétaire.
- Pour administrer ou intégrer une instance, consulter l’[index de la documentation](docs/README.md), notamment la [configuration](docs/usage/configuration.md) et les guides [MCP](docs/usage/mcp-usage.md) et [webhooks](docs/usage/webhook-usage.md).

Les signalements et contributions sont traités dans le [dépôt du fork](https://github.com/RangedCompany/ech0-vercel). Le code est distribué sous [AGPL-3.0 ou ultérieure](LICENSE). Les crédits et mentions d’origine figurent dans [NOTICE](NOTICE).
