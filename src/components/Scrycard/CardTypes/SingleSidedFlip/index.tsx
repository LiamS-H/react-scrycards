import { useState } from "react";
import FlipButton from "../../../FlipButton";
import { IScrycardOptions } from "../../../../types/scrycards/scrycard";
import { ScryfallCard } from "@scryfall/api-types";
import ImageDisplay from "../../Layouts/Image";
import Normal from "../../Layouts/Normal";

interface IFlipCardProps extends IScrycardOptions {
    card: ScryfallCard.Flip;
}

export default function FlipCard(props: IFlipCardProps) {
    const [flipped, setFlipped] = useState<boolean>(false);
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    const side = flipped ? 1 : 0;
    const face = props.card.card_faces[side];

    if (!props.textOnly && props.card.image_uris)
        return (
            <>
                <ImageDisplay
                    image_uris={props.card.image_uris}
                    inverted={flipped}
                    size={props.size}
                    card_name={props.card.name}
                />
                <FlipButton flip={flip} />
            </>
        );
    return (
        <>
            <Normal
                card={{
                    ...face,
                    colors: props.card.colors,
                    mana_cost: face.mana_cost ? face.mana_cost : "",
                }}
            />
        </>
    );
}
