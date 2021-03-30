---
title: Toggles
date: "2020-06-08T23:46:37.121Z"
area: UI Library
section: 3. Inputs & Controls
description: ""
---

A toggle is a visual switch between two mutually exclusive states: on and off.

<a href="https://standard-library-react.thinkcompany.dev/?path=/story/forms-toggle--toggle" target="_blank"> View Toggles in Storybook</a>

### When to use toggles

- Only use for “on” and “off” states
  - Toggles are great to use for settings, for example

### When not to use a toggle

- If you have to explain the “on” and “off” states, then you should consider using another component (such as a segmented control or a radio button).

---

## How it works

- Toggles always have a default state.
- Interacting with a switch should result in an immediate action without requiring the user to Save or Submit. If the user must disclose additional information after turning on the switch, consider using another component like a button or a checkbox.
- Toggles can work well with conditional content, but a switch should never only be used to reveal content. For example, in the KARMA app you can turn on the Volume filter for accounts. This reveals additional filters to limit the volume to certain trends and/or brands. However, the Volume filter still works even without the additional filters.

---

## Visual Details

### Sizing

- All switches are 36px x 20px

### States

#### Off

| Attribute  | Value               |
| ---------- | ------------------- |
| Fill Color | Foreground Tertiary |
| Knob Color | Foreground On Tint  |

#### On

| Attribute  | Value              |
| ---------- | ------------------ |
| Fill Color | Tint Blue Primary  |
| Knob Color | Foreground On Tint |

#### Disabled

- Opacity set to 40%

---

## Voice and Tone

- Labels for switches should be written affirmatively and describe what to expect in the On state.
- Avoid phrasing labels as a question.

---

## Research on switches

- [Toggle-Switch Guidelines](https://www.nngroup.com/articles/toggle-switch-guidelines/) from the Nielsen Norman Group.
- [Switches](https://developer.apple.com/design/human-interface-guidelines/ios/controls/switches/) article from Apple's Human Interface Guidelines.
