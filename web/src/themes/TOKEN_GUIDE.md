# Tokens de thème

`tokens/foundation.scss` définit les primitives, dont les polices, rayons, ombres et animations. Les fichiers `tokens/semantic.*.scss` définissent les couleurs et bordures selon leur rôle. Les fichiers `tokens/component.*.scss` alimentent les composants de base. Les entrées `light.scss` et `dark.scss` assemblent les couches.

Dans une page, utiliser les tokens sémantiques. Dans un composant `Base*`, utiliser les tokens de composant. Garder les couleurs littérales dans les fichiers de tokens. Pour les nouvelles variables, employer les préfixes `--color-`, `--radius-`, `--shadow-`, `--font-family-` et les préfixes des composants correspondants.

Lancer `pnpm -C web token:check` et vérifier l’affichage en thèmes clair et sombre.
