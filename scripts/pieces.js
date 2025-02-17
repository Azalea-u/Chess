// pieces.js

export function movePiece(pieceElement, targetSquare) {
    const fromPos = pieceElement.parentElement.dataset.position;
    const toPos = targetSquare.dataset.position;
    if (isLegalMove(pieceElement, fromPos, toPos)) {
        targetSquare.appendChild(pieceElement);
        return true;
    }
    return false;
}

function isLegalMove(pieceElement, from, to) {
    const piece = pieceElement.innerHTML;
    const type = getPieceType(piece);
    switch (type) {
        case 'pawn':   return isLegalPawnMove(piece, from, to);
        case 'rook':   return isLegalRookMove(from, to);
        case 'knight': return isLegalKnightMove(from, to);
        case 'bishop': return isLegalBishopMove(from, to);
        case 'queen':  return isLegalQueenMove(from, to);
        case 'king':   return isLegalKingMove(from, to);
        default:       return false;
    }
}

function getPieceType(piece) {
    switch (piece) {
        case '♙': case '♟': return 'pawn';
        case '♖': case '♜': return 'rook';
        case '♘': case '♞': return 'knight';
        case '♗': case '♝': return 'bishop';
        case '♕': case '♛': return 'queen';
        case '♔': case '♚': return 'king';
        default: return null;
    }
}

function algebraicToCoordinates(pos) {
    return { file: pos.charCodeAt(0) - 97, rank: parseInt(pos[1]) - 1 };
}

function isPathClear(from, to) {
    const board = document.getElementById('chessboard');
    const start = algebraicToCoordinates(from);
    const end = algebraicToCoordinates(to);
    const fileStep = Math.sign(end.file - start.file);
    const rankStep = Math.sign(end.rank - start.rank);
    let currentFile = start.file + fileStep;
    let currentRank = start.rank + rankStep;
    
    while (currentFile !== end.file || currentRank !== end.rank) {
        const pos = String.fromCharCode(97 + currentFile) + (currentRank + 1);
        const square = board.querySelector(`[data-position="${pos}"]`);
        if (square && square.querySelector('.piece')) return false;
        currentFile += fileStep;
        currentRank += rankStep;
    }
    return true;
}

function isLegalPawnMove(piece, from, to) {
    const { file: fFile, rank: fRank } = algebraicToCoordinates(from);
    const { file: tFile, rank: tRank } = algebraicToCoordinates(to);
    if (piece === '♙') return tFile === fFile && (tRank - fRank === 1);
    if (piece === '♟') return tFile === fFile && (fRank - tRank === 1);
    return false;
}

function isLegalKnightMove(from, to) {
    const { file: fFile, rank: fRank } = algebraicToCoordinates(from);
    const { file: tFile, rank: tRank } = algebraicToCoordinates(to);
    const fileDiff = Math.abs(tFile - fFile);
    const rankDiff = Math.abs(tRank - fRank);
    return (fileDiff === 2 && rankDiff === 1) || (fileDiff === 1 && rankDiff === 2);
}

function isLegalRookMove(from, to) {
    const { file: fFile, rank: fRank } = algebraicToCoordinates(from);
    const { file: tFile, rank: tRank } = algebraicToCoordinates(to);
    if (fFile !== tFile && fRank !== tRank) return false;
    return isPathClear(from, to);
}

function isLegalBishopMove(from, to) {
    const { file: fFile, rank: fRank } = algebraicToCoordinates(from);
    const { file: tFile, rank: tRank } = algebraicToCoordinates(to);
    if (Math.abs(tFile - fFile) !== Math.abs(tRank - fRank)) return false;
    return isPathClear(from, to);
}

function isLegalQueenMove(from, to) {
    return isLegalRookMove(from, to) || isLegalBishopMove(from, to);
}

function isLegalKingMove(from, to) {
    const { file: fFile, rank: fRank } = algebraicToCoordinates(from);
    const { file: tFile, rank: tRank } = algebraicToCoordinates(to);
    return Math.abs(tFile - fFile) <= 1 && Math.abs(tRank - fRank) <= 1;
}
