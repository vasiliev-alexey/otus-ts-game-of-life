import { Game, Playground } from './CommonTypes';

enum CellClass {
  LIVE = 'cell-live',
  DEAD = 'cell-dead',
}

export interface GameView {
  renderInitialPage(gameField: Playground): void;
}

export class GamePresenter implements GameView {

  private readonly gameTable: HTMLTableElement;
  private gameTableBody: HTMLTableSectionElement;
  private intervalHolder: number = 0;

  public constructor(
    private rootElement: HTMLDivElement,
    private gameEngine: Game
  ) {
    this.gameTable = document.createElement('table');
    this.gameTableBody = this.gameTable.createTBody();
  }

  private renderActionToolBar(): void {
    const actionDiv: HTMLDivElement = document.createElement('div');
    actionDiv.classList.add('actionPanel');

    const speedRanger = document.querySelector<HTMLInputElement>(
      '#speedRanger'
    )!;

    speedRanger.addEventListener('change', (e) => {
      const ranger = e.target as HTMLInputElement;
      if (this.intervalHolder > 0) {
        this.runGame(+ranger.value);
      }
    });

    const startButton = document.querySelector<HTMLInputElement>('.startBtn')!;

    startButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.runGame(+speedRanger.value);
    });

    const resizeButton = document.querySelector<HTMLInputElement>(
      '.resizeBtn'
    )!;
    const weightSize = document.querySelector<HTMLInputElement>('#weightSize')!;
    const heightSize = document.querySelector<HTMLInputElement>('#heightSize')!;

    resizeButton.addEventListener('click', (ev) => {
      ev.preventDefault();

      const w = +weightSize.value;
      const h = +heightSize.value;

      if (w < 3 || h < 3) {
        alert('Ширина или высота игрового поля в недопустимом  диапазоне');
      } else {
        this.gameEngine.resizeGameField(h, w);
        this.renderGameTable();
      }
    });
  }

  private runGame(timeout: number): void {
    clearInterval(this.intervalHolder);
    // @ts-ignore
    this.intervalHolder = setInterval(() => {
      const result = this.gameEngine.stepGame();

      this.renderGameTable();

      if (result.isGameOver === true) {
        alert('game over');
        clearInterval(this.intervalHolder);
      }
    }, timeout);
  }

  private renderGameTable(): void {
    const gameArray = this.gameEngine.gameField;

    this.gameTableBody.remove();
    this.gameTableBody = this.gameTable.createTBody();

    gameArray.forEach((r, index: number) => {
      const row = this.gameTableBody.insertRow(index);
      r.forEach((cellState) => {
        const cell = row.insertCell();
        cell.classList.add(cellState === 0 ? CellClass.LIVE : CellClass.DEAD);
      });
    });
  }

  public renderInitialPage(): void {
    this.gameTable.addEventListener('click', (e) => {
      if (e.target instanceof HTMLTableCellElement) {
        clearInterval(this.intervalHolder);
        const row = e.target.parentNode as HTMLTableRowElement;
        this.gameEngine.togglePoint(row.rowIndex, e.target.cellIndex);
        this.renderGameTable();
      }
    });
    this.rootElement.append(this.gameTable);
    this.renderGameTable();
    this.renderActionToolBar();
  }
}
