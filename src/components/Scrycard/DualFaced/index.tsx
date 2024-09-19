import { useState } from "react";
import { IScryfallDualCard } from "../../../types/scryfallcards";
import FlipButton from "../FlipButton";

export default function DualFaced(props: { card: IScryfallDualCard }) {
    const [side, setSide] = useState<number>(0);
    const face = props.card.card_faces[side];
    const sides = props.card.card_faces.length;
    function flip() {
        setSide((side) => (side + 1) % sides);
    }
    const layout = props.card.layout;

    let image = face.image_uris?.normal;
    if (layout == "flip") image = props.card.image_uris.normal;

    return (
        <>
            <img src={image}></img>
            <FlipButton flip={flip} />
        </>
    );
}
