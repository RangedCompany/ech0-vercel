# Conception du format Capsule

La Capsule transporte le contenu avec ses identifiants stables et les médias gérés par l’instance. Les fichiers Markdown restent lisibles individuellement et les commentaires sont sérialisés sous forme de projection publique séparée. Les métadonnées d’un fichier non attaché à une publication restent dans le manifeste pour que l’import puisse recréer le fichier, notamment le logo du site.

Le snapshot couvre la restauration de l’instance. La Capsule sert à déplacer le contenu et à construire éventuellement un site statique en lecture seule. Les [règles du format](spec.md) et les [commandes de manipulation](../../usage/capsule.md) sont documentées séparément.
