export default function FlipButton(props: { flip: () => void }) {
    return (
        <button onClick={props.flip}>
            <svg viewBox="0 0 16 16">
                <text x="0" y="13.5">
                    🔄
                </text>
            </svg>
        </button>
    );
}
