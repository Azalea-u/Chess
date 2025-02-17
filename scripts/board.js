// board.js

export function initializeBoard() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        square.classList.add('square', (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'light' : 'dark');
        square.dataset.position = getPosition(i);
        fragment.appendChild(square);
    }

    chessboard.appendChild(fragment);
    placeInitialPieces(chessboard);
}

function getPosition(index) {
    return `${String.fromCharCode(97 + (index % 8))}${8 - Math.floor(index / 8)}`;
}

function placeInitialPieces(chessboard) {
    const pieces = {
        'a1': '♖', 'b1': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'g1': '♘', 'h1': '♖',
        'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
        'a8': '♜', 'b8': '♞', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '♞', 'h8': '♜',
        'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
    };

    for (const [position, piece] of Object.entries(pieces)) {
        const square = chessboard.children[getIndexFromPosition(position)];
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.innerHTML = piece;
        square.appendChild(pieceElement);
    }
}

function getIndexFromPosition(position) {
    return (8 - parseInt(position[1])) * 8 + (position.charCodeAt(0) - 97);
}
