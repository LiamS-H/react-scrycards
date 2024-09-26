# React Scrycards

This library provides react components for rendering cards with data from [Scryfall API](https://scryfall.com/docs/api).

This project is unaffiliated with Scryfall

## Installation

```bash
npm install react-scrycards
```

## Examples

### Base Use Case
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

```<ScryNameCard/>``` wraps ```<Scrycard/>``` to provide a card object using the Scrycards Context.

```<ScryNameCardText/>``` also wraps ```<Scrytext/>``` to provide a symbol renderer that pulls cached symbols from the Context.

### Customized Use Case

In a more advanced app which wishes to use their own Scryfall API fetchers, and cache, you can create your own elements with the ```<Scrytext/>``` and ```<Scrycard/>``` Primitives.

```<Scrytext/>``` accepts a ```<IScrysymbolMap/>``` to match strings like "{R}" to their corresponding symbol uris.

```<Scrycard/>``` accepts a ```symbol_text_renderer()``` (such as a ```<Scrytext/>```) to parse text with {?} symbols into a text component you wish to render. This renderer is used for the oracle text and mana cost for textOnly layout.

```tsx
import { Scrycard, Scrytext, IScrytextProps } from "react-scrycards";
import ScryfallCard from "@scryfall/api-types"


function CustomScrytext(props: IScrytextProps) {
    const { symbols } = useSymbolsFromCustomContext()
    return <Scrytext {...props} symbols={symbols}/>
}

function CustomScrycard(props:{card: ScryfallCard.ANY}) {
    return <ScryCard card={props.card} symbol_text_renderer={CustomScrytext}/>
}
```