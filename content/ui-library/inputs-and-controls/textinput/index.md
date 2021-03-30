---
title: Text Input
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 3. Inputs & Controls
description: ""
---

Text fields allow customers to enter a single line of text. This can be used for names, email addresses, home addresses, passwords, and more.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/forms-input--text-input" target="_blank"> View Text Inputs in Storybook</a>

### When to use this component

Use text fields when you want to:

- Allow people to enter a short or single line of text

### When not to use this component

Don't use text fields when you want to:

- Allow people to enter a long or multi-line text

---

## Visual Details

There are three sizes of text fields: large, medium, and small. The sizing aligns to how buttons are sized. This allows buttons, selects, and text fields to be easily layed out horizontally.

### Large

| Attribute                   | Value                                |
| --------------------------- | ------------------------------------ |
| Spacing                     | Inset 16                             |
| Spacing between Icon & Text | Inline 8                             |
| Type Size                   | Body Small Regular                   |
| Type Color                  | Foreground Primary                   |
| Background Color            | Background Primary                   |
| Inner Shadow                | `inset 0 1px 3px 0 rgba(0,0,0,0.20)` |
| Border                      | 1px Solid Background Tertiary        |
| Border Radius               | 4px                                  |

### Medium

| Attribute                   | Value                                |
| --------------------------- | ------------------------------------ |
| Spacing                     | Inset 8                              |
| Spacing between Icon & Text | Inline 8                             |
| Type Size                   | Body Small Regular                   |
| Type Color                  | Foreground Primary                   |
| Background Color            | Background Primary                   |
| Inner Shadow                | `inset 0 1px 3px 0 rgba(0,0,0,0.20)` |
| Border                      | 1px Solid Background Tertiary        |
| Border Radius               | 4px                                  |

### Small

| Attribute                   | Value                                |
| --------------------------- | ------------------------------------ |
| Spacing                     | Squish 4-8                           |
| Spacing between Icon & Text | Inline 8                             |
| Type Size                   | Body XSmall Regular                  |
| Type Color                  | Foreground Primary                   |
| Background Color            | Background Primary                   |
| Inner Shadow                | `inset 0 1px 3px 0 rgba(0,0,0,0.20)` |
| Border                      | 1px Solid Background Tertiary        |
| Border Radius               | 4px                                  |

---

## Layout

Text fields can be laid out in stack or inline form.

### Inline

- Use an inline layout when vertical space is limited.
- Spacing between each text field is Inline 16

### Stack

- Use a stack layout when horizontal space is limited.
- Spacing between each text field is Stack 16

---

## States

### Empty

- This is the default state of all text fields
- Placeholder text is not a replacement for labels. If any instructions are required, use labels or hints outside of the text field. Use placeholder text to show examples of the input.

### Focus

- This is when the person has clicked or tabbed to the text field and is typing

### Filled

- This is when the person has entered text but is no longer focused on the text field

### Error

- This is when the person has entered something incorrectly into the text field
- Error text should succinctly explain how to resolve the error

### Validated

- This is when the person has resolved an error. A good example of this is for a password field. If the user mistypes their password, and then fixes it, it would show a validated state.

### Disabled

- Use this when interaction should be blocked

---

## Research

- [W3C Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [W3C Form Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/)
- [Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/)
