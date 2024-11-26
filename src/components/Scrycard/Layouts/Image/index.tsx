import type { ScryfallImageUris } from "@scryfall/api-types";
import type { ScrycardSizes } from "../../../../types/scrycard";

function Image(props: {
    src: string;
    alt: string;
    inverted?: boolean;
    link?: string;
}) {
    const imageElement = (
        <img
            src={props.src}
            alt={props.alt}
            style={{ transform: props.inverted ? "rotate(180deg)" : "none" }}
        />
    );

    return props.link ? (
        <a href={props.link} target="_blank" rel="noopener noreferrer">
            {imageElement}
        </a>
    ) : (
        imageElement
    );
}

export default function ImageLayout(props: {
    card_name: string;
    image_uris: ScryfallImageUris;
    size?: ScrycardSizes;
    inverted?: boolean;
    link?: string;
}) {
    const size = props.size ?? "md";
    const imageSizeMap: Record<ScrycardSizes, string> = {
        xl: props.image_uris.png,
        lg: props.image_uris.large,
        md: props.image_uris.normal,
        sm: props.image_uris.small,
        xs: props.image_uris.small,
    };

    const src = imageSizeMap[size] || imageSizeMap.md || imageSizeMap.sm;

    return src ? (
        <Image
            src={src}
            alt={props.card_name}
            inverted={props.inverted}
            link={props.link}
        />
    ) : null;
}
