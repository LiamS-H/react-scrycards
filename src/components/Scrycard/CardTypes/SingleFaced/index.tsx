import type { ScryfallCard } from "@scryfall/api-types";
import {
    IScrycardLayoutCard,
    IScrycardOptions,
} from "../../../../types/scrycard";
import ImageLayout from "../../Layouts/Image";
import TextLayout from "../../Layouts/Normal";

interface ISingleFacedProps extends IScrycardOptions {
    card: ScryfallCard.AnySingleFaced;
}

export default function SingleFaced(props: ISingleFacedProps) {
    if (!props.textOnly && props.card.image_uris) {
        return (
            <ImageLayout
                card_name={props.card.name}
                image_uris={props.card.image_uris}
                size={props.size}
            />
        );
    }
    return (
        <TextLayout
            card={props.card as IScrycardLayoutCard}
            symbol_text_renderer={props.symbol_text_renderer}
        />
    );
}
