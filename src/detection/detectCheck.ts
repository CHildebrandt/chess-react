import { P, Board, axes } from '../types';
import getAxis from '../utils/getAxis';
import isSameColor from '../utils/isSameColor';
import outOfRange from '../utils/outOfRange';
import yx from '../utils/yx';

const { PAWN, KING, KNIGHT, BISHOP, ROOK, QUEEN } = P;

function checkSquare(y: number, x: number, types: string[], board: Board, black: boolean): -1 | 0 | 1 {
    if (outOfRange(y, x)) {
        return -1;
    }
    const square = board[y * 8 + x];
    if (square.type) {
        if (isSameColor(square, black) || !types.includes(square.type)) {
            return -1; // if own piece covers or opponent's piece covers (it cannot capture)
        }
        else {
            return 1; // if opponent's piece attacks this square
        }
    }
    return 0; // if path is unhindered
}

function axisIsChecking(y: number, x: number, axis: number, board: Board, black: boolean): boolean {
    const types = (axis % 2 === 1) ? [QUEEN, BISHOP] : [QUEEN, ROOK];
    const [yMult, xMult] = getAxis(axis);
    for (let i = 1; i <= 7; i++) { // 7 is max distance
        const isCheck = checkSquare(y + (i * yMult), x + (i * xMult), types, board, black);
        if (isCheck === -1) {
            break;
        }
        else if (isCheck === 1) {
            return true;
        }
    }
    return false;
}

function knightIsChecking(y: number, x: number, board: Board, black: boolean) {
    const oppKnightIndexes: number[] = [];
    for (let i = 0; i < 64; i++) {
        if (board[i].type === KNIGHT && board[i].isBlack === !black) {
            oppKnightIndexes.push(i);
        }
    }
    for (const index of oppKnightIndexes) {
        const [knY, knX] = yx(index);
        if ((Math.abs(y - knY) === 2 && Math.abs(x - knX) === 1) || (Math.abs(y - knY) === 1 && Math.abs(x - knX) === 2)) {
            return true;
        }
    }
    return false;
}

function pawnIsChecking(y: number, x: number, board: Board, black: boolean) {
    const upDown = (black) ? 1 : -1;
    const pawn1 = checkSquare(y + upDown, x - 1, [PAWN], board, black);
    const pawn2 = checkSquare(y + upDown, x + 1, [PAWN], board, black);
    if (pawn1 === 1 || pawn2 === 1) {
        return true;
    }
    return false;
}

/**
 * Detects check against king, or optionally, if another square is attacked.
 */
function detectCheck(board: Board, black: boolean, squareToAnalyze?: number | undefined): boolean {
    const toAnalyze = squareToAnalyze || board.findIndex(piece => piece.type === KING && piece.isBlack === black);
    const [y, x] = yx(toAnalyze);

    for (const axis of axes) {
        if (axisIsChecking(y, x, axis, board, black)) {
            return true;
        }
    }
    if (knightIsChecking(y, x, board, black) || pawnIsChecking(y, x, board, black)) {
        return true;
    }
    return false;
}

export default detectCheck;