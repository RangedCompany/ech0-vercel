# Publier une version

Le déploiement Vercel suit la révision sélectionnée dans le projet. GitHub Actions vérifie chaque push sur `main`.

1. Exécuter `just check`, `go build ./...` et les suites concernées.
2. Mettre à jour `internal/version/version.go` avec `just bump VERSION` depuis un arbre propre. Mettre à jour le [journal](../../CHANGELOG.md).
3. Après revue, enregistrer les changements et créer un tag annoté de même version. Pour construire le binaire natif depuis cette révision, exécuter `pnpm -C web build` puis `just build`.
4. Pour Vercel, préparer le schéma et valider la preview selon le [guide de déploiement](../../DEPLOYMENT.md).

Pour préparer les archives Linux et macOS du client CLI, exécuter `just cli dist VERSION` depuis le tag `cli-vVERSION`. Les archives et le fichier `SHA256SUMS` sont disponibles dans `apps/cli/dist/release/` pour publication manuelle.
