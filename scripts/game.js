// game.js
import { movePiece } from './pieces.js';

export let currentTurn = 'white';
export function toggleTurn() {
  currentTurn = currentTurn === 'white' ? 'black' : 'white';
}

export function startGame() {
  document.getElementById('chessboard').addEventListener('click', handleBoardClick);
}

let selectedPiece = null;

function handleBoardClick(event) {
  const target = event.target;

  if (target.classList.contains('piece')) {
    if (getPieceColor(target.innerHTML) !== currentTurn) return;
    clearHighlights();
    selectedPiece = target;
    target.parentElement.classList.add('selected');
  } else if (target.classList.contains('square') && selectedPiece) {
    const targetPiece = target.querySelector('.piece');
    if (targetPiece && getPieceColor(targetPiece.innerHTML) === currentTurn) {
      clearHighlights();
      selectedPiece = null;
      return;
    }
    if (movePiece(selectedPiece, target)) {
      if (targetPiece) target.removeChild(targetPiece);
      target.appendChild(selectedPiece);
      toggleTurn();
      console.log("Turn:", currentTurn);
    }
    clearHighlights();
    selectedPiece = null;
  }
}

function clearHighlights() {
  document.querySelectorAll('.selected').forEach(sq => sq.classList.remove('selected'));
}

function getPieceColor(piece) {
  return ['♙', '♖', '♘', '♗', '♕', '♔'].includes(piece)
    ? 'white'
    : ['♟', '♜', '♞', '♝', '♛', '♚'].includes(piece)
    ? 'black'
    : null;
}
