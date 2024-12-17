import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { fetchCards } from "../utils/fetchCards";
import { matchCards } from "../utils/matchCards";
import type { IScrysymbolMap } from "../types/scrycard";
import { fetchSymbols } from "../utils/fetchSymbols";
import type { ScryfallCard } from "@scryfall/api-types";
import { isUUID } from "../utils/isUUID";

interface IScrycardsContext {
    cards: { [key: string]: ScryfallCard.Any | null };
    requestCard: (arg0: string) => Promise<ScryfallCard.Any | undefined | null>;
    preloadCards: (arg0: string[]) => void;
    symbols: IScrysymbolMap;
}

const ScrycardsContext = createContext<IScrycardsContext | null>(null);

function ScrycardsContextProvider(props: { children: ReactNode }) {
    const [needsFetch, setNeedsFetch] = useState<boolean>(false);
    const [cards, setCards] = useState<{
        [key: string]: ScryfallCard.Any | null;
    }>({});
    const [cardNameMap, setCardNameMap] = useState<{ [key: string]: string }>(
        {},
    );
    const [symbols, setSymbols] = useState<IScrysymbolMap>({});
    const [queue, setQueue] = useState<Set<string>>(new Set());
    const [promises, setPromises] = useState<{
        [key: string]: ((
            arg0: ScryfallCard.Any | Promise<ScryfallCard.Any> | undefined,
        ) => void)[];
    }>({});

    useEffect(() => {
        if (needsFetch == false) return;
        if (queue.size == 0) return;

        async function parseCards() {
            let fetched_cards = await fetchCards(queue);
            if (fetched_cards == null) fetched_cards = [];
            const new_cards: { [key: string]: ScryfallCard.Any } = {};

            for (const card of fetched_cards) {
                const id = card.id;
                new_cards[id] = card;
                if (queue.has(id)) continue;
                matchCards(queue, card.name).forEach((card_name) => {
                    cardNameMap[card_name] = id;
                });
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

    useEffect(() => {
        async function parseSymbols() {
            const fetched_symbols = await fetchSymbols();
            if (fetched_symbols == null) {
                console.error(
                    "[scrycards] something went wrong fetching symbols",
                );
                return;
            }
            const new_symbols: IScrysymbolMap = {};
            for (const symbol of fetched_symbols) {
                if (!symbol.svg_uri) continue;
                new_symbols[symbol.symbol] = symbol.svg_uri;
            }
            setSymbols(new_symbols);
        }
        parseSymbols();
    }, []);

    async function requestCard(cardname: string) {
        cardname = cardname.toLowerCase();
        const card = cards[cardname];
        if (card) return card;
        if (card === null) return;

        if (!isUUID(cardname)) {
            const matched_name = cardNameMap[cardname];
            if (matched_name) return cards[matched_name];
        }

        setQueue((queue) => queue.add(cardname));
        setNeedsFetch(true);

        const promise = new Promise<ScryfallCard.Any | undefined | null>(
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

    function preloadCards(cards: string[]) {
        setQueue((queue) => {
            cards.forEach((c) => queue.add(c));
            return queue;
        });
        setNeedsFetch(true);
    }

    return (
        <ScrycardsContext.Provider
            value={{
                cards,
                requestCard,
                preloadCards,
                symbols,
            }}
        >
            {props.children}
        </ScrycardsContext.Provider>
    );
}

function useScrycardsContext() {
    const context = useContext(ScrycardsContext);
    if (!context)
        throw Error(
            "[scrycards] useScrycardsContext() must be calle inside provider",
        );

    return context;
}

export { ScrycardsContextProvider, useScrycardsContext };
