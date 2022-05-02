import { P, Board } from "../types";

/**
 * Detects if castling happened and if so, returns the rook's position and target index.
 * */
function getCastlingRook(board: Board, from: number, to: number): [from: number, to: number] | undefined {
    if (board[from].type === P.KING && Math.abs(from - to) === 2) {
        if (from < to) {
            return [from + 3, from + 1];
        }
        else {
            return [from - 4, from - 1];
        }
    }
    return undefined;
}

export default getCastlingRook;