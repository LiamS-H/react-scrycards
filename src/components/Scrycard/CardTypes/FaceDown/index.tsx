import { ScrycardSizes } from "../../../../types/scrycard";

export default function FaceDown(props: {
    textOnly?: true;
    size?: ScrycardSizes;
}) {
    if (props.textOnly) {
        return (
            <div className="scrycard-facedown">
                <div />
            </div>
        );
    }
    let src = undefined;
    switch (props.size) {
        case "xs":
            src =
                "https://utfs.io/f/kRsme8lq0G4uFlx0O9pcrqc6gyHZb5VMi0QUN1oLjw7tmX2R";
            break;
        case "sm":
            src =
                "https://utfs.io/f/kRsme8lq0G4u6gsK3g0t9a3BDG5egqVpwlHdLN4EjZ7P1oh0";
            break;
        case "md":
            src =
                "https://utfs.io/f/kRsme8lq0G4uNwVeFx4jU2rWeICwkEMzphcGfoP8bxJTqY9F";
            break;
        case "lg":
            src =
                "https://utfs.io/f/kRsme8lq0G4uoQ9d8G3Tnzfqbd9Kwl2sJtLoIyFUcP53NM4H";
            break;
        default:
            src =
                "https://utfs.io/f/kRsme8lq0G4uunA4r5Ez6eCt2vUVWFQdSzpjblg5D7cmJaYM";
    }
    return <img src={src} alt="facedown card" />;
}
