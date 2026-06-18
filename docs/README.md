# 📚 Documentation JSDoc - Projet ECOM Front-End

## Vue d'ensemble

Cette documentation a été générée automatiquement à partir des commentaires JSDoc présents dans le code source du projet. Elle documente les pages utilisateur et leurs composants.

## 📁 Structure de la documentation

```
docs/
├── index.html                      # Documentation JSDoc automatique
├── index-custom.html               # Landing page personnalisée
├── ProductDetailPage.jsx.html      # Documentation complète de ProductDetailPage
├── UserProfilePage.jsx.html        # Documentation complète de UserProfilePage
├── global.html                     # Documentation des éléments globaux
├── tutorial-README.html            # Tutoriels
├── styles/                         # Fichiers CSS
├── scripts/                        # Fichiers JavaScript
└── fonts/                          # Polices de caractères
```

## 📄 Pages documentées

### 1. **ProductDetailPage** 🛍️
- **Chemin:** `src/pages/utilisateur/ProductDetailPage.jsx`
- **Description:** Page de détails d'un produit avec:
  - Galerie d'images avec navigation
  - Informations de prix et réductions
  - Avis clients
  - Gestion de la quantité et couleur
  - Produits connexes
  - Ajout au panier et wishlist

### 2. **UserProfilePage** 👤
- **Chemin:** `src/pages/utilisateur/UserProfilePage.jsx`
- **Description:** Page de profil utilisateur avec:
  - Informations personnelles
  - Statistiques d'achat
  - Historique de commandes récentes
  - Actions rapides (wishlist, paramètres)
  - Informations de contact

## 🔧 Composants documentés

### ProductDetailPage
- `ImageGallery` - Galerie d'images avec navigation par flèches et thumbnails
- `ReviewCard` - Affichage des critiques clients avec avatar et évaluation

### UserProfilePage
- `InfoCard` - Carte d'information utilisateur avec icône
- `StatCard` - Carte de statistique cliquable

## 🚀 Génération de la documentation

### Prérequis
- Node.js >= 16
- npm ou yarn

### Installation

JSDoc est déjà installé comme devDependency. Pour l'installer manuellement:

```bash
npm install --save-dev jsdoc
```

### Générer la documentation

```bash
npm run docs
```

Cette commande:
1. Scanne tous les commentaires JSDoc dans `src/pages/utilisateur`
2. Génère une documentation HTML statique
3. Place les fichiers dans le dossier `docs/`

### Configuration

La configuration JSDoc est définie dans `jsdoc.json`:

```json
{
  "source": {
    "include": ["src/pages/utilisateur"],
    "excludePattern": "(^|\\/|\\\\)\\."
  },
  "opts": {
    "destination": "./docs",
    "recurse": true
  }
}
```

## 📖 Standards JSDoc utilisés

### Tags utilisés

| Tag | Description |
|-----|-------------|
| `@fileoverview` | Vue d'ensemble du fichier |
| `@component` | Indique un composant React |
| `@param` | Documente les paramètres |
| `@returns` | Type de retour de la fonction |
| `@description` | Description détaillée |
| `@example` | Exemples d'utilisation |
| `@version` | Numéro de version |

### Exemple de documentation JSDoc

```javascript
/**
 * Composant ImageGallery
 * @component Affiche une galerie d'images avec navigation par flèches et thumbnails
 * @param {string[]} images - Tableau des URL d'images à afficher
 * @returns {JSX.Element} Galerie avec image principale et thumbnails
 * @example
 * <ImageGallery images={productImages} />
 */
function ImageGallery({ images }) {
  // ...
}
```

## 🌐 Accès à la documentation

### En ligne locale
1. Ouvrez `docs/index.html` dans votre navigateur pour la documentation JSDoc
2. Ouvrez `docs/index-custom.html` pour la landing page personnalisée

### Après le déploiement
Vous pouvez héberger le dossier `docs/` sur:
- GitHub Pages
- Netlify
- Vercel
- Tout autre service d'hébergement statique

## 📝 Ajouter de la documentation

Pour documenter un nouveau composant:

```javascript
/**
 * Nom du composant
 * @component Description courte
 * @param {Type} paramName - Description du paramètre
 * @returns {JSX.Element} Description du retour
 * @description Description détaillée du fonctionnement
 * @example
 * <ComponentName prop="value" />
 */
export default function ComponentName({ prop }) {
  // ...
}
```

## 🔄 Mise à jour de la documentation

Chaque fois que vous modifiez les commentaires JSDoc:

```bash
npm run docs
```

Les fichiers dans `docs/` seront automatiquement mis à jour.

## ✨ Améliorations futures

- [ ] Ajouter des tutoriels dans `tutorials/`
- [ ] Documenter tous les composants du projet
- [ ] Ajouter des images et diagrammes
- [ ] Créer un guide de contribution
- [ ] Générer des graphiques de dépendances

## 📞 Support

Pour des questions sur la documentation JSDoc:
- [Documentation officielle JSDoc](https://jsdoc.app/)
- [React JSDoc Best Practices](https://react.jsdoc.app/)

---

**Dernière mise à jour:** 18 Juin 2026  
**Version de documentation:** 1.0.0  
**Outil:** JSDoc v4.0.0+
