import { GameEngine } from './GameEngine';
import log from './Logger';
import { CellState, Playground } from './CommonTypes';

function getInitialArray(
  rows: number,
  cols: number,
  initialValue?: CellState
): Playground {
  const rez: Playground = [];

  for (let i = 0; i < rows; i += 1) {
    rez.push(Array<CellState>(cols).fill(initialValue ?? 0));
  }
  return rez;
}

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

describe('GameEngine', () => {
  describe('public interface', () => {
    it('is a class', () => {
      expect(GameEngine).toBeInstanceOf(Function);
      expect(new GameEngine()).toBeInstanceOf(GameEngine);
    });
  });

  it('has a function gameField', () => {
    const gameEngine = new GameEngine(getInitialArray(10, 10));
    expect(gameEngine.gameField).toBeInstanceOf(Array);
    expect(gameEngine.gameField).toEqual(initialArray);
  });

  it('has a function to resize to small', () => {
    let gameEngine = new GameEngine(Object.assign([], initialArray));
    expect(gameEngine.resizeGameField).toBeInstanceOf(Function);

    gameEngine.resizeGameField(8, 8);
    expect(gameEngine.gameField.length).toEqual(8);
    expect(gameEngine.gameField[4].length).toEqual(8);

    const init = getInitialArray(10, 10, 1);
    gameEngine = new GameEngine(init);

    gameEngine.resizeGameField(12, 12);
    expect(gameEngine.gameField.length).toEqual(12);
    expect(gameEngine.gameField[4].length).toEqual(12);

    gameEngine = new GameEngine(getInitialArray(10, 10, 1));
    gameEngine.resizeGameField(6, 3);
    expect(gameEngine.gameField.length).toEqual(6);
    expect(gameEngine.gameField[4].length).toEqual(3);
  });

  it('has a function to toggle cell', () => {
    const gameEngine = new GameEngine(getInitialArray(5, 5));
    expect(gameEngine.togglePoint).toBeInstanceOf(Function);

    for (let i = 0; i < 10; i += 1) {
      const x = Math.floor(Math.random() * 5);
      const y = Math.floor(Math.random() * 5);
      const oldValue = gameEngine.gameField[y][x];

      expect(oldValue).not.toBeNull();
      const retArray = gameEngine.togglePoint(y, x);
      expect(retArray[y][x]).not.toEqual(oldValue);
    }
  });

  it('game is over', () => {
    const gameEngine = new GameEngine(getInitialArray(5, 5));
    expect(gameEngine.isGameOver).toBeInstanceOf(Function);

    expect(gameEngine.isGameOver()).toEqual(true);
    gameEngine.togglePoint(1, 1);
    expect(gameEngine.isGameOver()).toEqual(false);
    gameEngine.togglePoint(1, 1);
    expect(gameEngine.isGameOver()).toEqual(true);

    gameEngine.togglePoint(1, 1);
    gameEngine.togglePoint(2, 2);
    gameEngine.togglePoint(3, 3);
    expect(gameEngine.isGameOver()).toEqual(false);
  });

  it('game engine test step', () => {
    const gameEngine = new GameEngine(getInitialArray(5, 5));
    expect(gameEngine.stepGame).toBeInstanceOf(Function);
    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(0, 1);
    gameEngine.togglePoint(1, 0);
    gameEngine.stepGame();
  });

  it('game engine test step zero cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));
    expect(gameEngine.stepGame).toBeInstanceOf(Function);
    gameEngine.togglePoint(0, 0);
    gameEngine.stepGame();
  });

  it('game engine test step zero 2 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(0, 1);
    log(gameEngine.gameField);
    gameEngine.stepGame();
  });

  it('game engine test step zero 3 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(0, 1);
    gameEngine.togglePoint(1, 0);
    log(gameEngine.gameField);
    gameEngine.stepGame();
  });

  it('game engine test step zero 3 cell active up', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(0, 1);
    gameEngine.togglePoint(1, 0);
    log(gameEngine.gameField);

    gameEngine.stepGame();

    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
    gameEngine.stepGame();
    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });

  it('game engine test step down zero 3 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(1, 2);
    gameEngine.togglePoint(2, 2);
    gameEngine.togglePoint(2, 1);

    gameEngine.stepGame();
    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ]);
  });

  it('game engine test step down center 3 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 1);
    gameEngine.togglePoint(1, 1);
    gameEngine.togglePoint(1, 2);
    log(gameEngine.gameField);
    gameEngine.stepGame();
    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);
  });

  it('game engine test step 4 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(0, 1);
    gameEngine.togglePoint(1, 0);
    gameEngine.togglePoint(1, 1);
    log(gameEngine.gameField);
    gameEngine.stepGame();
    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });

  it('game engine test step 5 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(0, 1);
    gameEngine.togglePoint(1, 0);
    gameEngine.togglePoint(1, 1);

    gameEngine.togglePoint(2, 2);

    log(gameEngine.gameField);
    gameEngine.stepGame();
    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ]);
  });

  it('game engine test step 3 3 cell active', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(0, 0);
    gameEngine.togglePoint(1, 1);
    gameEngine.togglePoint(1, 2);

    log(gameEngine.gameField);
    gameEngine.stepGame();
    log(gameEngine.gameField);
    expect(gameEngine.gameField).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);

    gameEngine.stepGame();
    expect(gameEngine.gameField).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('game single cell', () => {
    const gameEngine = new GameEngine(getInitialArray(3, 3));

    gameEngine.togglePoint(1, 1);

    log(gameEngine.gameField);
    gameEngine.stepGame();
    log(gameEngine.gameField);

    expect(gameEngine.gameField).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    gameEngine.togglePoint(2, 2);
    gameEngine.stepGame();
    expect(gameEngine.gameField).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  describe('test class', () => {
    it('is a dd', () => {
      // const t = new GameEngine(initialArray);
      // console.log(t.gameField.length);
    });
  });
});
