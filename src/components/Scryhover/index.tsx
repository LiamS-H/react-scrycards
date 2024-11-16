import { useState, useRef } from "react";

interface IScryhoverProps extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function Scryhover(props: IScryhoverProps) {
    const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
    const animationFrameId = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();

        const x = clientX - (rect.left + rect.width / 2);
        const y = clientY - (rect.top + rect.height / 2);

        const strength = 20;

        const rotateX = -(y / rect.height) * strength;
        const rotateY = (x / rect.width) * strength;

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }

        animationFrameId.current = requestAnimationFrame(() => {
            setRotation({ rotateX, rotateY });
        });
    };

    const handleMouseLeave = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        setRotation({ rotateX: 0, rotateY: 0 });
    };

    return (
        <div
            {...(props as React.HTMLProps<HTMLDivElement>)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="scryhover-bound"
            style={{
                width: "fit-content",
                height: "fit-content",
            }}
        >
            <div
                className="scryhover-transform"
                style={{
                    transition: "transform 0.2s ease-out",
                    transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
                }}
            >
                {props.children}
            </div>
        </div>
    );
}
