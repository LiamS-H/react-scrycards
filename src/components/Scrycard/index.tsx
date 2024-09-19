import {
    IScryfallCardFace,
    IScryfallDualCard,
} from "../../types/scryfallcards";
import DualFaced from "./DualFaced";
import FlipCard from "./FlipCard";
import LoadingCard from "./Loading";
import SingleFaced from "./SingleFaced";
import { useScrycard } from "../../hooks/useScrycard";
import { ReactNode } from "react";
import { IScrycardProps } from "../../types/scrycard";
import "./scrycard.css";
import Error from "./Error";

interface ICardWrapperProps extends Omit<IScrycardProps, "card_name"> {
    children: ReactNode;
}

function CardWrapper(props: ICardWrapperProps) {
    const className = props.size ? `scrycard-${props.size}` : "scrycard";
    return <div className={className}>{props.children}</div>;
}

export default function Scrycard(props: IScrycardProps) {
    const card = useScrycard(props.card_name);
    if (card == undefined) {
        return (
            <CardWrapper>
                <Error card_name={props.card_name} />
            </CardWrapper>
        );
    }
    if (card == null) {
        return (
            <CardWrapper {...props}>
                <LoadingCard />
            </CardWrapper>
        );
    }
    if (card.layout == "flip") {
        return (
            <CardWrapper {...props}>
                <FlipCard card={card as IScryfallDualCard} />
            </CardWrapper>
        );
    }
    if (card.card_faces && card.card_faces[0].image_uris) {
        return (
            <CardWrapper {...props}>
                <DualFaced card={card as IScryfallDualCard} />
            </CardWrapper>
        );
    }
    return (
        <CardWrapper {...props}>
            <SingleFaced card={card} />
        </CardWrapper>
    );
}
