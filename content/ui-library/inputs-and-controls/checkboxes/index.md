---
title: Checkboxes
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 3. Inputs & Controls
description: ""
---

Checkboxes allow people to select a single or multiple options from a list.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/forms-checkbox--checkbox" target="_blank"> View Checkboxes in Storybook</a>

---

## When to use this

Use checkboxes when you want to:

- Allow people to select multiple items from a list
- Allow people to toggle a single selection on or off

### When not to use this

Don't use checkboxes when you want to:

- Allow a single selection

---

## Visual Details

Checkboxes are usually grouped together and used within forms or as options within a context menu. It's best to always group checkboxes together with a header of some kind. This ensures people know what they are selecting.

### Sizing

- Each checkbox is 16 x 16px

### Color

#### Unselected

| Attribute        | Value                         |
| ---------------- | ----------------------------- |
| Background Color | Background Primary            |
| Border           | 1px Solid Foreground Tertiary |

#### Selected

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| Background Color | Tint Blue Primary           |
| Icon Color       | Foreground On Tint          |
| Border           | 1px Solid Tint Blue Primary |

### Typography

- The label is Body Small Regular

### Spacing

- The horizontal space between the checkbox and label is Inline 8
- The vertical spacing between each checkbox is Stack 8

---

## Layout

Checkboxes can be used in either inline or stacked layouts.

### Inline

- Use an inline layout when vertical space is limited.
- Spacing between each checkbox is Inline 24

### Stacked

- Use a stacked layout when horizontal space is limited.
- Spacing between each checkbox is Stack 8

---

## States

### Unselected

This is the default state of all checkboxes.

### Selected

When someone clicks/taps a checkbox it becomes “selected”.

### Partially Selected

There are some cases where you can have a partially selected checkbox. You usually see this when you can select multiple rows in a table. There is a parent-level checkbox that is used to select/deselect all rows. If some rows are selected the parent-level checkbox will be partially selected.

### Disabled

Use this when an interaction with a checkbox should be blocked.
