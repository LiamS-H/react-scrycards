import { ReactNode } from "react";
import { cardTypesFromTypeline } from "../../../../utils/cardtype";

function getChar(type: string): string | null {
    switch (type) {
        case "Flip":
            return "⇄";
        case "Artifact":
            return "⚙";
        case "Battle":
            return "⚔";
        case "Creature":
            return "C";
        case "Enchantment":
            return "≛";
        case "Instant":
            return "🗲";
        case "Land":
            return "⧋";
        case "Planeswalker":
            return "❉";
        case "Sorcery":
            return "★";
        case "Tribal":
            return "◈";
        default:
            return null;
    }
}

function Symbol(props: { types: string[] }): ReactNode {
    const symbols: string[] = [];
    for (const type of props.types) {
        const char = getChar(type);
        if (char) symbols.push(char);
    }

    return (
        <>
            {symbols.map((symbol: string) => (
                <svg key={symbol} viewBox="0 0 20 20">
                    <text x="0" y="16" color="">
                        {symbol}
                    </text>
                </svg>
            ))}
        </>
    );
}

export default function TypeSymbol(props: {
    // layout: ScryfallLayout;
    type_line: string;
}): ReactNode {
    const type_lines = props.type_line.split(" // ");
    const types = type_lines.map((tl) => cardTypesFromTypeline(tl));
    if (types.length == 1) return <Symbol types={types[0]} />;
    const symbols = [<Symbol key={"S0"} types={types[0]} />];
    for (let i = 1; i < types.length; i++) {
        symbols.push(<Symbol key={"F" + i} types={["Flip"]} />);
        symbols.push(<Symbol key={"S" + i} types={types[i]} />);
    }
    return symbols;
}
