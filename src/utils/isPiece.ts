function isPiece(obj: { type?: string }) {
	return obj.type !== undefined;
}

export default isPiece