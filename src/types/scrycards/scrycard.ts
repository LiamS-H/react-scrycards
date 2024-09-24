import {
    ScryfallCard,
    ScryfallColor,
    ScryfallColors,
} from "@scryfall/api-types";

type ScrycardSizes = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * @property card_name - The name of the card to be fetched
 * @property size - defaults to medium, all cards are 5 x 7 aspect ratio
 */
interface IScrycardOptions {
    size?: ScrycardSizes;
    width?: string;
    height?: string;
    flipButton?: false;
    textOnly?: true;
    animated?: true;
}

interface IScrycardLayoutCard {
    colors: ScryfallColors;
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    power?: string;
    toughness?: string;
}

interface IScryNameCardProps extends IScrycardOptions {
    card_name: string;
}

interface IScrycardProps extends IScrycardOptions {
    card: ScryfallCard.Any | null | undefined;
}

interface IScrysymbolMap {
    [key: string]: string;
}
export type {
    IScryNameCardProps,
    IScrycardProps,
    IScrycardOptions,
    ScrycardSizes,
    IScrysymbolMap,
    IScrycardLayoutCard,
};
export const colorMap: Record<ScryfallColor, string> = {
    U: "#1E90FF",
    W: "#dbd7a7",
    B: "#000000",
    G: "#228B22",
    R: "#FF4500",
    C: "#D3D3D3",
};
