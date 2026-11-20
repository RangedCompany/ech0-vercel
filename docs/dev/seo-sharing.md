# Aperçus de partage et indexation

Le handler web produit côté Go les métadonnées publiques, les URL canoniques absolues et les aperçus de partage. Les pages privées conservent les restrictions d’accès et de cache. Vérifier le statut des liens profonds, le HTML sans JavaScript et l’origine derrière le proxy.

Le fallback Vue concerne les routes d’interface. Les chemins `/api`, `/ws`, `/mcp` et `/.well-known` gardent leurs réponses propres. Voir la [découverte des agents](../usage/agent-discovery.md).
