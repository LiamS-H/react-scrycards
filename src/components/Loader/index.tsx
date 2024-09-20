import "./loader.css";

export default function Loader(props: { color?: string }) {
    const color = props.color ? props.color : "#1c4c5b";
    return (
        <div className="scrycards-loader-container">
            <div className="scrycards-loader" style={{ color: color }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
