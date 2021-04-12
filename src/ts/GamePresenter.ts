import { CellState, Game, Playground } from './CommonTypes.ts';

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
    private gameEngine: Game,
  ) {
    this.gameTable = document.createElement('table');
    this.gameTableBody = this.gameTable.createTBody();
  }

  private renderActionToolBar(): void {
    const actionDiv: HTMLDivElement = document.createElement('div');

    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    actionDiv.append(startButton);

    startButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      clearInterval(this.intervalHolder);
      // @ts-ignore
      this.intervalHolder = setInterval(() => {
        //   console.log(this.gameEngine.stepGame());
        this.gameEngine.stepGame();
        this.renderGameTable();
      }, 1000);
    });

    this.rootElement.append(actionDiv);
  }

  private renderGameTable(): void {
    const gameArray = this.gameEngine.gameField;

    this.gameTableBody.remove();
    this.gameTableBody = this.gameTable.createTBody();

    gameArray.forEach((r, index: number) => {
      const row = this.gameTableBody.insertRow(index);
      r.forEach((cellState: CellState) => {
        const cell = row.insertCell();

        cell.classList.add(cellState === 0 ? CellClass.LIVE : CellClass.DEAD);
      });
    });
  }

  public renderInitialPage(): void {
    const gameField = document.createElement('div');
    this.gameTable.createTHead();

    this.gameTable.addEventListener('click', (e) => {
      if (e.target instanceof HTMLTableCellElement) {
        clearInterval(this.intervalHolder);
        const row = e.target.parentNode as HTMLTableRowElement;
        // e.target.cellIndex;
        // row.rowIndex;

        this.gameEngine.togglePoint(row.rowIndex, e.target.cellIndex);
        this.renderGameTable();
        // e.target.classList.remove(CellClass.LIVE);
        // e.target.classList.add(CellClass.DEAD);
      }
    });

    this.rootElement.append(this.gameTable);
    this.rootElement.append(gameField);
    this.renderGameTable();
    this.renderActionToolBar();
  }
}
