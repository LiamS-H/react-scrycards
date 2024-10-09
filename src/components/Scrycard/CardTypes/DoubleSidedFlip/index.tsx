import { ScryfallCard } from "@scryfall/api-types";
import { IScrycardOptions } from "../../../../types/scrycard";
import { useState } from "react";
import ImageLayout from "../../Layouts/Image";
import FlipButton from "../../FlipButton";
import TextLayout from "../../Layouts/Normal";

interface DoubleSidedSplitProps extends IScrycardOptions {
    card: ScryfallCard.AnyDoubleSidedSplit;
}

export default function DoubleSided(props: DoubleSidedSplitProps) {
    const [side, setSide] = useState<number>(props.flipped ? 1 : 0);
    const face = props.card.card_faces[side];
    const sides = props.card.card_faces.length;

    function flip() {
        setSide((side) => (side + 1) % sides);
    }

    if (!props.textOnly && face.image_uris) {
        return (
            <>
                <ImageLayout
                    card_name={face.name}
                    image_uris={face.image_uris}
                    size={props.size}
                    inverted={props.inverted}
                />
                {props.flippable ? <FlipButton flip={flip} /> : null}
            </>
        );
    }
    return (
        <>
            <TextLayout
                card={{
                    ...face,
                    layout: props.card.layout,
                    color_identity: props.card.color_identity,
                    full_type_line: props.card.card_faces
                        .map((face) => face.type_line)
                        .join(" // "),
                }}
                symbol_text_renderer={props.symbol_text_renderer}
            />
            {props.flippable ? <FlipButton flip={flip} /> : null}
        </>
    );
}
