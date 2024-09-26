export function matchCards(cards: Iterable<string>, match: string): string[] {
    const out_cards: string[] = [];
    match = match.toLowerCase();
    for (let card of cards) {
        card = card.toLowerCase();
        if (card.startsWith(match)) {
            out_cards.push(card);
            continue;
        }
        if (match.startsWith(card)) {
            out_cards.push(card);
            continue;
        }
    }
    return out_cards;
}
