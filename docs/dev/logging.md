# Journaux

Les services utilisent le wrapper zap `internal/util/log` et un champ `module`. Ajouter le contexte nécessaire au diagnostic sans exposer de secrets ou de données de session. En mode natif, les paramètres `ECH0_LOG_*` contrôlent notamment la console, les fichiers et la rotation.

En mode Vercel, les journaux administratifs sont conservés dans libSQL avec rétention. SSE et WebSocket lisent le même curseur. Une instance arrêtée avant de vider son tampon peut perdre les dernières lignes. Voir la [configuration](../usage/configuration.md).
