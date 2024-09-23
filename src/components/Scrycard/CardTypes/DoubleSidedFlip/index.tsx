import { ScryfallCard } from "@scryfall/api-types";
import {
    IScrycardLayoutCard,
    IScrycardOptions,
} from "../../../../types/scrycards/scrycard";
import { useState } from "react";
import ImageDisplay from "../../Layouts/Image";
import FlipButton from "../../../FlipButton";
import Normal from "../../Layouts/Normal";

interface DoubleSidedSplitProps extends IScrycardOptions {
    card: ScryfallCard.AnyDoubleSidedSplit;
}

export default function DoubleSided(props: DoubleSidedSplitProps) {
    const [side, setSide] = useState<number>(0);
    const face = props.card.card_faces[side];
    const sides = props.card.card_faces.length;
    function flip() {
        setSide((side) => (side + 1) % sides);
    }

    if (!props.textOnly && face.image_uris) {
        return (
            <>
                <ImageDisplay
                    card_name={face.name}
                    image_uris={face.image_uris}
                    size={props.size}
                />
                <FlipButton flip={flip} />
            </>
        );
    }
    return (
        <>
            <Normal card={face as IScrycardLayoutCard} />
            <FlipButton flip={flip} />
        </>
    );
}
