export class GameView {
    constructor() {
        this.saisieChampionInput = document.getElementById('saisie-champion');
        this.messageResultat = document.getElementById('message-resultat');
        this.compteur = document.getElementById('compteur');
        this.championsTrouvesList = document.getElementById('champions-trouves');
        this.formulaire = document.getElementById('formulaire-champion');
    }

    /**
     * Lit la valeur saisie dans le champ de saisie du champion.
     * @returns {string} La valeur saisie.
     */
    lireSasie() {
        return this.saisieChampionInput.value;
    }

    /**
     * Vide le champ de saisie du champion.
     */
    viderSaisie() {
        this.saisieChampionInput.value = '';
    }

    /**
     * Affiche un message dans la zone de résultats.
     * @param {string} message 
     */
    afficherMessage(message) {
        this.messageResultat.textContent = message;
    }

    /**
     * Affiche le compteur de champions trouvés et à trouver.
     * @param {number} trouves 
     * @param {number} total 
     */
    afficherCompteur(trouves, total) {
        this.compteur.textContent = `${trouves} / ${total}`;
    }

}