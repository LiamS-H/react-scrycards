import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrycardsContextProvider } from "../src/contexts/scrycards";
import ScryNameCard from "../src/components/ScryNameCard";

describe("ScryCard", () => {
    const Akki = "Akki Lavarunner // Tok-Tok, Volcano Born";
    it("renders Akki correctly", async () => {
        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={Akki} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByAltText(Akki)).toBeInTheDocument(),
            { timeout: 2000 },
        );

        expect(screen.getByRole("img")).toBeInTheDocument();
    });
    it("renders 'invalid_name' correctly", async () => {
        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={"invalid name"} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByText("⚠")).toBeInTheDocument(),
            { timeout: 2000 },
        );
    });
    it("renders 'mixed invalids' correctly", async () => {
        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={"invalid name"} />
                <ScryNameCard card_name={Akki} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByText("⚠")).toBeInTheDocument(),
            { timeout: 2000 },
        );
        expect(screen.queryByAltText(Akki)).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("renders all card layouts", async () => {
        const cards = [
            "Opt",
            "Delver of Secrets",
            "Odds // Ends",
            "Budoka Gardener // Dokai, Weaver of Life",
            "Akoum Warrior",
            "Graf Rats",
            "Blink",
            "Brazen Borrower // Petty Theft",
            "Cubwarden",
            "Arcane Proxy",
        ];
        render(
            <ScrycardsContextProvider>
                {cards.map((card) => (
                    <ScryNameCard card_name={card} key={card} />
                ))}
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByAltText("Opt")).toBeInTheDocument(),
            { timeout: 2000 },
        );
        for (const card of cards) {
            expect(screen.queryByAltText(card)).toBeInTheDocument();
        }
        expect(screen.queryAllByAltText("⚠"));
    });
    it("renders all card layouts textonly", async () => {
        const cards = [
            "Opt",
            "Delver of Secrets",
            "Odds",
            "Budoka Gardener",
            "Akoum Warrior",
            "Graf Rats",
            "Blink",
            "Brazen Borrower",
            "Cubwarden",
            "Arcane Proxy",
        ];
        render(
            <ScrycardsContextProvider>
                {cards.map((card) => (
                    <ScryNameCard card_name={card} key={card} textOnly />
                ))}
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByText("Opt")).toBeInTheDocument(),
            { timeout: 2000 },
        );
        for (const card of cards) {
            expect(screen.queryByText(card)).toBeInTheDocument();
        }
        expect(screen.queryAllByAltText("⚠"));
    });
});
