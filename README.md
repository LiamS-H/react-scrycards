# React Scrycards

This library provides react components for rendering cards with data from [Scryfall API](https://scryfall.com/docs/api).

This project is unaffiliated with Scryfall

## Installation

```bash
npm install react-scrycards
```

## Examples

```tsx
import { ScrycardsContextProvider, ScryNameCard } from "react-scrycards";

function CardList() {
    return (
        <ScrycardsContextProvider>
            <ScryNameCard card_name="Opt">
        </ScrycardsContextProvider>
    )
}

```