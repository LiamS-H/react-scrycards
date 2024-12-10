# React Scrycards

This library provides react components for rendering cards with data from [Scryfall API](https://scryfall.com/docs/api).

This project is unaffiliated with Scryfall

## Installation

```bash
npm install react-scrycards
```

### Importing CSS

```tsx
import "react-scrycards/dist/index.css";
```
# Examples

## Base Use Case

### Context <a id="context" />
```tsx
import { ScrycardsContextProvider } from "react-scrycards";

<ScrycardsContextProvider>
    <Root />
</ScrycardsContextProvider>
```
This context provides a function to fetch a card asyncronously. If the card doesn't exist in the cache, the card is fetched from Scryfall. This context is optimized for high volume renders; requests are batched on each render cycle so a page which renders 50 new cards will only make 1 fetch request.
```ts
requestCard(arg0:string)
```
The other function provided by the context allows prefetching of cards.
This is great for scenarios where the cardpool is known beforehand but cards may be rendered over time (such as in a simulator).
By prefetching, you only fetch once instead of each time a new card is rendered.
```ts
preloadCards(arg0:string[])
```

### ScryNameCard
```tsx
import { ScrycardsContextProvider, ScryNameCard } from "react-scrycards";

<ScryNameCard card_name="Opt">
```
Rendering and fetching a card is as simple as using the ```<ScryNameCard/>``` inside [the context](#context).
```<ScryNameCard/>``` wraps ```<Scrycard/>``` to provide a card object from a name or id using the Scrycards Context.

All Scrycard card components have several props to control how the rendered card looks.
Try using ```"animated"``` for a tasteful hover animation, or ```"flipable"``` to automatically handle multifaced or multisided cards.

## Custom Use Case
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
### Scrycard

While [the context](#context) is great for providing a link between **card names** and **card ids** to their Scryfall objects, an application may want to take advantage of the components without [the context](#context).

```<Scrycard card={card}/>``` renders a ```card:ScryfallCard.ANY``` object without using [the context](#context).

### Scrytext
Rendering Scrycards outside [the context](#context) works great **except when using the ```textOnly``` prop**.
Because, ```<Scrycard/>``` doesn't have a map for {?} strings to their symbols unless it is fetched.

```<Scrycard/>``` accepts a ```symbol_text_renderer()``` (such as ```<Scrytext/>```) to parse text with {?} strings and replace with the corresponding symbols.
This renderer is used for the oracle text and mana cost for ```textOnly``` layout.

```<Scrytext symbols={symbols}/>``` accepts a ```IScrysymbolMap``` to match strings like "{R}" to their corresponding symbol uris.

```<ScryNameCardText/>``` is also an option that wraps ```<Scrytext/>``` to provide a symbol renderer that pulls symbols from [the context](#context).

