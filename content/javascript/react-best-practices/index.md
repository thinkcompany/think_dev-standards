---
title: React Development Standards
date: "2021-04-01T23:46:37.121Z"
area: Javascript
section: 3. React
description: ""
---

This document contains Think Company's development standards for React/JSX (JavaScript Extension). These development standards are inspired by [*Airbnb's React/JSX Style Guide*](https://airbnb.io/javascript/react/).

## Table of contents

- [Basic Rules](#basic-rules)
- [Naming](#naming)
- [Alignment](#alignment)

## Basic Rules

* There should be only one component per file. The only exception to this are pure or stateless components, which are okay to have multiple of in the same file. [*eslint: react/no-multi-comp*](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).

* Always use JSX syntax.

* `React.createElement` should not be used unless the app is being initialized from a file that is not JSX.

## Naming

* **Extension**

    - Only `.jsx` extension should be used for files with React components.

* **File Names**

    - Component files should use *PascalCase*, for example - `MyReactComponent.jsx`.

    - CSS files should use *kebab-case*, for example - `my-react-component.css`.

* **Component Names**

    - React Components should be named the same as the file they are in (or same as the directory if they are root components inside `index.js`). Which means that they should also use *PascalCase*.

    ```
    // bad
    const reservationCard = () => {
        return <h1>Reservation Card</h1>;
    };

    // good
    const ReservationCard = () => {
        return <h1>Reservation Card</h1>;
    };
    ```

* **Instance Names**
    - Instances of React components should use *camelCase*.

    ```
    // bad
    const ReservationCard = <ReservationCard />;

    // good
    const reservationCard = <ReservationCard />;
    ```

* **Higher-order Component Names**
    - 
* **Prop Names**

    - Props should follow *camelCase* for naming.

    ```
    // bad
    <MyComponent prop-one="value">

    // good
    <MyComponent propOne="value">
    ```

    - Props should avoid using DOM component props (like className/style) for different purposes.

    ```
    // bad
    <MyComponent style="fancy" />

    // bad
    <MyComponent className="fancy" />

    // good
    <MyComponent variant="fancy" />
    ```

## Alignment

* Follow these alignment styles for JSX syntax. [*eslint: react/jsx-closing-bracket-location react/jsx-closing-tag-location*](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md).

```
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```