import React from "react";
import type { IScrytextPrimitiveProps } from "../../types/scrycard";

function processTextToElements(
    text: string,
    symbols: Record<string, string>,
): React.ReactNode[] {
    const parenthesesChunks = text.split(/(\(.*?\))/);
    const elements: React.ReactNode[] = [];

    parenthesesChunks.forEach((chunk, chunkIndex) => {
        if (!chunk) return;

        if (chunk.startsWith("(")) {
            const symbolElements = processSymbolsInText(
                chunk,
                symbols,
                `i-${chunkIndex}`,
            );
            elements.push(<i key={`i-${chunkIndex}`}>{symbolElements}</i>);
        } else {
            const symbolElements = processSymbolsInText(
                chunk,
                symbols,
                `text-${chunkIndex}`,
            );
            elements.push(...symbolElements);
        }
    });

    return elements;
}

function processSymbolsInText(
    text: string,
    symbols: Record<string, string>,
    keyPrefix: string,
): React.ReactNode[] {
    const regex = /\{([^}]+)\}/g;
    let match;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const textChunk = text.slice(lastIndex, match.index);
            if (textChunk) elements.push(textChunk);
        }

        const symbolName = "{" + match[1].toUpperCase() + "}";
        const symbol = symbols[symbolName];

        if (symbol) {
            elements.push(
                <img
                    key={`${keyPrefix}-${match.index}`}
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

    if (lastIndex < text.length) {
        const remainingText = text.slice(lastIndex);
        if (remainingText) elements.push(remainingText);
    }

    return elements;
}

export default function Scrytext({
    symbols,
    children,
    ...span_props
}: IScrytextPrimitiveProps) {
    if (!children) return null;
    if (!symbols) return <span {...span_props}>{children}</span>;
    if (children.length === 0) {
        return <span {...span_props}>{children}</span>;
    }

    const elements = processTextToElements(children, symbols);

    return <span {...span_props}>{elements}</span>;
}
