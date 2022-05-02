import { a1Board, Board } from "../../types";

function getCastles(board: Board) {
    let flag = false;
    let toReturn = ' ';
    if (board[60].hasMoved === false) {
        if (board[63].hasMoved === false) {
            toReturn += 'K';
            flag = true;
        }
        if (board[56].hasMoved === false) {
            toReturn += 'Q';
            flag = true;
        }
    }
    if (board[4].hasMoved === false) {
        if (board[7].hasMoved === false) {
            toReturn += 'k';
            flag = true;
        }
        if (board[0].hasMoved === false) {
            toReturn += 'q';
            flag = true;
        }
    }
    if (!flag) {
        toReturn += '-';
    }
    else {
        return toReturn;
    }
}

/**Returns the board in standardized FEN format. */
function getFen(board: Board, isBlacksTurn: boolean = false, enPessantSquare: (number | false) = false, fiftyCounter: number = 0, fullMoveNum: (number | string[]) = 1) {
    let fen = '';
    const len = board.length;
    let counter = 0;
    for (let i = 0; i < len; i++) {
        if (i !== 0 && i % 8 === 0) {
            if (counter) {
                fen += counter;
                counter = 0;
            }
            fen += '/';
        }
        const t = board[i].type;
        if (t) {
            if (counter) {
                fen += counter;
                counter = 0;
            }
            let toAdd = t;
            if (board[i].isBlack === false) {
                toAdd = toAdd.toUpperCase();
            }
            fen += toAdd;
        }
        else {
            counter += 1;
        }
    }
    if (counter) {
        fen += counter;
    }
    
    fen += (isBlacksTurn) ? ' b' : ' w';
    fen += getCastles(board);
    fen += (enPessantSquare) ? ' ' + a1Board[enPessantSquare] : ' -';
    fen += ' ' + fiftyCounter;
    fen += ' ' + (Array.isArray(fullMoveNum) ? Math.floor(fullMoveNum.length / 2) + 1 : fullMoveNum);

    return fen;
}

export default getFen;