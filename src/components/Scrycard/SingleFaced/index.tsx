import { IScrycardOptions } from "../../../types/scrycards/scrycard";
import { IScryfallCard } from "../../../types/scryfall/cards";
import CardDisplay from "../CardDisplay";

interface ISingleFacedProps extends IScrycardOptions {
    card: IScryfallCard;
}

export default function SingleFaced(props: ISingleFacedProps) {
    return (
        <CardDisplay
            image_uris={props.card.image_uris}
            {...props}
            layout={props.card.layout}
        />
    );
}
