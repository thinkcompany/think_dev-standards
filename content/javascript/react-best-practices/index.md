---
title: React Development Standards
date: "2021-04-01T23:46:37.121Z"
area: Javascript
section: 3. React
description: ""
---

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. We use React at Think Company to build rich, interactive user experiences within web applications. This page contains best practices we follow while writing React code for web applications, and has been adapted from [Airbnb's React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).

## Table of Contents

- [Basic Rules](#basic-rules)
- [Class vs. Functional components](#class-vs-functional-components)
- [Hooks](#hooks)
- [Mixins](#mixins)
- [Naming](#naming)
- [Declaration](#declaration)
- [Alignment](#alignment)
- [Quotes](#quotes)
- [Spacing](#spacing)
- [Props](#props)
- [Refs](#refs)
- [Parentheses](#parentheses)
- [Managing State](#managing-state)
- [Tags](#tags)
- [Methods](#methods)
- [Ordering](#ordering)
- [Conditional Rendering](#conditional-rendering)
- [isMounted](#isMounted)

## Basic Rules

- Only include one React component per file.
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX, or creating a dynamic component.

## Class vs. Functional components

Prefer functional components for new component development. Use hooks to manage internal state. Avoid using React.createClass.

```js
// bad
const Listing = React.createClass({
    render() {
        return <div>{this.state.hello}</div>;
    }
});
 
// better
class Listing extends React.Component {
    render() {
        return <div>{this.state.hello}</div>;
    }
}
 
// best
function Listing() {
    const [hello, setHello] = useState();
    return <div>{hello}</div>;
}
```

## Hooks

Prefer [hooks](https://reactjs.org/docs/hooks-intro.html) for **new components** instead of using class-based components with lifecycle methods. For most cases, hooks allow you to achieve the same result as lifecycle methods, using significantly less code that is easier to read.

```js
// Avoid using class-based components with lifecycle methods
 
import React, { Component } from 'react';
 
class Example extends Component {
 
    constructor() {
        this.state = {
            count: 0
        };
    }
 
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
            </div>
        );
    }
 
}
 
// Start using functional components with hooks
 
import React, { useState } from 'react';
 
function Example() {
 
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Mixins

- [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

    **Why?** Mixins introduce implicit dependencies, cause name clashes, and cause snowballing complexity. Most use cases for mixins can be accomplished in better ways via components, higher-order components, or utility modules.

## Naming

- **Extensions:** Always use `.jsx` extension for React components.

- **Filename:** Use PascalCase for filenames. E.g. `ReservationCard.jsx` .

- **Reference Naming:** Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

    ```js
    // bad
    import reservationCard from './ReservationCard';
    
    // good
    import ReservationCard from './ReservationCard';
    
    // bad
    const ReservationItem = <ReservationCard />;
    
    // good
    const reservationItem = <ReservationCard />;
    ```

- **Component Naming:** Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`.

    ```js
    // bad
    import Footer from './Footer/FooterContainer';
    
    // bad
    import Footer from './Footer/index';
    
    // good
    import Footer from './Footer/Footer';
    ```

- **Higher-order Component Naming:** Use a composite of the higher-order component's name and the passed-in component's name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

    **Why?** A component's `displayName` may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

    ```js
    // bad
    export default function withFoo(WrappedComponent) {
        return function WithFoo(props) {
            return <WrappedComponent {...props} foo />;
        }
    }
        
    // good
    export default function withFoo(WrappedComponent) {
        
        function WithFoo(props) {
            return <WrappedComponent {...props} foo />;
        }
        
        const wrappedComponentName = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component';
        
        WithFoo.displayName = `withFoo(${wrappedComponentName})`;
        return WithFoo;
    }
    ```

- Props Naming: if a native prop is to be passed down to a child DOM element, do not use a modification of the prop name.

    ```js
    /* avoid this… */
 
    function MyComponent({ customClass }) {
        return (
            <p className={customClass}>Hello</p>
        );
    }
    
    /* do this instead… */
    
    function MyComponent({ className }) {
        // Note: avoid spreading props "blindly" into a child element, except in HOCs
        // <p {...props}>Hello</p>
        return (
            <p className={className}>Hello</p>
        );
    }
    ```

## Declaration

- Do not use `displayName` for naming components. Instead, name the component by reference.

    ```js
    // bad
    export default React.createClass({
        displayName: 'ReservationCard',
        // stuff goes here
    });
    
    // good
    export default class ReservationCard extends React.Component {}
    ```

## Alignment

- Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

    ```jsx
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
    
    // bad
    {showButton &&
        <Button />
    }
    
    // bad
    {
        showButton &&
            <Button />
    }
    
    // good
    {showButton && (
        <Button />
    )}
    
    // good
    {showButton && <Button />}
    
    // good
    {someReallyLongConditional
        && anotherLongConditional
        && (
        <Foo
            superLongParam="bar"
            anotherSuperLongParam="baz"
        />
        )
    }
    
    // good
    {someConditional ? (
        <Foo />
    ) : (
        <Foo
            superLongParam="bar"
            anotherSuperLongParam="baz"
        />
    )}
    ```

## Quotes

- Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS. eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)

    **Why?** Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

    ```jsx
    // bad
    <Foo bar='bar' />
    
    // good
    <Foo bar="bar" />
    
    // bad
    <Foo style={{ left: "20px" }} />
    
    // good
    <Foo style={{ left: '20px' }} />
    ```
## Spacing

- Always include a single space in your self-closing tag. eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

    ```jsx

    // bad
    <Foo/>
    
    // very bad
    <Foo                 />
    
    // bad
    <Foo
    />
    
    // good
    <Foo />
    ```

- Do not pad JSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

    ```jsx
    // bad
    <Foo bar={ baz } />
    
    // good
    <Foo bar={baz} />
    ```

## Props

- Use **camelCase** for prop names. This rule may be more flexible in a .NET environment where keys in a data set are returned in PascalCase.

    ```jsx
    // bad
    <Foo
        UserName="hello"
        phone_number={12345678}
    />
    
    // good
    <Foo
        userName="hello"
        phoneNumber={12345678}
    />
    ```  

- Omit the value of the prop when it is explicitly `true`. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

    ```jsx
    // bad
    <Foo hidden={true} />
    
    // good
    <Foo hidden />
    ```

- Avoid using an array index as `key` prop, prefer a unique ID. ([why?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

    ```jsx
    // bad
    {todos.map((todo, index) =>
    <Todo
        {...todo}
        key={index}
    />
    )}
    
    // good
    {todos.map(todo => (
    <Todo
        {...todo}
        key={todo.id}
    />
    ))}
    ```

- Typecheck with [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) by declaring propTypes above the component declaration. Assign the propTypes to the component below.

    ```jsx
    // bad
    function SFC({ foo, bar, children }) {
        return <div>{foo}{bar}{children}</div>;
    }
    SFC.propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
    };
    
    // good
    
    const propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
    };
    
    function SFC({ foo, bar, children }) {
        return <div>{foo}{bar}{children}</div>;
    }
    
    SFC.propTypes = propTypes;
    ```

- Always define explicit defaultProps for all non-required props.

    **Why?** propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

    ```jsx
    // bad
    const propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
    };
    function SFC({ foo, bar, children }) {
        return (
            <div>
            {foo}
            {bar}
            {children}
            </div>
        );
    }
    
    SFC.propTypes = propTypes;
    
    // good
    const propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
    };
    const defaultProps = {
        bar: "",
        children: null,
    };
    function SFC({ foo, bar, children }) {
        return (
            <div>
                {foo}
                {bar}
                {children}
            </div>
        );
    }
    
    SFC.propTypes = propTypes;
    SFC.defaultProps = defaultProps;
    ```

- Deepcheck props with propTypes where applicable.

    **Why?** Deepchecking allows React to to better validate props and provides even more clarity around what props the component is expecting.

    ```jsx
    // bad
    const propTypes = {
        foo: PropTypes.array.isRequired
    };
    // good
    const propTypes = {
        foo: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })).isRequired,
    };
    ```

- Use spread props sparingly.

    **Why?** Otherwise you're more likely to pass unnecessary props down to components.

    *Exceptions:*

    - HOCs that proxy down props and hoist propTypes

        ```jsx
        function HOC(WrappedComponent) {
            return class Proxy extends React.Component {
                Proxy.propTypes = {
                    text: PropTypes.string,
                    isLoading: PropTypes.bool
                };
        
                render() {
                    return <WrappedComponent {...this.props} />
                }
            }
        }
        ```

    - Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha's beforeEach construct.

        ```jsx
        export default function Foo {
            const props = {
                text: '',
                isPublished: false
            }
        
            return (<div {...props} />);
        }
        ```

    - Notes for use: Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

        ```jsx
        // good
        render() {
            const { irrelevantProp, ...relevantProps  } = this.props;
            return <WrappedComponent {...relevantProps} />
        }
        
        // bad
        render() {
            const { irrelevantProp, ...relevantProps  } = this.props;
            return <WrappedComponent {...this.props} />
        }
        ```

## Refs

- Always use ref callbacks, or the **useRef** hook. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

    ```jsx
    // bad
    <Foo ref="myRef" />
    
    // good
    <Foo
        ref={(ref) => { this.myRef = ref; }}
    />
    
    // good
    const myRef = useRef();
    <Foo ref={myRef} />
    ```

## Parentheses

- Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

    ```jsx
    // bad
    render() {
    return <MyComponent variant="long body" foo="bar">
            <MyChild />
            </MyComponent>;
    }
    
    // good
    render() {
        return (
            <MyComponent variant="long body" foo="bar">
                <MyChild />
            </MyComponent>
        );
    }
    
    // good, when single line
    render() {
        const body = <div>hello</div>;
        return <MyComponent>{body}</MyComponent>;
    }
    ```

## Managing State

- For managing state of a single component that does not need to be shared outside of the component, use the [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate).
- For managing state within a component tree with more than two levels, use [Context](https://reactjs.org/docs/context.html). 
- For managing state of an application that will be shared by all components, use [Redux](https://redux.js.org/) with [Redux Toolkit (RTK)](https://redux-toolkit.js.org/).

## Tags

- Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

    ```jsx
    // bad
    <Foo variant="stuff"></Foo>
    
    // good
    <Foo variant="stuff" />
    ```

- If your component has multi-line properties, close its tag on a new line. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```jsx
    // bad
    <Foo
        bar="bar"
        baz="baz" />
    
    // good
    <Foo
        bar="bar"
        baz="baz"
    />
    ```

## Methods

- Use arrow functions to close over local variables. It is handy when you need to pass additional data to an event handler. Although, make sure they [do not massively hurt performance](https://www.bignerdranch.com/blog/choosing-the-best-approach-for-react-event-handlers/), in particular when passed to custom components that might be PureComponents, because they will trigger a possibly needless rerender every time.

    ```jsx
    function ItemList(props) {
    return (
        <ul>
        {props.items.map((item, index) => (
            <Item
            key={item.key}
            onClick={() => doSomethingWith(item.name, index)}
            />
        ))}
        </ul>
    );
    }
    ```

- Bind event handlers for the render method using an arrow function in the class property. This approach requires [transform-class-properties](http://babeljs.io/docs/plugins/transform-class-properties) or [enable stage-2 in Babel](http://babeljs.io/docs/plugins/preset-stage-2/). eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

    **Why?** Other methods of binding have minor performance, readability, and maintainability concerns. For a more in depth explanation of options and reasons, see [React Binding Patterns](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56).

    ```jsx
    // bad
    class extends React.Component {
        onClickDiv() {
            // do stuff
        }
    
        render() {
            
            return <div onClick={this.onClickDiv.bind(this)} />;
        }
    }
    
    // bad
    class extends React.Component {
        constructor(props) {
            super(props);
            this.onClickDiv = this.onClickDiv.bind(this);
        }
    
        onClickDiv() {
            // do stuff
        }
    
        render() {
            return <div onClick={this.onClickDiv} />;
        }
    }
    
    // good
    class extends React.Component {
        constructor(props) {
            super(props);
        }
    
        onClickDiv = () => {
            // do stuff
        }
    
        render() {
            return <div onClick={this.onClickDiv} />;
        }
    }
    ```

- Do not use underscore prefix for internal methods of a React component.

    **Why?** Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490)for a more in-depth discussion.

    ```jsx
    // bad
    React.createClass({
        _onClickSubmit() {
            // do stuff
        }
    
        // other stuff
    });
    
    // good
    class MyComponent extends React.Component {
        onClickSubmit() {
            // do stuff
        }
    
        // other stuff
    }
    ```

- Be sure to return a value in your `render` methods. eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

    ```jsx
    // bad
    render() {
    (<div />);
    }
    
    // good
    render() {
        return (<div />);
    }
    ```

## Ordering

The recommended ordering for `class extends React.Component`:

1. optional `static` methods
2. `constructor`
3. `getChildContext`
4. `componentWillMount`
5. `componentDidMount`
6. `componentWillReceiveProps`
7. `shouldComponentUpdate`
8. `componentWillUpdate`
9. `componentDidUpdate`
10. `componentWillUnmount`
11. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
12. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
13. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
14. `render`

How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

```jsx
import React from 'react';
import PropTypes from 'prop-types';
 
const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string
};
 
const defaultProps = {
    text: 'Hello World'
};
 
class Link extends React.Component {
    static methodsAreOk() {
        return true;
    }
 
    render() {
        return (
            <a href={this.props.url} data-id={this.props.id}>
                {this.props.text}
            </a>
        );
    }
}
 
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
 
export default Link;
```
## Conditional Rendering

- Conditionals in markup are ok as long as they are simplified and easy to understand.
- Avoid adding methods that return markup that should be a component.
- Do not use multiple nested ternaries. Break into multiple components instead.
- When in doubt, break down into more components if things are getting complicated.
- “If the logic is too complex to be appropriate inline, then it belongs in a separate component.” -> https://github.com/airbnb/javascript/issues/520 

## `isMounted`

- Do not use `isMounted`. eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

    **Why?** [`isMounted` is an anti-pattern](https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html), is not available when using ES6 classes, and is on its way to being officially deprecated.    
