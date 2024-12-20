import type {
    ScryfallCard,
    ScryfallColorLike,
    ScryfallColors,
    ScryfallLayoutLike,
} from "@scryfall/api-types";
import { ReactNode } from "react";

type ScrycardSizes = "xs" | "sm" | "md" | "lg" | "xl";

type ScrycardsSymbolTextRenderer = (props: IScrytextProps) => ReactNode;

/**
 * @property {ScrycardSizes} size - defaults to medium, all cards are 5 x 7 aspect ratio
 * @property {string} width - specifies the css property width (overrides height value with aspect ratio)
 * @property {string} height - specifies the css property height (overriden by width)
 * @property {true} textOnly - should the card be renderred as text
 * @property {true} animated - should the card play a hover animation
 * @property {true} flippable - should the card display a flip button
 * @property {boolean} inverted - should the card be displayed upside down
 * @property {boolean} tapped - should the card be displayed sideways
 * @property {boolean} flipped - should the card be displayed on its alternate face
 * @property {boolean} faceDown - should the card be displayed on its alternate face
 * @property {ScrycardsSymbolTextRenderer} symbol_text_renderer - function to replace symbol names with symbol svgs
 * @property {ReactNode} flipIcon - a ReactNode to be renderred as the flip icon for flippable cards
 * @property {"auto" | string } imageLink - "auto" uses the Scryfall Link automatically
 */
interface IScrycardOptions {
    size?: ScrycardSizes;
    width?: string;
    height?: string;
    textOnly?: true;
    animated?: true;
    flippable?: true;
    inverted?: boolean;
    tapped?: boolean;
    flipped?: boolean;
    faceDown?: boolean;
    symbol_text_renderer?: ScrycardsSymbolTextRenderer;
    flipIcon?: ReactNode;
    imageLink?: "auto" | (string & {});
}

interface IScrycardLayoutCard {
    colors: ScryfallColors;
    color_identity: ScryfallColors;
    name: string;
    mana_cost?: string;
    type_line: string;
    full_type_line?: string;
    oracle_text: string;
    power?: string;
    toughness?: string;
    layout: ScryfallLayoutLike;
}

/**
 * Props for the ScryNameCard component.
 * @property {string} card_name - The name of the card or the Scryfall UUID
 * @extends IScrycardOptions
 */
interface IScryNameCardProps
    extends Omit<IScrycardOptions, "symbol_text_renderer"> {
    card_name: string;
}

/**
 * @property {string} children - string with text to be converted to symbols
 */
interface IScrytextProps extends React.HTMLProps<HTMLSpanElement> {
    children?: string;
}

/**
 * @property {IScrysymbolMap} symbols - this value should be cached not fetched
 */
interface IScrytextPrimitiveProps extends IScrytextProps {
    symbols: IScrysymbolMap;
}

/**
 * Props for the ScryNameCard component.
 * @property {ScryfallCard.Any} card - a card object to render.
 * @extends IScrycardOptions
 */
interface IScrycardProps extends IScrycardOptions {
    card: ScryfallCard.Any | null | undefined;
}

/**
 * A map between text representation and image URI
 * @example { "{T}": "https://svgs.scryfall.io/card-symbols/T.svg" }
 * @type {string} key - text representation of symbol
 * @type {string} value - svg uri of image
 */
interface IScrysymbolMap {
    [key: string]: string;
}
export type {
    IScryNameCardProps,
    IScrycardProps,
    IScrycardOptions,
    IScrysymbolMap,
    IScrycardLayoutCard,
    IScrytextProps,
    IScrytextPrimitiveProps,
    ScrycardSizes,
    ScrycardsSymbolTextRenderer,
};
export const colorMap: Record<ScryfallColorLike, string> = {
    U: "#1E90FF",
    W: "#dbd7a7",
    B: "#000000",
    G: "#228B22",
    R: "#FF4500",
    C: "#D3D3D3",
};
