import { P, Board, EVENTS } from '../types';

const { DRAW_NO_WIN, DRAW_REPETITION, DRAW_50 } = EVENTS;

function detectDraws(board: Board, log?: string[], fiftyCounter: number = 0): false | string {
    if (fiftyCounter > 49) {
        return DRAW_50;
    }
    const remainingPieces = board.filter(x => x.type !== undefined);
    if (remainingPieces.length === 2) {
        return DRAW_NO_WIN; // two kings
    }
    if (remainingPieces.length === 3) {
        if (remainingPieces.findIndex(x => x.type === P.BISHOP) !== -1 || remainingPieces.findIndex(x => x.type === P.KNIGHT) !== -1) {
            return DRAW_NO_WIN;
        }
    }
    if (remainingPieces.length === 4) {
        const bishops = remainingPieces.filter(x => x.type === P.BISHOP);
        if (bishops.length === 2) {
            if (board.findIndex(x => x.id === bishops[0].id) % 2 === board.findIndex(x => x.id === bishops[1].id) % 2) { // bishops on same colored square
                return DRAW_NO_WIN;
            }
        }
    }
    if (log) {
        const slice = log.map(entry => entry.split(' ').slice(0, -2).join(' '));
        let repeats = 1;
        for (let i = slice.length - 1; i >= 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                if (slice[i] === slice[j]) {
                    repeats += 1;
                }
            }
            if (repeats > 2) {
                return DRAW_REPETITION;
            }
            else {
                repeats = 1;
            }
        }
    }
    return false;
}

export default detectDraws;