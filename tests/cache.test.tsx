import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
    ScrycardsContextProvider,
    useScrycardsContext,
} from "../src/contexts/scrycards";
import ScryNameCard from "../src/components/ScryNameCard";
import { useEffect, useState } from "react";

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

// const CardCacheTestComponent = ({ cardName }: { cardName: string }) => {
//     const context = useScrycardsContext();

//     useEffect(() => {
//         expect(context.cards);
//     }, [cardName, context]);

//     return <ScryNameCard card_name={cardName} />;
// };

describe("ScryCard", () => {
    // const Card = "Akki Lavarunner // Tok-Tok, Volcano Born";
    const Card = "Opt";
    it("caches cards redered at different times", async () => {
        const fetchCalls = new Set();
        const originalFetch = global.fetch;

        global.fetch = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                fetchCalls.add(input.toString());
                return originalFetch(input, init);
            },
        );

        const { debug } = render(
            <ScrycardsContextProvider>
                <DelayedScryNameCard card_name={Card} delay={0} />
                <DelayedScryNameCard card_name={Card} delay={400} />
                <DelayedScryNameCard card_name={Card} delay={500} />
            </ScrycardsContextProvider>,
        );
        debug();
        await waitFor(
            () => {
                expect(screen.getAllByAltText(Card)).toHaveLength(3);
            },
            { timeout: 5000 },
        );

        // 2 not 1 because symbols also use 1 fetch
        expect(fetchCalls.size).toBe(2);

        global.fetch = originalFetch;
    });
    it("caches cards rendered at the same time", async () => {
        const fetchCalls = new Set();
        const originalFetch = global.fetch;

        global.fetch = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                fetchCalls.add(input.toString());
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
        // 2 not 1 because symbols also use 1 fetch
        expect(fetchCalls.size).toBe(2);

        global.fetch = originalFetch;
    });
});
