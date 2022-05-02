import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
import useStore from '../../store/store';

function Bishop(props: { isBlackPiece: boolean, pieceID: string, index: number }) {
    const { isBlackPiece, pieceID, index } = props;
    const touchPiece = useStore(s => s.touchPiece);
    return (
        <div aria-label={`${isBlackPiece ? 'Black' : 'White'} Bishop`} 
            className={`piece ${(isBlackPiece) ? 'black' : 'white'}`} 
            id={pieceID} onClick={touchPiece(index)}
        >
            <FontAwesomeIcon icon={faChessBishop} color={(isBlackPiece) ? "black" : "white"} stroke={(isBlackPiece) ? "white" : "black"} />
        </div>
    )
}

export default memo(Bishop);