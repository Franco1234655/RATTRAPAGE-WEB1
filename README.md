# RATTRAPAGE-WEB1

Catalogue de cours en ligne — reproduction d'interface web réalisée en **HTML, CSS et JavaScript pur** (sans framework), dans le cadre de l'examen de rattrapage WEB1 — HEI Madagascar, 2026.

## Aperçu

La page affiche une liste de cours filtrable par :
- **Langue** (drapeaux à sélection multiple)
- **Technologie** (menu déroulant)
- **Niveau** (débutant, intermédiaire, avancé)
- **Prix** (double curseur de fourchette de prix)
- **Mot-clé** (recherche dans le titre et la description)

## Structure du projet

```
.
├── index.html      # structure de la page
├── style.css       # mise en forme, responsive (mobile-first jusqu'à Pixel 7)
├── courses.js       # structure de données + liste des cours
├── script.js        # logique de filtrage et rendu dynamique
└── assets/
    └── stars.svg    # image de fond des vignettes
```

## Structure de données

Un cours est représenté par un objet simple :

```js
{
  id: number,
  title: string,
  description: string,
  price: number,        // en Ariary (Ar)
  language: "en"|"fr"|"mg",
  technology: string,
  level: "beginner"|"intermediate"|"advanced",
  image: string
}
```

Tous les cours sont stockés dans un tableau `COURSES` (voir `courses.js`). Aucune base de données n'est utilisée, conformément à l'énoncé.

## Lancer le projet

Aucune dépendance ni build nécessaire. Il suffit d'ouvrir `index.html` dans un navigateur, ou de servir le dossier avec un serveur statique, par exemple :

```bash
python3 -m http.server 8000
```

puis d'ouvrir `http://localhost:8000`.

## Auteur

Rattrapage WEB1 — HEI Madagascar, 2026.