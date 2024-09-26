interface IScryfallSymbolResult {
    object: "list";

    has_more: boolean;
    next_page: string;
    data: IScryfallSymbol[];
}

interface IScryfallSymbol {
    object: "card_symbol";
    symbol: string;
    svg_uri: string;
    loose_variant: null | string;
    english: string;
    transposable: boolean;
    represents_mana: boolean;
    appears_in_mana_costs: boolean;
    mana_value: number | null;
    hybrid: boolean;
    phyrexian: boolean;
    cmc: number | null;
    funny: boolean;
    colors: ScryfallSymbolColor[];
    gatherer_alternates: string[] | null;
}

enum ScryfallSymbolColor {
    B = "B",
    G = "G",
    R = "R",
    U = "U",
    W = "W",
}

export type { IScryfallSymbol, IScryfallSymbolResult };
