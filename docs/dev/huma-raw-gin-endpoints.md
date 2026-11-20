# Contrat HTTP avec Huma et Gin

Les entrées et sorties des routes JSON sont des types Go déclarés à côté du handler. Le handler renvoie un résultat métier et l’erreur brute. `humares.Wrap` traduit le résultat et génère l’enveloppe HTTP. `route` enregistre l’opération et la posture commune à OpenAPI et à Gin.

Les routes de protocole ou de ressources brutes restent dans les groupes Gin : SSE, WebSocket, multipart, fichiers, captcha, OAuth, MCP et découverte. Pour un résultat JSON via Gin, réutiliser `res.Execute`. Après une modification du contrat, lancer `just openapi`. L’instance sert `/api/docs` et `/api/openapi.json`.
