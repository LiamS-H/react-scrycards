import { useState } from "react";
import { IScryfallDualCard } from "../../../types/scryfallcards";
import FlipButton from "../FlipButton";
export default function FlipCard(props: { card: IScryfallDualCard }) {
    const [flipped, setFlipped] = useState<boolean>(false);
    function flip() {
        setFlipped((flipped) => !flipped);
    }
    return (
        <>
            <img
                style={{ transform: flipped ? "rotate(180deg)" : "none" }}
                src={props.card.image_uris.normal}
            ></img>
            <FlipButton flip={flip} />
        </>
    );
}
