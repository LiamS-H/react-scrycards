type ScryfallColors = "U" | "W" | "B" | "G" | "R";

interface IScryfallCardResult {
    object: "list";

    total_cards: number;
    has_more: boolean;
    next_page: string;
    data: IScryfallCard[];
}

interface IScryfallError {
    object: "error";

    code: string;
    status: number;
    warnings: string[];
    details: string;
}

interface IScryfallParts {
    component: "token" | "combo_piece" | "meld_result" | "meld_part";
    id: string;
    name: string;
    object: "related_card";
    type_line: "Token";
    uri: string;
}

interface IScryfallCardFace {
    object: "card_face";

    name: string;
    mana_cost: string;
    power: string;
    toughness: string;

    colors: ScryfallColors[];
    color_identity: ScryfallColors[];
    type_line: string;
    oracle_text: string;

    image_uris?: IScryfallCardImages;

    artist: string;
}

interface IScryfallCardImages {
    art_crop: string;
    border_crop: string;
    png: string;
    normal: string;
    large: string;
    small: string;
}

interface IScryfallCard {
    object: "card";

    id: string;
    name: string;
    mana_cost: string;
    cmc: string;
    power: string;
    toughness: string;
    keywords: string[];
    layout:
        | "flip"
        | "normal"
        | "leveler"
        | "case"
        | "transform"
        | "adventure"
        | "class"
        | string;
    uri: string;
    scryfall_uri: string;

    price: string | null;
    prices: {
        usd: string | null;
        usd_foil: string | null;
        usd_etched: string | null;
        eur: string | null;
        eur_foil: string | null;
        tix: string | null;
    };

    colors: ScryfallColors[];
    color_identity: ScryfallColors[];
    type_line: string;
    oracle_text: string;

    image_status: "lowres" | "highres_scan" | string;
    highres_image: true;
    image_uris: IScryfallCardImages;
    card_faces?: IScryfallCardFace[];
    all_parts: IScryfallParts[];

    artist: string;
}
interface IScryfallDualCard extends IScryfallCard {
    card_faces: IScryfallCardFace[];
}

interface IScryfallMeldCard extends IScryfallCard {
    all_cards: IScryfallParts;
}

export type {
    IScryfallCardResult,
    IScryfallError,
    IScryfallCard,
    IScryfallCardFace,
    IScryfallCardImages,
    IScryfallDualCard,
    ScryfallColors,
    IScryfallMeldCard,
};
