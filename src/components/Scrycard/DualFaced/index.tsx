import { useState } from "react";
import { IScryfallDualCard } from "../../../types/scryfall/cards";
import FlipButton from "../FlipButton";
import { IScrycardOptions } from "../../../types/scrycards/scrycard";
import CardDisplay from "../CardDisplay";

interface IDualFacedProps extends IScrycardOptions {
    card: IScryfallDualCard;
}

export default function DualFaced(props: IDualFacedProps) {
    const [side, setSide] = useState<number>(0);
    const face = props.card.card_faces[side];
    if (!face.colors) {
        face.colors = props.card.colors;
    }

    const sides = props.card.card_faces.length;
    function flip() {
        setSide((side) => (side + 1) % sides);
    }
    const options = props as IScrycardOptions;
    return (
        <>
            <CardDisplay
                {...options}
                card={face}
                image_uris={face.image_uris}
            />
            <FlipButton flip={flip} />
        </>
    );
}
