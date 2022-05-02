import { P, Board } from '../types';
import swap from '../utils/swap';
import clear from '../utils/clear';
import clone from '../utils/clone';

function getNewBoard(board: Board, from: number, to: number, isCapture: boolean, isCastle: boolean, enPassantIndex: number | false, promotion?: string) {
    const clonedBoard = clone(board);
    if (isCapture) {
        clonedBoard[to] = clear();
    }
    else if (isCastle) {
        // castle right
        if (from < to) {
            swap(clonedBoard, from + 3, from + 1);
        }
        // castle left
        else {
            swap(clonedBoard, from - 4, from - 1);
        }
    }
    else if (clonedBoard[from].type === P.PAWN && to === enPassantIndex) {
        // white takes en passant
        if (to < from) {
            clonedBoard[to + 8] = clear();
        }
        // black takes en passant
        else {
            clonedBoard[to - 8] = clear();
        }
    }
    if (promotion) {
        clonedBoard[from].type = promotion;
    }
    clonedBoard[from].hasMoved = true;
    swap(clonedBoard, to, from);

    return clonedBoard;
}

export default getNewBoard;