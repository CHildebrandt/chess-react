import getSquare from '../utils/getSquare';
import { moveTime, Board } from '../types';

function animateMove(board: Board, from: number, to: number, isCapture: boolean, castlingRook?: [from: number, to: number]) {
    const movingPiece = document.getElementById(board[from].id) as HTMLDivElement;
    if (!movingPiece) {
        return;
    }
    if (isCapture) {
        const capturedPiece = document.getElementById(board[to].id) as HTMLDivElement;
        if (capturedPiece) {
            capturedPiece.style.opacity = '0';
        }
    }
    movingPiece.classList.add('moving');

    movingPiece.style.transition = `transform ${moveTime}ms`;
    const x = getSquare(to).offsetLeft - movingPiece.offsetLeft;
    const y = getSquare(to).offsetTop - movingPiece.offsetTop;
    movingPiece.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    if (castlingRook) {
        setTimeout(() => {
            animateMove(board, castlingRook[0], castlingRook[1], false);
        }, moveTime);
    }
}

export default animateMove;