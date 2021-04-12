import { CellState, Playground, Game } from './CommonTypes';

export class GameEngine implements Game {
  public isGameOver(): boolean {
    return this.gameField.every((r) => r.every((el) => el === 0));
  }

  public togglePoint(posY: number, posX: number): Playground {
    if (posY < this.gameField.length && posX < this.gameField[posY].length) {
      this.gameField[posY][posX] = this.gameField[posY][posX] === 0 ? 1 : 0;
    }
    return this.gameField;
  }
  private _gameField: Playground = [];

  get gameField(): Playground {
    return this._gameField;
  }

  set gameField(value: Playground) {
    this._gameField = value;
  }

  public constructor(gameField?: Playground, height?: number, weight?: number) {
    if (gameField !== undefined) {
      this.gameField = gameField;
    } else {
      this.gameField = [];

      for (let i = 0; i < (height ?? 10); i += 1) {
        this.gameField.push(Array<CellState>(weight ?? 10).fill(0));
      }
    }

    return this;
  }

  private static newState(
    indY: number,
    indX: number,
    currState: CellState,
    play: Playground
  ): CellState {
    let aliveCtn = 0;
    let curPos = 0;

    for (let y = indY - 1; y <= indY + 1; y += 1) {
      for (let x = indX - 1; x <= indX + 1; x += 1) {
        curPos += 1;
        if (
          !(play[y] === undefined || play[y][x] === undefined) &&
          play[y][x] === 1 &&
          curPos !== 5
        ) {
          aliveCtn += 1;
        }
      }
    }
    return aliveCtn === 3 || (aliveCtn === 2 && currState === 1) ? 1 : 0;
  }

  public stepGame(): Playground {
    // - Если клетка жива и у нее 2−3 живых соседа, то она остается живой, иначе умирает.
    // - Если клетка мертва и у нее 3 живых соседа, то она становится живой, иначе остается мертвой.
    //
    // const upperY = this.gameField.length-1;
    // const upperX = this.gameField[0].length-1;

    this.gameField = this.gameField.map((row, indY, arr) =>
      row.map((c, indX) => {
        const newCellState = GameEngine.newState(indY, indX, c, arr);

        return newCellState;
      })
    );

    return this.gameField;
  }

  public resizeGameField(height: number, width: number): Playground {
    const originalHeight = this.gameField.length;
    const originalWeight = this.gameField[0].length;

    if (height < originalHeight) {
      this.gameField.splice(height, originalHeight);
    } else {
      for (let r = originalHeight; r < height; r += 1) {
        this.gameField.splice(height, 0, Array<CellState>(width).fill(0));
      }
    }
    if (width < originalWeight) {
      this.gameField.forEach((r) => {
        r.splice(width, originalWeight);
      });
    } else {
      this.gameField.forEach((r) => {
        for (let i = originalWeight; i < width; i += 1) {
          r.push(0);
        }
        r.splice(width);
      });
    }
    return this.gameField;
  }
}
