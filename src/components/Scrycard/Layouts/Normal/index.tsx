import Scrytext from "../../../Scrytext";
import {
    generateCardBorder,
    generateCardGradient,
} from "../../../../utils/cardBorder";

import "../layouts.css";
import { IScrycardLayoutCard } from "../../../../types/scrycard";
import { cardTypesFromTypeline } from "../../../../utils/cardtype";
import TypeSymbol from "../TypeSymbol";
import { ScryfallColor } from "@scryfall/api-types";
import { colorsFromCost } from "../../../../utils/cardColors";

export default function Normal(props: { card: IScrycardLayoutCard }) {
    const card_types = cardTypesFromTypeline(props.card.type_line);
    if (card_types.includes("Land")) {
        props.card.colors = props.card.color_identity
            ? props.card.color_identity
            : ["C"];
    }
    props.card.mana_cost ??= "";
    return (
        <div className="scrytextcard-container">
            <div
                className="scrytextcard"
                style={generateCardBorder(props.card.colors)}
            >
                <div className="scrytextcard-titleline">
                    <span className="scrytextcard-name">{props.card.name}</span>
                    <Scrytext className="scrytextcard-mana_cost">
                        {props.card.mana_cost}
                    </Scrytext>
                </div>
                <div
                    className="scrytextcard-imagespacer"
                    style={
                        props.card.colors.length > 2
                            ? generateCardGradient(
                                  colorsFromCost(props.card.mana_cost),
                              )
                            : {}
                    }
                >
                    <TypeSymbol
                        type_line={
                            props.card.full_type_line || props.card.type_line
                        }
                    />
                </div>
                <div className="scrytextcard-typeline">
                    <span className="scrytextcard-type">
                        {props.card.type_line}
                    </span>
                </div>
                <div className="scrytextcard-oracletext">
                    {props.card.oracle_text
                        ? props.card.oracle_text
                              .split("\n")
                              .map((line: string, index: number) => {
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
                {props.card.power ? (
                    <div className="scrytextcard-ptline">
                        {props.card.power}/{props.card.toughness}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
