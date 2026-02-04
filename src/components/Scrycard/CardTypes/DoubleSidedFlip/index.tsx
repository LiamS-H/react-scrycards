import type { ScryfallCard } from "@scryfall/api-types";
import type { IScrycardOptions } from "../../../../types/scrycard";
import { useState } from "react";
import ImageLayout from "../../Layouts/Image";
import FlipButton from "../../FlipButton";
import TextLayout from "../../Layouts/Normal";

interface DoubleSidedSplitProps extends IScrycardOptions {
    card: ScryfallCard.AnyDoubleSidedSplit;
}

export default function DoubleSided(props: DoubleSidedSplitProps) {
    const [flipped, setFlipped] = useState<boolean>(false);
    const side = props.flipped ?? flipped ? 1 : 0;
    const face = props.card.card_faces[side];

    function flip() {
        setFlipped((f) => !f);
    }

    if (!props.textOnly && face.image_uris) {
        return (
            <>
                <ImageLayout
                    card_name={face.name}
                    image_uris={face.image_uris}
                    size={props.size}
                    inverted={props.inverted}
                    link={props.imageLink}
                />
                {props.flippable ? (
                    <FlipButton flip={flip} flipIcon={props.flipIcon} />
                ) : null}
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
            {props.flippable ? (
                <FlipButton flip={flip} flipIcon={props.flipIcon} />
            ) : null}
        </>
    );
}
