import { useState, useEffect } from "react";

function useDomReady() {
    const [domReady, setDomReady] = useState(false);
    useEffect(() => { setDomReady(true) }, []);
    return domReady;
}

export default useDomReady