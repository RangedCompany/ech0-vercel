# Authentification et sessions

`auth` traite connexion, renouvellement, passkeys, OAuth social et autorisation d’un appareil. `access` émet et valide les jetons d’accès. `authz` fournit les règles de scopes et d’audience. `oauthserver` sert les clients OAuth de MCP.

En mode libSQL, les états éphémères, codes, challenges et révocations doivent rester cohérents entre instances. Une consommation à usage unique est atomique et tient compte de l’expiration. Les tests commencent une opération sur une instance et la terminent sur l’autre. En recette HTTPS, vérifier domaine RP, origines, URI de retour, cookies et rejet du rejeu.

Utiliser les [scopes documentés](access-token-scope-design.md) et les [variables d’origine](../usage/configuration.md).
