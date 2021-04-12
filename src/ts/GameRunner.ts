import { GamePresenter } from './GamePresenter.ts';
import { GameEngine } from './GameEngine.ts';

// eslint-disable-next-line import/prefer-default-export
export class GameRunner {
  constructor(rootElement: HTMLDivElement) {
    const gameEngine = new GameEngine(undefined, 10, 10);
    const gamePresenter = new GamePresenter(rootElement, gameEngine);
    gamePresenter.renderInitialPage();
  }

  public start = (): void => {};
}
