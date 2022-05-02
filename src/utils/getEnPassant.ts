import { P, Board } from "../types";

function getEnPassant(board: Board, isBlacksTurn: boolean, from: number, to: number) {
    if (board[from].type === P.PAWN && Math.abs(from - to) === 16) {
        return to + ((isBlacksTurn) ? -8 : 8);
    }
    return false;
}

export default getEnPassant;