# Connexion et profils

```sh
ech0 auth status
ech0 auth login --server https://ech0.example.org --device
ech0 info --json
ech0 auth logout
```

Le mode appareil demande d’approuver la connexion dans le navigateur. Consulter `ech0 help auth.login --json` pour les autres modes. Choisir l’instance avec `--server` ou le profil avec `--profile`. Dans l’automatisation, donner au jeton l’audience adaptée au CLI et les scopes correspondant aux commandes. Garder les secrets hors des journaux et des exemples.
