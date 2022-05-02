import { fenBoardInit } from "../types";
import { isMobile } from "react-device-detect";

// Web workers aren't supported equally - especially on mobile,so one (hacky) workaround is attaching the non-worker version to the window (in index.html), and calling that instead.
//@ts-ignore
const stockfish = (!isMobile) ? new Worker('stockfish/stockfish.js') : stockfishAlias();

export const stockfishGo = () => stockfish.postMessage("go");

export function stockfishUpdate(fen: string) {
    stockfish.postMessage(`position fen ${fen}`);
}

export function stockfishNewGame(fen = fenBoardInit, aiLevel?: number) {
    stockfish.postMessage("uci");
    if (aiLevel) {
        // stockfish difficulty is 0-20
        stockfish.postMessage(`setoption name Skill Level value ${(aiLevel - 2) * 10}`);
    }
    stockfish.postMessage("ucinewgame");
    stockfish.postMessage(`position fen ${fen}`);
}

export default stockfish;