import { useState } from "react";
import FlipButton from "../../FlipButton";
import { IScrycardOptions } from "../../../../types/scrycard";
import { ScryfallCard, ScryfallLayout } from "@scryfall/api-types";
import ImageLayout from "../../Layouts/Image";
import TextLayout from "../../Layouts/Normal";

interface IFlipCardProps extends IScrycardOptions {
    card: ScryfallCard.Flip;
}

export default function FlipCard(props: IFlipCardProps) {
    const [flipped, setFlipped] = useState<boolean>(
        props.flipped || props.inverted || false,
    );
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    const side = flipped ? 1 : 0;
    const face = props.card.card_faces[side];

    if (!props.textOnly && props.card.image_uris)
        return (
            <>
                <ImageLayout
                    image_uris={props.card.image_uris}
                    inverted={flipped}
                    size={props.size}
                    card_name={props.card.name}
                />
                {props.flippable ? <FlipButton flip={flip} /> : null}
            </>
        );
    return (
        <>
            <TextLayout
                card={{
                    ...face,
                    colors: props.card.colors,
                    color_identity: props.card.color_identity,
                    layout: ScryfallLayout.Flip,
                    full_type_line: props.card.type_line,
                }}
                symbol_text_renderer={props.symbol_text_renderer}
            />
            {props.flippable ? <FlipButton flip={flip} /> : null}
        </>
    );
}
