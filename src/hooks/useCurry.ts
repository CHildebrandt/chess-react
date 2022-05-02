import { useState, useCallback } from "react";

function useCurry<T>(init: T): [state: T, setState: (newState: T) => () => void] {
    const [state, setState] = useState(init);
    const setter = useCallback((newState: T) => () => setState(newState), []);
    return [state, setter];
}

export default useCurry;