/**Converts index 0-63 to coordinates y: 0-7, x: 0-7 (like a 2d array) */
function yx(boardIndex: number): [yCoord: number, xCoord: number] {
    return [Math.floor(boardIndex / 8), boardIndex % 8];
}

export default yx;