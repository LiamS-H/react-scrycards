# react-scrycards

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
