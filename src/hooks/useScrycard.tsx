import { useEffect, useState } from "react";
import { useScrycardsContext } from "../contexts/scrycards";
import type { ScryfallCard } from "@scryfall/api-types";

function useScrycard(cardName: string | null | undefined) {
    const { requestCard } = useScrycardsContext();
    const [card, setCard] = useState<ScryfallCard.Any | null | undefined>(null);
    useEffect(() => {
        if (!cardName) {
            if (cardName === null) {
                setCard(null);
            } else {
                setCard(undefined);
            }
            return;
        }
        const request = requestCard(cardName);
        if (request instanceof Promise) {
            request.then((c) => setCard(c));
        } else {
            setCard(request);
        }
    }, [cardName]);

    return card;
}

export { useScrycard };
