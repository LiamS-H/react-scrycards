import { ICardFace } from "..";
import { ScryfallColors } from "../../../../types/scryfall/cards";
import Scrytext from "../../../Scrytext";
import "./textdisplay.css";

const colorMap: Record<ScryfallColors, string> = {
    U: "#1E90FF",
    W: "#dbd7a7",
    B: "#000000",
    G: "#228B22",
    R: "#FF4500",
};
function generateCardGradient(colors: ScryfallColors[]): React.CSSProperties {
    const order: ScryfallColors[] = ["B", "U", "G", "R", "W"];
    const ordered_colors: ScryfallColors[] = [];
    for (const color of order) {
        if (colors.includes(color)) {
            ordered_colors.push(color);
        }
    }

    const colors_str = ordered_colors
        .map((color) => colorMap[color])
        .join(", ");

    return {
        background: `linear-gradient(90deg, ${colors_str})`,
    };
}
function generateCardBorder(colors: ScryfallColors[]): React.CSSProperties {
    if (!colors) {
        console.error(
            "[scrycards] invalid props reached text render, card type error",
        );
        return { backgroundColor: "#FF0000" };
    }
    if (colors.length === 0) {
        return { backgroundColor: "#D3D3D3" };
    }
    if (colors.length === 1) {
        return { backgroundColor: colorMap[colors[0]] };
    }
    if (colors.length > 2) {
        return { backgroundColor: "#aba15d" };
    }
    return generateCardGradient(colors);
}

export default function TextDisplay(props: {
    card_face: ICardFace;
    layout: string;
}) {
    return (
        <div className="scrytextcard-container">
            <div
                className="scrytextcard"
                style={generateCardBorder(props.card_face.colors)}
            >
                <div className="scrytextcard-titleline">
                    <span className="scrytextcard-name">
                        {props.card_face.name}
                    </span>
                    <Scrytext className="scrytextcard-mana_cost">
                        {props.card_face.mana_cost}
                    </Scrytext>
                </div>
                <div
                    className="scrytextcard-imagespacer"
                    style={
                        props.card_face.colors.length > 2
                            ? generateCardGradient(props.card_face.colors)
                            : {}
                    }
                >
                    {/* {props.layout} */}
                </div>
                <div className="scrytextcard-typeline">
                    <span className="scrytextcard-type">
                        {props.card_face.type_line}
                    </span>
                </div>
                <div className="scrytextcard-oracletext">
                    {props.card_face.oracle_text
                        ? props.card_face.oracle_text
                              .split("\n")
                              .map((line, index) => {
                                  return (
                                      <Scrytext
                                          key={`oracle-line[${index}]`}
                                          className="scrytextcard-oracle"
                                      >
                                          {line}
                                      </Scrytext>
                                  );
                              })
                        : null}
                </div>
            </div>
        </div>
    );
}
