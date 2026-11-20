# Snapshots

Le snapshot est une archive ZIP d’instance dont la base peut être relue par le serveur natif. Les médias stockés dans un bucket externe nécessitent leur propre sauvegarde. Le panneau et le CLI natifs permettent de produire l’archive. Un import complet remplace la base de destination : le tester sur une copie.

En mode Vercel, le travail de capture conserve les premières valeurs antérieures des lignes, vérifie le bail à chaque lot, puis publie l’archive par multipart dans le bucket privé. Le téléchargement utilise une redirection vers une URL signée. L’import web durable reste à porter. Voir [la capture, les tests et les limites](../VERCEL_MIGRATION.md#sauvegarde-web-et-traitement-durable).
