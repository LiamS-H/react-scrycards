import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Scrycard from "../src/components/Scrycard";
import { ScrycardsContextProvider } from "../src/contexts/scrycards";

describe("ScryCard", () => {
    it("renders correctly", async () => {
        render(
            <ScrycardsContextProvider>
                <Scrycard card_name={"Akki Lavarunner"} />
            </ScrycardsContextProvider>,
        );
        await waitFor(
            () => expect(screen.queryByText("loading")).not.toBeInTheDocument(),
            { timeout: 2000 },
        );

        expect(screen.getByRole("img")).toBeInTheDocument();
    });
});
