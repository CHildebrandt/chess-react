import { memo } from 'react';
import { da } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import style from './NewGameMenu.module.scss';
import { ModeButtons, LevelButtons, PlayAsButtons } from './Buttons';
import NewGameMenuLogic from './NewGameMenuLogic';

function NewGameMenu(props: { isMobile: boolean }) {
    const { isMobile } = props;
    const {
        menuOpen,
        closeClick,
        playAsWRef,
        playAsBRef,
        playAsBlack,
        setPlayAsBlack,
        randomColor,
        mode,
        modeSetter,
        level,
        levelSetter,
        newGameClick
    } = NewGameMenuLogic()

    return (
        <div id="new-game-container" className={`${style.container} ${(menuOpen && !isMobile) ? style.show : ''}`}>
            <FontAwesomeIcon 
                className={style.close} 
                icon={(isMobile) ? faTimes : faArrowRight} size="2x" 
                style={(isMobile) ? {top: '15px', right: '15px'} : undefined}
                onClick={closeClick}
                aria-label="Close menu" 
            />
            <h2>{(da) ? 'Spil som...' : 'Play as...'}</h2>
            <PlayAsButtons
                playAsBlack={playAsBlack}
                setPlayAsBlack={setPlayAsBlack} 
                randomColor={randomColor}
                playAsWRef={playAsWRef}
                playAsBRef={playAsBRef}
            />

            <h2>Mode</h2>
            <ModeButtons mode={mode} modeSetter={modeSetter} />

            <h2>{(da) ? 'AI sværhedsgrad' : 'AI difficulty'}</h2>
            <LevelButtons mode={mode} level={level} levelSetter={levelSetter} />

            <button id="start-btn" onClick={newGameClick}>
                {(da) ? 'Start spil' : 'Start game'}
            </button>
        </div>
    )
}

export default memo(NewGameMenu);