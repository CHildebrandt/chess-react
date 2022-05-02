import isLegalMove from '../utils/isLegalMove';
import { stockfishGo, stockfishNewGame } from '../worker/stockfishWorker';
import { Store } from './store';

function handleStockfishMove(get: () => Store, from: number, to: number, promotion?: string) {
    const { paused, movePiece, legalMoves } = get();
    if (!paused) {
        if (isLegalMove(legalMoves, from, to)) {
            movePiece(from, to, promotion);
        }
        // playing it safe as the AI library is timing sensitive and could theoretically freeze on lower-end devices. If that happens, then reset.
        // alternatively you could switch to a different AI script, or API.
        else {
            // console.log('illegal?: ' + a1Board[from], a1Board[to], promotion);
            setTimeout(() => {
                const { aiDepth, fen } = get();
                stockfishNewGame(fen, aiDepth);
                stockfishGo();
            }, 1000);
            
        }
    }
}

export default handleStockfishMove;