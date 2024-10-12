export default function FaceDown(props: { textOnly?: true }) {
    if (!props.textOnly) {
        console.error(
            "[scrycards] facedown is only currently supported in textonly",
        );
    }
    return (
        <div className="scrycard-facedown">
            <div />
        </div>
    );
}
