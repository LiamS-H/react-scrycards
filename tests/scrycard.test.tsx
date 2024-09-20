import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrycardsContextProvider } from "../src/contexts/scrycards";
import ScryNameCard from "../src/components/ScryNameCard";

describe("ScryCard", () => {
    it("renders Akki correctly", async () => {
        const card_name = "Akki Lavarunner";
        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={card_name} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByAltText(card_name)).toBeInTheDocument(),
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
        const card_name = "Akki Lavarunner";
        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={"invalid name"} />
                <ScryNameCard card_name={card_name} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByText("⚠")).toBeInTheDocument(),
            { timeout: 2000 },
        );
        expect(screen.queryByAltText(card_name)).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
    it("renders a list of 10 cards correctly", async () => {
        const cards = ["Delver of Secrets", "Odds", ""];
    });
});
