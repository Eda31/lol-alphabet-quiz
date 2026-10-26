export class GameController {
    constructor(gameModel, gameView) {
        this.gameModel = gameModel;
        this.gameView = gameView;
    }

    /**
     * Initialise le contrôleur du jeu en affichant le compteur initial et en ajoutant un écouteur d'événement pour la soumission du formulaire de saisie du champion.
     */
    init() {
        this.gameView.afficherCompteur(this.gameModel.trouves.length, this.gameModel.champions.length);
        this.gameView.formulaire.addEventListener("submit", (event) => this.handleSubmit(event));
    }

    /**
     * Gère la soumission du formulaire de saisie du champion.
     * @param {Event} event 
     * @returns {void}
     */
    handleSubmit(event) {
        event.preventDefault();
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
            case "found":
                this.gameView.afficherMessage("Bravo ! Vous avez trouvé un champion !");
                this.gameView.afficherCompteur(this.gameModel.trouves.length, this.gameModel.champions.length);
                const dernierChampion = this.gameModel.trouves.at(-1);
                this.gameView.ajouterChampionTrouve(dernierChampion);
                break;
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

}