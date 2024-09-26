import { IScryfallCard } from "../scryfall/cards";

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
}

interface IScryNameCardProps extends IScrycardOptions {
    card_name: string;
}

interface IScrycardProps extends IScrycardOptions {
    card: IScryfallCard | null | undefined;
}

interface IScrysymbolMap {
    [key: string]: {
        uri: string;
        description: string;
    };
}
export type {
    IScryNameCardProps,
    IScrycardProps,
    IScrycardOptions,
    ScrycardSizes,
    IScrysymbolMap,
};
