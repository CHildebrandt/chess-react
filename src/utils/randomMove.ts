import { LegalMoves } from "../types";

function randomMove(possibleMoves: LegalMoves[], movePiece: Function) {
    const randomPieceIndex = Math.round(Math.random() * (possibleMoves.length - 1));
    const randomPiece = possibleMoves[randomPieceIndex];
    const randomMoveIndex = Math.round(Math.random() * (randomPiece.moves.length - 1));
    const randomMove = randomPiece.moves[randomMoveIndex];
    movePiece(randomPiece.index, randomMove);
}

export default randomMove;