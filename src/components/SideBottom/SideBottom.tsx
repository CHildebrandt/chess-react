import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import getMessage from "../../utils/getMessage";
import useStore from "../../store/store";
import { lang } from "../../types";
import style from './SideBottom.module.scss';

function SidePanel() {
    const message = useStore(useCallback(s => getMessage(s.boardEvent), []));
    const calculating = useStore(useCallback(s => s.calculating, []));
    const openMenu = useStore(useCallback(s => s.openMenu, []));
    const aiMessage = useStore(useCallback(s => s.aiMessage, []));

    return (
        <div className={style.panel}>
            <div className={style.text}>
                <h2>{message}</h2>
                {calculating && <div className={style.calcstate}>
                    <FontAwesomeIcon icon={faSpinner} size="2x" spin />
                </div>}
            </div>
            <button id="menu-btn" onClick={openMenu}>
                {lang === 'da' ? 'Nyt spil' : 'New game'}
            </button>
            
            <div id="ai-info" className={style.aiInfo}>{aiMessage}</div>
        </div>
    )
}

export default SidePanel;