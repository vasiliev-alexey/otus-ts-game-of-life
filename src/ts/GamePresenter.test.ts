import { GamePresenter } from './GamePresenter';

import { Game } from './CommonTypes';

import { mock } from 'jest-mock-extended';

const initialArray = [
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
    it('init controller', () => {
      const dummyEl = document.createElement('div');

      const mockedGame = mock<Game>();

      // @ts-ignore
      mockedGame.gameField = initialArray;

      const gp = new GamePresenter(dummyEl, mockedGame);
      gp.renderInitialPage();
    });
  });
});
