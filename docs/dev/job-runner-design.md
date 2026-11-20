# Exécution des travaux

Le serveur natif enregistre les exécuteurs de réindexation, d’import et d’export dans `job.Manager`. Injecter un seul gestionnaire et gérer son cycle de vie dans `pkg/app`. L’interface suit l’état du travail et peut demander son annulation.

Le portage persiste les traitements compatibles dans libSQL. Chaque étape vérifie son bail et valide l’avancement avant publication. Une livraison redondante peut rejouer une étape, et une expiration permet à une autre instance de reprendre. Les opérations distantes doivent utiliser des identifiants stables ou des écritures conditionnelles. Voir les [snapshots](snapshot-design.md) et [les traitements durables](../VERCEL_MIGRATION.md#sauvegarde-web-et-traitement-durable).
