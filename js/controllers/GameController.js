import { GameModel } from '../models/GameModel.js';
import { GameStats } from '../models/GameStats.js';
export class GameController {
    constructor(championModel, gameView) {
        this.championModel = championModel;
        this.gameView = gameView;
        this.alphabet = "YZ".split("");
        this.currentLetterIndex = 0;
        this.gameModel = null;
        this.stats = new GameStats();
    }

    /**
     * Initialise le contrôleur du jeu en affichant le compteur initial et en ajoutant un écouteur d'événement pour la soumission du formulaire de saisie du champion.
     */
    init() {
        this.demarrerTour();
        this.gameView.formulaire.addEventListener("submit", (event) => this.handleSubmit(event));
        this.gameView.boutonLettreSuivante.addEventListener("click", () => this.lettreSuivanteCliquee());
        this.gameView.boutonRejouer.addEventListener("click", () => location.reload());
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
        this.stats.demarrerChrono();
        const resultat = this.gameModel.guess(saisie);
        switch (resultat) {
            case "already":
                this.gameView.afficherMessage("Vous avez déjà trouvé ce champion !");
                break;
            case "found": {
                const championTrouve = this.gameModel.trouves.at(-1);
                this.gameView.ajouterChampionTrouve(championTrouve);
                this.stats.ajouterChampion(championTrouve);
                this.gameView.afficherCompteur(this.gameModel.trouves.length, this.gameModel.champions.length);
                if (this.gameModel.estTerminee()) {
                    this.gameView.desactiverSaisie();
                    this.gameView.afficherBoutonLettreSuivante();
                    this.stats.terminerTour(this.gameModel.lettre);
                    if (this.currentLetterIndex < this.alphabet.length - 1) {
                        this.gameView.modifierBoutonLettreSuivanteTexte("Lettre suivante");
                        this.gameView.afficherMessage("Bravo ! Vous avez trouvé tous les champions pour cette lettre !");
                    } else {
                        this.gameView.modifierBoutonLettreSuivanteTexte("Voir mes résultats");
                        this.gameView.afficherMessage("Bravo ! Vous avez terminé l'alphabet !");
                    }
                } else {
                    this.gameView.afficherMessage("Bravo ! Vous avez trouvé un champion !");
                }
                break;
            }
            case "wrong-letter":
                this.gameView.afficherMessage("Ce champion existe, mais ne commence pas par la lettre en cours.");
                this.stats.ajouterErreur();
                break;
            case "unknown":
                this.gameView.afficherMessage("Ce champion n'existe pas.");
                this.stats.ajouterErreur();
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
        this.gameView.afficherMessage(`Devinez les champions commençant par la lettre "${lettre}" !`);
    }

    /**
     * Passe à la lettre suivante de l'alphabet et démarre un nouveau tour si possible. Si toutes les lettres ont été traitées, désactive la saisie et affiche un message de félicitations.
     * @returns {void}
     */
    passerALaLettreSuivante() {
        this.currentLetterIndex++;
        if (this.currentLetterIndex < this.alphabet.length) {
            this.demarrerTour();
        } else {
            this.gameView.desactiverSaisie();
            this.gameView.afficherEcranFin(this.stats);
        }
        
    }

    /**
     * Gère le clic sur le bouton "Lettre suivante" en cachant le bouton, activant la saisie et passant à la lettre suivante.
     * @returns {void}
     */
    lettreSuivanteCliquee() {
        this.gameView.cacherBoutonLettreSuivante();
        this.gameView.activerSaisie();
        this.passerALaLettreSuivante();
    }
}