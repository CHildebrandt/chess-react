import { SetState } from 'zustand';
import { Store } from './store';
import { moveTime, P, a1Board } from '../types';
import getAllLegalMoves from '../calculation/getAllLegalMoves';
import highlightPrevMove from '../animation/highlightPrevMove';
import notate from '../utils/notation/notate';
import detectMulti from '../detection/detectMulti';
import getNewBoard from '../calculation/getNewBoard';
import detectPromotion from '../detection/detectPromotion';
import animateMove from '../animation/animateMove';
import getIsPlayersTurn from '../utils/getIsPlayersTurn';
import getBoardEvent from '../utils/getBoardEvent';
import getFen from '../utils/notation/getFen';
import { stockfishUpdate } from '../worker/stockfishWorker';
import getCastlingRook from '../utils/getCastlingRook';
import getEnPassant from '../utils/getEnPassant';

function handleMovePiece(set: SetState<Store>, get: () => Store, from: number, to: number, promotion?: string) {
    const { board, log, isBlacksTurn, playerIsBlack, gameMode, fiftyCounter, fen, legalMoves, fenHistory, enPassant, isPlayersTurn } = get();
    set({ calculating: true });
    const isCapture = board[to].type !== undefined;
    const castlingRook = getCastlingRook(board, from, to);
    animateMove(board, from, to, isCapture, castlingRook);

    setTimeout(() => {
        highlightPrevMove(from, to);
        const newBoard = getNewBoard(board, from, to, isCapture, castlingRook !== undefined, enPassant, promotion);
        // buffer the move while player picks promotion type
        if (isPlayersTurn && detectPromotion(newBoard)) {
            set({
                promoting: { from, to, isCapture },
                calculating: false
            });
        }
        else {
            const newEnPassant = getEnPassant(board, isBlacksTurn, from, to);
            const newFiftyCounter = (isCapture || board[from].type === P.PAWN) ? 0 : fiftyCounter + 1;
            const newFenHistory = [...fenHistory, getFen(newBoard, !isBlacksTurn, newEnPassant, newFiftyCounter, fenHistory)];
            const newLegalMoves = getAllLegalMoves(newBoard, !isBlacksTurn, newEnPassant);
            const { isCheck, isMate, isDraw } = detectMulti(newBoard, !isBlacksTurn, newLegalMoves, newFenHistory, newFiftyCounter);
            const newFen = fen + (log.length ? ' ' : ' moves ') + a1Board[from] + a1Board[to] + (promotion || '');
            stockfishUpdate(newFen);
            set({
                board: newBoard,
                log: [...log, notate(board, from, to, isCapture, isCheck, isMate, (promotion || legalMoves))],
                boardEvent: getBoardEvent(!isBlacksTurn, isCheck, isMate, isDraw),
                fen: newFen,
                fenHistory: newFenHistory,
                isBlacksTurn: !isBlacksTurn,
                isPlayersTurn: getIsPlayersTurn(playerIsBlack, !isBlacksTurn, gameMode),
                legalMoves: newLegalMoves,
                calculating: false,
                enPassant: newEnPassant,
                fiftyCounter: newFiftyCounter,
                selected: -1
            });
        }
    }, (castlingRook ? moveTime * 2 : moveTime) * 1.1);
}

export default handleMovePiece;