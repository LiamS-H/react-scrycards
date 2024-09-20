import { useState } from "react";
import { IScryfallDualCard } from "../../../types/scryfall/cards";
import FlipButton from "../FlipButton";
import { IScrycardOptions } from "../../../types/scrycards/scrycard";
import CardDisplay from "../CardDisplay";

interface IFlipCardProps extends IScrycardOptions {
    card: IScryfallDualCard;
}

export default function SplitCard(props: IFlipCardProps) {
    const [flipped, setFlipped] = useState<boolean>(false);
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    const side = flipped ? 1 : 0;
    const face = props.card.card_faces[side];
    return (
        <>
            <CardDisplay card={face} image_uris={props.card.image_uris} />
            {props.textOnly ? <FlipButton flip={flip} /> : null}
        </>
    );
}
