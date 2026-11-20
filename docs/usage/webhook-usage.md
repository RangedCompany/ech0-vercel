# Webhooks

Dans l’administration, créer un webhook actif, renseigner l’URL HTTPS du récepteur et définir un secret de signature partagé. Envoyer une livraison de test avant d’activer l’intégration métier. L’API de l’instance décrit les opérations de gestion sous `/api/docs`.

Chaque livraison est un POST JSON. Le corps comporte `topic`, `event_name`, `payload_raw`, `metadata` et `occurred_at`. Les en-têtes transmettent l’événement, son identifiant et un horodatage Unix en secondes (`X-Ech0-Event`, `X-Ech0-Event-ID`, `X-Ech0-Timestamp`). Quand un secret est défini, le récepteur contrôle `X-Ech0-Signature` (HMAC-SHA256). Vérifier le corps brut. Les événements couvrent les publications, utilisateurs, commentaires, médias et snapshots.

Répondre par un statut HTTP 2xx après traitement et dédupliquer avec l’identifiant de l’événement. En mode Vercel, les reprises gardent le même identifiant pour un destinataire. Le filtrage d’egress s’applique aux URL de livraison. Voir la [configuration](configuration.md) et [l’architecture](../dev/architecture-overview.md).
