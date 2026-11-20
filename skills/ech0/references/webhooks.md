# Webhooks

```sh
ech0 webhook list --json
ech0 webhook create --name integration --url https://example.org/hook --is-active
ech0 webhook test --id <identifiant>
```

La gestion des webhooks exige des droits administratifs. Vérifier la signature et l’identifiant de l’événement chez le destinataire. Après confirmation, lancer `ech0 webhook delete --id <identifiant> --yes`.
