import { useScrycardsContext } from "../../contexts/scrycards";
import { useSymbols } from "../../hooks/useSymbols";
import type { IScrytextProps } from "../../types/scrycard";
import Scrytext from "../Scrytext";

export default function ScryNameCardText(props: IScrytextProps) {
    const symbols = useSymbols();
    return <Scrytext {...props} symbols={symbols} />;
}
