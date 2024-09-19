import "./loader.css";

export default function Loader(props: { color?: string }) {
    return (
        <div className="scrycards-loader-container">
            <div className="scrycards-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
