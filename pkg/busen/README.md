# Busen

Bus d’événements Go dans le processus. Les producteurs publient un événement typé et les abonnés reçoivent le type Go correspondant. Ech0 déclare ses événements sous `internal/event` et enregistre les abonnés dans `internal/event/bus`.

Les paramètres d’abonnement contrôlent le tampon et la concurrence. Les événements en attente restent soumis au cycle de vie du processus. En mode Vercel, la reprise des effets durables s’appuie sur l’outbox du [portage](../../docs/VERCEL_MIGRATION.md).
