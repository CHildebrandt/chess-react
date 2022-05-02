import { a1Board, LegalMoves, P, Board } from '../../types';
import isLegalMove from '../isLegalMove';

function disambiguate(board: Board, legalMoves: LegalMoves[], type: string, isBlack: boolean, from: number, to: number) {
    if (type === P.PAWN || type === P.KING) {
        return '';
    }
    const ambiguities: number[] = [];
    for (let i = 0; i < 64; i++) {
        if (i === from) {
            continue;
        }
        if (board[i].type === type && board[i].isBlack === isBlack) {
            if (isLegalMove(legalMoves, i, to)) {
                ambiguities.push(i);
            }
        }
    }
    if (ambiguities.length === 0) {
        return '';
    }
    else {
        const onSameRank = ambiguities.filter(boardIndex => Math.floor(boardIndex / 8) === Math.floor(from / 8)).length > 0;
        const onSameFile = ambiguities.filter(boardIndex => boardIndex % 8 === from % 8).length > 0;
        if (onSameRank && onSameFile) {
            return a1Board[from];
        }
        else if (onSameRank) {
            return a1Board[from][0];
        }
        else {
            return a1Board[from][1];
        }
    }
}

/**
 * Notates a move using standard chess notation.
 * @param board the board BEFORE the move was made.
 * @param legalMovesOrPromotion the legal moves available BEFORE the move was made, or the promotion type.
 * */
function notate(board: Board, from: number, to: number, wasCapture: boolean, wasCheck: boolean, wasMate: boolean, legalMovesOrPromotion: (LegalMoves[] | string)) {
    const t = board[from].type; if (!t) return '';
    const isBlack = board[from].isBlack;

    let move = '';
    if (typeof legalMovesOrPromotion === 'string') {
        move += (wasCapture ? a1Board[from][0] + 'x' : '') + a1Board[to] + '=' + legalMovesOrPromotion.toUpperCase();
    }
    else {
        if (t !== P.PAWN) {
            move += t.toUpperCase();
        }
        move += disambiguate(board, legalMovesOrPromotion, t, isBlack!, from, to);
        if (wasCapture) {
            if (t === P.PAWN) move += a1Board[from][0];
            move += 'x';
        }
        move += a1Board[to];
    }
    if (t === P.KING && Math.abs(from - to) === 2) {
        move = (from > to) ? 'O-O-O' : 'O-O';
    }
    if (wasCheck && wasMate) move += '#';
    else if (wasCheck) move += '+';
    
    return move;
}

export default notate;