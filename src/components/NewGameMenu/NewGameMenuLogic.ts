import { useCallback, useEffect, useRef, useState } from "react";
import useCurry from "../../hooks/useCurry";
import useStore from "../../store/store";
import { MODE } from "../../types";

function NewGameMenuLogic() {
    const menuOpen = useStore(useCallback(s => s.menuOpen, []));
    const [setPlayerIsBlack, setMenuOpen, setPaused, newGame] = useStore(useCallback(s => [s.setPlayerIsBlack, s.setMenuOpen, s.setPaused, s.newGame], []));

    const [mode, modeSetter] = useCurry(MODE.NORMAL);
    const [level, levelSetter] = useCurry(2);
    const [playAsBlack, setPlayAsBlack] = useState(false);
    const playAsWRef = useRef<HTMLButtonElement>(null);
    const playAsBRef = useRef<HTMLButtonElement>(null);

    const randomColor = useCallback(() => {
        function recurse(numRepeats: number, counter: number) {
            const curr = counter % 2 === 0;
            if (counter === numRepeats) {
                setPlayAsBlack(!curr);
                return;
            }
            if (playAsWRef.current && playAsBRef.current) {
                if (playAsWRef.current.classList.contains('selected')) {
                    playAsWRef.current.classList.remove('selected');
                }
                if (playAsBRef.current.classList.contains('selected')) {
                    playAsBRef.current.classList.remove('selected');
                }
                if (curr) {
                    playAsBRef.current.classList.add('selected');
                }
                else {
                    playAsWRef.current.classList.add('selected');
                }
            }
            setTimeout(() => {
                recurse(numRepeats, counter + 1);
            }, 150)
        }
        const numToggles = Math.round((Math.random() + 1) * 4);
        recurse(numToggles, 0);
    }, [])

    useEffect(() => {
        setPlayerIsBlack(playAsBlack);
    }, [playAsBlack, setPlayerIsBlack])

    const close = useCallback(() => {
        setMenuOpen(false);
    }, [setMenuOpen])

    const closeClick = useCallback(() => {
        close();
        setPaused(false);
    }, [close, setPaused])

    const newGameClick = useCallback(() => {
        close();
        newGame(mode, level);
    }, [close, newGame, mode, level])

    return {
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
    }
}

export default NewGameMenuLogic;