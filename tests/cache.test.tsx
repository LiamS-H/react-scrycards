import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
    ScrycardsContextProvider,
    useScrycardsContext,
} from "../src/contexts/scrycards";
import ScryNameCard from "../src/components/ScryNameCard";
import { useEffect, useState } from "react";
import { deck } from "./deck";

const DelayedScryNameCard = ({
    card_name,
    delay = 0,
}: {
    card_name: string;
    delay?: number;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return isVisible ? <ScryNameCard card_name={card_name} /> : null;
};

const PreloadCard = ({ cards }: { cards: string[] }) => {
    const { preloadCards } = useScrycardsContext();
    useEffect(() => {
        preloadCards(cards);
    }, []);
    return null;
};

describe("ScrycardContext", () => {
    const Card = "Opt";
    it("caches cards rendered at different times", async () => {
        const fetchCalls: string[] = [];
        const originalFetch = global.fetch;

        global.fetch = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                fetchCalls.push(input.toString());
                return originalFetch(input, init);
            },
        );

        const { debug } = render(
            <ScrycardsContextProvider>
                <DelayedScryNameCard card_name={Card} delay={0} />
                <DelayedScryNameCard card_name={Card} delay={100} />
                <DelayedScryNameCard card_name={Card} delay={200} />
                <DelayedScryNameCard card_name={Card} delay={300} />
                <DelayedScryNameCard card_name={Card} delay={400} />
                <DelayedScryNameCard card_name={Card} delay={500} />
            </ScrycardsContextProvider>,
        );
        debug();
        await waitFor(
            () => {
                expect(screen.getAllByAltText(Card)).toHaveLength(6);
            },
            { timeout: 5000 },
        );

        expect(fetchCalls.length).toBe(1);

        global.fetch = originalFetch;
    });
    it("caches cards rendered at the same time", async () => {
        const fetchCalls: string[] = [];
        const originalFetch = global.fetch;

        global.fetch = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                fetchCalls.push(input.toString());
                return originalFetch(input, init);
            },
        );

        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={Card} />
                <ScryNameCard card_name={Card} />
                <ScryNameCard card_name={Card} />
                <ScryNameCard card_name={Card} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => {
                expect(screen.getAllByAltText(Card)).toHaveLength(4);
            },
            { timeout: 5000 },
        );
        expect(fetchCalls.length).toBe(1);

        global.fetch = originalFetch;
    });
    it("caches preloaded cards", async () => {
        const fetchCalls: string[] = [];
        const originalFetch = global.fetch;

        global.fetch = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                fetchCalls.push(input.toString());
                return originalFetch(input, init);
            },
        );

        render(
            <ScrycardsContextProvider>
                <PreloadCard cards={deck} />
                <DelayedScryNameCard card_name={deck[0]} delay={100} />
                <DelayedScryNameCard card_name={deck[78]} delay={100} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => {
                expect(screen.getAllByAltText(deck[0])).toHaveLength(1);
                expect(screen.getAllByAltText(deck[78])).toHaveLength(1);
            },
            { timeout: 5000 },
        );
        expect(fetchCalls.length).toBe(2);

        global.fetch = originalFetch;
    });
    it("caches invalid cards properly", async () => {
        const Card = "asldkfjads";
        const fetchCalls: string[] = [];
        const originalFetch = global.fetch;

        global.fetch = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                fetchCalls.push(input.toString());
                return originalFetch(input, init);
            },
        );

        const { debug } = render(
            <ScrycardsContextProvider>
                <PreloadCard cards={[Card]} />
                <DelayedScryNameCard card_name={Card} delay={100} />
                <DelayedScryNameCard card_name={Card} delay={1000} />
            </ScrycardsContextProvider>,
        );
        debug();
        await waitFor(
            () => {
                expect(screen.getAllByText("⚠")).toHaveLength(2);
            },
            { timeout: 5000 },
        );

        expect(fetchCalls.length).toBe(1);

        global.fetch = originalFetch;
    });
});
