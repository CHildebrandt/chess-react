import { faChess, faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MutableRefObject } from 'react';
import { MODE, da } from '../../types';
import style from './NewGameMenu.module.scss';

const { NORMAL, RANDOM, DOUBLE_AI, DOUBLE_RANDOM, CONTROL_BOTH } = MODE;

export function PlayAsButtons(props: {
    playAsBlack: boolean, 
    setPlayAsBlack: (playAsBlack: boolean) => void, 
    randomColor: () => void, 
    playAsWRef: MutableRefObject<HTMLButtonElement | null>, 
    playAsBRef: MutableRefObject<HTMLButtonElement | null>
}) {
    const { playAsBlack, setPlayAsBlack, randomColor, playAsWRef, playAsBRef } = props;
    return (
        <div className={style.playAsBtns}>
            <button ref={playAsWRef} className={(!playAsBlack) ? 'selected' : ''}
                onClick={() => setPlayAsBlack(false)}>
                <FontAwesomeIcon icon={faChess} color="white" />
            </button>
            <button ref={playAsBRef} className={(playAsBlack) ? 'selected' : ''}
                onClick={() => setPlayAsBlack(true)}>
                <FontAwesomeIcon icon={faChess} color="black" />
            </button>
            <button style={{ color: (!playAsBlack) ? 'white' : 'black' }}
                onClick={randomColor}>
                <FontAwesomeIcon icon={faDice} />
            </button>
        </div>
    )
}

const modeMap = [
    [NORMAL, (da) ? 'Dig | AI' : 'You | AI'],
    [RANDOM, (da) ? 'Dig | Random' : 'You | Random'],
    [DOUBLE_AI, 'AI | AI'],
    [DOUBLE_RANDOM, 'Random | Random'],
    [CONTROL_BOTH, 'Solo']
];
export function ModeButtons(props: { mode: string; modeSetter: (mode: string) => () => void; }) {
    const { mode, modeSetter } = props;
    return (
        <div className={style.modeBtns}>
            {modeMap.map(btnContent => {
                return (
                    <button className={(mode === btnContent[0]) ? 'selected' : ''} onClick={modeSetter(btnContent[0])}>
                        {btnContent[1]}
                    </button>
                )
            })}
        </div>
    );
}

const levelMap: [level: number, text: string][] = [
    [2, (da) ? 'Nem' : 'Easy'],
    [3, (da) ? 'Middel' : 'Medium'],
    [4, (da) ? 'Svær' : 'Hard']
]
export function LevelButtons(props: { mode: string; level: number; levelSetter: (level: number) => () => void; }) {
    const { mode, level, levelSetter } = props;
    return (
        <div className={`${style.levelBtns} ${(mode !== NORMAL && mode !== DOUBLE_AI) ? style.disabled : ''}`}>
            {levelMap.map(btnContent => {
                return (
                    <button className={(level === btnContent[0]) ? 'selected' : ''} onClick={levelSetter(btnContent[0])}>
                        {btnContent[1]}
                    </button>
                )
            })}
        </div>
    );
}
