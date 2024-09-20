import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { IScryfallCard } from "../types/scryfallcards";
import { fetchCards } from "../utils/fetchcards";
import { matchcards } from "../utils/matchcards";

interface IScrycardsContext {
    cards: { [key: string]: IScryfallCard | null };
    requestCard: (arg0: string) => Promise<IScryfallCard | undefined | null>;
}

const ScrycardsContext = createContext<IScrycardsContext>({
    cards: {},
    requestCard: async () => undefined,
});

function ScrycardsContextProvider(props: { children: ReactNode }) {
    const [needsFetch, setNeedsFetch] = useState<boolean>(false);
    const [cards, setCards] = useState<{ [key: string]: IScryfallCard | null }>(
        {},
    );
    const [cardNameMap, setCardNameMap] = useState<{ [key: string]: string }>(
        {},
    );
    const [queue, setQueue] = useState<Set<string>>(new Set());
    const [promises, setPromises] = useState<{
        [key: string]: ((
            arg0: IScryfallCard | Promise<IScryfallCard> | undefined,
        ) => void)[];
    }>({});

    useEffect(() => {
        if (needsFetch == false) return;
        if (queue.size == 0) return;

        async function parseCards() {
            const fetched_cards = await fetchCards(queue);
            if (fetched_cards == null) return;
            const new_cards: { [key: string]: IScryfallCard } = {};

            for (const card of fetched_cards) {
                new_cards[card.name] = card;
                if (queue.has(card.name)) continue;
                const matching_card = matchcards(queue, card.name).forEach(
                    (card_name) => {
                        cardNameMap[card_name] = card.name;
                    },
                );
            }

            const all_cards = { ...cards, ...new_cards };

            setCards(all_cards);

            setQueue(new Set());
            setNeedsFetch(false);

            for (const card in promises) {
                let cached_card = all_cards[card];
                if (!cached_card) {
                    cached_card = all_cards[cardNameMap[card.toLowerCase()]];
                }
                if (!cached_card) {
                    promises[card].forEach((resolve) => resolve(undefined));
                    console.error(
                        `[scrycards] Unable to locate card "${card}"`,
                    );
                    all_cards[card] = null;
                    continue;
                }
                promises[card].forEach((resolve) => resolve(cached_card));
            }
            setCardNameMap((old) => ({ ...old, ...cardNameMap }));
            setPromises({});
        }

        parseCards();
    }, [needsFetch]);

    async function requestCard(cardname: string) {
        const card = cards[cardname];
        if (card) return card;
        if (card === null) return;
        const matched_name = cardNameMap[cardname];
        if (matched_name) return cards[matched_name];

        setQueue((queue) => queue.add(cardname));
        setNeedsFetch(true);

        const promise = new Promise<IScryfallCard | undefined | null>(
            (resolve) => {
                setPromises((promises) => {
                    const new_promises = {
                        ...promises,
                    };
                    if (promises[cardname] != undefined) {
                        new_promises[cardname] = [
                            ...promises[cardname],
                            resolve,
                        ];
                    } else {
                        new_promises[cardname] = [resolve];
                    }
                    return new_promises;
                });
            },
        );
        return await promise;
    }

    return (
        <ScrycardsContext.Provider
            value={{
                cards: cards,
                requestCard: requestCard,
            }}
        >
            {props.children}
        </ScrycardsContext.Provider>
    );
}

function useScrycardsContext() {
    return useContext(ScrycardsContext);
}

export { ScrycardsContextProvider, useScrycardsContext };
