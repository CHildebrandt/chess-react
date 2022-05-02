import { blackInit, whiteInit, Board } from '../types';
import { v1 } from 'uuid';

function getBoardInit(): Board {
    const boardInit: Board = [];
    for (let i = 0; i < 64; i++) {
        if (i < 16) {
            boardInit.push({ id: v1(), type: blackInit[i], isBlack: true, hasMoved: false });
        }
        else if (i > 47) {
            boardInit.push({ id: v1(), type: whiteInit[i - 48], isBlack: false, hasMoved: false })
        }
        else {
            boardInit.push({ id: v1(), type: undefined});
        }
    }
    return boardInit;
}

export default getBoardInit;