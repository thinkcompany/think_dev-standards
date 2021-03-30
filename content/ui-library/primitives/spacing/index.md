---
title: Spacing
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 2. Primitives
description: ""
---

The following guidelines around spacing will help ensure consistency across the UIs of various products within the {CLIENT NAME} products.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/primitives-spacing--inset" target="_blank"> View Spacing in Storybook</a>

---

## When to use spacing

As different objects are placed in proximity with other objects in a UI, we need to know the right amount of space to put around and between them. You can learn when specific amounts and types of spacing should be used in the breakdown below.

## How it works

### Inset

Inset spacing distances all content equally from its border on all four sides.

Depending on the context, you can add different sizes of inset ranging from Inset 4 to Inset 64. When deciding on which inset spacing to use, consider the amount and size of elements you are using and their relation to the container it will be in.

Inset spacing is used most commonly in these contexts:

- Inset for a card containing information
- Inset for system message banner

| Name     | All Sides |
| -------- | --------: |
| Inset 4  |       4px |
| Inset 8  |       8px |
| Inset 12 |      12px |
| Inset 16 |      16px |
| Inset 24 |      24px |
| Inset 32 |      32px |
| Inset 64 |      64px |

### Squish

Squish is similar to inset except it reduces space on the top and bottom.

Depending on the context, you can add different sizes of squish ranging from Squish 2 to Squish 32. When deciding on which squish spacing to use, consider the amount and size of elements you are using and their relation to the container it will be in.

Squish spacing is used most commonly in these contexts:

- Buttons
- Table cells
- Cell-like containers (data tables, list items, etc.)

| Name         | Top & Bottom | Left & Right |
| ------------ | -----------: | -----------: |
| Squish 2-4   |          2px |          4px |
| Squish 4-8   |          4px |          8px |
| Squish 8-12  |          8px |         12px |
| Squish 8-16  |          8px |         16px |
| Squish 12-16 |         12px |         16px |
| Squish 16-24 |         16px |         24px |
| Squish 32-64 |         32px |         64px |

### Stack

Stack spacing is the vertical space between elements.

Depending on the context, you can add different sizes of stack ranging from Stack 2 to Stack 64. When deciding on which stack size to use, consider the text, interactive/graphic elements that will be stacked and the readability and touch targets of those elements when in close proximity.

Stack spacing is used most commonly in these contexts:

- Vertical space between cards
- Vertical space between text elements in a card or container

| Name     | Vertical Space |
| -------- | -------------: |
| Stack 2  |            2px |
| Stack 4  |            4px |
| Stack 8  |            8px |
| Stack 12 |           12px |
| Stack 16 |           16px |
| Stack 24 |           24px |
| Stack 32 |           32px |
| Stack 64 |           64px |

### Inline

Inline spacing is the horizontal space between elements.

Depending on the context, you can add different sizes of inset ranging from Inline 2 to Inline 64. When deciding on which inline size to use, consider the text, interactive/graphic elements that will be aligned together and the readability and touch targets of those elements when in close proximity.

Inline spacing is used most commonly in these contexts:

- Horizontal space between cards
- Horizontal space between elements in a card or container

| Name      | Horizontal Space |
| --------- | ---------------: |
| Inline 2  |              2px |
| Inline 4  |              4px |
| Inline 8  |              8px |
| Inline 12 |             12px |
| Inline 16 |             16px |
| Inline 24 |             24px |
| Inline 32 |             32px |
| Inline 64 |             64px |
