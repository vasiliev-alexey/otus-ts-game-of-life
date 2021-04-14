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

    const speedRanger = document.createElement('input');
    speedRanger.type = 'range';
    speedRanger.step = String(100);
    speedRanger.max = String(1000);
    speedRanger.min = String(100);
    speedRanger.value = '500';
    speedRanger.defaultValue = '500';
    speedRanger.id = 'speedRanger';

    speedRanger.addEventListener('change', (e) => {
      const ranger = e.target as HTMLInputElement;

      this.runGame(+ranger.value);
    });

    const startButton = document.createElement('input');
    startButton.type = 'button';
    startButton.value = 'Start';
    actionDiv.append(startButton);

    startButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.runGame(+speedRanger.value);
    });

    const heightSize = document.createElement('input');
    heightSize.id = 'heightSize';
    const heightSizeLabel = document.createElement('label');
    heightSizeLabel.htmlFor = heightSize.id;
    heightSizeLabel.innerText = 'Высота поля';
    heightSize.type = 'number';
    heightSize.value = String(10);

    actionDiv.append(heightSizeLabel);
    actionDiv.append(heightSize);

    const weightSize = document.createElement('input');
    weightSize.type = 'number';
    weightSize.value = String(10);
    weightSize.id = 'weightSize';
    const weightSizeLabel = document.createElement('label');
    weightSizeLabel.htmlFor = weightSize.id;
    weightSizeLabel.innerText = 'Ширина поля';
    actionDiv.append(weightSizeLabel);
    actionDiv.append(weightSize);

    const resizeButton = document.createElement('input');
    resizeButton.type = 'button';
    resizeButton.value = 'Resize';
    actionDiv.append(resizeButton);

    resizeButton.addEventListener('click', (ev) => {
      ev.preventDefault();

      const w = +weightSize.value;
      const h = +heightSize.value;

      this.gameEngine.resizeGameField(h, w);
      this.renderGameTable();
    });

    actionDiv.append(speedRanger);

    this.rootElement.append(actionDiv);
  }

  private runGame(timeout: number): void {
    clearInterval(this.intervalHolder);
    // @ts-ignore
    this.intervalHolder = setInterval(() => {
      const rezult = this.gameEngine.stepGame();

      this.renderGameTable();

      if (rezult.isGameOver === true) {
        alert('game end');
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
    const gameField = document.createElement('div');
    this.gameTable.createTHead();

    this.gameTable.addEventListener('click', (e) => {
      if (e.target instanceof HTMLTableCellElement) {
        clearInterval(this.intervalHolder);
        const row = e.target.parentNode as HTMLTableRowElement;

        this.gameEngine.togglePoint(row.rowIndex, e.target.cellIndex);
        this.renderGameTable();
      }
    });

    this.rootElement.append(this.gameTable);
    this.rootElement.append(gameField);
    this.renderGameTable();
    this.renderActionToolBar();
  }
}
