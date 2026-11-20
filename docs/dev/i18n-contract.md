# Contrat de traduction

Dans Vue, utiliser des clés de traduction pour les textes destinés aux utilisateurs. Tenir les catalogues de langues de `web/src/locales/messages` synchronisés. Préserver la négociation de langue et la structure des erreurs API localisées lorsqu’un endpoint évolue.

```sh
just web i18n-check
```

Cette commande vérifie les clés, les chaînes en dur et la pseudo-locale. Elle fait partie de `just check`. La langue de la documentation est indépendante des langues de l’interface.
