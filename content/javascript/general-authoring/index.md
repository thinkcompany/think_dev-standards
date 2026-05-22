---
title: Authoring Guidelines
date: "2026-05-22T00:00:00.000Z"
area: Javascript
section: 2. Authoring Guidelines
description: ""
---

# General Authoring Guidelines

This document contains Think Company's standards for writing JavaScript and TypeScript.

These guidelines assume **ES2022+** and a modern build pipeline. TypeScript is the default for new projects.

## Tooling

Most formatting and many of these rules are enforced automatically by [`eslint-config-thinkcompany`](https://www.npmjs.com/package/eslint-config-thinkcompany) — install it, extend from it, and stop arguing about commas and braces in code review. Where supplementary formatting is needed, [Prettier](https://prettier.io/) is a reasonable fallback.

This document focuses on the **semantic** rules a linter can't enforce — patterns to prefer, anti-patterns to avoid, and modern language features to reach for.

## Table of Contents

  - [Modules](#modules)
  - [Types](#types)
  - [Variables and Constants](#variables-and-constants)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Strings](#strings)
  - [Destructuring](#destructuring)
  - [Functions](#functions)
  - [Modern Operators](#modern-operators)
  - [Async](#async)
  - [Classes](#classes)
  - [TypeScript](#typescript)
  - [Comparison Operators & Equality](#comparison-operators--equality)
  - [Blocks](#blocks)
  - [Comments](#comments)
  - [Type Casting & Coercion](#type-casting--coercion)
  - [Naming Conventions](#naming-conventions)
  - [Miscellaneous](#miscellaneous)

## Modules

Use **ES modules** (`import` / `export`). CommonJS (`require` / `module.exports`) is acceptable only in Node-only contexts where ESM interop isn't viable; new code should be ESM.

```javascript
// good
import { Button } from './Button.js';
export function MyComponent() { /* ... */ }
export default MyComponent;
```

- Prefer named exports over default exports for non-component modules — they refactor cleanly and surface typos at import time.
- Don't mix default and named exports in the same module unless there's a clear reason.
- Use `.js` extensions in import paths in pure-ESM projects (Node's resolver requires them); bundlers tolerate omitting them, but explicit is safer.

## Types

**Primitives**: When you access a primitive type you work directly on its value.

+ `string`
+ `number`
+ `boolean`
+ `null`
+ `undefined`

```javascript
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```
**Complex**: When you access a complex type you work on a reference to its value.

+ `object`
+ `array`
+ `function`

```javascript
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```


## Objects

Use the literal syntax for object creation.

```javascript
// bad
const item = new Object();

// good
const item = {};
```

Don't use [reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_keywords_as_of_ecmascript_2015) as keys.

```javascript
// bad
const superman = {
    default: { clark: 'kent' },
    private: true
};

// good
const superman = {
    defaults: { clark: 'kent' },
    hidden: true
};
```

Use readable synonyms in place of reserved words.

```javascript
// bad
const superman = {
    class: 'alien'
};

// bad
const superman = {
    klass: 'alien'
};

// good
const superman = {
    type: 'alien'
};
```

## Arrays

Use the literal syntax for array creation.

```javascript
// bad
const items = new Array();

// good
const items = [];
```

Use `Array#push` instead of direct assignment to add items to an array.

```javascript
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

To copy an array, use spread syntax or `Array.from`.

```javascript
// good
const itemsCopy = [...items];

// also good
const itemsCopy = Array.from(items);
```

Prefer rest parameters (`...args`) over the `arguments` object in new code — they are real arrays, work in arrow functions, and play nicely with destructuring.

```javascript
// good
function logAll(...args) {
    args.forEach((arg) => console.log(arg));
}
```


## Strings

Use single quotes `''` for strings.

```javascript
// bad
const name = "Bob Parr";
const fullName = "Bob " + this.lastName;
const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';

// good
const name = 'Bob Parr';

const fullName = `Bob ${this.lastName}`;

const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'
```

When interpolating strings use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). 
```javascript
const firstName = 'Mary';
const lastName = 'Wind';

// bad 
const fullName = 'My first name is' + firstName + 'and my last name is' + lastName + '.';

// good
const fullName = `My first name is ${firstName} and my last name is ${lastName}.`;

```
When programmatically building up a string, use `Array#map` and `Array#join` over a concatenation loop. It's more declarative and easier to read.

```javascript
const messages = [
    { state: 'success', message: 'This one worked.' },
    { state: 'success', message: 'This one worked as well.' },
    { state: 'error', message: 'This one did not work.' },
];

// bad
function inbox(messages) {
    let items = '<ul>';
    for (let i = 0; i < messages.length; i++) {
        items += '<li>' + messages[i].message + '</li>';
    }
    return items + '</ul>';
}

// good
function inbox(messages) {
    const items = messages.map((m) => `<li>${m.message}</li>`).join('');
    return `<ul>${items}</ul>`;
}
```


## Destructuring

Use destructuring to pull values out of objects and arrays. It is shorter, clearer, and supports defaults.

```javascript
// object destructuring with defaults and rename
function greet({ name = 'friend', greeting: hello = 'Hello' } = {}) {
    console.log(`${hello}, ${name}!`);
}

// array destructuring
const [first, second, ...rest] = items;

// nested
const { user: { id, email } } = response;
```

Destructure function parameters when a function takes 3+ arguments — named parameters via a single options object are clearer than a long positional argument list.

## Functions

### Function declarations vs. expressions

Use a `function` declaration for top-level named functions and arrow functions for callbacks.

```javascript
// good — named function declaration, hoisted, named in stack traces
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}

// good — arrow function as a callback
const totals = orders.map((order) => calculateTotal(order.items));
```

Use **default parameters** rather than reassigning falsy values inside the function body.

```javascript
// bad
function greet(name) {
    name = name || 'friend';
    console.log(`Hello, ${name}`);
}

// good
function greet(name = 'friend') {
    console.log(`Hello, ${name}`);
}
```

Use **rest parameters** rather than the legacy `arguments` object — they are real arrays and work in arrow functions.

```javascript
// good
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
```

Never name a parameter `arguments`. This shadows the legacy `arguments` object and is a footgun even if you never use it.

Never declare a `function` inside a block (`if`, `while`, etc.) — assign a function expression to a variable instead, or extract it to module scope.

### Arrow Functions

- Omit parentheses around a single parameter (`(x) => x` → `x => x`) — this is a style choice; ESLint can enforce either form.
- Use a block body (`{ return ...; }`) when the function is more than one expression, or when you need an early return.
- Prefer arrow functions in callbacks and array methods. They inherit `this` from their enclosing scope, which is almost always what you want.
- **Do not** use arrow functions as object methods or class methods when you need `this` to refer to the object — use shorthand method syntax instead.
- **Do not** use arrow functions for DOM event handlers attached via `addEventListener` when the handler needs `this` to be the element — use a regular `function`.

## Modern Operators

Use the operators ES2020+ added — they replace whole categories of older boilerplate.

**Optional chaining (`?.`)** short-circuits property access when the operand is `null` or `undefined`:

```javascript
// bad
const city = user && user.address && user.address.city;

// good
const city = user?.address?.city;

// works on function calls and array indexing too
user?.greet?.();
items?.[0];
```

**Nullish coalescing (`??`)** falls back only when the left side is `null` or `undefined` — not on every falsy value the way `||` does. Use it for defaults that should treat `0` and `''` as real values:

```javascript
// bad — overrides legitimate 0 / '' / false
const fontSize = config.fontSize || 14;

// good
const fontSize = config.fontSize ?? 14;
```

**Logical assignment (`??=`, `||=`, `&&=`)** combines the operator with assignment:

```javascript
options.timeout ??= 5000;  // assign only if currently null/undefined
```

## Async

Prefer `async`/`await` over hand-rolled promise chains. It reads like synchronous code and makes try/catch error handling natural.

```javascript
// bad — chained promises are hard to follow
function loadUser(id) {
    return fetchUser(id)
        .then((user) => fetchOrders(user.id))
        .then((orders) => orders.filter((o) => o.active))
        .catch((err) => log(err));
}

// good
async function loadUser(id) {
    try {
        const user = await fetchUser(id);
        const orders = await fetchOrders(user.id);
        return orders.filter((o) => o.active);
    } catch (err) {
        log(err);
    }
}
```

- Run independent async operations in parallel with `Promise.all`. Sequential `await`s are a common performance bug.
- Use `Promise.allSettled` when you want every promise to complete regardless of failures.
- Top-level `await` is allowed in ES modules — use it for module-init code that depends on async resolution.

## Event Binding

Bind events with `addEventListener`. Never use inline `on*` attributes in HTML.

```html
<!-- bad -->
<button onclick="document.bgColor='lightblue'">Feel Blue</button>

<!-- good -->
<button id="feel-blue">Feel Blue</button>
```

```javascript
document.getElementById('feel-blue').addEventListener('click', () => {
    document.body.style.backgroundColor = 'lightblue';
});
```

For high-frequency events (`scroll`, `resize`, `pointermove`, `input`), throttle or debounce the handler so it does not fire thousands of times per second. Use a small utility (lodash's `debounce`/`throttle`) or roll your own:

```javascript
function debounce(fn, delay = 250) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    };
}

window.addEventListener('resize', debounce(() => console.log('resize')));
```

Cache DOM queries when you bind multiple events to the same node — repeated `document.querySelector` calls in tight loops add up.

For scroll-position-driven UI, prefer `IntersectionObserver` over a manual `scroll` listener. For element-size-driven UI, use `ResizeObserver`. They fire only when state actually changes and are scheduled around frame timing.

## Properties

Use dot notation when accessing properties.

```javascript
const luke = {
    jedi: true,
    age: 28
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

Use subscript notation `[]` when accessing properties with a variable.

```javascript
const luke = {
    jedi: true,
    age: 28
};

function getProp(prop) {
    return luke[prop];
}

const isJedi = getProp('jedi');
```


## Variables and Constants

Use `const` by default. Use `let` only when reassignment is genuinely required. Never use `var` — it is function-scoped and hoists, which causes bugs that `let`/`const`'s block scoping eliminates.

```javascript
// bad — implied global
superPower = new SuperPower();

// bad — var hoists and is function-scoped
var superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

`const` makes the binding immutable, not the value. You can still mutate properties of a `const` object or push to a `const` array — `const` only prevents reassignment of the variable itself.

**Declare variables close to where they're first used**, not in a block at the top of the function. Block scoping makes this safe and readable; the old "declare everything at the top" rule was a workaround for `var` hoisting and no longer applies.

```javascript
// good — declarations are next to their use
async function loadDashboard(userId) {
    const user = await fetchUser(userId);
    if (!user) return null;

    const orders = await fetchOrders(user.id);
    return { user, orders };
}
```

Declare each variable on its own line. Don't chain multiple declarations with commas — it makes diffs noisier and obscures intent.

```javascript
// bad
let width, height, length, depth;

// good
let width;
let height;
let length;
let depth;
```

Minimize the use of module-scope mutable state. Treat any non-`const` value at module scope as a smell — it's usually a sign that state belongs inside a function, a class, or a dedicated store.


## Comparison Operators & Equality

Use `===` and `!==`. The loose equality operators (`==`, `!=`) perform type coercion that produces surprising results (`0 == ''` is `true`, `null == undefined` is `true`).

Conditional expressions coerce their value to boolean. The rules:

+ **Objects** (including arrays and functions) → **true**
+ **`undefined`** → **false**
+ **`null`** → **false**
+ **Booleans** → their value
+ **Numbers** → **false** for `+0`, `-0`, `NaN`; **true** otherwise
+ **Strings** → **false** for `''`; **true** otherwise

Be explicit in conditions when the type is ambiguous. "Truthy check" shortcuts can hide bugs around `0`, `''`, and `null`:

```javascript
// risky — also true for null, undefined, 0
if (count) { /* ... */ }

// explicit — only true for actual positive numbers
if (count > 0) { /* ... */ }

// risky — also true for null, undefined
if (name) { /* ... */ }

// explicit — distinguishes null/undefined from empty string
if (name != null) { /* ... */ }
```

When you want to distinguish "not provided" from "provided but falsy," reach for `??`:

```javascript
const label = props.label ?? 'Untitled';
```


## Blocks

Use braces with all multi-line blocks.

```javascript
// bad
if (test)
    return false;

// good
if (test) return false;

// good
if (test) {
    return false;
}

// bad
function() { return false; }

// good
function() {
    return false;
}
```

If you're using multi-line blocks with `if` and `else`, put `else` on the same line as your
`if` block's closing brace.

```javascript
// bad
if (test) {
    thing1();
    thing2();
}
else {
    thing3();
}

// good
if (test) {
    thing1();
    thing2();
} else {
    thing3();
}
```

Use the following format for an `if` statement:

```javascript
    if (condition) {
        // statements
    }
     
    if (condition) {
        // statements
    } else {
        // statements
    }
     
    if (condition) {
        // statements
    } else if (condition) {
        // statements
    } else {
        // statements
    }
```
Use the following format for a `for` statement:

```javascript

    for (initialization; condition; update) {
        // statements
    }

    for (variable in object) {
        if (filter) {
            // statements
        }
    }
```

For array iteration, prefer `for...of` (or array methods like `forEach`/`map`/`filter`/`reduce`) over the C-style `for` loop. They're harder to get wrong.

```javascript
// good — direct, clear
for (const item of items) {
    process(item);
}

// good — when index is needed
items.forEach((item, index) => process(item, index));
```

For object iteration, do **not** use `for...in` (it walks the prototype chain). Use `Object.keys`, `Object.values`, or `Object.entries` instead:

```javascript
for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
}
```

Use the following format for a `while` statement:

```javascript
    while (condition) {
        // statements
    }
```
Use the following format for a `do` statement:

```javascript
    do {
        // statements
    } while (condition);
```

Unlike the other compound statements, the do statement always ends with a `;` (semicolon).

Use the following format for a `switch` statement. Indent each `case` under the `switch` — this matches Prettier defaults and every modern style guide.

```javascript
switch (allegiance) {
    case 'Jedi':
        joinOrder();
        break;
    case 'Sith':
        joinEmpire();
        break;
    default:
        wander();
}
```

Each group of statements (except the `default`) should end with `break`, `return`, or `throw`. If you intend to fall through into the next case, indicate it with a `// falls through` comment in place of the `break` — ESLint's `no-fallthrough` rule expects this.

Use the following format for a `try` statement:

```javascript
    try {
        // statements
    } catch (variable) {
        // statements
    }

    try {
        // statements
    } catch (variable) {
        // statements
    } finally {
        // statements
    }
```

Limit the use of the `continue` statement since it can obscure control flow in a function. It is best used at the start of a loop to handle pre-conditions. This technique reduces excessive indentation.

Do not use the `with` statement. (Learn more at http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/)


## Comments

**Write comments that explain *why*, not *what*.** Well-named identifiers already explain what the code does; comments should capture the things that aren't visible from reading the code: a non-obvious constraint, a subtle invariant, a workaround for a specific bug, or behavior that would surprise a reader.

Don't waste the reader's time with restatement:

```javascript
// bad — the code already says this
i = 0; // Set i to zero.

// good — explains a non-obvious constraint
// Tatooine has two suns, so day/night detection compares against both.
const isNight = !sunriseSet.some(([rise, set]) => now > rise && now < set);
```

Keep comments up to date. A stale comment is worse than no comment — it actively misleads.

Never include alarming or negative language ("hack to fix broken IE", "this is terrible"), individual programmer names, handles, or URLs to internal issue trackers. Comments outlive the people and tickets they reference.

Retain comments related to open-source licensing.

### JSDoc

In **TypeScript** projects, most JSDoc `@param` / `@return` tags are redundant — the types are already in the signature. Skip them. Use prose docstrings only when you need to explain *what the function is for* or *how it should be used*.

```typescript
/**
 * Returns the most Force-sensitive Jedi in the group, or undefined
 * if the group is empty. Ties are broken by name (alphabetical).
 */
function mostPowerful(jedi: Jedi[]): Jedi | undefined {
    // ...
}
```

In **plain JavaScript** projects, JSDoc with types is still valuable — modern editors (VS Code with the TypeScript Language Server) use it for IntelliSense and inline diagnostics:

```javascript
/**
 * @param {string} name
 * @param {number} midiChlorians
 * @returns {Jedi}
 */
function summon(name, midiChlorians) {
    // ...
}
```

### Inline comments

Use `//` for single-line comments. Place them on the line above the code they describe, with a blank line before (when not at the top of a block).

```javascript
// good
function rank(jedi) {
    // Council rank requires 12,000 midi-chlorians and 8 years of service.
    const eligible = jedi.midiChlorians >= 12000 && jedi.yearsOfService >= 8;

    return eligible ? 'Council' : 'Knight';
}
```

### `TODO` and `FIXME`

Use `// TODO:` for known work that hasn't been done yet. Use `// FIXME:` for a known bug or shortcut that needs to be revisited. Either way, link to a ticket if one exists — a bare TODO has a half-life of about six months before nobody remembers what it meant.

```javascript
// TODO(PROJ-123): replace polling with a server-sent event stream
```


## Formatting

Use `eslint-config-thinkcompany` (with Prettier as a backup if ESLint doesn't cover a file type) to enforce formatting automatically. The rules below are the ones it expects — knowing them helps when reading code, but you should not be applying them by hand.

- **Indent with 4 spaces** (soft tabs).
- **One space** before opening braces, between operators, and after commas. **No space** between a function name and its argument list.
- **Trailing commas** in multi-line objects, arrays, and function parameter lists. They produce cleaner diffs (adding a line touches one line, not two) and have been universal in JS engines since ES2017.
- **Semicolons at statement ends.** Several major style guides (Standard, some Prettier configs) omit them, but the consistent presence of semicolons eliminates an entire class of ASI surprises.
- **Single quotes** for strings unless the string contains a single quote. Template literals for any string that interpolates a value.
- **One blank line** between logically distinct blocks of code; no more than one consecutive blank line.
- **End files with a single trailing newline.**

```javascript
// good
const hero = {
    firstName: 'Kevin',
    lastName: 'Flynn',
    superPower: 'strength',
};

function fight() {
    console.log('Swooosh!');
}
```

For long method chains, indent each call on its own line with a leading dot:

```javascript
const result = items
    .filter((item) => item.active)
    .map((item) => item.value)
    .reduce((sum, value) => sum + value, 0);
```


## Type Casting & Coercion

Perform type coercion explicitly, using the type's constructor function (called without `new`).

### Strings

```javascript
const reviewScore = 9;

// bad — relies on implicit coercion
const totalScore = reviewScore + '';

// good — explicit
const totalScore = String(reviewScore);
```

### Numbers

Use `Number()` for general string-to-number conversion. Use `Number.parseInt(value, 10)` (or the legacy `parseInt`) when you need to parse leading digits out of a string and ignore trailing characters (e.g. `"24px"` → `24`). Always pass an explicit radix.

```javascript
const inputValue = '4';

// bad
const val = new Number(inputValue);
const val = inputValue >> 0;
const val = 1 * inputValue;

// good
const val = Number(inputValue);
const val = Number.parseInt(inputValue, 10);
```

`Number.parseInt` and `Number.parseFloat` are the modern, namespaced versions of the global `parseInt` and `parseFloat`; they behave identically. Either is acceptable, but consistency within a project matters.

The unary `+` (`+inputValue`) and double-bang (`!!value`) idioms are common in the wild and acceptable in expressions where their meaning is obvious from context. Prefer the named constructors in code you want a junior reader to understand without pausing.

### Booleans

```javascript
const hasJedi = Boolean(jedi.length);

// also fine — well understood, common in conditionals
if (jedi.length) {
    // ...
}
```

## Naming Conventions

- **`camelCase`** for variables, functions, instances, and methods.
- **`PascalCase`** for classes, constructors, and React components.
- **`SCREAMING_SNAKE_CASE`** for top-level constants that represent fixed values (e.g. `const MAX_RETRIES = 3`).
- **`kebab-case`** for filenames in JS/TS source (`use-debounced-value.ts`), with the exception that files exporting a single class or component match the export name (`Button.tsx`).

Avoid single-letter names. The only acceptable single-letter names are loop counters (`i`, `j`) in short, conventional contexts. Use descriptive names everywhere else.

Don't use `_` as a name prefix to imply privacy — it provides none, and TypeScript's `private` (or true private fields with `#`) does. The only valid prefix uses are conventional: `_` for "ignore this argument" in destructuring, or `$` for jQuery-wrapped values in legacy codebases.

```javascript
// bad
function q() { /* ... */ }
let OBJ = {};

// good
function query() { /* ... */ }
const userPreferences = {};
const MAX_RETRIES = 3;
class UserSession { /* ... */ }
```

Use lexical `this` (arrow functions) rather than aliasing `this` to a variable.

```javascript
// bad
function setup() {
    const self = this;
    setTimeout(function () { self.start(); }, 100);
}

// good
function setup() {
    setTimeout(() => this.start(), 100);
}
```

Filenames should match the kind of module they contain. If a file exports a single class or React component, name the file after the export:

```javascript
// CheckBox.tsx
export class CheckBox { /* ... */ }

// in some other file
import { CheckBox } from './CheckBox.js';
```

## Classes

Use ES6 `class` syntax. The prototype-assignment pattern (`Jedi.prototype.fight = ...`) is obsolete — `class` produces the same prototype-based result with clearer syntax, true private fields, and proper `super` calls in subclasses.

Reach for a class when you have:

- a piece of state with a meaningful lifecycle (train/duel/fall)
- multiple methods that operate on the same private state
- a real "is-a" relationship that benefits from `extends` and `instanceof`

For everything else — utility functions, plain data, single-method "services" — prefer a module of named functions or a plain object literal. Classes are not the default unit of code organization in modern JavaScript.

```javascript
class Jedi {
    #name;
    #midiChlorians;
    jumping = false;

    constructor({ name, midiChlorians }) {
        this.#name = name;
        this.#midiChlorians = midiChlorians;
    }

    get name() {
        return this.#name;
    }

    get isForceSensitive() {
        return this.#midiChlorians >= 7000;
    }

    jump() {
        this.jumping = true;
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    static fromHolocron(record) {
        return new Jedi({
            name: record.designation,
            midiChlorians: record.midi_count,
        });
    }
}

class SithLord extends Jedi {
    constructor(args) {
        super(args);
        this.allegiance = 'Sith';
    }

    strikeDown(target) {
        target.fallen = true;
        return this;
    }
}

const luke = new Jedi({ name: 'Luke Skywalker', midiChlorians: 14500 });
luke.jump().setHeight(1.72);

const vader = SithLord.fromHolocron(archive.lookup('DV-001'));
vader.strikeDown(luke);
```

A few rules:

- **Private fields use `#`**, not a leading underscore. `Jedi#midiChlorians` is enforced by the language — outside the class, `luke.#midiChlorians` is a syntax error. The old `_field` convention provided no actual privacy.
- **Return `this` from mutator methods** when method chaining produces meaningfully cleaner call sites (`luke.jump().setHeight(1.72)`) — but don't reflexively chain everything; sometimes a sequence of statements is clearer.
- **Use `static` for factory methods and constants** that belong to the class itself rather than an instance (`Jedi.fromHolocron` above).
- **Use `extends` and `super` for inheritance**, but prefer composition over inheritance unless you have a real "is-a" relationship. Deep hierarchies (`SithLord extends Jedi extends ForceUser extends Sentient`) age poorly — Padawans become Masters become Ghosts, and the class tree rarely models that gracefully.
- **Don't use arrow functions as class methods** when you need `this` to behave normally. Define methods with shorthand syntax; arrow-function-as-class-field has different semantics (per-instance binding) and isn't on the prototype.

## TypeScript

TypeScript is the default for new projects. Even short scripts benefit from type checking — most bugs are someone passing the wrong shape to the wrong function, and `tsc` catches that in milliseconds.

### Enable strict mode

Start every project with `"strict": true` in `tsconfig.json`. Strict mode bundles `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, and friends — together they're the difference between TypeScript catching bugs and TypeScript decorating JavaScript. Turn things off individually if you have to; never start permissive.

```json
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "exactOptionalPropertyTypes": true
    }
}
```

`noUncheckedIndexedAccess` is worth enabling on top of strict — it makes `arr[i]` return `T | undefined`, which surfaces a whole class of off-by-one bugs.

### `interface` vs `type`

Rule of thumb: use **`interface`** for object shapes you expect to be extended, augmented, or implemented by a class. Use **`type`** for unions, intersections, mapped types, conditional types, and aliases.

```typescript
// good — object shape, may be extended
interface Jedi {
    name: string;
    midiChlorians: number;
}

interface SithLord extends Jedi {
    allegiance: 'Sith';
}

// good — union; type is the right tool
type Allegiance = 'Jedi' | 'Sith' | 'Gray';

// good — mapped/derived type
type ReadonlyJedi = Readonly<Jedi>;
```

The two are nearly interchangeable for plain object shapes; pick one convention per project and stick with it.

### Avoid `any` — prefer `unknown` and narrow

`any` opts out of type checking entirely. `unknown` says "I don't know yet" and forces you to narrow before use.

```typescript
// bad — typecheck disabled
function parseHolocron(record: any) {
    return record.designation.toUpperCase();
}

// good — narrow before use
function parseHolocron(record: unknown): string {
    if (
        typeof record === 'object' &&
        record !== null &&
        'designation' in record &&
        typeof record.designation === 'string'
    ) {
        return record.designation.toUpperCase();
    }
    throw new Error('Invalid holocron record');
}
```

For external data (API responses, user input), pair `unknown` with a runtime validator like [Zod](https://zod.dev/) or [Valibot](https://valibot.dev/) so the runtime check produces a real TypeScript type.

### Generics

Reach for generics when a function or type works on a *shape* rather than a specific type. Don't make things generic preemptively — wait until you have a second concrete use.

```typescript
function mostPowerful<T extends Jedi>(jedi: T[]): T | undefined {
    return jedi.toSorted((a, b) => b.midiChlorians - a.midiChlorians)[0];
}

const winner = mostPowerful([luke, yoda, obiwan]); // type is Jedi | undefined
```

### `satisfies`

The `satisfies` operator (TS 4.9+) lets you check that a value conforms to a type *without widening it*. Use it when you want to keep the precise literal type but verify the shape.

```typescript
// inferred type: { name: string; allegiance: 'Jedi' }
const luke = {
    name: 'Luke Skywalker',
    allegiance: 'Jedi',
} satisfies Jedi;

// luke.allegiance is the literal 'Jedi', not string
```

### `as const` for literal narrowing

Pair `as const` with `satisfies` (or use it alone) to lock object and tuple types to their literal values — useful for config objects, lookup tables, and discriminator strings.

```typescript
const ALLEGIANCES = ['Jedi', 'Sith', 'Gray'] as const;
type Allegiance = (typeof ALLEGIANCES)[number]; // 'Jedi' | 'Sith' | 'Gray'
```

### Discriminated unions for state

Model state as a union of variants, each tagged with a literal `kind` (or `status`, or `type`). TypeScript will narrow the variant inside `switch` and `if` branches.

```typescript
type ForceTrial =
    | { status: 'idle' }
    | { status: 'training'; padawan: Jedi }
    | { status: 'complete'; result: 'pass' | 'fail' };

function describe(trial: ForceTrial): string {
    switch (trial.status) {
        case 'idle':
            return 'Awaiting student';
        case 'training':
            return `Training ${trial.padawan.name}`; // padawan is in scope
        case 'complete':
            return `Trial ${trial.result}`; // result is in scope
    }
}
```

Discriminated unions replace the "boolean and a maybe-undefined value" pattern that plagues a lot of JS state code.

## Performance

For performance guidance — bundling, code splitting, lazy loading, third-party scripts, image and font optimization, and Core Web Vitals — see the dedicated [Performance standards](/performance/) doc.

For measuring runtime cost in the page, use the **Performance panel** in Chrome DevTools (or the equivalent in Firefox / Safari). It will tell you, in concrete numbers for your real code, far more than micro-benchmarks ever could. Most of the historical "X is faster than Y" advice in JS style guides has been invalidated by modern engine optimizations — write clear code first, measure if it's actually slow, and optimize from data.


## Miscellaneous

### Assignment in Conditions

Don't assign inside the test of an `if` or `while` statement.

```javascript
// is this a typo?
if (a = b) {
    // ...
}

// or was this intended?
if (a === b) {
    // ...
}
```

Avoid constructs that cannot easily be determined to be correct. ESLint's `no-cond-assign` rule catches this automatically; keep it on.

### Avoid `eval`

`eval` runs arbitrary code in the current scope and is a security and performance hazard. Don't use it. Don't use its aliases either: the `Function` constructor, or string arguments to `setTimeout` / `setInterval`.

```javascript
// bad
setTimeout('handleTimeout()', 1000);
const sum = new Function('a', 'b', 'return a + b');

// good
setTimeout(handleTimeout, 1000);
const sum = (a, b) => a + b;
```

Most uses of `eval` are dynamic code generation that can be expressed cleanly with closures, object lookups, or template literals.
