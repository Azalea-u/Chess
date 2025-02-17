import { initializeBoard } from './board.js';
import { startGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    startGame();
});