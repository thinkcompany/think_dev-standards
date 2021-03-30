---
title: Cards
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 2. Primitives
description: ""
---

Cards are used as a container for groups of related information. With so many different types of information to surface for {CLIENT NAME} products, it is important to clearly separate one group of elements from another.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/primitives-cards--all" target="_blank"> View Cards in Storybook</a>

---

## When to use cards

Any combination of icons, text, buttons, images, status indicators that are related and represent a single unit, can use a card to group them.

---

## How it works

- When using cards, correct spacing around and in between the elements it contains is required. This specific sizing varies depending on the elements that are included.
- Generally, container and action cards should be placed on a surface with Background Secondary.

### Card Types

#### Container Cards

Use a container card when the card is a simple container for information and/or interactive elements

#### Communication Cards

Used for system or status messages.

- General: Contains general or neutral content
- Success: Contains success or positive content
- Warning: Contains warning or danger content
- Error: Contains error or danger content

---

## Visual Details

### Style

- No matter the color or size of a card they will share one thing in common, a 4px rounded corner radius.

#### Container Cards

| Card Type | Background         | Border                    | Shadow                                     |
| --------- | ------------------ | ------------------------- | ------------------------------------------ |
| Border    | Background Primary | 0.5px Background Tertiary | None                                       |
| Shadow    | Background Primary | 0.5px Background Tertiary | `box-shadow: 0 4px 12px rgba(0,0,0,0.15);` |

#### Communication Cards

| Card Type | Background            | Border                    |
| --------- | --------------------- | ------------------------- |
| General   | Tint Blue Secondary   | 0.5px Tint Blue Primary   |
| Success   | Tint Green Secondary  | 0.5px Tint Green Primary  |
| Warning   | Tint Orange Secondary | 0.5px Tint Orange Primary |
| Error     | Tint Red Secondary    | 0.5px Tint Red Primary    |
