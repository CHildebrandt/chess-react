import { SetState } from 'zustand';
import { fenBoardInit, EVENTS } from '../types';
import getAllLegalMoves from '../calculation/getAllLegalMoves';
import getBoardInit from '../utils/getBoardInit';
import highlightPrevMove from '../animation/highlightPrevMove';
import getIsPlayersTurn from '../utils/getIsPlayersTurn';
import { stockfishNewGame } from '../worker/stockfishWorker';
import { Store } from './store';

function handleNewGame(set: SetState<Store>, get: () => Store, gameMode: string, aiDepth: number) {
    set({ paused: true });
    setTimeout(() => {
        const { playerIsBlack } = get();
        highlightPrevMove(0, 0, true);
        const isPlayersTurn = getIsPlayersTurn(playerIsBlack, false, gameMode);
        stockfishNewGame(undefined, aiDepth);
        set({
            gameMode,
            board: getBoardInit(),
            log: [],
            fen: fenBoardInit,
            fenHistory: [fenBoardInit],
            boardEvent: EVENTS.NONE,
            isBlacksTurn: false,
            isPlayersTurn,
            aiMessage: ' ',
            aiDepth,
            paused: false,
            enPassant: false,
            calculating: false,
            selected: -1,
            fiftyCounter: 0,
            legalMoves: getAllLegalMoves(getBoardInit(), false),
            promoting: false
        });
    }, 500);
}

export default handleNewGame;