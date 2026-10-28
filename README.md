# LoL Alphabet Quiz

Un jeu web où il faut deviner **tous les champions de League of Legends, lettre par lettre**, dans l'ordre alphabétique. Au premier tour, le joueur doit retrouver tous les champions dont le nom commence par A, puis par B, jusqu'à la dernière lettre.

> Projet en cours de développement, réalisé dans le cadre de mon portfolio.

## Comment jouer

1. Une lettre est affichée (en commençant par A).
2. Tape le nom d'un champion dont le nom commence par cette lettre.
3. Si le nom est correct, l'icône du champion s'affiche et le compteur augmente (par exemple « 7/12 »).
4. Quand tous les champions de la lettre sont trouvés, on passe à la lettre suivante.

## Fonctionnalités

- [x] Structure du projet en architecture MVC
- [x] Chargement des champions depuis l'API Data Dragon
- [x] Normalisation des noms (accents, apostrophes, casse)
- [x] Saisie et vérification des réponses
- [x] Affichage des icônes et compteur par lettre
- [x] Gestion des tours (A → Z)
- [x] Score et écran de fin de partie
- [ ] Chronomètre et bouton « abandonner »
- [ ] Design responsive (mobile)
- [ ] Déploiement en ligne
- [ ] Back-end Symfony : API, base de données, scores et classement

## Technologies

**Actuellement**
- HTML5, CSS3
- JavaScript (modules ES6)
- Architecture MVC
- API Data Dragon de Riot Games
- Git et GitHub (branches, issues, pull requests)

**Prévues**
- PHP / Symfony pour une API REST
- Base de données pour les scores et le classement

## Architecture

Le projet suit le modèle **MVC** (Modèle, Vue, Contrôleur) :

- **Modèle** : gère les données (liste des champions, état de la partie).
- **Vue** : s'occupe uniquement de l'affichage.
- **Contrôleur** : fait le lien entre le modèle et la vue, et contient la logique du jeu.

```
lol-alphabet-quiz/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── models/
│   │   ├── ChampionModel.js
│   │   └── GameModel.js
│   ├── views/
│   │   └── GameView.js
│   ├── controllers/
│   │   └── GameController.js
│   └── utils/
│       └── normalize.js
└── README.md
```

## Base de données

Aucune base de données pour le moment : les données des champions sont récupérées en direct depuis Data Dragon. Une base sera ajoutée avec le back-end Symfony pour enregistrer les scores et afficher un classement.

## Installation et lancement

1. Cloner le dépôt :
   ```
   git clone https://github.com/Eda31/lol-alphabet-quiz.git
   ```
2. Ouvrir le dossier dans Visual Studio Code.
3. Installer l'extension **Live Server**.
4. Faire un clic droit sur `index.html`, puis **Open with Live Server**.

> Le projet utilise des modules JavaScript : il doit être lancé via un serveur local (comme Live Server).

## Source des données

Les noms et les images des champions proviennent de [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon), les données statiques publiques de Riot Games.

## Mentions légales

Ce projet n'est pas affilié à Riot Games. League of Legends et ses éléments associés sont des marques de Riot Games, Inc.

## Auteur

**Eda31** – [GitHub](https://github.com/Eda31)
