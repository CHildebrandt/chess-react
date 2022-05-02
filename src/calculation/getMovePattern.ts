import { P } from '../types';
const { PAWN, KNIGHT, KING } = P;

function getMovePattern(piece: string, hasMoved: boolean, isBlack: boolean): [y: number, x: number][] {
	switch (piece) {
		case PAWN: {
			if (!hasMoved) {
				if (isBlack) {
					return [[2, 0], [1, 0], [1, 1], [1, -1]];
				}
				else {
					return [[-2, 0], [-1, 0], [-1, 1], [-1, -1]];
				}
			}
			else {
				if (isBlack) {
					return [[1, 0], [1, 1], [1, -1]];
				}
				else {
					return [[-1, 0], [-1, 1], [-1, -1]];
				}
			}
		}
		case KNIGHT: {
			return [[1, -2], [1, 2], [-1, -2], [-1, 2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
		}
		case KING: {
			if (!hasMoved) return [[1, 0], [1, 1], [1, -1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1], [0, -2], [0, 2]];
			return [[1, 0], [1, 1], [1, -1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]];
		}
		default: {
			return [];
		}
	}
}

export default getMovePattern;