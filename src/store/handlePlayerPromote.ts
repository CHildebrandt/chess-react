import { SetState } from 'zustand';
import { a1Board } from '../types';
import getAllLegalMoves from '../calculation/getAllLegalMoves';
import notate from '../utils/notation/notate';
import detectMulti from '../detection/detectMulti';
import getNewBoard from '../calculation/getNewBoard';
import getIsPlayersTurn from '../utils/getIsPlayersTurn';
import getBoardEvent from '../utils/getBoardEvent';
import getFen from '../utils/notation/getFen';
import { stockfishUpdate } from '../worker/stockfishWorker';
import { Store } from './store';

function handlePlayerPromote(set: SetState<Store>, get: () => Store, type: string) {
    const { board, log, isBlacksTurn, fen, promoting, playerIsBlack, gameMode, fenHistory } = get();
    const { from, to, isCapture } = promoting as { from: number; to: number; isCapture: boolean; };
    const newBoard = getNewBoard(board, from, to, isCapture, false, false, type);

    const legalMoves = getAllLegalMoves(newBoard, !isBlacksTurn, false);
    const { isCheck, isMate, isDraw } = detectMulti(newBoard, !isBlacksTurn, legalMoves);
    const newFen = fen + ' ' + a1Board[from] + a1Board[to] + type;
    stockfishUpdate(newFen);
    set({
        board: newBoard,
        log: [...log, notate(board, from, to, isCapture, isCheck, isMate, type)],
        fen: newFen,
        fenHistory: [...fenHistory, getFen(newBoard, !isBlacksTurn, false, 0, fenHistory)],
        boardEvent: getBoardEvent(!isBlacksTurn, isCheck, isMate, isDraw),
        isBlacksTurn: !isBlacksTurn,
        legalMoves,
        isPlayersTurn: getIsPlayersTurn(playerIsBlack, !isBlacksTurn, gameMode),
        promoting: false,
        fiftyCounter: 0,
        selected: -1,
        enPassant: false
    });
}

export default handlePlayerPromote;