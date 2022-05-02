import { Board, LegalMoves } from "../types";
import getLegalMoves from './getLegalMoves';

function getAllLegalMoves(board: Board, forBlack: boolean, pawnMove: (number | false) = false, checkForSingle: boolean = false) {
    const piecesIndexes: number[] = [];
    for (let i = 0; i < 64; i++) {
        if (board[i].isBlack === forBlack) {
            piecesIndexes.push(i);
        }
    }
    const movesObjArr: LegalMoves[] = [];
    for (const index of piecesIndexes) {
        const moves = getLegalMoves(board, index, pawnMove);
        if (moves.length > 0) {
            if (checkForSingle) {
                return [{ index, moves }];
            }
            movesObjArr.push({ index, moves });
        }
    }
    return movesObjArr;
}

export default getAllLegalMoves;