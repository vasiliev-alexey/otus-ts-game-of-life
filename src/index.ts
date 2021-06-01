import './css/main.css';
import { GameRunner } from './ts/GameRunner';

const gameRoot = document.querySelector<HTMLDivElement>('.gameRoot');
if (gameRoot !== null) {
  const runner = new GameRunner(gameRoot);
  runner.start();
} else {
  const p = document.createElement('p');
  p.innerText = 'Error load game script - root element not found';
  document.body.append(p);
}
