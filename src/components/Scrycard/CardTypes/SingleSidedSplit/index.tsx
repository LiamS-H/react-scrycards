import { useState } from "react";
import FlipButton from "../../../FlipButton";
import { IScrycardOptions } from "../../../../types/scrycards/scrycard";
import { ScryfallCard } from "@scryfall/api-types";
import ImageDisplay from "../../Layouts/Image";
import Normal from "../../Layouts/Normal";

interface ISplitCardProps extends IScrycardOptions {
    card: ScryfallCard.AnySingleSidedSplit;
}

export default function SplitCard(props: ISplitCardProps) {
    const [flipped, setFlipped] = useState<boolean>(false);
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    const side = flipped ? 1 : 0;
    const face = props.card.card_faces[side];

    if (!props.textOnly && props.card.image_uris) {
        return (
            <>
                <ImageDisplay
                    image_uris={props.card.image_uris}
                    size={props.size}
                    card_name={props.card.name}
                />
            </>
        );
    }

    return (
        <>
            <Normal
                card={{
                    ...face,
                    colors: props.card.colors,
                    mana_cost: face.mana_cost ? face.mana_cost : "",
                }}
            />
            <FlipButton flip={flip} />
        </>
    );
}
