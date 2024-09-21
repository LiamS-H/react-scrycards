import { IScrycardOptions } from "../../../types/scrycards/scrycard";
import {
    IScryfallCard,
    IScryfallCardFace,
    IScryfallCardImages,
} from "../../../types/scryfall/cards";
import ImageDisplay from "./ImageDisplay";
import TextDisplay from "./TextDisplay";

export type ICardFace = Omit<IScryfallCardFace, "object">;

interface CardDisplayProps extends IScrycardOptions {
    card: IScryfallCardFace | IScryfallCard;
    inverted?: boolean;
    image_uris?: IScryfallCardImages;
    layout?: string;
}

export default function CardDisplay(props: CardDisplayProps) {
    const card_face = props.card as ICardFace;
    const size = props.size ? props.size : "md";
    if (props.textOnly || !props.image_uris)
        return (
            <TextDisplay
                card_face={card_face}
                layout={props.layout ? props.layout : ""}
            />
        );
    return (
        <ImageDisplay
            card_name={props.card.name}
            image_uris={props.image_uris}
            size={size}
            inverted={props.inverted}
        />
    );
}
