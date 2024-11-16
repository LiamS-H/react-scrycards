import { useScrycardsContext } from "../../contexts/scrycards";
import type { IScrytextProps } from "../../types/scrycard";
import Scrytext from "../Scrytext";

export default function ScryNameCardText(props: IScrytextProps) {
    const { symbols } = useScrycardsContext();
    return <Scrytext {...props} symbols={symbols} />;
}
