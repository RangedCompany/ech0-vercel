# Client CLI

`apps/cli` contient le client HTTP Bun TypeScript. Il exploite le catalogue de l’instance et le contrat OpenAPI généré pour construire ses commandes. La configuration locale garde l’origine et les jetons des profils. Le device flow autorise la connexion depuis le navigateur.

Pour les envois directs, le client demande une réservation à l’API, envoie les octets à l’URL signée puis finalise sur l’origine API. Les identifiants applicatifs restent réservés à cette origine. Les commandes `serve`, `prepare-libsql`, `convert-libsql` et `backup-libsql` appartiennent au binaire Go. Voir la [recette](../VERCEL_MIGRATION.md#reproduire-les-contrôles).
