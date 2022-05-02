import { LegalMoves, Board } from "../types";
import detectCheck from "./detectCheck";
import detectDraws from "./detectDraws";

function detectMulti(boardState: Board, isBlacksTurn: boolean, legalMoves: LegalMoves[], fenHistory?: string[], fiftyCounter?: number) {
    const isMate = legalMoves.length === 0;
    const isDraw = detectDraws(boardState, fenHistory, fiftyCounter);
    const isCheck = detectCheck(boardState, isBlacksTurn);
    return {
        isCheck,
        isDraw,
        isMate
    }
}

export default detectMulti