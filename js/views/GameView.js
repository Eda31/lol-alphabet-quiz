export class GameView {
    constructor(version) {
        this.saisieChampionInput = document.getElementById('saisie-champion');
        this.messageResultat = document.getElementById('message-resultat');
        this.compteur = document.getElementById('compteur');
        this.championsTrouvesList = document.getElementById('champions-trouves');
        this.formulaire = document.getElementById('formulaire-champion');
        this.version = version;
        this.lettreEnCours = document.getElementById('lettre-en-cours');
        this.boutonValider = this.formulaire.querySelector('button');
        this.regles = document.getElementById('regles');
        this.boutonLettreSuivante = document.getElementById('lettre-suivante');

        this.zoneJeu = document.getElementById('zone-jeu');
        this.ecranFin = document.getElementById('ecran-fin');
        this.statTrouves = document.getElementById('stat-trouves');
        this.statTemps = document.getElementById('stat-temps');
        this.statErreurs = document.getElementById('stat-erreurs');
        this.listeFinale = document.getElementById('liste-finale');
        this.boutonRejouer = document.getElementById('rejouer');
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

    /**
     * Ajoute un champion trouvé à la liste des champions trouvés.
     * @param {Object} champion 
     */
    ajouterChampionTrouve(champion) {
        const li = this.creerElementChampion(champion);
        this.championsTrouvesList.appendChild(li);
    }

    /**
     * Affiche la lettre en cours pour laquelle le joueur doit deviner les champions.
     * @param {string} lettre 
     */
    afficherLettre(lettre) {
        this.lettreEnCours.textContent = lettre;
    }

    /**
     * Vide la liste des champions trouvés.
     */
    viderChampionsTrouves() {
        this.championsTrouvesList.replaceChildren();
    }

    /**
     * Désactive le champ de saisie du champion pour empêcher l'utilisateur de saisir de nouvelles réponses.
     * Cela peut être utilisé lorsque le jeu est terminé ou lorsqu'une action spécifique nécessite de bloquer la saisie.
     */
    desactiverSaisie() {
        this.saisieChampionInput.disabled = true;
        this.boutonValider.disabled = true;
    }

    /**
     * Active le champ de saisie du champion pour permettre à l'utilisateur de saisir de nouvelles réponses.
     */
    activerSaisie() {
        this.saisieChampionInput.disabled = false;
        this.saisieChampionInput.focus();
        this.boutonValider.disabled = false;
    }

    /**
     * Ferme la boîte de dialogue des règles du jeu.
     */
    fermerRegles() {
        this.regles.open = false;
    }

    /**
     * Affiche le bouton "Lettre suivante" pour permettre au joueur de passer à la lettre suivante.
     */
    afficherBoutonLettreSuivante() {
        this.boutonLettreSuivante.hidden = false;
    }

    /**
     * Cache le bouton "Lettre suivante" pour empêcher le joueur de passer à la lettre suivante.
     */
    cacherBoutonLettreSuivante() {
        this.boutonLettreSuivante.hidden = true;
    }  

    /**
     * Modifie le texte du bouton "Lettre suivante".
     * @param {string} texte 
     */
    modifierBoutonLettreSuivanteTexte(texte) {
        this.boutonLettreSuivante.textContent = texte;
    }

    /**
     * Affiche l'écran de fin avec les statistiques et la liste complète des champions triés.
     * @param {Object} stats 
     */
    afficherEcranFin(stats) {
        // 1. Écrire les trois phrases avec template literals et la méthode formaterTemps
        this.statTrouves.textContent = `Nombre de champions trouvés : ${stats.championsTrouves.length}`;
        this.statTemps.textContent = `Temps total : ${this.formaterTemps(stats.tempsTotal())}`;
        this.statErreurs.textContent = `Nombre d'erreurs : ${stats.erreurTotal()}`;
        // 2. Trier une copie de la liste des champions par ordre alphabétique
        const championsTries = [...stats.championsTrouves].sort((a, b) => 
            a.name.localeCompare(b.name)
        );
        // 3. Ajouter un <li> par champion dans liste-finale
        this.listeFinale.replaceChildren();
        championsTries.forEach(champion => {
            const li = this.creerElementChampion(champion);
            this.listeFinale.appendChild(li);
        });
        // 4. Cacher toute la zone de jeu en un seul geste et afficher l'écran de fin
        this.zoneJeu.hidden = true;
        this.ecranFin.hidden = false;
    }

    /**
     * Crée et renvoie un élément <li> représentant un champion (image et nom).
     * @param {Object} champion 
     * @returns {HTMLElement}
     */
    creerElementChampion(champion) {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${champion.id}.png`;
        img.alt = champion.name;
        
        const nom = document.createElement('span');
        nom.textContent = champion.name;
        
        li.appendChild(img);
        li.appendChild(nom);

        return li;
    }

    /**
     * Formate un temps en millisecondes en texte « X min Y s ».
     * @param {number} ms 
     * @returns {string}
     */
    formaterTemps(ms) {
        const minutes = Math.floor(ms / 60000);
        const secondes = Math.floor((ms % 60000) / 1000);
        return `${minutes} min ${secondes} s`;
    }
}