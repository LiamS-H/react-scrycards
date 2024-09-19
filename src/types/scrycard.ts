/**
 * @property card_name - The name of the card to be fetched
 * @property size - defaults to medium, all cards are 5 x 7 aspect ratio
 */
interface IScrycardProps {
    card_name: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    width?: number;
    height?: number;
    flipButton?: boolean;
}

export type { IScrycardProps };
