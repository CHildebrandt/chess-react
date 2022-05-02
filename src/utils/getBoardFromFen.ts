import detectCheck from "../detection/detectCheck";
import { P, Board } from "../types";
import getBoardInit from "./getBoardInit";
import clear from "./clear";
import convertAlgebraic from "./notation/convertAlgebraic";
import swap from "./swap";

function getBoardFromFen(fen: string, turnNum?: number): {board: Board, enPassant: number | false, fiftyCounter: number} {
    if (!fen.includes('moves')) {
        return { board: getBoardInit(), enPassant: false, fiftyCounter: 0 };
    }
    let fiftyCounter = 0;
    const moves = fen.split('moves ')[1].split(' ');
    const movesObjArr = moves.map(move => convertAlgebraic(move));
    const len = turnNum || movesObjArr.length - 1;
    const board = getBoardInit();
    for (let i = 0; i <= len; i++) {
        const from = movesObjArr[i].from;
        const to = movesObjArr[i].to;
        const promotion = movesObjArr[i].promotion;
        if (board[to].type) {
            board[to] = clear();
            fiftyCounter = 0;
        }
        if (promotion) {
            board[from].type = promotion;
        }
        if (board[from].hasMoved === false) {
            board[from].hasMoved = true;
        }
        swap(board, from, to);

        if (promotion || board[to].type === P.PAWN || detectCheck(board, i % 2 === 0)) {
            fiftyCounter = 0;
        }
        else {
            fiftyCounter += 1;
        }
    }
    const enPassant = (board[len].type === P.PAWN && Math.abs(movesObjArr[len].from - movesObjArr[len].to) === 16) ? movesObjArr[len].to : false;
    return {
        board,
        enPassant,
        fiftyCounter
    };
}

export default getBoardFromFen;