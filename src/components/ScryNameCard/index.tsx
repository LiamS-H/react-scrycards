import { useScrycard } from "../../hooks/useScrycard";
import { IScrycardOptions, IScryNameCardProps } from "../../types/scrycard";
import Scrycard from "../Scrycard";
import ScryNameCardText from "../ScryNameCardtext";

export default function ScryNameCard(props: IScryNameCardProps) {
    const card = useScrycard(props.card_name);
    const options = {
        ...props,
        symbol_text_renderer: ScryNameCardText,
    } as IScrycardOptions;
    return <Scrycard card={card} {...options} />;
}
