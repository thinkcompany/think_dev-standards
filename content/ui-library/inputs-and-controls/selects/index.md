---
title: Selects
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 3. Inputs & Controls
description: ""
---

Selects are typically used within forms and therefore visually similar to text fields. When clicking on a select a menu of options expand from within an OS-native menu.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/forms-select--select" target="_blank"> View Selects in Storybook</a>

---

## Visual Details

### Sizes

There are three sizes for selects: large, medium and small.

#### Large

| Attribute           | Value                         |
| ------------------- | ----------------------------- |
| Spacing             | Inset 16                      |
| Text & Icon Spacing | Inline 16                     |
| Type Size           | Body Small Regular            |
| Type Color          | Foreground Primary            |
| Icon Color          | Foreground Tertiary           |
| Background Color    | Background Primary            |
| Border              | 1px Solid Foreground Tertiary |

#### Medium

| Attribute           | Value                         |
| ------------------- | ----------------------------- |
| Spacing             | Squish 8-12                   |
| Text & Icon Spacing | Inline 12                     |
| Type Size           | Body Small Regular            |
| Type Color          | Foreground Primary            |
| Icon Color          | Foreground Tertiary           |
| Background Color    | Background Primary            |
| Border              | 1px Solid Foreground Tertiary |

#### Small

| Attribute           | Value                         |
| ------------------- | ----------------------------- |
| Spacing             | Squish 4-8                    |
| Text & Icon Spacing | Inline 8                      |
| Type Size           | Body XSmall Regular           |
| Type Color          | Foreground Primary            |
| Icon Color          | Foreground Tertiary           |
| Background Color    | Background Primary            |
| Border              | 1px Solid Foreground Tertiary |

---

## States

### Default

- An unpopulated selection field that displays placeholder text as “Select an option” or “Select option(s)
- Best practice: use the Default Filled state with the most frequently used option preselected when possible.

### Hover

- When a user’s cursor is overtop of the component

### Focus

- When a user has tabbed the selection field into focus
- Hitting enter will expand the field to the active state

### Active

- This is when a user has clicked or hit enter on the selection field
- The popover will expand to display the list of selectable options

### Default Filled

- An option has been selected or pre-filled and the component is not in focus

### Disabled

- Interaction with the component is blocked

### Error

- Something has been selected incorrectly
- Most commonly used if a required selection has not been made

---

## Research

- [Nielsen Norman Group article on Drop Down Menus](https://www.nngroup.com/articles/drop-down-menus/)
- [Dropdown Usability](https://baymard.com/blog/drop-down-usability)
