import { useEffect, useCallback, useRef, memo } from "react";
import style from './Log.module.scss'
import useStore from "../../store/store";

const LogItem = memo((props: { text: string, index: number }) => {
    const { text, index } = props;
    return (
        <>
            {(index % 2 === 0) && <li>{index / 2 + 1 + '.'}</li>}
            <li>{text}</li>
        </>
    )
})

function Log() {
    const log = useStore(useCallback(s => s.log, []));
    const olRef = useRef<HTMLOListElement | null>(null)

    useEffect(() => {
        if (olRef.current && olRef.current.lastElementChild) {
            olRef.current.lastElementChild.scrollIntoView();
        }
    }, [log])

    return (
        <div id="log" className={style.log}>
            <div>
                <ol ref={olRef}>
                    {log.map((text, index) => <LogItem key={index} text={text} index={index} />)}
                </ol>
            </div>
        </div>
    )
}

export default memo(Log);