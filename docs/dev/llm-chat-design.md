# Copilot et recherche

Le service Copilot prépare le contexte de conversation, injecte les outils de recherche et de synthèse et diffuse le résultat via SSE. Les outils de recherche combinent le modèle d’embedding et les filtres d’accès du demandeur. Le mode natif s’appuie sur sqlite-vec et le portage utilise une distance L2 exacte dans libSQL.

En mode distribué, les confirmations utilisateur sont associées au propriétaire de la demande et consommées par une écriture conditionnelle. Tester la reprise de flux, l’annulation et les réponses à travers deux instances. Voir la [boucle d’outils](agent-toolcall-design.md) et le [suivi Vercel](../VERCEL_MIGRATION.md).
