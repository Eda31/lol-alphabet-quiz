import { normalizeChampionName } from '../utils/normalize.js';
export class GameModel {
    constructor(letter, champions, allChampions) {
        this.letter = letter; // La lettre en cours pour laquelle le joueur doit deviner les champions.
        this.champions = champions; // La liste des champions disponibles pour le jeu.
        this.allChampions = allChampions; // La liste complète des champions pour référence.
        this.trouves = []; // Un tableau pour stocker les champions trouvés par le joueur.
    }

    /**
     * Vérifie si le champion saisi par le joueur est correct et met à jour l'état du jeu en conséquence.
     * @param {string} texte 
     * @returns {string} Le résultat de la vérification.
     */
    guess(texte) {
        const saisie = normalizeChampionName(texte);
        if (this.trouves.includes(saisie)) {
            return "already"; // Le champion a déjà été trouvé.
        }else if (this.champions.some(champion => normalizeChampionName(champion.name) === saisie)) {
            this.trouves.push(saisie);
            return "found"; // Le champion a été trouvé.
        } else if (this.allChampions.some(champion => normalizeChampionName(champion.name) === saisie)) {
            return "wrong-letter"; // Le champion existe mais ne commence pas par la lettre en cours.
        }else {
            return "unknown"; // Le champion n'a pas été trouvé.
        }
    }

}