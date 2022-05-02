import create from 'zustand';
import { LegalMoves, MODE, P, Board, EVENTS, fenBoardInit } from '../types';
import getAllLegalMoves from '../calculation/getAllLegalMoves';
import getBoardInit from '../utils/getBoardInit';
import getRandomMove from '../utils/getRandomMove';
import getIsPlayersTurn from '../utils/getIsPlayersTurn';
import handleNewTurn from './handleNewTurn';
import handleMovePiece from './handleMovePiece';
import handleNewGame from './handleNewGame';
import handlePlayerPromote from './handlePlayerPromote';
import handleTouch from './handleTouch';
import handeStockfishMove from './handleStockfishMove';

export interface Store {
    gameMode: string;
    board: Board;
    log: string[];
    fen: string;
    fenHistory: string[];
    boardEvent: string;
    isBlacksTurn: boolean;
    legalMoves: LegalMoves[];

    playerIsBlack: boolean;
    isPlayersTurn: boolean;
    setPlayerIsBlack: (playerIsBlack: boolean) => void;
    calculating: boolean;
    promoting: false | {from: number, to: number, isCapture: boolean};
    paused: boolean;
    setPaused: (paused: boolean) => void;
    
    menuOpen: boolean;
    setMenuOpen: (menuOpen: boolean) => void;

    aiMessage: string;
    aiDepth: number;
    selected: number;
    enPassant: number | false;

    newGame: (mode: string, aiLevel: number) => void;
    nextTurn: () => void;
    touchPiece: (index: number) => () => void;
    movePiece: (from: number, to: number, promotion?: string) => void;
    promote: (type: string) => () => void;
    openMenu: () => void;

    makeRandomMove: () => void;
    stockfishMove: (from: number, to: number, promotion?: string) => void;
    fiftyCounter: number;
    windowSize: { width: number, height: number };
    setWindowSize: (size: { width: number, height: number }) => void;
}

const useStore = create<Store>((set, get) => ({
    gameMode: MODE.NORMAL,
    board: getBoardInit(),
    boardEvent: EVENTS.NONE,
    log: [],
    fen: fenBoardInit,
    fenHistory: [fenBoardInit],
    isBlacksTurn: false,
    legalMoves: getAllLegalMoves(getBoardInit(), false),
    
    playerIsBlack: false,
    isPlayersTurn: true,
    setPlayerIsBlack: (playerIsBlack) => {
        const { isBlacksTurn, gameMode } = get();
        set({
            playerIsBlack,
            isPlayersTurn: getIsPlayersTurn(playerIsBlack, isBlacksTurn, gameMode)
        })
    },
    calculating: false,
    promoting: false,
    paused: false,
    setPaused: (paused) => set({ paused }),
    
    menuOpen: false,
    setMenuOpen: (menuOpen) => set({ menuOpen }),

    aiMessage: ' ',
    aiDepth: 2,
    selected: -1,
    enPassant: false,

    newGame: (gameMode, aiLevel) => handleNewGame(set, get, gameMode, aiLevel),
    nextTurn: () => handleNewTurn(set, get),
    touchPiece: (index) => () => handleTouch(set, get, index),
    movePiece: (from, to, promotion) => handleMovePiece(set, get, from, to, promotion),
    promote: (type) => () => handlePlayerPromote(set, get, type),
    openMenu: () => set({ menuOpen: true, paused: true }),

    makeRandomMove: () => {
        const { legalMoves, movePiece, board } = get();
        const { from, to } = getRandomMove(legalMoves);
        const promotion = (board[from].type === P.PAWN && (to < 8 || to > 56)) ? P.QUEEN : undefined;
        movePiece(from, to, promotion);
    },
    stockfishMove: (from, to, promotion) => handeStockfishMove(get, from, to, promotion),
    fiftyCounter: 0,
    windowSize: { width: 0, height: 0 },
    setWindowSize: (windowSize) => set({ windowSize })
}))

export default useStore;