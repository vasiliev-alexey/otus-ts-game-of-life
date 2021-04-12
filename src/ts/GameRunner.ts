import { GamePresenter } from './GamePresenter.ts';
import { GameEngine } from './GameEngine.ts';

export default class Game {
  constructor(rootElement: HTMLDivElement) {
    const gameEngine = new GameEngine(undefined, 10, 10);
    const gamePresenter = new GamePresenter(rootElement, gameEngine);
    gamePresenter.renderInitialPage();
  }
}
