# Publier une version

Les tags `v*` déclenchent le [workflow du binaire natif](../../.github/workflows/release.yml). Il vérifie la version Go, construit Vue et produit des archives Linux amd64 et arm64 dans une publication en brouillon. Le déploiement Vercel suit la révision sélectionnée dans le projet.

1. Exécuter `just check`, `go build ./...` et les suites concernées.
2. Mettre à jour `internal/version/version.go` avec `just bump VERSION` depuis un arbre propre. Mettre à jour le [journal](../../CHANGELOG.md).
3. Après revue, enregistrer les changements et créer un tag annoté de même version. Vérifier les fichiers et les résultats du workflow avant de publier le brouillon.
4. Pour Vercel, préparer le schéma et valider la preview selon le [guide de déploiement](../../DEPLOYMENT.md).

Les tags `cli-v*` sont traités par le [workflow du client CLI](../../.github/workflows/release-cli.yml). Ils produisent des archives Linux et macOS et un fichier `SHA256SUMS` dans la publication GitHub du fork.
