# Appel d’outils par le modèle

`internal/agent` définit une abstraction `Provider` et une boucle `agent.Run`. Le fournisseur rassemble les fragments d’appels et émet des événements sémantiques. Le code métier injecte les définitions, fonctions d’exécution et textes localisés. Les outils doivent respecter l’autorisation du demandeur et la limite de tours de la boucle.

Copilot fournit ses outils de recherche et de synthèse. Traduire les événements en SSE dans la couche Copilot et propager l’annulation du contexte. La couche Agent reste indépendante des domaines et des routes. Voir [Copilot](llm-chat-design.md).
