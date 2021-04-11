export type cellState = 0 | 1;
export type playground = cellState[][];

export interface Game {
  gameField: playground;

  resizeGameField(height: number, width: number): playground;

  togglePoint(posY: number, posX: number): playground;

  isGameOver(): boolean;

  stepGame(): playground;
}

export class GameEngine implements Game {
  public isGameOver(): boolean {
    return this.gameField.every((r) => r.every((el) => el === 0));
  }

  public togglePoint(posY: number, posX: number): playground {
    if (posY < this.gameField.length && posX < this.gameField[posY].length) {
      this.gameField[posY][posX] = this.gameField[posY][posX] === 0 ? 1 : 0;
    }
    return this.gameField;
  }

  get gameField(): playground {
    return this.gameField;
  }

  set gameField(value: number[][]) {
    this.gameField = value;
  }

  private gameField: playground;

  public constructor(gameField: playground) {
    this.gameField = gameField;
    return this;
  }

  private static newState(
    indY: number,
    indX: number,
    currState: cellState,
    play: playground,
  ): cellState {
    let aliveCtn = 0;
    let curPos = 0;

    for (let y = indY - 1; y <= indY + 1; y += 1) {
      for (let x = indX - 1; x <= indX + 1; x += 1) {
        curPos += 1;
        if (
          !(play[y] === undefined || play[y][x] === undefined)
          && play[y][x] === 1
          && curPos !== 5
        ) {
          aliveCtn += 1;
        }
      }
    }
    return aliveCtn === 3 || (aliveCtn === 2 && currState === 1) ? 1 : 0;
  }

  public stepGame(): playground {
    // - Если клетка жива и у нее 2−3 живых соседа, то она остается живой, иначе умирает.
    // - Если клетка мертва и у нее 3 живых соседа, то она становится живой, иначе остается мертвой.
    //
    // const upperY = this.gameField.length-1;
    // const upperX = this.gameField[0].length-1;

    this.gameField = this.gameField.map((row, indY, arr) => row.map((c, indX) => {
      const newCellState = GameEngine.newState(indY, indX, c, arr);

      return newCellState;
    }));

    return this.gameField;
  }

  public resizeGameField(height: number, width: number): playground {
    const originalHeight = this.gameField.length;
    const originalWeight = this.gameField[0].length;

    if (height < originalHeight) {
      this.gameField.splice(height, originalHeight);
    } else {
      for (let r = originalHeight; r < height; r += 1) {
        this.gameField.splice(height, 0, Array<number>(width).fill(0));
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
