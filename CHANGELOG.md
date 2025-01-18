# react-scrycards

## 1.5.2

### Patch Changes

-   f443597: optimized useScrycard to return card on first render not second to prevent flickering

## 1.5.1

### Patch Changes

-   021e5cc: fix isFlippable

## 1.5.0

### Minor Changes

-   b4f18a3: cache is now ref based to solve race conditions
    cache now batches and spaces out requests to comply with API restrictions
    cache now supports mass preloading
    add tests for race conditions and mass preloading

## 1.4.1

### Patch Changes

-   84c5733: fixed cache issue for multiname cards

## 1.4.0

### Minor Changes

-   1f88824: - changed context to use Scryfall UUIDs under the hood
    -   added the ability to fetch cards by UUID
    -   added preloading function to context
    -   small documentation update to reflect changes
    -   updated dependencies

## 1.3.1

### Patch Changes

-   2ab7f72: added missing style for tapped card

## 1.3.0

### Minor Changes

-   e2c3ef2: new fields to control Scrycard state
-   1ca7b5e: move react to peer dependency

### Patch Changes

-   3c5729a: add facedown card images and controlled state

## 1.2.2

### Patch Changes

-   2cb8a2b: remove all scryfall imports (from js)

## 1.2.1

### Patch Changes

-   aa67fb3: switch Scryfall type import to type

## 1.2.0

### Minor Changes

-   525dcc5: add scrydeck
    add facedown display

### Patch Changes

-   97800a4: added jsdoc comments

## 1.1.2

### Patch Changes

-   05f4fa9: update README with css import

## 1.1.1

### Patch Changes

-   113b090: fix publish

## 1.1.0

### Minor Changes

-   76850f6: Add README, expose primatives for custom components

### Patch Changes

-   88de248: fix broken release

## 1.0.1 - 1.0.6

### Broken Changes

-   Broken changes were pushed in error and resulted in incomplete packages.

## 1.0.0

### Major Changes

Contexts

-   ScrycardsContext: Caches card data and provides a mechanism for requesting cards.
-   useScrycardsContext: Helper function for retrieving the scrycards context.

Components

-   ScryNameCard: Uses context to retrive card data and reder a component from a name.
-   ScryCard: Uses a scrycard object to render a card component.
-   ScryText: Uses context for cached symbols to render and a card without images

Types

-   Types for scryfall and scrycards
