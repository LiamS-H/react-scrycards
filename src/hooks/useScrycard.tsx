import { useEffect, useState } from "react";
import { useScrycardsContext } from "../contexts/scrycards";
import type { ScryfallCard } from "@scryfall/api-types";

function useScrycard(cardname: string) {
    const { requestCard } = useScrycardsContext();
    const [card, setCard] = useState<ScryfallCard.Any | null | undefined>(null);
    async function getCard() {
        const card = await requestCard(cardname);
        setCard(card);
    }
    useEffect(() => {
        getCard();
    }, [cardname]);
    return card;
}

export { useScrycard };
