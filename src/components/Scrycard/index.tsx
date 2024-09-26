import React, { ReactNode } from "react";
import "./scrycard.css";
import { IScrycardOptions, IScrycardProps } from "../../types/scrycard";
import Scryhover from "../Scryhover";
import { ScryfallCard } from "@scryfall/api-types";
import Error from "./CardTypes/Error";
import LoadingCard from "./CardTypes/Loading";
import SingleFaced from "./CardTypes/SingleFaced";
import FlipCard from "./CardTypes/SingleSidedFlip";
import DoubleSided from "./CardTypes/DoubleSidedFlip";
import SplitCard from "./CardTypes/SingleSidedSplit";

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
    const width: string | null = props.width ? props.width : null;
    const height: string | null = !width && props.height ? props.height : null;
    const style: React.CSSProperties = {};
    if (width) style.width = width;
    if (height) style.height = height;

    const size = props.size ? props.size : "md";

    const className = height || width ? "scrycard" : `scrycard-${size}`;
    if (!props.animated)
        return (
            <div style={style} className={className}>
                {props.children}
            </div>
        );
    return (
        <Scryhover>
            <div style={style} className={className}>
                {props.children}
            </div>
        </Scryhover>
    );
}

function compFromCard(
    options: IScrycardOptions,
    card: ScryfallCard.Any | undefined | null,
) {
    if (card === undefined) {
        return <Error />;
    }
    if (card === null) {
        return <LoadingCard />;
    }
    if (!("card_faces" in card)) {
        return <SingleFaced card={card} {...options} />;
    }
    if (card.layout == "flip") {
        return <FlipCard card={card} {...options} />;
    }
    if ("card_back_id" in card) {
        return <SplitCard card={card} {...options} />;
    }
    return <DoubleSided card={card} {...options} />;
}

export default function Scrycard(props: IScrycardProps) {
    const options = props as IScrycardOptions;
    const card = compFromCard(options, props.card);

    return <CardWrapper {...options}>{card}</CardWrapper>;
}
