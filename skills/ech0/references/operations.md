# Arguments et sorties

Le contrat de chaque commande est accessible avec `ech0 help <commande> --json`. Les arguments communs incluent `--server`, `--profile`, `--token`, `--lang`, `--json`, `--yaml` et `--no-color`.

Les champs de type tableau de chaînes acceptent une liste séparée par des virgules. Les objets et tableaux d’objets prennent du JSON. Pour envoyer depuis stdin, utiliser `--file -` et transmettre le nom avec `--file-name`. Les booléens sont des commutateurs.

Avec `--json`, les flux écrivent un objet par événement. Les téléchargements acceptent `--output <chemin>` ou `--output -`. Les erreurs passent par stderr. Un 401 invite à renouveler l’authentification et un 403 à vérifier les scopes. Pour actualiser le catalogue local, utiliser `ech0 catalog refresh`.
