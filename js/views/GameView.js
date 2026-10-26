export class GameView {
    constructor(version) {
        this.saisieChampionInput = document.getElementById('saisie-champion');
        this.messageResultat = document.getElementById('message-resultat');
        this.compteur = document.getElementById('compteur');
        this.championsTrouvesList = document.getElementById('champions-trouves');
        this.formulaire = document.getElementById('formulaire-champion');
        this.version = version;
    }

    /**
     * Lit la valeur saisie dans le champ de saisie du champion.
     * @returns {string} La valeur saisie.
     */
    lireSaisie() {
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

    ajouterChampionTrouve(champion) {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${champion.id}.png`;
        img.alt = champion.name;
        
        const nom = document.createElement('span');
        nom.textContent = champion.name;
        
        li.appendChild(img);
        li.appendChild(nom);

        this.championsTrouvesList.appendChild(li);
    }

}