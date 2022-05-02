import getSquare from '../utils/getSquare';

function highlightLegalMoves(legal?: number[]) {
    if (!legal) {
        const arr = Array.from(document.getElementsByClassName('highlight'));
        arr.forEach(x => x.classList.remove('highlight'));
    }
    else {
        legal.forEach((x) => {
            const id = getSquare(x) as HTMLDivElement;
            id.classList.add('highlight');
        })
    }
}

export default highlightLegalMoves;