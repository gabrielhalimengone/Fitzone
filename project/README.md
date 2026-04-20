# FitZone - Template de Site Web Fitness

Un template React moderne et complet pour salles de sport, coachs personnels et centres de fitness.

## 🚀 Fonctionnalités

### Pages Incluses
- **Accueil** : Hero section impressionnante avec CTA et présentation des services
- **Cours** : Liste filtreable des cours par niveau et type d'activité
- **Planning** : Planning hebdomadaire interactif avec système de réservation
- **Équipe** : Présentation détaillée des coachs avec spécialités et certifications
- **Témoignages** : Carrousel automatique des avis clients avec navigation
- **Contact** : Formulaire complet avec validation et informations de contact

### Fonctionnalités Interactives
- ✅ Navigation responsive avec menu mobile
- ✅ Filtrage dynamique des cours par niveau et type
- ✅ Planning interactif avec réservations simulées
- ✅ Carrousel de témoignages avec navigation automatique
- ✅ Formulaire de contact avec validation complète
- ✅ Animations fluides et micro-interactions
- ✅ Design responsive pour tous les appareils

### Technologies Utilisées
- **React 18** avec TypeScript
- **React Router Dom** pour la navigation
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Hook Form** pour la gestion des formulaires
- **Lucide React** pour les icônes

## 🎨 Design

### Palette de Couleurs
- **Orange principal** : #FF6B35 (boutons, accents)
- **Rouge secondaire** : #E63946 (gradients, hover states)
- **Noir** : #212529 (texte principal)
- **Blanc** : #FFFFFF (arrière-plans)
- **Gris** : Différentes nuances pour les textes secondaires

### Caractéristiques Design
- Interface moderne avec ombres subtiles et coins arrondis
- Typographie claire avec hiérarchie visuelle optimisée
- Animations au scroll et transitions fluides
- Cards interactives avec effets hover
- Layout responsive avec breakpoints adaptés

## 🛠️ Installation et Configuration

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd fitzone-template
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en mode développement**
```bash
npm run dev
```

4. **Construire pour la production**
```bash
npm run build
```

### Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.tsx      # Navigation principale
│   ├── Hero.tsx        # Section hero
│   └── Footer.tsx      # Pied de page
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── Courses.tsx     # Page des cours
│   ├── Schedule.tsx    # Planning des cours
│   ├── Team.tsx        # Équipe des coachs
│   ├── Testimonials.tsx # Témoignages clients
│   └── Contact.tsx     # Page de contact
├── App.tsx             # Composant principal
├── main.tsx           # Point d'entrée
└── index.css          # Styles globaux
```

## 🎯 Personnalisation

### Modifier les Couleurs
Les couleurs sont définies dans `tailwind.config.js` et peuvent être facilement personnalisées :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#YOUR_COLOR',
        secondary: '#YOUR_COLOR',
      }
    }
  }
}
```

### Ajouter du Contenu
1. **Images** : Remplacez les URLs Pexels par vos propres images
2. **Textes** : Modifiez le contenu dans chaque composant/page
3. **Cours** : Ajoutez/modifiez les cours dans `src/pages/Courses.tsx`
4. **Équipe** : Personnalisez les profils des coachs dans `src/pages/Team.tsx`

### Fonctionnalités Backend
Le template est prêt pour l'intégration avec un backend :
- Formulaires structurés avec validation
- Gestion d'état pour les réservations
- Structure modulaire pour l'ajout d'API

## 🚀 Déploiement

### Déploiement sur Netlify
1. Construire le projet : `npm run build`
2. Glisser-déposer le dossier `dist` sur netlify.com
3. Ou connecter votre repository Git pour le déploiement automatique

### Déploiement sur Vercel
```bash
npm install -g vercel
vercel --prod
```

### Autres Plateformes
Le template génère des fichiers statiques compatibles avec :
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Surge.sh

## 📱 Responsive Design

Le template est optimisé pour :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px  
- **Desktop** : > 1024px

Tous les composants s'adaptent automatiquement à la taille d'écran.

## 🔧 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

## 📄 Licence

Ce template est libre d'utilisation pour des projets personnels et commerciaux.

## 🤝 Support

Pour toute question ou personnalisation, n'hésitez pas à ouvrir une issue ou à contacter l'équipe de développement.

---

**FitZone Template** - Transformez votre présence en ligne avec un design professionnel et moderne ! 💪