import { MODE } from "../types";

function getIsPlayersTurn(playerIsBlack: boolean, isBlacksTurn: boolean, gameMode: string) {
    if (gameMode === MODE.DOUBLE_RANDOM || gameMode === MODE.DOUBLE_AI) {
        return false;
    }
    if (gameMode === MODE.CONTROL_BOTH) {
        return true;
    }
    if (gameMode === MODE.NORMAL || gameMode === MODE.RANDOM) {
        if (playerIsBlack === isBlacksTurn) {
            return true;
        }
    }
    return false;
}

export default getIsPlayersTurn;