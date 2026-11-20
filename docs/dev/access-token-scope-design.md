# Scopes et audiences des jetons

`internal/authz` définit le vocabulaire. Chaque jeton associe une identité, un type `typ`, une audience et des scopes. Le serveur vérifie le type et l’audience avant d’appliquer `Allows`. Les scopes séparent lecture, écriture et suppression. La lecture du contenu privé exige `echo:private`. La gestion des jetons et les opérations sensibles de compte passent par une session.

Les intégrations utilisent l’audience prévue par la route, notamment `integration`, `cli` ou `mcp-remote`. Pour les commentaires d’intégration, fournir `comment:write`. Conserver la déclaration de sécurité OpenAPI et la posture d’exécution au même endroit. Voir [authentification](auth-design.md) et [MCP](mcp-authorization-design.md).
