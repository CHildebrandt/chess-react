import { useCallback, memo } from "react";
import useStore from "../store/store";
import { P } from "../types";
import Pawn from "./pieces/Pawn";
import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Rook from "./pieces/Rook";
import Queen from "./pieces/Queen";
import King from "./pieces/King";

const EmptySquare = memo((props: { id: string, index: number }) => {
    const { index } = props;
    const handleTouch = useStore(useCallback(s => s.touchPiece, []));
    return <div aria-label="Empty square" className="empty" onClick={handleTouch(index)} />;
})

function Pieces() {
    const board = useStore(useCallback(s => s.board, []));
    const playerIsBlack = useStore(useCallback(s => s.playerIsBlack, []));
    return (
        <div className={`virtual-board${(playerIsBlack) ? ' flipped' : ''}`} id="virtual-board">
            {board.map(({ id, type, isBlack }, index) => {
                if (isBlack === undefined) {
                    return <EmptySquare key={id} id={id} index={index} />;
                }
                else {
                    switch (type) {
                        case P.PAWN: 
                            return <Pawn isBlackPiece={isBlack} pieceID={id} key={id} index={index} />;
                        case P.BISHOP: 
                            return <Bishop isBlackPiece={isBlack} pieceID={id} key={id} index={index} />;
                        case P.KNIGHT: 
                            return <Knight isBlackPiece={isBlack} pieceID={id} key={id} index={index} />;
                        case P.ROOK: 
                            return <Rook isBlackPiece={isBlack} pieceID={id} key={id} index={index} />;
                        case P.QUEEN: 
                            return <Queen isBlackPiece={isBlack} pieceID={id} key={id} index={index} />;
                        default: 
                            return <King isBlackPiece={isBlack} pieceID={id} key={id} index={index} />;
                    }
                }
            })}
        </div>
    )
}

export default memo(Pieces)