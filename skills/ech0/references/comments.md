# Commentaires

```sh
ech0 comment list --echo-id <identifiant> --json
ech0 comment create --echo-id <identifiant> --content "Merci" --nickname "Lecteur"
ech0 comment panel list --status pending --json
ech0 comment panel status --id <identifiant> --status approved
```

La publication d’intégration utilise `comment:write`. La modération et la suppression exigent les scopes de gestion correspondants, dont `comment:review` et `comment:delete`. Confirmer avant d’utiliser `ech0 comment panel delete --id <identifiant> --yes`.
