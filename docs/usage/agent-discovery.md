# Découverte des agents

| Ressource | Contenu |
| --- | --- |
| `/llms.txt` | Liens vers le flux, les ressources de découverte et la documentation de l’API |
| `/.well-known/ard.json` | Catalogue qui pointe vers la fiche MCP |
| `/.well-known/ai-catalog.json` | Alias du catalogue |
| `/mcp/server-card` | Transport MCP et informations de connexion |

Ces ressources décrivent l’instance et construisent leurs liens à partir de son origine publique. Le manifeste authentifié `/api/mcp/manifest` reflète les permissions du client. Le réglage de découverte désactive les quatre ressources avec une réponse 404. Vérifier les URL absolues derrière le proxy. Voir le [guide MCP](mcp-usage.md).
