# Configuration et réglages

`internal/config` charge une seule fois les paramètres requis au démarrage, dont le port, la connexion SQL, les secrets et les journaux. Le KV conserve les réglages modifiables depuis l’administration. `setting.Seed` initialise les entrées manquantes. Les lectures directes de réglages doivent éviter de créer une dépendance circulaire avec `SettingService`.

Lors d’un changement de stockage, les instances chaudes relisent la configuration S3 persistée. Le gestionnaire de stockage reste partagé par le graphe Wire. Les réglages WebAuthn et OAuth doivent être vérifiés sur l’origine publique choisie. Voir les [variables d’environnement](../usage/configuration.md).
