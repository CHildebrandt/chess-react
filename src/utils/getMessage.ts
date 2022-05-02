import { lang, EVENTS } from "../types";

const da = lang === 'da';

export default function getMessage(e: string): string {
    if (e === EVENTS.WHITE_MATED) {
        return (da) ? 'Skakmat - Hvid vandt' : 'Checkmate - White won';
    }
    if (e === EVENTS.BLACK_MATED) {
        return (da) ? 'Skakmat - Sort vandt' : 'Checkmate - Black won';
    }
    if (e === EVENTS.DRAW_NO_WIN) {
        return (da) ? 'Remis - ingen kan vinde' : 'Stalemate - neither can win';
    }
    if (e === EVENTS.DRAW_REPETITION) {
        return (da) ? 'Remis - repetition' : 'Draw by repetition';
    }
    if (e === EVENTS.DRAW_NO_MOVES) {
        return (da) ? 'Remis - ingen træk' : 'Stalemate';
    }
    if (e === EVENTS.CHECK) {
        return (da) ? 'Skak' : 'Check';
    }
    return ' ';
}
