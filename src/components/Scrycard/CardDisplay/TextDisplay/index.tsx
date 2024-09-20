import { ICardFace } from "..";
import { ScryfallColors } from "../../../../types/scryfall/cards";
import Scrytext from "../../../Scrytext";
import "./textdisplay.css";

type MTGColors = ScryfallColors[] | [];

const colorMap: Record<ScryfallColors, string> = {
    U: "#1E90FF",
    W: "#FFFFFF",
    B: "#000000",
    G: "#228B22",
    R: "#FF4500",
};

const generateGradientStyle = (colors: MTGColors): React.CSSProperties => {
    if (colors.length === 0) {
        return { backgroundColor: "#D3D3D3" };
    }
    if (colors.length === 1) {
        return { backgroundColor: colorMap[colors[0]] };
    }
    if (colors.length > 2) {
        return { backgroundColor: "#aba15d" };
    }
    const colors_str = colors.map((color) => colorMap[color]).join(", ");
    return {
        background: `linear-gradient(90deg, ${colors_str})`,
    };
};

export default function TextDisplay(props: { card_face: ICardFace }) {
    return (
        <div className="scrytextcard-container">
            <div
                className="scrytextcard"
                style={generateGradientStyle(props.card_face.colors)}
            >
                <div className="scrytextcard-titleline">
                    <span className="scrytextcard-name">
                        {props.card_face.name}
                    </span>
                    <Scrytext className="scrytextcard-mana_cost">
                        {props.card_face.mana_cost}
                    </Scrytext>
                </div>
                <div className="scrytextcard-imagespacer" />
                <div className="scrytextcard-typeline">
                    <span className="scrytextcard-type">
                        {props.card_face.type_line}
                    </span>
                </div>
                <div className="scrytextcard-oracletext">
                    <Scrytext className="scrytextcard-oracle">
                        {props.card_face.oracle_text}
                    </Scrytext>
                </div>
            </div>
        </div>
    );
}
