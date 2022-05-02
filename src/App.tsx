import './global.css';
import './App.scss';
import { useCallback, useEffect } from 'react';
import useStore from './store/store';
import Squares from './components/Squares';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NewGameMenu from './components/NewGameMenu/NewGameMenu';
import PromoteGrid from './components/PromoteGrid/PromoteGrid';
import Log from './components/Log/Log';
import { Numbers, Characters } from './components/Numerals';
import Pieces from './components/Pieces';
import SidePanel from './components/SideBottom/SideBottom';
import GameUpdater from './components/GameUpdater';
import useResizeObserver from './hooks/useResizeObserver';
import { createPortal } from 'react-dom';
import useDomReady from './hooks/useDomReady';

function App() {
    const promoting = useStore(useCallback(s => s.promoting, []));
    const [menuOpen, openMenu] = useStore(useCallback(s => [s.menuOpen, s.openMenu], []));
    const setWindowSize = useStore(useCallback(s => s.setWindowSize, []));
    const domReady = useDomReady();

    const { ref, width, height } = useResizeObserver();
    useEffect(() => {
        setWindowSize({width, height});
    }, [setWindowSize, width, height])

    return (
        <div className="App" ref={ref}>
            <GameUpdater />
            <section>
                <article>
                    <div id="board-container">
                        {(promoting) && <PromoteGrid />}
                        <Numbers />
                        <Squares />
                        <Pieces />
                        <Characters />
                    </div>
                    <button id="mobile-button" onClick={openMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </article>
                <article id="side">
                    <Log />
                    <SidePanel />
                    {(domReady && (width < 999 || height < 500)) 
                    ? createPortal(<>
                        {(menuOpen) && <div className='modal'>
                            <NewGameMenu isMobile={true} />
                        </div>}
                    </>, document.body) 
                    : <NewGameMenu isMobile={false} />}
                </article>
            </section>
        </div>
    );
}

export default App;
