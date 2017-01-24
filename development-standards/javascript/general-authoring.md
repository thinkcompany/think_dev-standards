#General Authoring Guidelines

## Table of Contents

  1. [Types](#markdown-header-types)
  1. [Objects](#markdown-header-objects)
  1. [Arrays](#markdown-header-arrays)
  1. [Strings](#markdown-header-strings)
  1. [Functions](#markdown-header-functions)
  1. [Properties](#markdown-header-properties)
  1. [Variables](#markdown-header-variables)
  1. [Comparison Operators & Equality](#markdown-header-comparison-operators--equality)
  1. [Blocks](#markdown-header-blocks)
  1. [Comments](#markdown-header-comments)
  1. [Whitespace](#markdown-header-whitespace)
  1. [Commas](#markdown-header-commas)
  1. [Semicolons](#markdown-header-semicolons)
  1. [Type Casting & Coercion](#markdown-header-type-casting--coercion)
  1. [Naming Conventions](#markdown-header-naming-conventions)
  1. [Constructors](#markdown-header-constructors)
  1. [Performance](#markdown-header-performance)
  1. [Miscellaneous](#markdown-header-miscellaneous)

##Types

**Primitives**: When you access a primitive type you work directly on its value.

+ `string`
+ `number`
+ `boolean`
+ `null`
+ `undefined`

```javascript
var foo = 1;
var bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```
**Complex**: When you access a complex type you work on a reference to its value.

+ `object`
+ `array`
+ `function`

```javascript
var foo = [1, 2];
var bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Objects

Use the literal syntax for object creation.

```javascript
// bad
var item = new Object();

// good
var item = {};
```

Don't use [reserved words](http://es5.github.io/#x7.6.1) as keys. It won't work in IE8. [More info](https://github.com/airbnb/javascript/issues/61).

```javascript
// bad
var superman = {
    default: { clark: 'kent' },
    private: true
};

// good
var superman = {
    defaults: { clark: 'kent' },
    hidden: true
};
```

Use readable synonyms in place of reserved words.

```javascript
// bad
var superman = {
    class: 'alien'
};

// bad
var superman = {
    klass: 'alien'
};

// good
var superman = {
    type: 'alien'
};
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Arrays

Use the literal syntax for array creation.

```javascript
// bad
var items = new Array();

// good
var items = [];
```

Use `Array#push` instead of direct assignment to add items to an array.

```javascript
var someStack = [];


// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

When you need to copy an array use `Array#slice`. [jsPerf](http://jsperf.com/converting-arguments-to-an-array/7)

```javascript
var len = items.length;
var itemsCopy = [];
var i;

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
    var args = Array.prototype.slice.call(arguments);
    ...
}
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Strings

Use single quotes `''` for strings.

```javascript
// bad
var name = "Bob Parr";

// good
var name = 'Bob Parr';

// bad
var fullName = "Bob " + this.lastName;

// good
var fullName = 'Bob ' + this.lastName;
```

Strings longer than 80 characters should be written across multiple lines using string concatenation.

Note: If overused, long strings with concatenation could impact performance. [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40).

```javascript
// bad
var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
var errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
var errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';
```

When programmatically building up a string, use `Array#join` instead of string concatenation. Mostly for IE: [jsPerf](http://jsperf.com/string-vs-array-concat/2).

```javascript
var items;
var messages;
var length;
var i;

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


**[⬆ back to top](#markdown-header-table-of-contents)**


## Functions

Function expressions:

```javascript
// anonymous function expression
var anonymous = function() {
    return true;
};

// named function expression
var named = function named() {
    return true;
};

// immediately-invoked function expression (IIFE)
(function() {
    console.log('Welcome to the Internet. Please follow me.');
})();
```
**Declare all functions before they are used.** Inner functions should follow the var statement. This helps make it clear what variables are included in its scope.

There should be no space between the name of a function and the `(` (left parenthesis) of its parameter list. There should be one space between the `)` (right parenthesis) and the `{` (left curly brace) that begins the statement body. The body itself is indented four spaces. The `}` (right curly brace) is aligned with the line containing the beginning of the declaration of the function.

```javascript
    function outer(c, d) {
        var e = c * d;
        function inner(a, b) {
            return (e * a) + b;
        }
        return inner(0, 1);
    }
```

This convention works well with JavaScript because in JavaScript, functions and object literals can be placed anywhere that an expression is allowed. It provides the best readability with inline functions and complex structures.

```javascript
    function getElementsByClassName(className) {
        var results = [];
        walkTheDOM(document.body, function (node) {
            var a;                  // array of class names
            var c = node.className; // the node's classname
            var i;                  // loop counter
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

If a function literal is anonymous, there should be one space between the word function and the ( (left parenthesis). If the space is omitted, then it can appear that the function's name is    function, which is an incorrect reading.

```javascript
    div.onclick = function (e) {
        return false;
    };
    that = {
        method: function () {
            return this.datum;
        },
        datum: 0
    };
```

Use of global functions should be minimized. If your code contains functions that are only useful to the module, then those functions should be encapsulated in an immediately executed anonymous function with the rest of the module's code.

When a function is to be invoked immediately, the entire invocation expression should be wrapped in parenthesis so that it is clear that the value being produced is the result of the function and not the function itself.

```javascript
var collection = (function () {
    var keys = [], values = [];
    return {
        get: function (key) {
            var at = keys.indexOf(key);
            if (at >= 0) {
                return value[at];
            }
        },
        set: function (key, value) {
            var at = keys.indexOf(key);
            if (at < 0) {
                at = keys.length;
            }
            keys[at] = key;
            value[at] = value;
        },
        remove: function (key) {
            var at = keys.indexOf(key);
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
var test;
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


**[⬆ back to top](#markdown-header-table-of-contents)**

## Event Binding

Avoid inline event bindings:

```html 
<!-- Bad -->
<button onclick="document.bgColor='lightblue'">Feel Blue</button>
```

Avoid binding to events that can fire multiple times. If you must do so, use [debouncing](https://davidwalsh.name/javascript-debounce-function):

```js 
// Bad: This is going to fire the event a lot

window.addEventListener('resize', function() {
        console.log('resize');
});

// Good: This is using debouncing to only fire every 250ms

var windowResizeFn = debounce(function() {
    console.log('resize');
}, 250);

window.addEventListener('resize', windowResizeFn);

```

Always cache the DOM query for the element you are binding to:

```js

// Bad: This will query for the selector everytime

document.getElementById('myDiv').addEventListener('click', function() {
        console.log('clicked');
});

// Good: the node is now cached to the $myDiv variable.

var $myDiv = document.getElementById('myDiv');

$myDiv.addEventListener('click', function() {
        console.log('clicked');
});

```



**[⬆ back to top](#markdown-header-table-of-contents)**


## Properties

Use dot notation when accessing properties.

```javascript
var luke = {
    jedi: true,
    age: 28
};

// bad
var isJedi = luke['jedi'];

// good
var isJedi = luke.jedi;
```

Use subscript notation `[]` when accessing properties with a variable.

```javascript
var luke = {
    jedi: true,
    age: 28
};

function getProp(prop) {
    return luke[prop];
}

var isJedi = getProp('jedi');
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Variables

Always use `var` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace.

```javascript
// bad
superPower = new SuperPower();

// good
var superPower = new SuperPower();
```

Use one `var` declaration per variable.
It's easier to add new variable declarations this way, and you never have
to worry about swapping out a `;` for a `,` or introducing punctuation-only
diffs.

```javascript
// bad
var items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
var items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
var items = getItems();
var goSportsTeam = true;
var dragonball = 'z';
```

Declare unassigned variables last. This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

```javascript
// bad
var i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
var i;
var items = getItems();
var dragonball;
var goSportsTeam = true;
var len;

// good
var items = getItems();
var goSportsTeam = true;
var dragonball;
var length;
var i;
```

Declare all variables before use. JavaScript does not require this, but doing so makes the program easier to read and makes it easier to detect undeclared variables that may become implied [globals](http://yuiblog.com/blog/2006/06/01/global-domination/).

Use of global variables should be minimized. Do not use implied global variables.
  
Assign variables at the top of their scope. This helps avoid issues with variable declaration and assignment hoisting related issues. 

```javascript
// bad
function() {
    test();
    console.log('doing stuff..');

    //..other stuff..

    var name = getName();

    if (name === 'test') {
        return false;
    }

    return name;
}

// good
function() {
    var name = getName();

    test();
    console.log('doing stuff..');

    //..other stuff..

    if (name === 'test') {
        return false;
    }

    return name;
}

// bad - unnessary function call
function() {
    var name = getName();

    if (!arguments.length) {
        return false;
    }

    this.setFirstName(name);

    return true;
}

// good
function() {
    var name;

    if (!arguments.length) {
        return false;
    }

    name = getName();
    this.setFirstName(name);

    return true;
}
```


**[⬆ back to top](#markdown-header-table-of-contents)**


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


**[⬆ back to top](#markdown-header-table-of-contents)**


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

The `if` class of statements should have the following form:

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
A `for` class of statements should have the following form:

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

The first form should be used with arrays and with loops of a predeterminable number of iterations.

The second form should only be used with objects. Be aware that members that are added to the prototype of the object will be included in the enumeration. It is wise to program defensively by using the `hasOwnProperty` method to distinguish the true members of the object:

```javascript
    for (variable in object) {
        if (object.hasOwnProperty(variable)) {
            // statements
        }
    }
```

A `while` statement should have the following form:

```javascript
    while (condition) {
        // statements
    }
```
A `do` statement should have the following form:

```javascript
    do {
        // statements
    } while (condition);
```

Unlike the other compound statements, the do statement always ends with a `;` (semicolon).

A switch statement should have the following form:

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

The `try` class of statements should have the following form:

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

Use of the `continue` statement should be limited since it can obscure control flow in a function. It is best used at the start of a loop to handle pre-conditions. This technique reduces excessive indentation.

The `with` statement should not be used. (Learn more at http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/)


**[⬆ back to top](#markdown-header-table-of-contents)**


## Comments

**Be generous with comments, but make them meaningful.** It is useful to leave information that will be read at a later time by people (possibly yourself) who will need to understand what you have done. The comments should be well-written and clear, just like the code they are annotating. An occasional nugget of humor might be appreciated. Frustrations and resentments will not. Inappropriate language should never be used. Even though comments are stripped by compression, it is far too easy for uncompressed code to be viewed by third parties and users.

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
var active = true;  // is current tab

// good
// is current tab
var active = true;

// bad
function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    var type = this._type || 'no type';

    return type;
}

// good
function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    var type = this._type || 'no type';

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


**[⬆ back to top](#markdown-header-table-of-contents)**


## Whitespace
Blank lines improve readability by setting off sections of code that are logically related.

Use soft tabs set to 4 spaces. ([Stack Overflow: Soft tabs or hard tabs?](http://stackoverflow.com/a/9446364/1096083))

```javascript
// no
function() {
∙∙var name;
}

// no
function() {
∙var name;
}

// yeah
function() {
∙∙∙∙var name;
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

Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space before the argument list in function calls and declarations.

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
var x=y+5;

// good
var x = y + 5;
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
var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
var leds = stage.selectAll('.led')
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
var obj = {
    foo: function() {
    },
    bar: function() {
    }
};
return obj;

// good
var obj = {
    foo: function() {
    },

    bar: function() {
    }
};

return obj;
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Commas

Leading commas: **No, please.**

```javascript
// bad
var story = [
    once
  , upon
  , aTime
];

// good
var story = [
    once,
    upon,
    aTime
];

// bad
var hero = {
    firstName: 'Bob'
  , lastName: 'Parr'
  , heroName: 'Mr. Incredible'
  , superPower: 'strength'
};

// good
var hero = {
    firstName: 'Bob',
    lastName: 'Parr',
    heroName: 'Mr. Incredible',
    superPower: 'strength'
};
```

Additional trailing comma: **Nope.** This can cause problems with IE6/7 and IE9 if it's in quirksmode. 

```javascript
// kaboooom
var hero = {
    firstName: 'Kevin',
    lastName: 'Flynn',
};

var heroes = [
    'Batman',
    'Superman',
];

// phew
var hero = {
    firstName: 'Kevin',
    lastName: 'Flynn'
};

var heroes = [
    'Batman',
    'Superman'
];
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Semicolons

**[Yes, have some.](https://www.youtube.com/watch?v=pdMGPvODN44)**

```javascript
// bad
(function() {
    var name = 'Skywalker'
    return name
})()

// good
(function() {
    var name = 'Skywalker';
    return name;
})();

// good (guards against the function becoming an argument when two files with IIFEs are concatenated)
;(function() {
    var name = 'Skywalker';
    return name;
})();
```

[Read more](http://stackoverflow.com/a/7365214/1712802).


**[⬆ back to top](#markdown-header-table-of-contents)**


## Type Casting & Coercion

Perform type coercion at the beginning of the statement.
Strings:

```javascript
//  => this.reviewScore = 9;

// bad
var totalScore = this.reviewScore + '';

// good
var totalScore = '' + this.reviewScore;

// bad
var totalScore = '' + this.reviewScore + ' total score';

// good
var totalScore = this.reviewScore + ' total score';
```

Use `parseInt` for Numbers and always with a radix for type casting.

```javascript
var inputValue = '4';

// bad
var val = new Number(inputValue);

// bad
var val = +inputValue;

// bad
var val = inputValue >> 0;

// bad
var val = parseInt(inputValue);

// bad
var val = 1 * inputValue;

// good
var val = Number(inputValue);

// good
var val = parseInt(inputValue, 10);
```

Booleans:

```javascript
var age = 0;

// bad
var hasAge = new Boolean(age);

// bad
var hasAge = !!age;

// good
var hasAge = Boolean(age);
```


**[⬆ back to top](#markdown-header-table-of-contents)**


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
var OBJEcttsssss = {};
var o = {};
function c() {}

// bad, mixed conventions:
var thisIsMyObject = {};
function this_is_my_function() {}

// good, camelCase:
var thisIsMyObject = {};
function thisIsMyFunction() {}

// good, underscore_case:
var this_is_my_object = {};
function this_is_my_function() {}

```

Use PascalCase when naming constructors or classes. Constructor functions which must be used with the [new](http://yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/) prefix should start with a capital letter. JavaScript issues neither a compile-time warning nor a run-time warning if a required new is omitted. Bad things can happen if new is not used, so the capitalization convention is the only defense we have.

```javascript
// bad
function user(options) {
    this.name = options.name;
}

var bad = new user({
    name: 'nope'
});

// good
function User(options) {
    this.name = options.name;
}

var good = new User({
    name: 'yup'
});
```

Use a leading underscore `_` when naming private properties.

```javascript
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';

// good
this._firstName = 'Panda';
```

To indicate that a variable contains a jQuery object, names should start with a `$`:

```javascript
var $email = $("#email");
```

When saving a reference to `this` use `_this`.

```javascript
// bad
function() {
    var self = this;
    return function() {
        console.log(self);
    };
}

// bad
function() {
    var that = this;
    return function() {
        console.log(that);
    };
}

// good
function() {
    var _this = this;
    return function() {
        console.log(_this);
    };
}
```

Name your functions. This is helpful for stack traces.

```javascript
// bad
var log = function(msg) {
    console.log(msg);
};

// good
var log = function log(msg) {
    console.log(msg);
};
```

**Note:** IE8 and below exhibit some quirks with named function expressions.  See [http://kangax.github.io/nfe/](http://kangax.github.io/nfe/) for more info.

If your file exports a single class, your filename should be exactly the name of the class.
```javascript
// file contents
class CheckBox {
  // ...
}
module.exports = CheckBox;

// in some other file
// bad
var CheckBox = require('./checkBox');

// bad
var CheckBox = require('./check_box');

// good
var CheckBox = require('./CheckBox');
```


**[⬆ back to top](#markdown-header-table-of-contents)**


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

var luke = new Jedi();
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

var luke = new Jedi();

luke.jump()
    .setHeight(20);
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Performance

  - [On Layout & Web Performance](http://kellegous.com/j/2013/01/26/layout-performance/)
  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)


**[⬆ back to top](#markdown-header-table-of-contents)**


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


**[⬆ back to top](#markdown-header-table-of-contents)**