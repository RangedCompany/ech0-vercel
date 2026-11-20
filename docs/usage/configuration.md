# Configuration

Le serveur lit dans l’ordre l’environnement du processus, `.env` dans le répertoire de travail, puis les valeurs par défaut. Après un changement d’environnement, redémarrer le processus. Les valeurs enregistrées via l’administration prennent le relais pour les réglages que `setting.Seed` initialise une seule fois. Pour WebAuthn, renseigner aussi les origines explicites utilisées par le portage.

| Variable | Rôle |
| --- | --- |
| `PORT` | Port du service Vercel |
| `ECH0_SERVER_HOST`, `ECH0_SERVER_PORT`, `ECH0_SERVER_MODE` | Écoute native, port 6277 par défaut, et mode Gin |
| `ECH0_DB_TYPE`, `ECH0_DB_PATH` | Moteur `sqlite` ou `libsql`. Chemin natif par défaut `data/ech0.db` |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | URL libSQL et jeton Turso |
| `JWT_SECRET` | Secret stable commun à toutes les instances. `ECH0_JWT_SECRET` est accepté comme alias |
| `CRON_SECRET` | Secret partagé entre le service de file et le service Go |
| `ECH0_SETTING_SERVER_URL`, `ECH0_AUTH_WEBAUTHN_RP_ID`, `ECH0_AUTH_WEBAUTHN_ORIGINS` | URL publique, domaine RP et origines séparées par des virgules |
| `ECH0_OBJECT_ENABLED`, `ECH0_UPLOAD_VERIFIED_DIRECT` | Active le stockage objet et le protocole d’envoi vérifié |
| `ECH0_S3_*` | Fournisseur, identifiants, endpoint, bucket, région, TLS et style de chemin |
| `ECH0_STORAGE_DATA_ROOT` | Racine des fichiers locaux ou espace de travail temporaire |
| `ECH0_LOG_*`, `ECH0_EVENT_*`, `ECH0_AGENT_*` | Journalisation, paramètres du bus natif et limites de la boucle d’agent |

Les [valeurs de recette](../../.env.example) correspondent au [déploiement sur Vercel](../../DEPLOYMENT.md). Le fichier [config.go](../../internal/config/config.go) contient la liste exhaustive et les valeurs par défaut. Les secrets restent côté serveur. Toute valeur qui commence par `VITE_` peut être incorporée au frontend.
