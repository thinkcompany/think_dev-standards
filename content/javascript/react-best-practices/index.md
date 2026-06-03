---
title: React Development Standards
date: "2026-05-22T00:00:00.000Z"
area: Javascript
section: 3. React
description: ""
---

[React](https://react.dev/) is a JavaScript library for building user interfaces. We use React at Think Company to build rich, interactive user experiences within web applications. This page contains best practices we follow while writing React code for web applications.

These guidelines target **React 18+** and assume functional components with hooks. Class components and their patterns are no longer covered — if you are working in a legacy codebase that uses them, refer to the older [React 17 docs](https://17.reactjs.org/) for class-component guidance.

## Table of Contents

- [Basic Rules](#basic-rules)
- [Components and Hooks](#components-and-hooks)
- [Naming](#naming)
- [Alignment](#alignment)
- [Quotes](#quotes)
- [Spacing](#spacing)
- [Props](#props)
- [Refs](#refs)
- [Parentheses](#parentheses)
- [Managing State](#managing-state)
- [Effects](#effects)
- [Custom Hooks](#custom-hooks)
- [Error Boundaries](#error-boundaries)
- [Server Components and Suspense](#server-components-and-suspense)
- [Tags](#tags)
- [Event Handlers](#event-handlers)
- [Ordering](#ordering)
- [Conditional Rendering](#conditional-rendering)
- [Testing](#testing)

## Basic Rules

- Only include one React component per file.
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX, or creating a dynamic component.

## Components and Hooks

Write components as functions with hooks. Extract reusable stateful logic into [custom hooks](#custom-hooks), not higher-order components or render props.

```tsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

Follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks): call hooks at the top level of a function component or custom hook only, never inside loops, conditions, or nested functions. The `eslint-plugin-react-hooks` package enforces this — make sure it's enabled.

## Naming

- **Extensions:** Use `.tsx` for TypeScript projects (preferred for new code) and `.jsx` for JavaScript projects. A bare `.js` file should not contain JSX.

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

- **Higher-order components are mostly a legacy pattern.** Prefer custom hooks for sharing stateful logic between components. If you do write an HOC (rare — usually for crossing render-tree boundaries that hooks can't), set `displayName` to a composite of the HOC name and the wrapped component name (e.g. `withFoo(Bar)`) so DevTools and stack traces remain readable.

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

- In TypeScript projects, use TypeScript interfaces or types to define component props instead of PropTypes. PropTypes provide no benefit when TypeScript is already enforcing types at compile time.

    ```tsx
    // TypeScript project — use an interface
    interface ButtonProps {
        label: string;
        onClick: () => void;
        disabled?: boolean;
    }

    function Button({ label, onClick, disabled = false }: ButtonProps) {
        return <button onClick={onClick} disabled={disabled}>{label}</button>;
    }
    ```

- Use spread props sparingly.

    **Why?** Otherwise you're more likely to pass unnecessary props down to components.

    When you do spread, filter out props the child doesn't need first:

    ```tsx
    // good — only the relevant props are forwarded
    function Wrapper({ irrelevantProp, ...rest }: WrapperProps) {
        return <ChildComponent {...rest} />;
    }
    ```

## Refs

- Use the **`useRef`** hook. Never use the legacy string-ref API (`ref="myRef"`).

    ```tsx
    const inputRef = useRef<HTMLInputElement>(null);

    // ...

    <input ref={inputRef} />
    ```

- Use a callback ref only when you need to react to the element being attached or detached. With React 19, callback refs can return a cleanup function.

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

Distinguish the **kind** of state before reaching for a tool. Most React state-management headaches come from treating server data, URL state, and ephemeral UI state as if they were the same problem.

- **Local component state** — `useState` for simple values, `useReducer` when transitions get complex.
- **State shared across a small subtree** — [Context](https://react.dev/reference/react/createContext) with a custom provider. Don't reach for a global store just to skip prop drilling.
- **Server state (API responses, caching, revalidation)** — [TanStack Query](https://tanstack.com/query) (React Query), [SWR](https://swr.vercel.app/), or framework primitives (Next.js Server Components, Remix loaders). Do not put server data in Redux.
- **URL state** — keep filter selections, pagination, and open modals in query params and let the router be the source of truth. Use the framework's router (`react-router`, `next/navigation`) or [`nuqs`](https://nuqs.47ng.com/) for typed URL state.
- **Global client state** — when you genuinely need it (auth, theme, cross-cutting UI state), [Zustand](https://github.com/pmndrs/zustand) or [Jotai](https://jotai.org/) are lighter-weight defaults; reach for [Redux Toolkit](https://redux-toolkit.js.org/) on larger projects where its ecosystem (devtools, middleware, RTK Query) earns its keep.

## Effects

`useEffect` is for **synchronizing with external systems** (the DOM, browser APIs, network, subscriptions) — not for transforming data on render. The single most common React bug is using `useEffect` to derive state from props.

- **Don't put derived data in state + an effect.** Compute it during render instead.

    ```tsx
    // bad — derived state synced through useEffect
    const [fullName, setFullName] = useState('');
    useEffect(() => { setFullName(`${first} ${last}`); }, [first, last]);

    // good — derive during render
    const fullName = `${first} ${last}`;
    ```

- **Always declare every reactive value the effect uses in the dependency array.** Disabling the `react-hooks/exhaustive-deps` ESLint rule is almost always wrong.
- **Return a cleanup function** when the effect subscribes, opens a connection, or starts a timer.
- For data fetching, prefer a library (TanStack Query, SWR) over hand-rolled `useEffect` + `fetch` — they handle stale-while-revalidate, retries, and race conditions for free.

Read [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) before reaching for `useEffect`.

## Custom Hooks

Extract reusable stateful logic into custom hooks. Name them with a `use` prefix so the React linter recognizes them and applies the Rules of Hooks. Keep them focused — a hook should do one thing well.

```tsx
function useDebouncedValue<T>(value: T, delay = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}
```

## Error Boundaries

Wrap subtrees that can fail (data-fetching regions, third-party widgets, route components) in an [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) so a single component crash doesn't blank the page. Use [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) rather than hand-rolling one — it provides a hook-friendly API and a `FallbackComponent` prop.

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={ErrorFallback}>
    <Dashboard />
</ErrorBoundary>
```

Report caught errors to your error-tracking service (Sentry, Rollbar) inside the boundary's `onError` callback.

## Server Components and Suspense

In React 19 / Next.js App Router, components are **Server Components by default**. They render on the server, ship zero JS to the client, and can read directly from databases or filesystems.

- Mark any component that uses state, effects, or browser APIs with the `'use client'` directive at the top of the file.
- Keep client components leaf-shaped — push them as far down the tree as possible so the Server Component shell remains static.
- Pass server-fetched data into client components as props; do not refetch on the client.

For loading states, use Suspense boundaries rather than imperative `isLoading` flags:

```tsx
<Suspense fallback={<Spinner />}>
    <Dashboard />
</Suspense>
```

Suspense pairs with data-fetching primitives that throw a promise while pending — Next.js `fetch`, TanStack Query's `useSuspenseQuery`, etc.

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

## Event Handlers

- Name event handler props with an `on` prefix (`onClick`, `onSubmit`) and the implementing function with a `handle` prefix (`handleClick`, `handleSubmit`).
- Inline arrow functions are fine for most components. They only matter when you're passing a stable identity to a memoized child — in that case, wrap with `useCallback`.
- When you need extra data passed to a handler, prefer an arrow function over `.bind`:

    ```tsx
    function ItemList({ items }: { items: Item[] }) {
        return (
            <ul>
                {items.map((item, index) => (
                    <Item
                        key={item.id}
                        onClick={() => doSomethingWith(item.name, index)}
                    />
                ))}
            </ul>
        );
    }
    ```

- Don't pull DOM event values out of synthetic events asynchronously without first reading them — React reuses event objects.

## Ordering

The recommended ordering for a functional component. Group hooks by **feature or concern**, not by hook type — this keeps related state, refs, and effects together and makes components easier to read as they grow.

1. Type definitions (props interface)
2. Context reads (`useContext`)
3. State, refs, and memos — grouped by feature/concern
4. Effects — placed adjacent to the state they relate to
5. Event handlers and derived values
6. Return / JSX

```tsx
interface CardProps {
    title: string;
    onDismiss: () => void;
}

function Card({ title, onDismiss }: CardProps) {
    const theme = useContext(ThemeContext);

    // expand/collapse concern
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // side effect related to expand state
    }, [isExpanded]);

    // handlers
    const handleToggle = () => setIsExpanded((prev) => !prev);

    return (
        <div ref={containerRef}>
            <button onClick={handleToggle}>{title}</button>
            {isExpanded && <p>Content</p>}
            <button onClick={onDismiss}>Dismiss</button>
        </div>
    );
}
```
## Conditional Rendering

- Conditionals in markup are ok as long as they are simplified and easy to understand.
- Avoid adding methods that return markup that should be a component.
- Do not use multiple nested ternaries. Break into multiple components instead.
- When in doubt, break down into more components if things are getting complicated.
- “If the logic is too complex to be appropriate inline, then it belongs in a separate component.” -> https://github.com/airbnb/javascript/issues/520 

## Testing

Use [Vitest](https://vitest.dev/) (preferred for Vite-based projects) or [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Test from the user's perspective: render the component, interact with it the way a user would, assert on what they would see.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('increments count when button is clicked', async () => {
    render(<Counter />);

    await userEvent.click(screen.getByRole('button', { name: /click me/i }));

    expect(screen.getByText(/you clicked 1 times/i)).toBeInTheDocument();
});
```

- Query by accessible roles and labels first (`getByRole`, `getByLabelText`), falling back to `getByText`. Reserve `getByTestId` for cases where there is no accessible identifier and adding one would distort the markup.
- Avoid testing internal state, props, or the shape of rendered HTML — those are implementation details.
- For component-level visual regression, use [Storybook](https://storybook.js.org/) with [Chromatic](https://www.chromatic.com/) or Playwright's visual snapshots.
- For end-to-end browser tests, see the [QA standards](/quality-assurance/).
