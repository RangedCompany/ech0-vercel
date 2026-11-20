# Format Capsule v1

Une Capsule correspond à un dossier ou à un ZIP de même structure. `ech0.yaml` et le répertoire `echoes/` sont requis. `comments.yaml` et `files/` sont facultatifs. Les chemins internes sont relatifs, utilisent `/` et ne remontent jamais avec `..`. Les lecteurs ignorent les chemins inconnus.

## Manifeste

`ech0.yaml` est un document YAML avec `schema_version: 1` et `owner.username` obligatoires. `site.site_title` est recommandé. `generator`, `exported_at` (RFC3339), `connects` (liste d’objets avec `url`) et `files` (métadonnées des médias sans publication) sont facultatifs. La configuration de rendu dans `site` reprend les clés JSON de `SystemSetting`. Exclure les secrets, les comptes, les données d’authentification et les options d’exploitation. Signaler le CSS et le JavaScript personnalisés lors de la validation.

## Publications et médias

Chaque publication est un fichier Markdown dans `echoes/<année>/`. Le nom est indicatif. L’en-tête YAML fait foi et exige un `id` UUID unique et une date `created_at` RFC3339. L’export sérialise la date en UTC. Le corps qui suit l’en-tête est le texte original et peut être vide.

Les champs facultatifs sont `username` (l’auteur par défaut est `owner.username`), `tags`, `layout`, `private`, `files` et `extension`. `extension`, s’il existe, contient `type` et `payload`. La liste `files` est dans l’ordre d’affichage. Une entrée média utilise soit une `key` de stockage plate, soit une `url` externe. Une clé ne contient ni `/` ni `..` et son contenu doit exister sous `files/` au chemin donné par le résolveur de stockage. Les champs `id`, `name`, `category`, `content_type`, `size`, `width` et `height` sont facultatifs.

## Commentaires et compatibilité

`comments.yaml` contient `schema_version: 1` et une liste `comments` de projections publiques. Les identifiants `id` et `echo_id`, le `nickname`, le `content` et `created_at` sont requis. Les champs `email`, `ip_hash`, `user_agent` et `user_id` sont interdits.

Un lecteur refuse une version de schéma inconnue, un identifiant de publication dupliqué et des références aux octets manquants. Les imports Capsule fusionnent le contenu de façon idempotente. Les options et commandes figurent dans le [guide Capsule](../../usage/capsule.md). Le modèle et les validations sont maintenus dans `internal/capsule`. Le texte de spécification détaillé de la révision d’origine est accessible avec `git show a9445bb:docs/dev/capsule/spec.md`.
