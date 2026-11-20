# Client HTTP Ech0

Le client se connecte à une instance Ech0 existante et adapte ses commandes au catalogue de l’API. Les archives Linux et macOS contiennent leur propre exécutable. Pour compiler depuis le dépôt, aller dans `apps/cli` et utiliser Bun.

```sh
ech0 auth login --server https://ech0.example.org --device
ech0 info
ech0 echo list --json
ech0 help
```

Le [guide du CLI](https://github.com/RangedCompany/ech0-vercel/blob/main/docs/dev/cli-design.md) décrit son architecture et le transfert direct des fichiers.
