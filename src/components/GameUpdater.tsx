import { useCallback, useEffect, useLayoutEffect } from "react";
import deAnimate from "../animation/deAnimate";
import useStore from "../store/store";
import stockfish, { stockfishNewGame } from "../worker/stockfishWorker";
import convert from "../utils/notation/convertAlgebraic";
import animateMove from "../animation/animateMove";

/**
 * Effects-only component that updates the store every turn.
 * Might as well reside in a regular component.
 */
function GameUpdater() {
    const gameMode = useStore(useCallback(s => s.gameMode, []));
    const board = useStore(useCallback(s => s.board, []));
    const paused = useStore(useCallback(s => s.paused, []));
    const nextTurn = useStore(useCallback(s => s.nextTurn, []));
    const stockfishMove = useStore(useCallback(s => s.stockfishMove, []));
    const [windowSize, promoting] = useStore(useCallback(s => [s.windowSize, s.promoting], []));

    useEffect(() => {
        stockfish.onmessage = (event: { data: string } | string) => {
            if (typeof event === 'string') {
                event = { data: event };
            }
            if (event.data && event.data.startsWith("bestmove")) {
                const algebraic = event.data.split(' ')[1];
                const { from, to, promotion } = convert(algebraic);
                stockfishMove(from, to, promotion);
            }
            // console.log(event.data)
        }
        stockfishNewGame();
    }, [stockfishMove])

    useEffect(nextTurn, [board, paused, gameMode, nextTurn]);

    // Since we're animating between positions using imperative code, we clear any CSS transforms before the DOM repaints.
    useLayoutEffect(deAnimate, [board]);

    // For the unlikely case of window resizing while promoting (update the moving pawn's absolute transform offset).
    useEffect(() => {
        if (promoting) {
            deAnimate();
            animateMove(board, promoting.from, promoting.to, false);
        }
    }, [board, promoting, windowSize])

    return <></>
}

export default GameUpdater;