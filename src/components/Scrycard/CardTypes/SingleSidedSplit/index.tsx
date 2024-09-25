import { useState } from "react";
import FlipButton from "../../../FlipButton";
import { IScrycardOptions } from "../../../../types/scrycard";
import { ScryfallCard } from "@scryfall/api-types";
import ImageDisplay from "../../Layouts/Image";
import Text from "../../Layouts/Normal";

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
            <Text
                card={{
                    ...face,
                    colors: props.card.colors,
                    color_identity: props.card.color_identity,
                    layout: props.card.layout,
                    full_type_line: props.card.type_line,
                }}
            />
            <FlipButton flip={flip} />
        </>
    );
}
