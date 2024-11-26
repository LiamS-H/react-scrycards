import { ReactNode } from "react";

export default function FlipButton(props: {
    flip: () => void;
    flipIcon?: ReactNode;
}) {
    return (
        <button onClick={props.flip}>
            {props.flipIcon ? (
                props.flipIcon
            ) : (
                <svg viewBox="0 0 16 16">
                    <text x="0" y="13.5">
                        🔄
                    </text>
                </svg>
            )}
        </button>
    );
}
