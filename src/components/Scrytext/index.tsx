import React from "react";
import { useScrycardsContext } from "../../contexts/scrycards";

interface IScrytextProps extends React.HTMLProps<HTMLSpanElement> {
    children?: string;
}

function Italify(input: string): React.ReactNode[] {
    const chunks = input.split(/(\(.*?\))/);
    return chunks.map((chunk) => {
        if (chunk[0] === "(") return <i key={chunk}>{chunk}</i>;
        return chunk;
    });
}

export default function Scrytext(props: IScrytextProps) {
    const { symbols } = useScrycardsContext();
    if (!props.children) return null;
    if (!symbols) return <span {...props}>{props.children}</span>;
    if (props.children.length === 0)
        return <span {...props}>{props.children}</span>;
    const regex = /\{([^}]+)\}/g;
    let match;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    while ((match = regex.exec(props.children)) !== null) {
        elements.push(
            ...Italify(props.children.slice(lastIndex, match.index).trim()),
        );

        const symbolName = "{" + match[1].toUpperCase() + "}";
        const symbol = symbols[symbolName];
        if (symbol) {
            elements.push(
                <img
                    key={`${symbolName} ${match.index}`}
                    src={symbol}
                    alt={symbolName}
                    style={{
                        height: "1em",
                        verticalAlign: "middle",
                        width: "fit-content",
                    }}
                />,
            );
        } else {
            elements.push(match[0]);
        }
        lastIndex = regex.lastIndex;
    }

    elements.push(...Italify(props.children.slice(lastIndex).trim()));

    return <span {...props}>{elements}</span>;
}
