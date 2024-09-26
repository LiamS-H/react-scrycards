import { ScryfallColor, ScryfallColors } from "@scryfall/api-types";
import { colorMap } from "../types/scrycard";

export function generateCardGradient(
    colors: ScryfallColors,
): React.CSSProperties {
    const order: ScryfallColor[] = [
        ScryfallColor.Black,
        ScryfallColor.Blue,
        ScryfallColor.Green,
        ScryfallColor.Red,
        ScryfallColor.White,
    ];
    const ordered_colors: ScryfallColor[] = [];
    for (const color of order) {
        if (colors.includes(color)) {
            ordered_colors.push(color);
        }
    }

    const colors_str = ordered_colors
        .map((color) => colorMap[color])
        .join(", ");

    return {
        background: `linear-gradient(90deg, ${colors_str})`,
    };
}
export function generateCardBorder(
    colors: ScryfallColors,
): React.CSSProperties {
    if (!colors) {
        console.error(
            "[scrycards] invalid props reached text render, card type error",
        );
        return { backgroundColor: "#FF0000" };
    }
    if (colors.length === 0) {
        return { backgroundColor: colorMap["C"] };
    }
    if (colors.length === 1) {
        return { backgroundColor: colorMap[colors[0]] };
    }
    if (colors.length > 2) {
        return { backgroundColor: "#aba15d" };
    }
    return generateCardGradient(colors);
}
