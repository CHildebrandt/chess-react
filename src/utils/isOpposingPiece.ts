import { IEmptySquare, IPiece } from "../types";
import isSameColor from "./isSameColor";

function isOpposingPiece(target: IPiece | IEmptySquare, isBlack: boolean) {
	return target.type && !isSameColor(target, isBlack);
}

export default isOpposingPiece