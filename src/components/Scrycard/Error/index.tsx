export default function Error(props: { card_name: string }) {
    return (
        <div>
            <span>Error retrieving card: {props.card_name}</span>
        </div>
    );
}
