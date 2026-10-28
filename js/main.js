import {ChampionModel} from './models/ChampionModel.js';
import {GameView} from './views/GameView.js';
import { GameController } from './controllers/GameController.js';

const championModel = new ChampionModel();
await championModel.RecupChampion();

const gameView = new GameView(championModel.version);

const gameController = new GameController(championModel, gameView);
gameController.init();