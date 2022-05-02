import { a1Board } from "../../types";

function convertAlgebraic(code: string): {from: number, to: number, promotion?: string} {
    const promotion = (code.length > 4) ? code.substring(4) : undefined;
    const fromCode = code.substring(0, 2);
    const toCode = code.substring(2, 4);
    const from = a1Board.indexOf(fromCode);
    const to = a1Board.indexOf(toCode);
    return {
        from,
        to,
        promotion
    }
}

export default convertAlgebraic;