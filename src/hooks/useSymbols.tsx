import { useEffect, useState } from "react";
import { useScrycardsContext } from "../contexts/scrycards";
import { IScrysymbolMap } from "../types/scrycard";

export function useSymbols() {
    const { getSymbols } = useScrycardsContext();
    const [symbols, setSymbols] = useState<IScrysymbolMap>({});
    useEffect(() => {
        const request = getSymbols();
        if (request instanceof Promise) {
            request.then((c) => setSymbols(c));
        } else {
            setSymbols(request);
        }
    }, []);

    return symbols;
}
