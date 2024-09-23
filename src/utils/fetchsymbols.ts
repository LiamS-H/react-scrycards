import {
    ScryfallCardSymbol,
    ScryfallError,
    ScryfallList,
} from "@scryfall/api-types";

export async function fetchsymbols(): Promise<ScryfallCardSymbol[] | null> {
    const url = new URL("https://api.scryfall.com/symbology");
    try {
        const r = await fetch(url.toString());
        let data = (await r.json()) as ScryfallList.CardSymbols | ScryfallError;

        if (data.object != "list") return null;
        const fetched_symbols = data.data;

        while (data.has_more) {
            const r = await fetch(data.next_page);
            data = (await r.json()) as ScryfallList.CardSymbols | ScryfallError;

            if (data.object != "list") return null;
            fetched_symbols.concat(data.data);
        }
        return fetched_symbols;
    } catch (error) {
        console.error("[scrycards] scryfall-error fetching symbols:", error);
        return null;
    }
}
