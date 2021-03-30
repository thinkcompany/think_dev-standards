---
title: Text Area
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 3. Inputs & Controls
description: ""
---

Text areas allow customers to enter a multiple lines of text. This can be used for notes, messages, and more.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/forms-input--text-input" target="_blank"> View Text Areas in Storybook</a>

### When to use this component

Use text fields when you want to:

- Allow people to enter a long or multi-line text

### When not to use this component

Don't use text fields when you want to:

- Allow people to enter a short or single line of text

---

## Visual Details

It’s important for people to instantly recognize the difference between a text area and text field. The size of the text input should signify to people how much text is expected.

### Sizing

- The text input, without a label, is a minimum of 84px tall.

### Typography

- The text field label is Body Small Bold
- The text inside of the text field is Body Small Regular

### Spacing

- The vertical spacing between the label and text field is Stack 4
- The vertical spacing between each individual text field is Stack 16
- The inset of the text field is Inset 8

---

## Layout

Text Areas should only be stacked vertically.

---

## States

### Empty

- This is the default state of all text fields
- Placeholder text is not a replacement for labels. If any instructions are required, use labels or hints outside of the text field. Use placeholder text to show examples of the input.

### Focus

- This is when the person has clicked or tabbed to the text area and is typing

### Filled

- This is when the person has entered text but is no longer focused on the text area

### Error

- This is when the person has entered something incorrectly into the text area
- Error text should succinctly explain how to resolve the error

### Validated

- This is when the person has resolved an error

### Disabled

- Use this when interaction should be blocked

---

## Research

- [W3C Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [W3C Form Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/)
- [Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/)
