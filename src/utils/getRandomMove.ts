import { LegalMoves } from "../types";

function getRandomMove(legalMoves: LegalMoves[]): {from: number, to: number} {
    const randomPieceIndex = Math.round(Math.random() * (legalMoves.length - 1));
    const randomPiece = legalMoves[randomPieceIndex];
    const randomMoveIndex = Math.round(Math.random() * (randomPiece.moves.length - 1));
    const randomMove = randomPiece.moves[randomMoveIndex];
    return {
        from: randomPiece.index,
        to: randomMove
    }
}

export default getRandomMove