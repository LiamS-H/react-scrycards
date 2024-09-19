import {
    IScryfallCard,
    IScryfallCardResult,
    IScryfallError,
} from "../types/scryfallcards";

export async function fetchCards(
    cards: Iterable<string>,
): Promise<IScryfallCard[] | null> {
    const cardQueries: string[] = [];
    for (const card of cards) {
        cardQueries.push(`!"${card}"`);
    }
    const query = cardQueries.join("or");

    const search = new URLSearchParams({ q: query });
    const url = new URL("https://api.scryfall.com/cards/search");
    url.search = search.toString();
    try {
        console.log("Scryfall Query:", query);
        const r = await fetch(url.toString());
        let data = (await r.json()) as IScryfallCardResult | IScryfallError;

        if (data.object != "list") return null;
        const fetched_cards = data.data;

        while (data.has_more) {
            const r = await fetch(data.next_page);
            data = (await r.json()) as IScryfallCardResult | IScryfallError;

            if (data.object != "list") return null;
            fetched_cards.concat(data.data);
        }
        return fetched_cards;
    } catch {
        return null;
    }
}
