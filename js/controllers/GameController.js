import { GameModel } from '../models/GameModel.js';
export class GameController {
    constructor(championModel, gameView) {
        this.championModel = championModel;
        this.gameView = gameView;
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        this.currentLetterIndex = 0;
        this.gameModel = null;
    }

    /**
     * Initialise le contrôleur du jeu en affichant le compteur initial et en ajoutant un écouteur d'événement pour la soumission du formulaire de saisie du champion.
     */
    init() {
        this.demarrerTour();
        this.gameView.formulaire.addEventListener("submit", (event) => this.handleSubmit(event));
    }

    /**
     * Gère la soumission du formulaire de saisie du champion.
     * @param {Event} event 
     * @returns {void}
     */
    handleSubmit(event) {
        event.preventDefault();
        this.gameView.fermerRegles();
        const saisie = this.gameView.lireSaisie().trim();
        // Vérifie si la saisie est vide
        if (saisie === "") {
            this.gameView.afficherMessage("Veuillez saisir un champion.");
            this.gameView.viderSaisie();
            return;
        }
        const resultat = this.gameModel.guess(saisie);
        switch (resultat) {
            case "already":
                this.gameView.afficherMessage("Vous avez déjà trouvé ce champion !");
                break;
            case "found": {
                if (this.gameModel.estTerminee()) {
                    this.gameView.afficherMessage("Bravo ! Vous avez trouvé tous les champions pour cette lettre !");
                } else {
                    this.gameView.afficherMessage("Bravo ! Vous avez trouvé un champion !");
                }
                this.gameView.afficherCompteur(this.gameModel.trouves.length, this.gameModel.champions.length);
                this.gameView.ajouterChampionTrouve(this.gameModel.trouves.at(-1));
                if (this.gameModel.estTerminee()) {
                    this.passerALaLettreSuivante();
                }
                break;
            }
            case "wrong-letter":
                this.gameView.afficherMessage("Ce champion existe, mais ne commence pas par la lettre en cours.");
                break;
            case "unknown":
                this.gameView.afficherMessage("Ce champion n'existe pas.");
                break;
            default:
                this.gameView.afficherMessage("Erreur inconnue.");
        }
        this.gameView.viderSaisie();
    }
    
    /**
     * Démarre un nouveau tour du jeu en initialisant le modèle de jeu avec la lettre en cours, les champions correspondants et en réinitialisant l'affichage.
     */
    demarrerTour() {
        const lettre = this.alphabet[this.currentLetterIndex];
        this.gameModel = new GameModel(lettre, this.championModel.getByLetter(lettre), this.championModel.champions);
        this.gameView.viderChampionsTrouves();
        this.gameView.afficherLettre(lettre);
        this.gameView.afficherCompteur(this.gameModel.trouves.length, this.gameModel.champions.length);
        this.gameView.viderSaisie();
    }

    passerALaLettreSuivante() {
        this.currentLetterIndex++;
        if (this.currentLetterIndex < this.alphabet.length) {
            this.demarrerTour();
        } else {
            this.gameView.desactiverSaisie();
            this.gameView.afficherMessage("Félicitations ! Vous avez terminé l'alphabet !");
        }
        
    }
}