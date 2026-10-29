export class GameStats {
    constructor() {
        this.tours = [];
        this.erreurs = 0;
        this.championsTrouves = [];
        this.debut = null;
        this.championsManques = [];
    }

    /**
     * demarre le chrono
     */
    demarrerChrono() {
        if (this.debut === null) {
            this.debut = Date.now();
        }
    }

    /**
     * Arrete le chrono, calcul la duree du tour
     * increment les donnees lettre, la duree, et les erreurs du tour
     * remet a 0 ou null les erreur et le debut du tour pour le tour suivant
     * @param {string} lettre 
     */
    terminerTour(lettre) {
        const duree = this.debut === null ? 0 : Date.now() - this.debut;
        this.tours.push({lettre: lettre, duree: duree, erreurs: this.erreurs});
        this.erreurs = 0;
        this.debut = null;
    }

    /**
     * ajouter a 1 a erreur quand l'erreur est unknow et wrong letter
     */
    ajouterErreur() {
        this.erreurs++;
    }

    /**
     * ajoute le champion trouve a la liste des champion deja trouvé
     * @param {Object} champion 
     */
    ajouterChampion(champion) {
        this.championsTrouves.push(champion);
    }

    /**
     * calcul la duree total pour dernier affichage
     * @returns la duree total de la partie
     */
    tempsTotal() {
        const totalTours = this.tours.reduce((somme, t) => somme + t.duree, 0);
        return totalTours;
    }

    /**
     * calcul les erreurs total pour dernier affichage
     * @returns les erreurs total de la partie
     */
    erreurTotal() {
        const totalErreurs = this.tours.reduce((somme, t) => somme + t.erreurs, 0);
        return totalErreurs;
    }

    /**
     * Enregistre les champions non trouvés d'une lettre abandonnée.
     * Chacun compte comme une erreur.
     * @param {Array} manques - les champions non trouvés
     */
    ajouterManques(manques) {
        this.championsManques.push(...manques);
        this.erreurs += manques.length;
    }

    /**
     * Renvoie le temps de jeu écoulé : lettres terminées + lettre en cours.
     * @returns {number} le temps en millisecondes
     */
    tempsEcoule() {
        const lettreEnCours = this.debut === null ? 0 : Date.now() - this.debut;
        return this.tempsTotal() + lettreEnCours;
    }
}