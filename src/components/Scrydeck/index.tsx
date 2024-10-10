import { ReactNode } from "react";
import { ScrycardSizes } from "../../types/scrycard";

import "../Scrycard/scrycard.css";

export default function Scrydeck(props: {
    size?: ScrycardSizes;
    width?: string;
    height?: string;
    children: ReactNode;
    count: number;
}) {
    if (props.width && props.height) {
        console.error(
            "[scrycards] card renderred with custom width and height. Width takes priority and height ignored for aspect ratio.",
        );
    }

    const width: string | null = props.width ? props.width : null;
    const height: string | null = !width && props.height ? props.height : null;
    const style: React.CSSProperties = {};
    if (width) style.width = width;
    if (height) style.height = height;
    const size = props.size ? props.size : "md";

    const shadows = [];
    let Xoffset = 0.1;
    let Yoffset = 0.3;
    let cards_per_shadow = 5;
    if (props.count < 5) {
        Xoffset = 0.02;
        Yoffset = 0.06;
        cards_per_shadow = 1;
    }
    for (let i = 1; i < props.count; i += cards_per_shadow) {
        // const Coffset = -0.625 + ((i * 7) % 25) * 0.25;
        // shadows.push(
        //     `${i * Xoffset}px ${i * Yoffset}px 0 rgb(${23 + Coffset},${
        //         21 + Coffset
        //     },${15 + Coffset})`,
        // );

        shadows.push(`${i * Xoffset * 1.5}px ${i * Yoffset * 1.5}px 0 #17150f`);
    }

    style.boxShadow = shadows.join(", ");

    const className = height || width ? "scrycard" : `scrycard-${size}`;
    return (
        <div style={style} className={className}>
            {props.children}
        </div>
    );
}
