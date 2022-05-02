import { axes, P, Board } from '../types';
import getMovePattern from './getMovePattern';
import detectCheck from '../detection/detectCheck';
import getAxis from '../utils/getAxis';
import isSameColor from '../utils/isSameColor';
import isOpposingPiece from '../utils/isOpposingPiece';
import swap from '../utils/swap';
import clear from '../utils/clear';
import outOfRange from '../utils/outOfRange';
import yx from '../utils/yx';

const { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } = P;

function allowCastle(board: Board, isBlack: boolean, kingIndex: number, kingSide: boolean) {
	const squares = (kingSide) ? [kingIndex + 1, kingIndex + 2] : [kingIndex - 1, kingIndex - 2, kingIndex - 3];
	for (const i of squares) {
		if (board[i].type !== undefined) {
			return false;
		}
	}
	if (board[kingIndex + ((kingSide) ? 3 : -4)].hasMoved || detectCheck(board, isBlack) || detectCheck(board, isBlack, squares[0])) {
		return false;
	}
	return true;
}

function oppKingAttacksSquare(y: number, x: number, board: Board, isBlack: boolean) {
	for (const i of axes) {
		const [yInc, xInc] = getAxis(i);
		const dy = y + yInc;
		const dx = x + xInc;
		if (outOfRange(dy, dx)) {
			continue;
		}
		const square = board[dy * 8 + dx];
		if (square.type === KING && square.isBlack !== isBlack) {
			return true;
		}
	}
	return false;
}

function isValidMove(y: number, x: number, board: Board, isBlack: boolean): -1 | 0 | 1 {
	if (outOfRange(y, x)) {
		return -1;
	}
	const square = board[y * 8 + x];
	if (isSameColor(square, isBlack)) {
		return -1;
	}
	if (isOpposingPiece(square, isBlack)) {
		return 1;
	}
	return 0; // if path is unblocked
}

function getDirectionalMoves(directions: number[], y: number, x: number, board: Board, isBlack: boolean) {
	const legal: number[] = [];
	for (const direction of directions) {
		const [yMult, xMult] = getAxis(direction);
		for (let i = 1; i <= 7; i++) { // 7 is max distance in any direction
			const nY = y + (i * yMult);
			const nX = x + (i * xMult);
			const isValid = isValidMove(nY, nX, board, isBlack);
			if (isValid === -1) {
				break; // if invalid or own piece blocks path
			}
			else if (isValid === 0) {
				legal.push(nY * 8 + nX);  // if unblocked
			}
			else { // if opponent's piece
				legal.push(nY * 8 + nX);
				break;
			}
		}
	}
	return legal;
}

// Splices self-causing of checks, by simulating the moves.
function removeChecksAgainstSelf(board: Board, legalMoves: number[], from: number, isBlack: boolean) {
	for (let i = legalMoves.length - 1; i >= 0; i--) {
		const to = legalMoves[i];
		let cloned = undefined;
		if (isOpposingPiece(board[to], isBlack)) {
			cloned = { ...board[to] };
			board[to] = clear();
		}
		swap(board, from, to);
		if (detectCheck(board, isBlack)) {
			legalMoves.splice(i, 1);
		}
		// Undo simulated move. Significantly better performance than cloning the entire board at every iteration
		swap(board, to, from);
		if (cloned) {
			board[to] = cloned;
		}
	}
}

function getLegalMoves(board: Board, index: number, enPassant: number | false = false) {
	const piece = board[index];
	const type = piece.type;
	const isBlack = piece.isBlack;
	if (typeof isBlack !== 'boolean') return [];

	let legalMoves: number[] = [];
	const [y, x] = yx(index);

	if (type === PAWN || type === KING || type === KNIGHT) {
		for (const virtualMove of getMovePattern(type, piece.hasMoved, isBlack)) {
			const vy = y + virtualMove[0];
			const vx = x + virtualMove[1];
			if (outOfRange(vy, vx)) {
				continue;
			}
			const vIndex = (vy * 8) + vx;
			const square = board[vIndex];
			if (type === PAWN) {
				if (virtualMove[1] !== 0) { // diagonal capture + en pessant, nesting necessary
					if (!isOpposingPiece(square, isBlack) && enPassant !== vIndex) {
						continue;
					}
				}
				else if (Math.abs(virtualMove[0]) === 2 && board[index + (isBlack ? 8 : -8)].type) { // prevent jumping over piece in front on first move
					continue;
				}
				else if (square.type) {
					continue; // forward block
				}
			}
			else {
				if (type === KING) {
					if (oppKingAttacksSquare(vy, vx, board, isBlack)) {
						continue;
					}
					if (Math.abs(virtualMove[1]) === 2 && !allowCastle(board, isBlack, index, virtualMove[1] === 2)) { // castling
						continue;
					}
				}
				if (isSameColor(square, isBlack)) {
					continue;
				}
			}
			legalMoves.push(vIndex);
		}
    }
	else if (type === QUEEN) {
		legalMoves = getDirectionalMoves(axes, y, x, board, isBlack);
	}
	else if (type === BISHOP) {
		legalMoves = getDirectionalMoves([1, 3, 7, 9], y, x, board, isBlack);
	}
	else if (type === ROOK) {
		legalMoves = getDirectionalMoves([2, 4, 6, 8], y, x, board, isBlack);
	}

	removeChecksAgainstSelf(board, legalMoves, index, isBlack);
	
	return legalMoves;
}

export default getLegalMoves;