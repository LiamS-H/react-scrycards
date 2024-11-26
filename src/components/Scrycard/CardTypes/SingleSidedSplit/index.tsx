import { useState } from "react";
import FlipButton from "../../FlipButton";
import type { IScrycardOptions } from "../../../../types/scrycard";
import type { ScryfallCard } from "@scryfall/api-types";
import ImageLayout from "../../Layouts/Image";
import TextLayout from "../../Layouts/Normal";

interface ISplitCardProps extends IScrycardOptions {
    card: ScryfallCard.AnySingleSidedSplit;
}

export default function SplitCard(props: ISplitCardProps) {
    const [flipped, setFlipped] = useState<boolean>(props.flipped || false);
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    const side = props.flipped || flipped ? 1 : 0;

    const face = props.card.card_faces[side];

    if (!props.textOnly && props.card.image_uris) {
        return (
            <>
                <ImageLayout
                    image_uris={props.card.image_uris}
                    size={props.size}
                    card_name={props.card.name}
                    link={props.imageLink}
                />
            </>
        );
    }

    return (
        <>
            <TextLayout
                card={{
                    ...face,
                    colors: props.card.colors,
                    color_identity: props.card.color_identity,
                    layout: props.card.layout,
                    full_type_line: props.card.type_line,
                }}
                symbol_text_renderer={props.symbol_text_renderer}
            />
            {props.flippable ? (
                <FlipButton flip={flip} flipIcon={props.flipIcon} />
            ) : null}
        </>
    );
}
