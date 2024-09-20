import { useEffect, useState } from "react";
import { useScrycardsContext } from "../contexts/scrycards";
import { IScryfallCard } from "../types/scryfallcards";

function useScrycard(cardname: string) {
    const { requestCard } = useScrycardsContext();
    const [card, setCard] = useState<IScryfallCard | null | undefined>(null);
    async function getCard() {
        let card = await requestCard(cardname);
        setCard(card);
    }
    useEffect(() => {
        getCard();
    }, [cardname]);
    return card;
}

export { useScrycard };
