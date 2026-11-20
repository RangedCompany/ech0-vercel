# Stockage et migration des médias

Le mode natif peut stocker les médias sur disque ou via S3. Le mode Vercel utilise un bucket R2 privé et un répertoire temporaire local. Dans ce mode, l’API réserve une clé, le client envoie le fichier avec un PUT signé et l’API vérifie l’objet avant de publier ses métadonnées. Pour une lecture protégée, l’application vérifie les droits avant d’émettre un lien signé.

## Déplacer les objets

1. Faire une copie cohérente de la base et des fichiers. Inventorier les clés, les chemins résolus et les références, y compris les avatars et le logo.
2. Copier les octets vers le stockage cible. Vérifier les tailles et empreintes avant d’appliquer les changements de métadonnées sur la base de recette.
3. Vérifier les anciennes URL et les pièces jointes depuis une session propriétaire et depuis une session anonyme. Tester les images, un téléchargement privé et la lecture vidéo partielle.
4. Suspendre les écritures pour la copie finale. Garder la source jusqu’à validation de la base et des médias.

Les snapshots natifs et distants n’incluent pas les objets qui résident déjà dans un bucket externe. Sauvegarder le bucket à part. Voir la [procédure complète de migration](../VERCEL_MIGRATION.md#migrer-une-base-sqlite-et-répéter-une-restauration) et la [configuration](configuration.md).
