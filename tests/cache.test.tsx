import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrycardsContextProvider } from "../src/contexts/scrycards";
import ScryNameCard from "../src/components/ScryNameCard";

describe("ScryCard", () => {
    const Akki = "Akki Lavarunner // Tok-Tok, Volcano Born";
    it("caches correct spelling Akki correctly", async () => {
        render(
            <ScrycardsContextProvider>
                <ScryNameCard card_name={Akki} />
            </ScrycardsContextProvider>,
        );
        // await waitFor(
        //     () => expect(screen.queryByAltText(Akki)).toBeInTheDocument(),
        //     { timeout: 2000 },
        // );

        // expect(screen.getByRole("img")).toBeInTheDocument();
    });
});
