import { SetState } from 'zustand';
import { MODE, EVENTS } from '../types';
import { stockfishGo } from '../worker/stockfishWorker';
import { Store } from './store';

function handleNewTurn(set: SetState<Store>, get: () => Store) {
    const { paused, isPlayersTurn, gameMode, makeRandomMove, boardEvent } = get();

    if (!paused && (boardEvent === EVENTS.NONE || boardEvent === EVENTS.CHECK)) {
        const calculating = !isPlayersTurn;
        set({ calculating });
        if (calculating) {
            if (gameMode === MODE.NORMAL || gameMode === MODE.DOUBLE_AI) {
                stockfishGo();
            }
            else {
                setTimeout(makeRandomMove, 100);
            }
        }
    }
}

export default handleNewTurn;