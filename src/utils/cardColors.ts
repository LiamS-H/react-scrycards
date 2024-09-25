import { ScryfallColor, ScryfallColors } from "@scryfall/api-types";

const colors = new Set(["W", "U", "B", "R", "G"]);

export function isColor(color: string): color is ScryfallColor {
    if (color.length > 1) {
        throw new Error("isColor() accepts only chars");
    }
    return colors.has(color);
}

export function colorsFromCost(cost: string): ScryfallColors {
    const matches = new Set<ScryfallColor>();
    const regex = /\{([WUBRGC])\/?[WUBRGC]?\}/g;

    let match;
    while ((match = regex.exec(cost)) !== null) {
        const color = match[1];
        if (!isColor(color)) continue;
        matches.add(color);
    }
    return [...matches];
}
