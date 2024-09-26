import { ScryfallList, ScryfallCard, ScryfallError } from "@scryfall/api-types";

export async function fetchCards(
    cards: Iterable<string>,
): Promise<ScryfallCard.Any[] | null> {
    const cardQueries: string[] = [];
    for (const card of cards) {
        cardQueries.push(`!"${card}"`);
    }
    const query = cardQueries.join("or");

    const search = new URLSearchParams({ q: query });
    const url = new URL("https://api.scryfall.com/cards/search");
    url.search = search.toString();
    try {
        const r = await fetch(url.toString());
        let data = (await r.json()) as ScryfallList.Cards | ScryfallError;

        if (data.object != "list") return null;
        const fetched_cards = data.data;

        while (data.has_more) {
            const r = await fetch(data.next_page);
            data = (await r.json()) as ScryfallList.Cards | ScryfallError;

            if (data.object != "list") return null;
            fetched_cards.concat(data.data);
        }
        return fetched_cards;
    } catch (error) {
        console.error("[scrycards] scryfall-error fetching cards:", error);
        return null;
    }
}
