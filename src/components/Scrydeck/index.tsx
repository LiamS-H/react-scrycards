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
    let i = 0;
    for (; i < props.count - 5; i += 5) {
        shadows.push(`${i * 0.15}px ${i * 0.45}px 0 #17150f`);
    }
    for (let j = props.count; j > i; j--) {
        const offset = props.count - j;

        shadows.push(
            `${(i + offset) * 0.15}px ${(i + offset) * 0.45}px 0 #17150f`,
        );
    }

    style.boxShadow = shadows.join(", ");

    const className = height || width ? "scrycard" : `scrycard-${size}`;
    return (
        <div style={style} className={className}>
            {props.children}
        </div>
    );
}
