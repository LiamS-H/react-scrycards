import Scrytext from "../../../Scrytext";
import {
    generateCardBorder,
    generateCardGradient,
} from "../../../../utils/cardBorder";
import { ScryfallCard, ScryfallColors } from "@scryfall/api-types";

import "../layouts.css";
import { IScrycardLayoutCard } from "../../../../types/scrycards/scrycard";

export default function Normal(props: { card: IScrycardLayoutCard }) {
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
                            ? generateCardGradient(props.card.colors)
                            : {}
                    }
                >
                    {props.card.type_line.split("-")[0]}
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
            </div>
        </div>
    );
}
