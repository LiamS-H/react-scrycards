export function isUUID(str: string): boolean {
    return (
        str.length === 36 &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            str,
        )
    );
}
