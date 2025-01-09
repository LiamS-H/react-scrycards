import { ScryfallCard } from "@scryfall/api-types";

export function isFlippable(
    card: ScryfallCard.Any | undefined | null,
): boolean {
    if (!card) return false;
    if (!("card_faces" in card)) return false;
    if (card.layout == "flip") return true;
    if ("card_back_id" in card) return false;
    return true;
}
