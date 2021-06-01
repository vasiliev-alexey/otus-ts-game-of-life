import { GamePresenter } from './GamePresenter';
import { GameEngine } from './GameEngine';

export class GameRunner {
  constructor(rootElement: HTMLDivElement) {
    const gameEngine = new GameEngine(undefined, 10, 10);
    const gamePresenter = new GamePresenter(rootElement, gameEngine);
    gamePresenter.renderInitialPage();
  }

  public start = (): void => {};
}
