import { Board } from "../types";

/** Clones the entire board (for immutable updates and virtualization). */
function clone(board: Board): Board {
    return board.map((p) => ({ ...p }))
}

export default clone