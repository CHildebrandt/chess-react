function isSameColor(target: { isBlack?: boolean }, pieceIsBlack: boolean) {
    return pieceIsBlack === target.isBlack;
}

export default isSameColor;