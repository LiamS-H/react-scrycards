const cardTypes = [
    "Artifact",
    "Creature",
    "Enchantment",
    "Instant",
    "Land",
    "Planeswalker",
    "Sorcery",
    "Tribal",
];
export function cardTypesFromTypeline(typeline: string): string[] {
    const types = typeline.split("—")[0].trim().split(" ");
    const card_types = [];
    for (const type of types) {
        if (!cardTypes.includes(type)) continue;
        card_types.push(type);
    }
    return card_types;
}
