import { IScryfallDualCard } from "../../types/scryfall/cards";
import DualFaced from "./DualFaced";
import FlipCard from "./FlipCard";
import LoadingCard from "./Loading";
import SingleFaced from "./SingleFaced";
import React, { ReactNode } from "react";
import "./scrycard.css";
import Error from "./Error";
import {
    IScrycardOptions,
    IScrycardProps,
} from "../../types/scrycards/scrycard";
import SplitCard from "./SplitCard";

interface ICardWrapperProps extends IScrycardOptions {
    children: ReactNode;
}

function CardWrapper(props: ICardWrapperProps) {
    if (props.width && props.height) {
        console.error(
            "[scrycards] card renderred with custom width and height. Width takes priority and height ignored for aspect ratio.",
        );
    }
    if ((props.width || props.height) && props.textOnly) {
        console.error(
            "[scrycards] custom width / height is unsupported for textOnly",
        );
    }
    let width: string | null = props.width ? props.width : null;
    let height: string | null = !width && props.height ? props.height : null;
    const style: React.CSSProperties = {};
    if (width) style.width = width;
    if (height) style.height = height;

    const size = props.size ? props.size : "md";

    const className = height || width ? "scrycard" : `scrycard-${size}`;
    return (
        <div style={style} className={className}>
            {props.children}
        </div>
    );
}

export default function Scrycard(props: IScrycardProps) {
    let card = null;
    const options = props as IScrycardOptions;

    if (props.card === undefined) {
        card = <Error />;
    } else if (props.card === null) {
        card = <LoadingCard />;
    } else if (props.card.layout == "flip") {
        card = <FlipCard card={props.card as IScryfallDualCard} {...options} />;
    } else if (props.card.layout == "split") {
        card = (
            <SplitCard card={props.card as IScryfallDualCard} {...options} />
        );
    } else if (props.card.card_faces && props.card.card_faces[0].image_uris) {
        card = (
            <DualFaced card={props.card as IScryfallDualCard} {...options} />
        );
    } else {
        card = <SingleFaced card={props.card} {...options} />;
    }
    return <CardWrapper {...options}>{card}</CardWrapper>;
}
