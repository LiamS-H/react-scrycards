import {
    ReactNode,
    createContext,
    useContext,
    useCallback,
    useRef,
} from "react";
import { fetchCards } from "../utils/fetchCards";
import { matchCards } from "../utils/matchCards";
import type { IScrysymbolMap } from "../types/scrycard";
import { fetchSymbols } from "../utils/fetchSymbols";
import type { ScryfallCard } from "@scryfall/api-types";
import { isUUID } from "../utils/isUUID";

interface IScrycardsContext {
    requestCard: (
        arg0: string,
    ) => Promise<ScryfallCard.Any | undefined> | ScryfallCard.Any | undefined;
    preloadCards: (arg0: string[]) => void;
    getSymbols: () => Promise<IScrysymbolMap> | IScrysymbolMap;
}

interface PendingRequest {
    promise: Promise<ScryfallCard.Any | undefined>;
    resolve: (value: ScryfallCard.Any | undefined) => void;
}

interface CardsState {
    cards: { [key: string]: ScryfallCard.Any | null };
    cardNameMap: { [key: string]: string };
}

const ScrycardsContext = createContext<IScrycardsContext | null>(null);

const BATCH_DELAY = 50;
const MAX_BATCH_SIZE = 75;

function ScrycardsContextProvider(props: { children: ReactNode }) {
    const cardsStateRef = useRef<CardsState>({
        cards: {},
        cardNameMap: {},
    });

    const symbols = useRef<IScrysymbolMap | Promise<IScrysymbolMap> | null>(
        null,
    );

    const pendingRequestsRef = useRef<Map<string, PendingRequest | null>>(
        new Map(),
    );
    const queueRef = useRef<Set<string>>(new Set());

    const isProcessingRef = useRef(false);
    const batchTimeoutRef = useRef<NodeJS.Timeout>(undefined);

    const processBatch = useCallback(async () => {
        if (isProcessingRef.current) {
            scheduleBatch();
            return;
        }

        if (queueRef.current.size === 0) return;
        isProcessingRef.current = true;
        const allQueuedItems = Array.from(queueRef.current);
        const currentBatchItems = allQueuedItems.slice(0, MAX_BATCH_SIZE);
        const remainingItems = allQueuedItems.slice(MAX_BATCH_SIZE);

        const currentQueue = new Set(currentBatchItems);
        queueRef.current = new Set(remainingItems);

        try {
            const fetched_cards = (await fetchCards(currentQueue)) || [];

            isProcessingRef.current = false;

            for (const card of fetched_cards) {
                const id = card.id;
                cardsStateRef.current.cards[id] = card;

                if (!currentQueue.has(id)) {
                    matchCards(currentQueue, card.name).forEach((card_name) => {
                        cardsStateRef.current.cardNameMap[card_name] = id;
                    });
                }
            }

            currentQueue.forEach((cardName) => {
                const pending = pendingRequestsRef.current.get(cardName);
                if (!pending) return;

                const resolvedCard =
                    cardsStateRef.current.cards[cardName] ||
                    cardsStateRef.current.cards[
                        cardsStateRef.current.cardNameMap[
                            cardName.toLowerCase()
                        ]
                    ] ||
                    undefined;

                if (resolvedCard === undefined) {
                    cardsStateRef.current.cards[cardName] = null;
                }

                pending.resolve(resolvedCard);
                pendingRequestsRef.current.delete(cardName);
            });
        } catch (error) {
            console.error("[scrycards] Error fetching cards:", error);
            currentQueue.forEach((cardName) => {
                const pending = pendingRequestsRef.current.get(cardName);
                if (pending) {
                    pending.resolve(undefined);
                    pendingRequestsRef.current.delete(cardName);
                }
            });
        } finally {
            if (queueRef.current.size > 0) {
                scheduleBatch();
            }
        }
    }, []);

    const scheduleBatch = useCallback(() => {
        if (batchTimeoutRef.current !== undefined) return;
        batchTimeoutRef.current = setTimeout(() => {
            processBatch();
            batchTimeoutRef.current = undefined;
        }, BATCH_DELAY);
    }, [processBatch]);

    const requestCard = useCallback(
        (
            cardName: string,
        ):
            | Promise<ScryfallCard.Any | undefined>
            | ScryfallCard.Any
            | undefined => {
            cardName = cardName.toLowerCase();

            const cached = cardsStateRef.current.cards[cardName];
            if (cached === null) return undefined;
            if (cached !== undefined) return cached;

            if (!isUUID(cardName)) {
                const matchedId = cardsStateRef.current.cardNameMap[cardName];
                if (
                    matchedId &&
                    cardsStateRef.current.cards[matchedId] !== undefined
                ) {
                    return cardsStateRef.current.cards[matchedId] || undefined;
                }
            }

            const pendingRequest = pendingRequestsRef.current.get(cardName);
            if (pendingRequest) {
                return pendingRequest.promise;
            }

            let resolveRef:
                | ((value: ScryfallCard.Any | undefined) => void)
                | null = null;
            const promise = new Promise<ScryfallCard.Any | undefined>(
                (resolve) => {
                    resolveRef = resolve;
                },
            );

            if (!resolveRef) throw new Error("Promise resolution not set");

            pendingRequestsRef.current.set(cardName, {
                promise,
                resolve: resolveRef,
            });

            if (pendingRequest !== null) {
                queueRef.current.add(cardName);
                scheduleBatch();
            }

            return promise;
        },
        [],
    );

    const preloadCards = useCallback((preloadCards: string[]) => {
        const newCards = preloadCards.filter((card) => {
            card = card.toLowerCase();
            return (
                !cardsStateRef.current.cards[card] &&
                !cardsStateRef.current.cardNameMap[card] &&
                !pendingRequestsRef.current.has(card)
            );
        });

        if (newCards.length === 0) return;

        newCards.forEach((card) => {
            card = card.toLowerCase();
            queueRef.current.add(card);
            pendingRequestsRef.current.set(card, null);
        });
        scheduleBatch();
    }, []);

    const getSymbols = useCallback(() => {
        if (symbols.current) {
            return symbols.current;
        }
        async function fetch() {
            const fetched_symbols = await fetchSymbols();
            if (!fetched_symbols) {
                console.error("[scrycards] Error fetching symbols");
                return {};
            }

            const newSymbols: IScrysymbolMap = {};
            for (const symbol of fetched_symbols) {
                if (symbol.svg_uri) {
                    newSymbols[symbol.symbol] = symbol.svg_uri;
                }
            }
            symbols.current = newSymbols;
            return newSymbols;
        }
        const result = fetch();
        symbols.current = result;
        return result;
    }, []);

    return (
        <ScrycardsContext.Provider
            value={{
                requestCard,
                preloadCards,
                getSymbols,
            }}
        >
            {props.children}
        </ScrycardsContext.Provider>
    );
}

function useScrycardsContext() {
    const context = useContext(ScrycardsContext);
    if (!context) {
        throw Error(
            "[scrycards] useScrycardsContext() must be called inside provider",
        );
    }
    return context;
}

export { ScrycardsContextProvider, useScrycardsContext };
