import { a1Board } from '../types';

/** Gets the DOM element for a given square number. */
function getSquare(num: number) {
    return document.getElementById('square-' + a1Board[num]) as HTMLDivElement;
}

export default getSquare;