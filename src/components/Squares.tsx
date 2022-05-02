import { a1Board } from '../types';
import { memo } from 'react';
import useStore from '../store/store';

function Square(props: { squareNum: number }) {
    const { squareNum } = props;
    let isBlack = squareNum % 2 !== 0;
    if (squareNum % 16 <= 8 && squareNum % 16 !== 0) {
        isBlack = squareNum % 2 === 0;
    }
    return (
        <div className={`square ${(isBlack) ? 'black' : 'white'}`} id={'square-' + a1Board[squareNum - 1]} />
    )
}

function Squares() {
    const playerIsBlack = useStore(s => s.playerIsBlack);
    return (
        <div className={`board${(playerIsBlack) ? ' flipped' : ''}`} id="board">
            {a1Board.map((a, index) => <Square squareNum={index + 1} key={index} />)}
        </div>
    )
}

export default memo(Squares);