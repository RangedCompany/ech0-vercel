# Connecter un client MCP

Le serveur Streamable HTTP utilise le chemin `/mcp`. Dans le client, renseigner l’URL HTTPS de l’instance suivie de `/mcp`. Utiliser la connexion OAuth si le client la prend en charge ou créer un jeton d’accès d’audience `mcp-remote` dans l’administration. Pour un jeton manuel, le client envoie `Authorization: Bearer …`.

Attribuer les scopes nécessaires aux opérations du client. Les permissions de lecture, de modification et de suppression sont distinctes. Ajouter `echo:private` seulement si le client doit lire du contenu privé. Le manifeste authentifié `GET /api/mcp/manifest` indique les capacités autorisées pour le jeton présenté. Un refus d’accès peut venir du scope, de l’audience, de l’expiration du jeton ou de l’origine du client.

Le [guide de découverte](agent-discovery.md) décrit les ressources publiques. Le [contrat d’autorisation](../dev/mcp-authorization-design.md) explique les contrôles appliqués côté serveur.
