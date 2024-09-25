import { ScryfallCard } from "@scryfall/api-types";
import {
    IScrycardLayoutCard,
    IScrycardOptions,
} from "../../../../types/scrycard";
import ImageDisplay from "../../Layouts/Image";
import Normal from "../../Layouts/Normal";

interface ISingleFacedProps extends IScrycardOptions {
    card: ScryfallCard.AnySingleFaced;
}

export default function SingleFaced(props: ISingleFacedProps) {
    if (!props.textOnly && props.card.image_uris) {
        return (
            <ImageDisplay
                card_name={props.card.name}
                image_uris={props.card.image_uris}
                size={props.size}
            />
        );
    }
    return <Normal card={props.card as IScrycardLayoutCard} />;
}
