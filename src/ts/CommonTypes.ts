export type CellState = 0 | 1;
export type Playground = CellState[][];

export type GameResult = { gameArea: Playground; isGameOver: boolean };

export interface Game {
  gameField: Playground;

  resizeGameField(height: number, width: number): Playground;

  togglePoint(posY: number, posX: number): Playground;

  stepGame(): GameResult;
}
