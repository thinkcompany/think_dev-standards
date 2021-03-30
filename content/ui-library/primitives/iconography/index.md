---
title: Iconography
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 2. Primitives
description: ""
---

Icons used in {CLIENT NAME} help visualize different actions, indicators, or navigation shown in the UI.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/primitives-icons--all" target="_blank"> View Iconography in Storybook</a>

---

## When to use Iconography

Icons should be used in combination with text, acting as a shortcut for interacting with elements in the UI. They should be used for elements that are crucial for completing a task. Not every text element needs an icon associated with it.

Iconography is used most commonly in these contexts:

- Buttons
- System messages
- Navigation menus
- Empty States

### Iconography Best Practices

- Unless you're certain users will understand an icon's meaning, avoid using iconography alone without supporting text when used for an interactive element. Deciphering the meaning of an icon can be subjective and mean different things depending on the user. The text label helps avoid confusion.
- Avoid using icons to represent a toggle between views.
- Don't use two icons combined with one text element. An icon is meant to be the visual representation of one label.

---

## How it works

{CLIENT NAME} uses [Font Awesome](https://fontawesome.com) for it's icon library. When choosing an icon, be sure to choose one from the Font Awesome library. This will help to maintain a consistent look & feel throughout the app.

### Adding New Icons

Even though Font Awesome has a large selection of icons, {CLIENT NAME} maintains a small subset to use within the app.

- Find an icon using the [Font Awesome web app](https://fontawesome.com/icons?d=gallery).
- In Sketch, add the icon to the UI Library file within the Iconography page.
  - Make sure the icon is contained with a 24px x 24px container.
  - Create as many symbols per icon as colors you need. This is a safer approach than allowing color overrides on a single icon.
- When naming the icon, consider the function of the icon in its context. The name of the icon should either reflect its function or the destination associated with that icon.
- Export the icon as an SVG and save it to the [development folder in Dropbox](https://www.dropbox.com/sh/8fvymik7k0rbi84/AAAtFjEj8of0vta-GL0W4yC3a?dl=0)

---

## Visual Details

### Size

- Within the Sketch file, each icon is set at 24 x 24px. In use, icons can be resized as needed.

### Color

- Colors used for icons are intentionally limited. This is a safety measure to ensure correct color usage. The colors listed below are safe to use for icons.

| Name                | Value   |
| ------------------- | ------- |
| Tint Blue Primary   | #4640ED |
| Tint Green Primary  | #77D59D |
| Tint Red Primary    | #D5403C |
| Tint Orange Primary | #FFAF62 |
| Foreground Tertiary | #939AB4 |
| Foreground On Tint  | #FFFFFF |
