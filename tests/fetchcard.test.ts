import { describe, it, expect } from "vitest";
import { fetchCards } from "../src/utils/fetchcards";

describe("fetchcard util", () => {
    it("fetches correct data", async () => {
        const cards = await fetchCards(["Akki Lavarunner"]);
        expect(cards).not.toBe(null);
        if (cards == null) return;
        expect(cards[0].name).toBe("Akki Lavarunner // Tok-Tok, Volcano Born");
    });
});
