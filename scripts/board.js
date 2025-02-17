// board.js

// Function to initialize the chessboard
export function initializeBoard() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = ''; // Clear any existing content

    // Create squares and append to chessboard
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.position = getPosition(i); // Set data attribute for position

        // Add light or dark class based on the square's position
        if ((Math.floor(i / 8) + (i % 8)) % 2 === 0) {
            square.classList.add('light');
        } else {
            square.classList.add('dark');
        }

        chessboard.appendChild(square);
    }

    // Place initial pieces on the board
    placeInitialPieces(chessboard);
}

// Function to get the position (e.g., 'a1', 'b2') from the index
function getPosition(index) {
    const file = String.fromCharCode('a'.charCodeAt(0) + (index % 8));
    const rank = 8 - Math.floor(index / 8);
    return `${file}${rank}`;
}

// Function to place initial pieces on the board
function placeInitialPieces(chessboard) {
    const pieces = {
        'a1': '♖', 'b1': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'g1': '♘', 'h1': '♖',
        'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
        'a8': '♜', 'b8': '♞', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '♞', 'h8': '♜',
        'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
    };

    // Place pieces on the board
    for (const [position, piece] of Object.entries(pieces)) {
        const index = getIndexFromPosition(position);
        const square = chessboard.children[index];
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.innerHTML = piece;
        square.appendChild(pieceElement);
    }
}

// Function to convert position (e.g., 'a1') to index
function getIndexFromPosition(position) {
    const file = position.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = 8 - parseInt(position[1]);
    return rank * 8 + file;
}