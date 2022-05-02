import { EVENTS } from "../types";

const { NONE, DRAW_NO_MOVES, BLACK_MATED, WHITE_MATED, CHECK } = EVENTS;

function getBoardEvent(isBlacksTurn: boolean, isCheck: boolean, isMate: boolean, draw: string | false) {
    if (isCheck && isMate) {
        if (isBlacksTurn) {
            return WHITE_MATED;
        }
        else {
            return BLACK_MATED;
        }
    }
    if (draw) {
        return draw;
    }
    if (isMate) {
        return DRAW_NO_MOVES;
    }
    if (isCheck) {
        return CHECK;
    }
    return NONE;
}

export default getBoardEvent;