# Utiliser Ech0

## Publier

Le premier compte créé devient propriétaire. Depuis l’éditeur, rédiger un texte en Markdown, ajouter des tags et joindre des médias si nécessaire. Vérifier la visibilité avant de publier. Un Echo privé reste réservé aux comptes autorisés. Le fil public et son flux RSS présentent les publications publiques.

## Régler le profil et le site

Les préférences du compte gèrent les informations du profil. Le panneau d’administration gère le nom du site, le logo, l’inscription et les intégrations. Pour préparer un domaine HTTPS ou configurer une passkey, renseigner le domaine RP et les origines autorisées. Voir la [configuration](configuration.md) et le [fonctionnement des sessions](../dev/auth-design.md).

## Commentaires et connexions

Le propriétaire peut activer les commentaires et examiner les messages en attente dans le panneau. Les commentaires publics passent par les contrôles du formulaire. Les intégrations authentifiées disposent d’une route dédiée avec le scope `comment:write`.

L’administration Connect permet d’ajouter l’URL d’une autre instance et de vérifier son état. L’instance distante garde la maîtrise de ses publications publiques.

## Sauvegarder

Le panneau permet de lancer un export natif au format snapshot. Sur Vercel, le travail se poursuit après la fermeture de l’onglet et le téléchargement utilise un lien privé signé. Conserver une copie indépendante des objets du bucket. Utiliser une [Capsule](capsule.md) pour déplacer des publications ou les exporter en Markdown. Voir le [suivi de migration](../VERCEL_MIGRATION.md) pour la restauration et les opérations encore en cours de portage.
