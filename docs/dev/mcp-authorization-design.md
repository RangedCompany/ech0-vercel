# Autorisation MCP

`internal/mcp` associe chaque outil ou ressource à un scope lors de son enregistrement. Le dispatch vérifie les droits avant l’appel aux services métier. Le résultat de la découverte et les opérations autorisées dépendent du jeton. Conserver ce contrôle au même endroit lors de l’ajout d’un outil.

Le serveur OAuth `internal/service/oauthserver` délègue l’émission au paquet `access` et réutilise `authz`. La fiche publique `/mcp/server-card` décrit comment joindre le serveur. Le [guide MCP](../usage/mcp-usage.md) décrit la configuration du client.
