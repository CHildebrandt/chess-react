// might as well be null, but having the same keys as a piece makes type safety so much simpler
export interface IEmptySquare {
    id: string;
    type: undefined;
    isBlack?: undefined;
    hasMoved?: undefined;
}

export interface IPiece {
    id: string;
    type: string;
    isBlack: boolean;
    hasMoved: boolean;
}

export type Board = (IPiece | IEmptySquare)[];

export interface LegalMoves {
    index: number;
    moves: number[];
}

export type AI = [number, number, string];

export const P = {
    PAWN: 'p',
    BISHOP: 'b',
    KNIGHT: 'n',
    ROOK: 'r',
    QUEEN: 'q',
    KING: 'k'
}

const { PAWN, BISHOP, KNIGHT, ROOK, QUEEN, KING } = P

// yes, letters are arbitrary
export const MODE = {
    NORMAL: 'n',
    RANDOM: 'r',
    DOUBLE_AI: 'a',
    DOUBLE_RANDOM: 'd',
    CONTROL_BOTH: 'c'
}

export const EVENTS = {
    NONE: 'z',
    WHITE_MATED: 'a',
    BLACK_MATED: 'b',
    CHECK: 'c',
    DRAW_REPETITION: 'd',
    DRAW_NO_MOVES: 'e',
    DRAW_NO_WIN: 'f',
    DRAW_50: 'g'
}

export const a1Board = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
];

export const fenBoardInit = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const blackInit = [
    ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK,
    PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN
]

export const whiteInit = [
    PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN,
    ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK
]

export const moveTime = 300;

export const axes: (1|2|3|4|6|7|8|9)[] = [1, 2, 3, 4, 6, 7, 8, 9];

export const lang = window.navigator.language;
export const da = lang === 'da';