import { IScrycardOptions } from "../../../types/scrycards/scrycard";
import { IScryfallCard } from "../../../types/scryfall/cards";
import CardDisplay from "../CardDisplay";

interface ISingleFacedProps extends IScrycardOptions {
    card: IScryfallCard;
}

export default function SingleFaced(props: ISingleFacedProps) {
    const options = props as IScrycardOptions;
    return (
        <CardDisplay
            card={props.card}
            image_uris={props.card.image_uris}
            {...options}
        />
    );
}
