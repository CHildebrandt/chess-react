import { useEffect, useCallback, useRef } from "react";
import useStore from "../store/store";

const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export function Characters() {
    const playerIsBlack = useStore(useCallback(s => s.playerIsBlack, []));
    const windowSize = useStore(useCallback(s => s.windowSize, []));
    const refs = useRef<(HTMLHeadingElement | null)[]>([]);
    useEffect(() => {
        if (refs.current.includes(null)) return;
        if (playerIsBlack) {
            const rev = refs.current.map(x => x!.offsetLeft).reverse();
            for (let i = 0; i < 8; i++) {
                refs.current[i]!.style.transform = `translateX(${rev[i] - refs.current[i]!.offsetLeft}px)`;
            }
        }
        else {
            refs.current.forEach(x => x!.style.transform = '');
        }
    }, [playerIsBlack, windowSize])
    return (
        <div id="chars">
            {chars.map((x, i) => <h2 ref={ref => refs.current[i] = ref} key={x}>{x}</h2>)}
        </div>
    )
}

const nums = ['8', '7', '6', '5', '4', '3', '2', '1', ' '];
export function Numbers() {
    const playerIsBlack = useStore(useCallback(s => s.playerIsBlack, []));
    const windowSize = useStore(useCallback(s => s.windowSize, []));
    const refs = useRef<(HTMLHeadingElement | null)[]>([]);
    useEffect(() => {
        if (refs.current.includes(null)) return;
        if (playerIsBlack) {
            const rev = refs.current.slice(0, -1).map(x => x!.offsetTop).reverse();
            for (let i = 0; i < 9; i++) {
                refs.current[i]!.style.transform = `translateY(${rev[i] - refs.current[i]!.offsetTop}px)`;
            }
        }
        else {
            refs.current.forEach(x => x!.style.transform = '');
        }
    }, [playerIsBlack, windowSize])
    return (
        <div id="nums">
            {nums.map((x, i) => {
                return <h2 ref={ref => refs.current[i] = ref} key={x}>{x}</h2>
            })}
        </div>
    )
}