/**
Checks if coordinates are out of range of the board.
 */

function outOfRange(y: number, x: number) {
    return (y < 0 || y > 7 || x < 0 || x > 7);
}

export default outOfRange;