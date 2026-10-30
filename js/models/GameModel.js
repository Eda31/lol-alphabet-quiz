import { normalizeChampionName } from '../utils/Normalize.js';
export class GameModel {
    constructor(lettre, champions, allChampions) {
        this.lettre = lettre; // La lettre en cours pour laquelle le joueur doit deviner les champions.
        this.champions = champions; // La liste des champions disponibles pour le jeu.
        this.allChampions = allChampions; // La liste complète des champions pour référence.
        this.trouves = []; // Un tableau pour stocker les champions trouvés par le joueur.
    }

    /**
     * Vérifie si le champion saisi par le joueur est correct, déjà trouvé, ou incorrect.
     * @param {string} texte 
     * @returns {string} Le résultat de la vérification.
     */
    guess(texte) {
        const saisie = normalizeChampionName(texte);
        if (this.trouves.some(champion => normalizeChampionName(champion.name) === saisie)) {
            return "already";
        }
        const champion = this.champions.find(champion => normalizeChampionName(champion.name) === saisie);
        if (champion) {
            this.trouves.push(champion);
            return "found";
        }
        if (this.allChampions.some(champion => normalizeChampionName(champion.name) === saisie)) {
            return "wrong-letter";
        }
        return "unknown";
    }

    /**
     * Vérifie si la partie est terminée avec la lettre en cours.
     * @returns {boolean}
     */
    estTerminee() {
        return this.trouves.length === this.champions.length;
    }

}