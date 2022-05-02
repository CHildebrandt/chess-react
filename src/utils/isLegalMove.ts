import { LegalMoves } from "../types";

function isLegalMove(legalMoves: LegalMoves[], from: number, to: number) {
    if (from !== -1) {
        const indexOfSelected = legalMoves.findIndex(legalMove => legalMove.index === from);
        if (indexOfSelected === -1) {
            return false;
        }
        const pieceMoves = legalMoves[indexOfSelected].moves;
        return pieceMoves.findIndex(x => x === to) !== -1;
    }
    return false;
}

export default isLegalMove;