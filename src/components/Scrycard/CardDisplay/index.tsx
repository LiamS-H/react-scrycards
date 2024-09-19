import { IScryfallCard, IScryfallCardFace } from "../../../types/scryfallcards";

type ICardFace = Omit<IScryfallCardFace, "object">;

export default function CardDisplay(props: {
    card: IScryfallCardFace | IScryfallCard;
}) {
    const card_face = props.card as ICardFace;
}
