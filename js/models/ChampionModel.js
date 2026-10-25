import { normalizeChampionName } from '../utils/normalize.js';
export class ChampionModel {
    constructor() {                    // constructeur : initialisation de l'objet
    this.version = null;
    this.champions = [];
  }
  /**
   * Récupère la liste des champions depuis l'API de League of Legends et les stocke dans la propriété "champions" de l'objet.
   * @returns {Promise<void>}
   */
  async RecupChampion() {
    const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const reponseVersions = await versions.json();
    this.version = reponseVersions[0]; // Récupère la version la plus récente de League of Legends

    const reponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${this.version}/data/fr_FR/champion.json`);
    const donnees = await reponse.json();
    this.champions = Object.values(donnees.data).map(champion => ({ id: champion.id, name: champion.name }));
    
  }

  /**
   * Récupère les champions dont le nom commence par la lettre spécifiée.
   * @param {string} letter - La lettre par laquelle le nom du champion doit commencer.
   * @returns {Array} - Un tableau contenant les champions correspondants.
   */
  getByLetter(letter) {
    const normalizedLetter = normalizeChampionName(letter);
    return this.champions.filter(champion => normalizeChampionName(champion.name).startsWith(normalizedLetter));
  }


}