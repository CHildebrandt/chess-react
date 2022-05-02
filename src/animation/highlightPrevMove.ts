import getSquare from "../utils/getSquare";

function highlightPrevMove(from: number, to: number, wipeOnly: boolean = false) {
    const h = Array.from(document.getElementsByClassName('prev-move'));
    h.forEach(x => x.classList.remove('prev-move'));
    if (wipeOnly) {
        return;
    }
    getSquare(from).classList.add('prev-move');
    getSquare(to).classList.add('prev-move');
}

export default highlightPrevMove;