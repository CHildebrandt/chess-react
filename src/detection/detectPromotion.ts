import { P, Board } from '../types';

function detectPromotion(board: Board) {
    for (let i = 0; i < 8; i++) { // white promotion
        if (board[i].type === P.PAWN) {
            return true;
        }
    }
    for (let i = 56; i < 64; i++) { // black promotion
        if (board[i].type === P.PAWN) {
            return true;
        }
    }
    return false; // no promotion
}

export default detectPromotion;