#General Authoring Guidelines 

##JAVASCRIPT FILES
JavaScript programs should be stored in and delivered as .js files.

JavaScript code should not be embedded in HTML files unless the code is specific to a single session. Code in HTML adds significantly to page weight with no opportunity for mitigation by caching and compression. Under certain, limited, circumstances, JavaScript code may be placed in the document in order to speed execution or for dynamically generated scripting. This should be avoided.

`<script src="filename.js">` tags should be placed as late in the body as possible. This reduces the effects of delays imposed by script loading on other page components. Script tags may be placed higher in the document if required (by a third party, for example).

##INDENTATION
Use tabs for indentation of code.

##LINE LENGTH
**Break up excessively long lines.** The general suggestion for maximum length is 80 characters, but with modern screens longer lines are tolerable. When a statement will not fit on a single line, it may be necessary to break it. Place the break after an operator, ideally after a comma. A break after an operator decreases the likelihood that a copy-paste error will be masked by semicolon insertion. The next line should be indented to indicate that it is a continuation of the previous statement.

When using jQuery's method chaining to apply multiple effects to a single selector, place the newline BEFORE the period and indent the line. If the object referred to changes, then subsequent lines should be indented to indicate which object they're operating on. This should be used sparingly since the chained code can easily become hard to follow.

```javascript
     $('.container-class')
          .css('display', 'block')
          .find('.child-class')
               .css('color', '#f00')
               .attr('href', '#');
```

##COMMENTS
**Be generous with comments, but make them meaningful.** It is useful to leave information that will be read at a later time by people (possibly yourself) who will need to understand what you have done. The comments should be well-written and clear, just like the code they are annotating. An occasional nugget of humor might be appreciated. Frustrations and resentments will not. Inappropriate language should never be used. Even though comments are stripped by compression, it is far too easy for uncompressed code to be viewed by third parties and users.

It is important that comments be kept up-to-date. Erroneous comments can make programs even harder to read and understand.

Make comments meaningful. Focus on what is not immediately visible. Don't waste the reader's time with stuff like:

```javascript
    i = 0; // Set i to zero.
```

Generally use line comments. Save block comments for formal documentation and for commenting out.

Always retain comments related to licensing of open source code. Comments may never contain alarming or negative language (i.e. "hack to fix broken IE") nor individual programmer names, handles, URLs, etc.


##VARIABLE DECLARATIONS
Declare all variables before use. JavaScript does not require this, but doing so makes the program easier to read and makes it easier to detect undeclared variables that may become implied [globals](http://yuiblog.com/blog/2006/06/01/global-domination/).

Use of global variables should be minimized. Do not use implied global variables.

The var statements should be the first statements in the function body.

It is preferred that each variable be given its own line and comment.

```javascript
    var currentEntry; // currently selected table entry
    var level;        // indentation level
    var size;         // size of table
```

JavaScript does not have block scope, so defining variables in blocks can confuse programmers who are experienced with other C family languages.

##FUNCTION DECLARATIONS
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

##NAMES
**Names should be formed from the 26 upper and lower case letters (A .. Z, a .. z), the 10 digits (0 .. 9), and `_` (underscore).** Avoid use of international characters because they may not read well or be understood everywhere. Do not use `$` (dollar sign) or `\\` (backslash) in names.

Do not use `_` (underscore) as the first character of a name. It is sometimes used to indicate privacy, but it does not actually provide [privacy](http://javascript.crockford.com/private.html). If privacy is important, use the forms that provide private members. Avoid conventions that demonstrate a lack of competence.

Most variables and functions should start with a lower case letter.

Constructor functions which must be used with the [new](http://yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/) prefix should start with a capital letter. JavaScript issues neither a compile-time warning nor a run-time warning if a required new is omitted. Bad things can happen if new is not used, so the capitalization convention is the only defense we have.


##STATEMENTS

###SIMPLE STATEMENTS
Each line should contain at most one statement. Put a `;` (semicolon) at the end of every simple statement. Note that an assignment statement which is assigning a function literal or object literal is still an assignment statement and must end with a semicolon.

JavaScript allows any expression to be used as a statement. This can mask some errors, particularly in the presence of semicolon insertion. The only expressions that should be used as statements are assignments and invocations.

###COMPOUND STATEMENTS
Compound statements are statements that contain lists of statements enclosed in `{ }` (curly braces).
- The enclosed statements should be indented four more spaces.
- The `{` (left curly brace) should be at the end of the line that begins the compound statement.
- The `}` (right curly brace) should begin a line and be indented to align with the beginning of the line containing the matching `{` (left curly brace).
- Braces should be used around all statements, even single statements, when they are part of a control structure, such as an if or for statement. This makes it easier to add statements without accidentally introducing bugs. 

###LABELS
Statement labels are optional. Only these statements should be labeled: `while`, `do`, `for`, `switch`.

###RETURN STATEMENT
A return statement with a value should not use `( )` (parentheses) around the value. The return value expression must start on the same line as the `return` keyword in order to avoid semicolon insertion.

###IF STATEMENT
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

###FOR STATEMENT
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

###WHILE STATEMENT
A `while` statement should have the following form:

```javascript
    while (condition) {
        // statements
    }
```

###DO STATEMENT
A `do` statement should have the following form:

```javascript
    do {
        // statements
    } while (condition);
```

Unlike the other compound statements, the do statement always ends with a `;` (semicolon).


###SWITCH STATEMENT
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


###TRY STATEMENT
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

###CONTINUE STATEMENT
Use of the `continue` statement should be limited since it can obscure control flow in a function. It is best used at the start of a loop to handle pre-conditions. This technique reduces excessive indentation.


###WITH STATEMENT
The `with` statement should not be used. (Learn more at http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/)


##WHITESPACE
Blank lines improve readability by setting off sections of code that are logically related.

Blank spaces should be used in the following circumstances:
- A keyword followed by `(` (left parenthesis) should be separated by a space.
```javascript
        while (true) {
```
- A blank space should not be used between a function value and its `(` (left parenthesis). This helps to distinguish between keywords and function invocations.
- All binary operators except `.` (period) and `(` (left parenthesis) and `[` (left bracket) should be separated from their operands by a space.
- No space should separate a unary operator and its operand except when the operator is a word such as `typeof`.
- Each `;` (semicolon) in the control part of a `for` statement should be followed with a space.
- Whitespace should follow every `,` (comma).


##MISCELLANEOUS STANDARDS

###`{}` AND `[]`
Use `{}` instead of `new Object()`. Use `[]` instead of `new Array()`. Using the `new Object()` and `new Array()` forms is needlessly verbose, and error prone since the Array and Object constructors can be overridden.

Use arrays when the member names would be sequential integers. Use objects when the member names are arbitrary strings or names.

###`,` (COMMA) OPERATOR
Avoid the use of the comma operator except for very disciplined use in the control part of `for` statements. (This does not apply to the comma separator, which is used in object literals, array literals, `var` statements, and parameter lists.)

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


###CONFUSING CONVERSIONS
Avoid using confusing type conversion techniques. For most of the following techniques, there is a built in JavaScript method that is easier to read and more directly indicates your intentions to other developers.

####STRING CONVERSIONS
```javascript
     var example = 3.14159;
     str = "" + example; // Bad, string concatenation should only be used when building a string
     str = example.toString(); // Good
```

####INTEGER CONVERSIONS
```javascript
     var example = "3.14159";
     int = ~~example; // Bad, bit-wise operators are rarely used in JavaScript, and should only be used when doing bit operations
     int = parseInt(example, 10); // Good
```

Be aware that `parseInt` takes a second, optional argument specifying the radix for base conversion. If this argument is ommitted, then parseInt will attempt to do base detection, and if the first argument starts with a "0", then it will be treated as an octal value, which is probably not the intention. Whenever using `parseInt`, always specify the second argument (which will be 10 for a vast majority of the time).

###FLOAT COVERSIONS
```javascript
     var example = "3.14159";
     float = 1 * example; // Bad, not obvious that this is doing a conversion, and future developers might optimize it away
     float = parseFloat(example); // Good
```

###BOOLEAN CONVERSIONS
```javascript
     var example = 3.14159;
     bool = !!example; // Bad, this is a non-obvious construct and can be confusing for some developers
     bool = (example !== 0); // Good
```

When converting a value to a boolean, use a comparison operator. If you're only interested in the truthy-ness of the value, then either use the `?:` operator or just use the value in a conditional.

##LINT-ING
We need to determine how we’re going to support this automatically. Meanwhile, please lint your code manually.
