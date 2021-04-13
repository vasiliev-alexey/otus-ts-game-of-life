import { GamePresenter } from './GamePresenter';

import { Game } from './CommonTypes';

import { mockDeep } from 'jest-mock-extended';

describe('GamePresenter tests', () => {
  describe('public interface', () => {
    it('is a class', () => {
      expect(GamePresenter).toBeInstanceOf(Function);
    });
  });

  describe('public constructor', () => {
    it('is a class44', () => {
      const dummyEl = document.createElement('div');

      //const mock2 = mock<Game>();

      jest.mock('./CommonTypes', () => {
        return {
          // Define Function Mock Return Values
          gameField: jest.fn(() => []),
        };
      });

      const mock22 = mockDeep<Game>();

      // @ts-ignore
      mock22.gameField.mockReturnValue([]);

      const gp = new GamePresenter(dummyEl, mock22);
      gp.renderInitialPage();
      console.log('ddd');

      //
      // jest.mock('./GameEngine', () => ({
      //   gameField : () => mockB,
      //   resizeGameField : () => []
      // }));
      //
      // const mocked = GameEngine as jest.Mocked<typeof GameEngine>;
      //
      // const spy = jest.spyOn(storage, 'getCityList');
      // spy.mockReturnValue(['1', '2']);
      //
      //
      // let g = mocked.prototype ;
      // const presenter  = new GamePresenter(dummyEl ,  g );
      //
      // expect(presenter).toBeDefined();
      // presenter.renderInitialPage();
      // expect(mockB).toHaveBeenCalled();
      //
      //   const gameEngine = ( GameEngine as jest.MockedClass <typeof GameEngine>);
      //
      //   gameEngine.mockReturnValue( () => {
      //     gameField:  []
      //   } );
      //
      //   gameEngine.mockImplementation( () => {
      //
      //     bar: "mocked return for this test";
      //
      //   });
    });
  });
});
