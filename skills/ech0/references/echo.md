# Publications et fichiers

```sh
ech0 echo list --search journal --sort-by reactions --json
ech0 echo list --cursor "" --page-size 50 --json
ech0 echo get --id <identifiant> --json
ech0 echo create --content "Un lien ou une note" --tag carnet
ech0 file upload --file ./photo.png --json
ech0 echo update --id <identifiant> --content "Texte révisé" --file-id <fichier>
ech0 file download --id <fichier> --output ./photo.png
```

Pour paginer par curseur, réutiliser `data.nextCursor`. Utiliser `--tag-ids` pour filtrer par identifiants et `--no-private` pour les seules publications publiques. Les commandes de création et de mise à jour acceptent aussi `--from` et `--edit`. Pour référencer un média externe, utiliser `ech0 file external --url https://example.org/photo.png --category image`.

Avant une mise à jour, lire la publication et vérifier le contrat avec `ech0 help echo.update --json`. Une suppression confirmée utilise `ech0 echo delete --id <identifiant> --yes`.
