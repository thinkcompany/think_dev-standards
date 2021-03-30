---
title: Radios
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 3. Inputs & Controls
description: ""
---

Radios allow people to select a single option from a list.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/forms-radio-button--radio" target="_blank"> View Radios in Storybook</a>

---

## When to use this

Use radios when you want to:

- Allow a single selection

### When not to use this

Don't use radios when you want to:

- Allow people to select multiple items from a list
- Allow people to toggle a single selection on or off

---

## Visual Details

Radios are usually grouped together and used within forms or as options within a dropdown menu. It's best to always group radios together with a header of some kind. This ensures people know what they are selecting.

### Sizing

- Each radio is 16 x 16px

### Typography

- The label is Body Small Regular

### Color

#### Unselected

| Attribute        | Value                         |
| ---------------- | ----------------------------- |
| Background Color | Background Primary            |
| Border           | 1px Solid Foreground Tertiary |

#### Selected

| Attribute        | Value                         |
| ---------------- | ----------------------------- |
| Background Color | Background Primary            |
| Center Circle    | Tint Blue Primary             |
| Border           | 1px Solid Foreground Tertiary |

### Spacing

- The horizontal space between the radio and label is Inline 8
- The vertical spacing between each radio is Stack 8

---

## Layout

Radios can be used in either inline or stacked layouts.

### Inline

- Use an inline layout when vertical space is limited.
- Spacing between each radio is Inline 24

### Stacked

- Use a stacked layout when horizontal space is limited.
- Spacing between each radio is Stack 8

---

## States

### Unselected

This is the default state of all radio.

### Selected

When someone clicks/taps a radio it becomes "selected".

### Disabled

Use this when an interaction with a radio should be blocked.
