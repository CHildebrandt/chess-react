
/**Returns directions for y- and x-coordinates (in this order!). Used for detection */
function getAxis(axis: number): [yDirection: (-1 | 0 | 1), xDirection: (-1 | 0 | 1)] {
        
    // arbitrary numbers representing directions
    //   7 8 9
    //   4 * 6
    //   1 2 3
     
    let yInc: (-1 | 0 | 1) = 0;
    let xInc: (-1 | 0 | 1) = 0;

    if (axis < 4) {
        yInc = -1;
    }
	else if (axis > 6) {
        yInc = 1;
    }
	if (axis % 3 === 1) {
        xInc = -1;
    }
	else if (axis % 3 === 0) {
        xInc = 1;
    }

    return [yInc, xInc];
}

export default getAxis;

// [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]