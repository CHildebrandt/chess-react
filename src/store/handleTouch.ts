import { SetState } from 'zustand';
import { Store } from './store';
import { EVENTS } from '../types';
import isLegalMove from '../utils/isLegalMove';
import highlightLegalMoves from '../animation/highlightLegalMoves';

function handleTouch(set: SetState<Store>, get: () => Store, touchIndex: number) {
    const { legalMoves, selected, movePiece, board, isPlayersTurn, calculating, promoting, boardEvent } = get();
    if (!isPlayersTurn || calculating || promoting || (boardEvent !== EVENTS.NONE && boardEvent !== EVENTS.CHECK)) {
        return;
    }
    highlightLegalMoves();
    const legalIndex = legalMoves.findIndex(x => x.index === touchIndex);
    if (isLegalMove(legalMoves, selected, touchIndex)) {
        movePiece(selected, touchIndex);
    }
    // if touched square is a piece and not already selected, and has moves, then select it
    else if (selected !== touchIndex && board[touchIndex].type && legalIndex !== -1) {
        set({ selected: touchIndex });
        highlightLegalMoves(legalMoves[legalIndex].moves);
    }
    else { // if no move was made and no piece was selected or the piece has no legal moves then cancel
        set({ selected: -1 });
    }
}

export default handleTouch;