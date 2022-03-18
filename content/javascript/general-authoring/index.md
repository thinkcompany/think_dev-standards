---
title: Authoring Guidelines
date: "2021-04-01T23:46:37.121Z"
area: Javascript
section: 2. Authoring Guidelines
description: ""
---

# General Authoring Guidelines

This document contains Think Company's standards for writing JavaScript.

## Table of Contents

  - [Types](#types)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Strings](#strings)
  - [JSON](#json)
  - [Functions](#functions)
  - [Event Binding](#event-binding)
  - [Properties](#properties)
  - [Variables](#variables)
  - [Comparison Operators & Equality](#comparison-operators--equality)
  - [Blocks](#blocks)
  - [Comments](#comments)
  - [Whitespace](#whitespace)
  - [Commas](#commas)
  - [Semicolons](#semicolons)
  - [Type Casting & Coercion](#type-casting--coercion)
  - [Naming Conventions](#naming-conventions)
  - [Constructors](#constructors)
  - [Performance](#performance)
  - [Miscellaneous](#miscellaneous)

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
let item = {};
```

Don't use [reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_keywords_as_of_ecmascript_2015) as keys. It won't work in IE8. [More info](https://github.com/airbnb/javascript/issues/61).

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
let items = new Array();

// good
let items = [];
```

Use `Array#push` instead of direct assignment to add items to an array.

```javascript
let someStack = [];


// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

When you need to copy an array use `Array#slice`. [jsPerf](http://jsperf.com/converting-arguments-to-an-array/7)

```javascript
const len = items.length;
let itemsCopy = [];
let i;

// bad
for (i = 0; i < len; i++) {
    itemsCopy[i] = items[i];
}

// good
itemsCopy = items.slice();
```

To convert an array-like object to an array, use `Array#slice`.

```javascript
function trigger() {
    let args = Array.prototype.slice.call(arguments);
    ...
}
```


## Strings

Use single quotes `''` for strings.

```javascript
// bad
const name = "Bob Parr";

// good
const name = 'Bob Parr';

// bad
const fullName = "Bob " + this.lastName;

// good
const fullName = 'Bob ' + this.lastName;
```

Use multiple lines for strings longer than 80 characters using string concatenation.

Note: If overused, long strings with concatenation could impact performance: [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40).

```javascript
// bad
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';
```

When programmatically building up a string, use `Array#join` instead of string concatenation. Mostly for IE: [jsPerf](http://jsperf.com/string-vs-array-concat/2).

```javascript
let items;
let messages;
let length;
let i;

messages = [{
    state: 'success',
    message: 'This one worked.'
}, {
    state: 'success',
    message: 'This one worked as well.'
}, {
    state: 'error',
    message: 'This one did not work.'
}];

length = messages.length;

// bad
function inbox(messages) {
    items = '<ul>';

    for (i = 0; i < length; i++) {
      items += '<li>' + messages[i].message + '</li>';
    }

    return items + '</ul>';
}

// good
function inbox(messages) {
  items = [];

  for (i = 0; i < length; i++) {
      // use direct assignment in this case because we're micro-optimizing.
      items[i] = '<li>' + messages[i].message + '</li>';
  }

  return '<ul>' + items.join('') + '</ul>';
}
```


## JSON

A value can be a string in double quotes, or a number, or true or false or null, or an object or an array. These structures can be nested.

```json
{
    "id" : 148372,
    "title" : "Learn Javascript",
    "tags" : [
        "javascript", 
        "programming"
    ],
    "in-stock": true,
    "price": 22.50
}

```

## Functions

Function expressions:

```javascript
// anonymous function expression
const anonymous = function() {
    return true;
};

// named function expression
const named = function named() {
    return true;
};

// immediately-invoked function expression (IIFE)
(function() {
    console.log('Welcome to the Internet. Please follow me.');
})();
```
**Declare all functions before they are used.** Inner functions should follow the let statement. This helps make it clear what variables are included in its scope.

Do not use a space between the name of a function and the `(` (left parenthesis) of its parameter list. Use one space between the `)` (right parenthesis) and the `{` (left curly brace) that begins the statement body. The body itself is indented four spaces. The `}` (right curly brace) is aligned with the line containing the beginning of the declaration of the function.

```javascript
    function outer(c, d) {
        const e = c * d;
        function inner(a, b) {
            return (e * a) + b;
        }
        return inner(0, 1);
    }
```

This convention works well with JavaScript because in JavaScript, functions and object literals can be placed anywhere that an expression is allowed. It provides the best readability with inline functions and complex structures.

```javascript
    function getElementsByClassName(className) {
        let results = [];
        walkTheDOM(document.body, function (node) {
            let a;                  // array of class names
            let c = node.className; // the node's classname
            let i;                  // loop counter
// If the node has a class name, then split it into a list of simple names.
// If any of them match the requested name, then append the node to the set of results.
            if (c) {
                a = c.split(' ');
                for (i = 0; i < a.length; i += 1) {
                    if (a[i] === className) {
                        results.push(node);
                        break;
                    }
                }
            }
        });
        return results;
    }
```

If a function literal is anonymous, there should be one space between the word function and the ( (left parenthesis). If the space is omitted, then it can appear that the function's name is function, which is an incorrect reading.

```javascript
    div.addEventListener('click', function(e) {
        console.log('hello');
    }, false);
    
    that = {
        method: function () {
            return this.datum;
        },
        datum: 0
    };
```

Minimize the use of global functions. If your code contains functions that are only useful to the module, then encapsulate those functions in an immediately executed anonymous function with the rest of the module's code.

When a function is to be invoked immediately, wrap the entire invocation expression in parenthesis so that it is clear that the value being produced is the result of the function and not the function itself.

```javascript
const collection = (function () {
   let keys = [], values = [];
    return {
        get: function (key) {
           const at = keys.indexOf(key);
            if (at >= 0) {
                return value[at];
            }
        },
        set: function (key, value) {
           const at = keys.indexOf(key);
            if (at < 0) {
                at = keys.length;
            }
            keys[at] = key;
            value[at] = value;
        },
        remove: function (key) {
           const at = keys.indexOf(key);
            if (at >= 0) {
                keys.splice(at, 1);
                value.splice(at, 1);
            }
        }
    };
}());
```

Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.
**Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

```javascript
// bad
if (currentUser) {
    function test() {
        console.log('Nope.');
    }
}

// good
let test;
if (currentUser) {
    test = function test() {
        console.log('Yup.');
    };
}
```

Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

```javascript
// bad
function nope(name, options, arguments) {
    // ...stuff...
}

// good
function yup(name, options, args) {
    // ...stuff...
}
```

## Event Binding

Avoid inline event bindings. It is better to keep a seperations of concerns by keeping our JavaScript seperate from HTML. Inline bindings can also lead to very hard to track bugs.

```html 
<!-- Bad -->
<button onclick="document.bgColor='lightblue'">Feel Blue</button>
```

Avoid binding to events that can fire multiple times. Some events like resizing the window, or scrolling can fire a large amount of events in a very short amount of time, causing overall performance to degrade. If you need to attach a function to an event like scrolling or window resizing, use [debouncing](https://davidwalsh.name/javascript-debounce-function). This will cut down on the number of times the event fires.

```js 
// Bad: This is going to fire thousands of times within a few seconds. 

window.addEventListener('resize', function() {
        console.log('resize');
});

// Good: This is using debouncing to only fire every 250ms

const windowResizeFn = debounce(function() {
    console.log('resize');
}, 250);

window.addEventListener('resize', windowResizeFn);

```

Always cache the DOM query for the element you are binding to. This creates a memory refrence to the DOM nodes, which significantly speeds up execution time.

```js

// Bad: This will query for the selector everytime, in a complex document that could take some time.

document.getElementById('myDiv').addEventListener('click', function() {
        console.log('clicked');
});

// Good: the node is now cached to the $myDiv variable. Instead of traversing the DOM to find myDiv, it will use the node reference in memory to locate it.

const $myDiv = document.getElementById('myDiv');

$myDiv.addEventListener('click', function() {
        console.log('clicked');
});
s
```


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


## Variables

Always use `let` or `const` to declare variables. Use `let` for variables that need to mutable. Be sure to declare `let` at the top of the scope in which they are used. The preference is to use `const` when possible. A variable declared with `const` is immutable (i.e. it cannot be redefined). When creating objects or arrays using `const`, keep in mind that modifying the items _inside_ the object does not mutate the object reference itself. [Read More about using `const` here.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

```javascript
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

Variables can be defined one per line or sequentially. If declaring sequentially, place `let` declarations on their own line, and indented. Agree on a declaration format with your project team and follow it consistently throughout the lifecycle of the application.

```javascript
// bad
let width, length, height, depth;

// good
let width, 
    height, 
    length,
    depth;

// good
let width;
let height;
let length;
let depth;

```

Declare unassigned variables last. This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

```javascript
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const items = getItems();
const goSportsTeam = true;
let dragonball;
let length;
let i;
```

Declare all variables before use. JavaScript does not require this, but doing so makes the program easier to read and makes it easier to detect undeclared variables that may become implied [globals](http://yuiblog.com/blog/2006/06/01/global-domination/).

Minimize the use of global variables. Do not use implied global variables.
  
Assign variables at the top of their scope. This helps avoid issues with variable declaration and assignment hoisting related issues. 

```javascript
// bad
function() {
    test();
    console.log('doing stuff..');

    //..other stuff..

    const name = getName();

    if (name === 'test') {
        return false;
    }

    return name;
}

// good
function() {
   const name = getName();

    test();
    console.log('doing stuff..');

    //..other stuff..

    if (name === 'test') {
        return false;
    }

    return name;
}

// bad - unnecessary function call
function() {
   const name = getName();

    if (!arguments.length) {
        return false;
    }

    this.setFirstName(name);

    return true;
}

// good
function() {
    let name;

    if (!arguments.length) {
        return false;
    }

    name = getName();
    this.setFirstName(name);

    return true;
}
```

## Spread Operator

When to use:
- combining two arrays
- passing all elements of an iterableObj as arguments
- copy an array


When not to use:


``` javascript

// function example


// array example
let userList = ["Mark", "Zia", "Forrest"];
let newUser = "Lang";
numberStore = [...userList, newUser];


```



## Comparison Operators & Equality

Use `===` and `!==` over `==` and `!=`.
Conditional statements such as the `if` statement evaulate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

+ **Objects** evaluate to **true**
+ **Undefined** evaluates to **false**
+ **Null** evaluates to **false**
+ **Booleans** evaluate to **the value of the boolean**
+ **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
+ **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

```javascript
if ([0]) {
    // true
    // An array is an object, objects evaluate to true
}
```

Use shortcuts.

```javascript
// bad
if (name !== '') {
    // ...stuff...
}

// good
if (name) {
    // ...stuff...
}

// bad
if (collection.length > 0) {
    // ...stuff...
}

// good
if (collection.length) {
    // ...stuff...
}
```

For more information see [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.


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

Use the first example of the for loop with arrays and with loops of a predeterminable number of iterations.

Only use the second form with objects. Be aware that members that are added to the prototype of the object will be included in the enumeration. It is wise to program defensively by using the `hasOwnProperty` method to distinguish the true members of the object:

```javascript
    for (variable in object) {
        if (object.hasOwnProperty(variable)) {
            // statements
        }
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

Use the following format for a `switch` statement:

```javascript
    switch (expression) {
    case expression:
        // statements
    default:
        // statements
    }
```

Each `case` is aligned with the `switch`. This avoids over-indentation.

Each group of statements (except the `default`) should end with `break`, `return`, or `throw`. If your intention is to fall though into the next case, it must be indicated with a comment in place of the `break`.

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

**Be generous with comments, but make them meaningful.** It is useful to leave information that will be read at a later time by people (possibly yourself) who will need to understand what you have done. The comments must be well-written and clear, just like the code they are annotating. An occasional nugget of humor might be appreciated. Frustrations and resentments will not. Never use inappropriate language. Even though comments are stripped by compression, it is far too easy for uncompressed code to be viewed by third parties and users.

It is important that comments be kept up-to-date. Erroneous comments can make programs even harder to read and understand.

Make comments meaningful. Focus on what is not immediately visible. Don't waste the reader's time with stuff like:

```javascript
    i = 0; // Set i to zero.
```

Always retain comments related to licensing of open source code. Comments may never contain alarming or negative language (i.e. "hack to fix broken IE") nor individual programmer names, handles, URLs, etc.

Use `/** ... */` for multi-line comments. Include a description, specify types and values for all parameters and return values.

```javascript
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

    // ...stuff...

    return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {

    // ...stuff...

    return element;
}
```

Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment.

```javascript
// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    let type = this._type || 'no type';

    return type;
}

// good
function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
   const type = this._type || 'no type';

    return type;
}
```

Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME -- need to figure this out` or `TODO -- need to implement`.

Use `// FIXME:` to annotate problems.

```javascript
function Calculator() {

    // FIXME: shouldn't use a global here
    total = 0;

    return this;
}
```

Use `// TODO:` to annotate solutions to problems.

```javascript
function Calculator() {

    // TODO: total should be configurable by an options param
    this.total = 0;

    return this;
}
```


## Whitespace
Blank lines improve readability by setting off sections of code that are logically related.

Use soft tabs set to 4 spaces. ([Stack Overflow: Soft tabs or hard tabs?](http://stackoverflow.com/a/9446364/1096083))

```javascript
// no
function() {
∙∙let name;
}

// no
function() {
∙let name;
}

// yeah
function() {
∙∙∙∙let name;
}
```

Place 1 space before the leading brace.

```javascript
// bad
function test(){
    console.log('test');
}

// good
function test() {
    console.log('test');
}

// bad
dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog'
});

// good
dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog'
});
```

Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Do not place a space before the argument list in function calls and declarations.

```javascript
// bad
if(isJedi) {
    fight ();
}

// good
if (isJedi) {
    fight();
}

// bad
function fight () {
    console.log ('Swooosh!');
}

// good
function fight() {
    console.log('Swooosh!');
}
```

Set off operators with spaces.

```javascript
// bad
const x=y+5;

// good
const x = y + 5;
```

End files with a single newline character.

```javascript
// bad
(function(global) {
    // ...stuff...
})(this);
```

```javascript
// bad
(function(global) {
    // ...stuff...
})(this);↵
↵
```

```javascript
// good
(function(global) {
    // ...stuff...
})(this);↵
```

Use indentation when making long method chains. Use a leading dot, which emphasizes that the line is a method call, not a new statement.

```javascript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
    find('.selected').
        highlight().
        end().
    find('.open').
        updateCount();

// good
$('#items')
    .find('.selected')
        .highlight()
        .end()
    .find('.open')
        .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
  .data(data)
  .enter().append('svg:svg')
      .classed('led', true)
      .attr('width', (radius + margin) * 2)
  .append('svg:g')
      .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
      .call(tron.led);
```

Leave a blank line after blocks and before the next statement

```javascript
// bad
if (foo) {
    return bar;
}
return baz;

// good
if (foo) {
    return bar;
}

return baz;

// bad
let obj = {
    foo: function() {
    },
    bar: function() {
    }
};
return obj;

// good
let obj = {
    foo: function() {
    },

    bar: function() {
    }
};

return obj;
```

## Commas

Leading commas: **No, please.**

```javascript
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
    once,
    upon,
    aTime
];

// bad
const hero = {
    firstName: 'Bob'
  , lastName: 'Parr'
  , heroName: 'Mr. Incredible'
  , superPower: 'strength'
};

// good
const hero = {
    firstName: 'Bob',
    lastName: 'Parr',
    heroName: 'Mr. Incredible',
    superPower: 'strength'
};
```

Additional trailing comma: **Nope.** This can cause problems with IE6/7 and IE9 if it's in quirksmode. 

```javascript
// kaboooom
const hero = {
    firstName: 'Kevin',
    lastName: 'Flynn',
};

const heroes = [
    'Batman',
    'Superman',
];

// phew
const hero = {
    firstName: 'Kevin',
    lastName: 'Flynn'
};

const heroes = [
    'Batman',
    'Superman'
];
```


## Semicolons

**[Yes, have some.](https://www.youtube.com/watch?v=pdMGPvODN44)**

```javascript
// bad
(function() {
    const name = 'Skywalker'
    return name
})()

// good
(function() {
    const name = 'Skywalker';
    return name;
})();
```

[Read more](http://stackoverflow.com/a/7365214/1712802).


## Type Casting & Coercion

Perform type coercion at the beginning of the statement.
Strings:

```javascript
//  => this.reviewScore = 9;

// bad
const totalScore = this.reviewScore + '';

// good
const totalScore = '' + this.reviewScore;

// bad
const totalScore = this.reviewScore.toString(); // not 100% guaranteed to return a string

// good
const totalScore = String(this.reviewScore);
```

Use `parseInt` for Numbers and always with a radix for type casting.

```javascript
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// bad
const val = 1 * inputValue;

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```

Booleans:

```javascript
const age = 0;

// bad
const hasAge = new Boolean(age);

// bad
const hasAge = !!age;

// good
const hasAge = Boolean(age);
```

## Naming Conventions

**Names should be formed from the 26 upper and lower case letters (A .. Z, a .. z), the 10 digits (0 .. 9), and `_` (underscore).** Avoid use of international characters because they may not read well or be understood everywhere. 

Do not use `_` (underscore) as the first character of a name. It is sometimes used to indicate privacy, but it does not actually provide [privacy](http://javascript.crockford.com/private.html). If privacy is important, use the forms that provide private members.

Avoid single letter names. Be descriptive with your naming.

```javascript
// bad
function q() {
    // ...stuff...
}

// good
function query() {
    // ..stuff..
}
```

Be consistent with either camelCase or underscore_case convention when naming objects, functions, and instances. Don't mix naming conventions within a single project.

```javascript
// bad, matches neither convention:
let OBJEcttsssss = {};
let o = {};
function c() {}

// bad, mixed conventions:
let thisIsMyObject = {};
function this_is_my_function() {}

// good, camelCase:
let thisIsMyObject = {};
function thisIsMyFunction() {}

// good, underscore_case:
let this_is_my_object = {};
function this_is_my_function() {}

```

Use PascalCase when naming constructors or classes. Start constructor functions, which must be used with the [new](http://yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/) prefix, with a capital letter. JavaScript issues neither a compile-time warning nor a run-time warning if a required new is omitted. Bad things can happen if new is not used, so the capitalization convention is the only defense we have.

```javascript
// bad
function user(options) {
    this.name = options.name;
}

const bad = new user({
    name: 'nope'
});

// good
function User(options) {
    this.name = options.name;
}

const good = new User({
    name: 'yup'
});
```

To indicate that a variable contains a jQuery object, start names with a `$`:

```javascript
const $email = $("#email");
```

If you must reference this, avoid using an alias. Alisases to this are very bug prone.

```javascript

// Bad
function() {
    const _this = this;
    return function() {
        console.log(_this);
    };
}

//Good: If you can use ES6, use arrow functions to take advantage how it handles lexical scoping
function() {
    return () => {
        console.log(this);
    };
}

//Good: If ES6 is not available, revert to a traditional function declaration structure
function() {
    return function() {
        console.log(this);
    }.bind(this);
}

```

Name your functions. This is helpful for stack traces.

```javascript
// bad
const log = function(msg) {
    console.log(msg);
};

// good
const log = function log(msg) {
    console.log(msg);
};
```

**Note:** IE8 and below exhibit some quirks with named function expressions. See [http://kangax.github.io/nfe/](http://kangax.github.io/nfe/) for more info.

If your file exports a single class, your filename should be exactly the name of the class.
```javascript
// file contents
class CheckBox {
  // ...
}
module.exports = CheckBox;

// in some other file
// bad
const CheckBox = require('./checkBox');

// bad
const CheckBox = require('./check_box');

// good
const CheckBox = require('./CheckBox');
```

## Constructors

Assign methods to the prototype object, instead of overwriting the prototype with a new object. Overwriting the prototype makes inheritance impossible: by resetting the prototype you'll overwrite the base!

```javascript
function Jedi() {
    console.log('new jedi');
}

// bad
Jedi.prototype = {
  fight: function fight() {
      console.log('fighting');
  },

  block: function block() {
      console.log('blocking');
  }
};

// good
Jedi.prototype.fight = function fight() {
    console.log('fighting');
};

Jedi.prototype.block = function block() {
    console.log('blocking');
};
```

Methods can return `this` to help with method chaining.

```javascript
// bad
Jedi.prototype.jump = function() {
    this.jumping = true;
    return true;
};

Jedi.prototype.setHeight = function(height) {
    this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
Jedi.prototype.jump = function() {
    this.jumping = true;
    return this;
};

Jedi.prototype.setHeight = function(height) {
    this.height = height;
    return this;
};

const luke = new Jedi();

luke.jump()
    .setHeight(20);
```

## Performance

  - [On Layout & Web Performance](http://kellegous.com/j/2013/01/26/layout-performance/)
  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)


## Miscellaneous

###BLOCK SCOPE
In JavaScript blocks do not have scope. Only functions have scope. Do not use blocks except as required by the compound statements.

###ASSIGNMENT EXPRESSIONS
Avoid doing assignments in the condition part of if and while statements.

Is
```javascript
    if (a = b) {
```
a correct statement? Or was

```javascript
    if (a == b) {
```
intended? Avoid constructs that cannot easily be determined to be correct.

###`===` AND `!==` OPERATORS.
It is almost always better to use the `===` and `!==` operators. The `==` and `!=` operators do type coercion. In particular, do not use `==` to compare against falsy values.


###CONFUSING PLUSES AND MINUSES
Be careful to not follow a `+` with `+` or `++`. This pattern can be confusing. Insert parenthesis between them to make your intention clear.
```javascript
    total = subtotal + +myInput.value;
```
is better written as
```javascript
    total = subtotal + (+myInput.value);
```
so that the `+ +` is not misread as `++`.


###`EVAL` IS EVIL
The `eval` function is the most misused feature of JavaScript. Avoid it.

`eval` has aliases. Do not use the `Function` constructor. Do not pass strings to `setTimeout` or `setInterval`.

Most uses of `eval` involve the developer generating some code on the fly to include a variable's value in the source. This is inefficient and can be avoided with some simple refactoring. When you're tempted to use `eval` in this way, stop and consider alternative implementations that will be more readable and maintainable in the future.
