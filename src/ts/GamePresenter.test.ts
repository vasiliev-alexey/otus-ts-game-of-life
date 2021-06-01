import { GamePresenter } from './GamePresenter';

import { Game, Playground } from './CommonTypes';

import { mock } from 'jest-mock-extended';

const initialArray: Playground = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

describe('GamePresenter tests', () => {
  describe('public interface', () => {
    it('is a class', () => {
      expect(GamePresenter).toBeInstanceOf(Function);
    });
  });

  describe('Test render page', () => {
    let speedRanger: HTMLInputElement;
    const dummyEl = document.createElement('div');
    beforeEach(() => {
      speedRanger = document.createElement('input');
      speedRanger.id = 'speedRanger';
      const startButton = document.createElement('input');
      startButton.classList.add('startBtn');

      const resizeButton = document.createElement('input');
      resizeButton.classList.add('resizeBtn');

      document.body.append(speedRanger, startButton, resizeButton);
    });

    it('init controller', () => {
      const mockedGame = mock<Game>();

      mockedGame.gameField = initialArray;

      const gp = new GamePresenter(dummyEl, mockedGame);
      gp.renderInitialPage();
    });

    it('should run game on change  speeder', () => {
      const mockedGame = mock<Game>();
      mockedGame.gameField = initialArray;

      const gp = new GamePresenter(dummyEl, mockedGame);
      gp.renderInitialPage();
      const event = new Event('change');
      speedRanger.dispatchEvent(event);

      function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      sleep(20000).then(() => {
        expect(mockedGame.stepGame).toBeCalled();
      });
    });
  });
});
