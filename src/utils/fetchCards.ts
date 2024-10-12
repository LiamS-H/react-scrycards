import { ScryfallList, ScryfallCard, ScryfallError } from "@scryfall/api-types";

export async function fetchCards(
    cards_set: Iterable<string>,
): Promise<ScryfallCard.Any[] | null> {
    const cards: string[] = Array.from(cards_set);
    if (cards.length > 75) {
        const card_promises = [];
        for (let i = 0; i < cards.length; i += 75) {
            card_promises.push(fetchCards(cards.slice(i, 75)));
        }
        const card_lists = (await Promise.all(card_promises)).filter(
            (c) => !!c,
        );
        return card_lists.flat();
    }

    const cardQueries: { name: string }[] = [];
    for (const card_name of cards) {
        let formatted_card = card_name;
        if (card_name.includes("//")) {
            formatted_card = card_name.split("//")[0].trim();
        }
        cardQueries.push({
            name: formatted_card,
        });
    }
    const body = JSON.stringify({ identifiers: cardQueries });

    const url = new URL("https://api.scryfall.com/cards/collection");
    // const search = new URLSearchParams({ indentifiers: query });
    // url.search = search.toString();

    try {
        const r = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
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
