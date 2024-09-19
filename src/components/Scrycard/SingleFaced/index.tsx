import { IScryfallCard } from "../../../types/scryfallcards";

export default function SingleFaced(props: { card: IScryfallCard }) {
    return (
        <>
            <img src={props.card.image_uris.normal}></img>
        </>
    );
}
