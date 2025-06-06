import { ScrycardSizes } from "../../../../types/scrycard";

const facedownHosts: Record<ScrycardSizes, string> = {
    xs: "https://utfs.io/f/kRsme8lq0G4uFlx0O9pcrqc6gyHZb5VMi0QUN1oLjw7tmX2R",
    sm: "https://utfs.io/f/kRsme8lq0G4u6gsK3g0t9a3BDG5egqVpwlHdLN4EjZ7P1oh0",
    md: "https://utfs.io/f/kRsme8lq0G4uNwVeFx4jU2rWeICwkEMzphcGfoP8bxJTqY9F",
    lg: "https://utfs.io/f/kRsme8lq0G4uoQ9d8G3Tnzfqbd9Kwl2sJtLoIyFUcP53NM4H",
    xl: "https://utfs.io/f/kRsme8lq0G4uunA4r5Ez6eCt2vUVWFQdSzpjblg5D7cmJaYM",
};

export default function FaceDown({
    textOnly,
    size,
}: {
    textOnly?: true;
    size?: ScrycardSizes;
}) {
    if (textOnly) {
        return (
            <div className="scrycard-facedown">
                <div />
            </div>
        );
    }
    return <img src={facedownHosts[size ?? "md"]} alt="facedown card" />;
}
