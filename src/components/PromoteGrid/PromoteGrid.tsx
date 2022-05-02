import { P } from '../../types';
import useStore from '../../store/store';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBishop, faChessKnight, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';
import style from './PromoteGrid.module.scss';

const { QUEEN, ROOK, KNIGHT, BISHOP } = P;

function PromoteGrid() {
    const isBlacksTurn = useStore(useCallback(s => s.isBlacksTurn, []))
    const promote = useStore(useCallback(s => s.promote, []))
    const color = (isBlacksTurn) ? 'black' : 'white';

    return (
        <div id="promote-grid" className={style.promotegrid}>
            <button onClick={promote(QUEEN)}>
                <FontAwesomeIcon icon={faChessQueen} color={color} />
            </button>
            <button onClick={promote(ROOK)}>
                <FontAwesomeIcon icon={faChessRook} color={color} />
            </button>
            <button onClick={promote(KNIGHT)}>
                <FontAwesomeIcon icon={faChessKnight} color={color} />
            </button>
            <button onClick={promote(BISHOP)}>
                <FontAwesomeIcon icon={faChessBishop} color={color} />
            </button>
        </div>
    )
}

export default PromoteGrid