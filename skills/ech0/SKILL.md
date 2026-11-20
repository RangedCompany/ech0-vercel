---
name: ech0
description: 'Utiliser le client CLI ech0 pour consulter et publier des Echo, envoyer des fichiers, modérer les commentaires, gérer les tags, les connexions et les webhooks, et se connecter avec un profil ou par autorisation d’appareil.'
---

# Client Ech0

Consulter `ech0 help --json` et `ech0 help <commande> --json` pour connaître les opérations prises en charge par l’instance et leurs arguments. Ajouter `--json` pour traiter la sortie dans un script. Les codes de sortie sont 0 (succès), 1 (serveur ou réseau) et 2 (utilisation).

```sh
ech0 info
ech0 auth status
ech0 auth login --server https://ech0.example.org --device
ech0 echo list --page 1 --page-size 20 --json
ech0 echo get --id <identifiant> --json
ech0 echo create --content "Première publication"
ech0 file upload --file ./photo.png --json
ech0 echo create --content "Photo" --file-id <identifiant>
ech0 tag list --json
ech0 connect health --json
ech0 webhook list --json
```

Confirmer une suppression avec la personne qui a demandé l’opération avant d’utiliser `--yes` dans une commande non interactive. Vérifier les permissions des jetons selon l’audience et l’opération demandée.

- [Connexion et profils](references/auth.md)
- [Publications et fichiers](references/echo.md)
- [Commentaires](references/comments.md)
- [Tags](references/tags.md), [connexions](references/connect.md) et [webhooks](references/webhooks.md)
- [Arguments et sorties](references/operations.md)
