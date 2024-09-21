import { useState } from "react";
import { IScryfallDualCard } from "../../../types/scryfall/cards";
import FlipButton from "../FlipButton";
import { IScrycardOptions } from "../../../types/scrycards/scrycard";
import CardDisplay from "../CardDisplay";

interface IFlipCardProps extends IScrycardOptions {
    card: IScryfallDualCard;
}

export default function FlipCard(props: IFlipCardProps) {
    const [flipped, setFlipped] = useState<boolean>(false);
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    const side = flipped ? 1 : 0;
    const face = props.card.card_faces[side];
    face.colors = props.card.colors;
    const options = props as IScrycardOptions;
    return (
        <>
            <CardDisplay
                {...options}
                card={face}
                image_uris={props.card.image_uris}
                inverted={flipped}
                layout={props.card.layout}
            />
            <FlipButton flip={flip} />
        </>
    );
}
