import { useScrycard } from "../../hooks/useScrycard";
import {
    IScrycardOptions,
    IScryNameCardProps,
} from "../../types/scrycards/scrycard";
import Scrycard from "../Scrycard";

export default function ScryNameCard(props: IScryNameCardProps) {
    const card = useScrycard(props.card_name);
    const options = props as IScrycardOptions;
    return <Scrycard card={card} {...options} />;
}
