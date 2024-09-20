import { ScrycardSizes } from "../../../../types/scrycards/scrycard";
import { IScryfallCardImages } from "../../../../types/scryfall/cards";

function Image(props: { src: string; alt: string; inverted?: boolean }) {
    return (
        <img
            src={props.src}
            alt={props.alt}
            style={{ transform: props.inverted ? "rotate(180deg)" : "none" }}
        />
    );
}

export default function ImageDisplay(props: {
    card_name: string;
    image_uris: IScryfallCardImages;
    size: ScrycardSizes;
    inverted?: boolean;
}) {
    let size = props.size;
    let missing_size = false;
    if (size == "xl") {
        if (props.image_uris.png) {
            return (
                <Image
                    src={props.image_uris.png}
                    alt={props.card_name}
                    inverted={props.inverted}
                />
            );
        }
        missing_size = true;
    }
    if (size == "lg") {
        if (props.image_uris.large) {
            return (
                <Image
                    src={props.image_uris.large}
                    alt={props.card_name}
                    inverted={props.inverted}
                />
            );
        }
        missing_size = true;
    }
    if (missing_size || size == "md") {
        if (props.image_uris.normal) {
            return (
                <Image
                    src={props.image_uris.normal}
                    alt={props.card_name}
                    inverted={props.inverted}
                />
            );
        }
        missing_size = true;
    }
    if (props.image_uris.small) {
        return (
            <Image
                src={props.image_uris.small}
                alt={props.card_name}
                inverted={props.inverted}
            />
        );
    }
    return null;
}
