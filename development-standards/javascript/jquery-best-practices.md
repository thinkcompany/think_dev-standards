#jQuery Best Practices

## Table of Contents

  1. [Loading jQuery](#markdown-header-loading-jquery)
  1. [Selectors](#markdown-header-selectors)
  1. [Determine jQuery Objects](#markdown-header-determine-jquery-objects)
  1. [Document Ready](#markdown-header-document-ready)
  1. [Event Bind / Live / Delegate](#markdown-header-event-bind-live-delegate)
  1. [Event Prevent](#markdown-header-event-prevent)
  1. [Method Chains](#markdown-header-method-chains)
  1. [Manipulating Element Appearance](#markdown-header-manipulating-element-appearance)
  1. [Element Create](#markdown-header-element-create)
  1. [Element Exists](#markdown-header-element-exists)
  1. [Performance](#markdown-header-performance)
  1. [Plugins](#markdown-header-plugins)

## Loading jQuery

### CDNs
Don't load jQuery using a CDN link - always include it locally in your project. There are no pre-caching guarantees with CDNs, and blocked access / availability that differs from your application can introduce unnessecary points of failure. [More info](http://www.sitepoint.com/7-reasons-not-to-use-a-cdn/).

### Version
  - Use the 1.x branch of jQuery if your project must support Internet Explorer 7 or 8.
  - Use the latest branch if you are authoring a greenfield project with modern browser support and/or no plugin compatibility issues.
  - Do not load multiple jQuery libraries / versions on the same page.

### Other JS Libraries
  - If you are using other libraries like Prototype, MooTools, Zepto etc. that uses `$` sign as well, try not to use `$` for calling jQuery functions and instead use `jQuery` simply. You can return control of `$` back to the other library with a call to `$.noConflict()`. However:
  - In general, try to use only one DOM manipulation / Ajax wrapper library in your application at a time. And, keep in mind:
  - [You Might Not Need jQuery](http://youmightnotneedjquery.com/)


**[⬆ back to top](#markdown-header-table-of-contents)**


## Selectors
Use data attribute selectors over class or ID selectors whenever possible. Although the performance of class/ID selectors are [markedly better](http://jsperf.com/jquery-data-attribute-selector-vs-class-selector), we anticipate that faster browser Javascript engine speeds will eventually bring relative parity to alternate DOM crawling methods. Using data selectors whenever the slower performance can be tolerated will allow authors to reserve class attributes for styles only, and the style and the functionality of the page can have true separation in this way.

```html
<div data-selector-name>Select me</div>
<div data-selector-name="todd">Select me</div>
```
```javascript
$('[data-selector-name]');
$('[data-selector-name="todd"]');
```

If performance dictates you must switch to classnames as selectors, use classnames prepended with `js-` to indicate to other authors that it's a functionality hook and not intended to be in the document for styling purposes.

```html
<div class="btn js-action">Click me</div>
```
```javascript
$('.js-action');
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Determine jQuery Objects

Determine if an object is a jQuery object:
```javascript
// bad (fast)
if( obj.jquery ){}

// good (slow)
if( obj instanceof jQuery){}
```

Prefix jQuery object variables with a `$`.
The dollar notation on all jQuery-related variables helps us easily distinguish jQuery variables from standard JavaScript variables at a glance.
```js
// bad
var sidebar = $('.sidebar');
var that = $(this);

// good
var $sidebar = $('.sidebar');
var $this = $(this);
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Document Ready

Begin executing statements with jQuery as soon as the DOM is ready:
```javascript
// bad
$(function() {
    // Handler for .ready() called.
});

// good
$(document).ready(function() {
    // Handler for .ready() called.
});
```
Use only one Document Ready handler per page. It makes it easier to debug and keep track of the behavior flow.

**[⬆ back to top](#markdown-header-table-of-contents)**


## Event Bind / Live / Delegate

`.bind()` is deprecated -- use `.on()` to start listening for events:
```javascript
// bad
$( "#members li a" ).bind( "click", function( e ) {} ); 

// better
$( "#members li a" ).click( function( e ) {} ); 

// good
$( "#members li a" ).on( "click", function( e ) {} ); 
```

Use the `.on()` method in lieu of deprecated `.live()` and `.delegate()` methods:
```javascript
// bad, .live() deprecated jQuery 1.7, removed jQuery 1.9
$( "#members li a" ).live( "click", function( e ) {} );

// good
$( document ).on( "click", "#members li a", function( e ) {} ); 
```

```javascript
// bad, as of jQuery 1.7, .delegate() has been superseded by the .on() method
$( "#members" ).delegate( "li a", "click", function( e ) {} );

// good
$( "#members" ).on( "click", "li a", function( e ) {} ); 
```

When possible, use a [custom namespace](http://api.jquery.com/event.namespace/) for events. It's easier to unbind the exact event that you attached without affecting other events bound to the DOM element.
```javascript
$("[data-special-link]").on("click.mySpecialClick", myEventHandler); // GOOD
// Later on, it's easier to unbind just your click event
$("[data-special-link]").unbind("click.mySpecialClick");
```

Use event delegation  when you have to attach same event to multiple elements. Event delegation allows us to attach a single event listener, to a parent element, that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future.
```javascript
$("[data-special-list] a").on("click", myClickHandler); // BAD, you are attaching an event to all the links under the list.
$("[data-special-list]").on("click", "a", myClickHandler); // GOOD, only one event handler is attached to the parent.
```

**[⬆ back to top](#markdown-header-table-of-contents)**


## Event Prevent

Don't use `return false` to halt the default action of an event:

```javascript
// bad
$(".btn").click(function(event){
    // @more: http://fuelyourcoding.com/jquery-events-stop-misusing-return-false/
    return false;
});

// good
$(".btn").click(function(event){
    event.preventDefault();
});

// good
$(".btn").click(function(event){
    event.preventDefault();
    event.stopImmediatePropagation()
});

// good
$(".btn").click(function(event){
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
});
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Method Chains
Use indentation when making long method chains, and avoid more than 6 methods chained. 
Less method chains, more friendly debugging. 

```js
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// good
$('#items')
.find('.selected')
  .highlight()
  .end()
.find('.open')
  .updateCount();
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Manipulating Element Appearance
Avoid use of `.show()` or `.hide()` when toggling element visibility. These methods create inline styles on the elements being targeted using the `display:` property.

Similarly, avoid manipulating any element style properties using jQuery's `.css()` method. This also affects inline styles and has the ability to cascade further than stylesheets and cause conflicts.

Prefer `.addClass()` and `.removeClass()` for toggling visibility and element apperance states. This provides true separation of style and functionality by allowing styles to live within the application's stylesheets.

```javascript
// No
$([data-change-appearance]).hide();
$([data-change-appearance]).show();

// Yes
$([data-change-appearance]).addClass('hidden');
$([data-change-appearance]).removeClass('hidden');
```
```javascript
// No
$([data-change-appearance]).css({'color: red, 'font-weight': 'bold'});

// Yes
$([data-change-appearance]).addClass('urgent');
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Element Create

Create an element dynamically:
```javascript
// bad
$('<a/>')  
  .attr({  
    id : 'someId',  
    className : 'someClass',  
    href : 'somePath.html'  
  });

// good
$('<a/>', {  
    id : 'someId',  
    className : 'someClass',  
    href : 'somePath.html'  
}); 
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Element Exists

Check to see if an element exists:
```javascript
// bad
if ($('#myElement')[0]) {  
    // balabala...
}  

// good
if ($('#myElement').length) {  
    // balabala... 
}
```


**[⬆ back to top](#markdown-header-table-of-contents)**


## Performance

###Cache jQuery lookups
```javascript
// bad
function setSidebar() {
  $('.sidebar').hide();

  // ...stuff...

  $('.sidebar').css({
    'background-color': 'pink'
  });
}

// good
function setSidebar() {
  var $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...stuff...

  $sidebar.css({
    'background-color': 'pink'
  });
}
```

###Context-Specific Selection
For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > .ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

Use `find` with scoped jQuery object queries. (Note: Performance in IE8 )
```javascript
// bad
$('.sidebar', 'ul').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good (slower)
$sidebar.find('ul');

// good (faster)
$($sidebar[0]).find('ul');
``` 
###Event Delegation
Use `event delegation` with list of elements.
```html
<ul>
  <li>list1</li>
  <li>list2</li>
  <li>list3</li>
  <li>list4</li>
  <li>list5</li>
</ul> 
```

```javascript
// bad
$("ul li").on("click", function() {
    $(this).text("aha");
});

// good
$("ul").on("click", "li", function() {
    $(this).text("aha");
});
```

###Detach elements prior to manipulation
Always detach any existing element before manipulation and attach it back after manipulating it. [More info](http://learn.jquery.com/performance/detach-elements-before-work-with-them/)

```javascript
var $myList = $("[data-my-list]").detach();
//...a lot of complicated things on $myList
$myList.appendTo("[data-my-list-container]");
```

###Prefer string concatenation or `array.join()` over `.append()`
[Performance comparison](http://jsperf.com/jquery-append-vs-string-concat)
```javascript
// BAD
var $myList = $("#list");
for(var i = 0; i < 10000; i++){
    $myList.append("<li>"+i+"</li>");
}
 
// GOOD
var $myList = $("#list");
var list = "";
for(var i = 0; i < 10000; i++){
    list += "<li>"+i+"</li>";
}
$myList.html(list);
 
// EVEN FASTER
var array = []; 
for(var i = 0; i < 10000; i++){
    array[i] = "<li>"+i+"</li>"; 
}
$myList.html(array.join(''));
```

**[⬆ back to top](#markdown-header-table-of-contents)**


## Plugins

### Naming Plugins

lowercase, avoid multiple words.
```
// bad
jquery.string.js
jquery.observer.js
jquery.promise.js

// good
string.js
observer.js
promise.js
```

### Plugin Skeleton

```javascript
// pluginName.js

(function (factory) {
    if (typeof define === 'function') {
        define(['$'], factory);
    } else {
        factory($);
    }
})(function ($) {
     'use strict';
     var pluginName = 'pluginName';
    // balabala...
})
```

There are some kinds of jQuery plugins:

`$.pluginName( { name:"value" } );` Attach to $ because they did not want to create a global, but just indicate it is jQuery-related functionality. They do not do anything with node lists though. 
```javascript
// pluginName.js

(function (factory) {
    if (typeof define === 'function') {
    ...
})(function ($) {
    'use strict';
    var pluginName = 'defaultPluginName';

    function plugin( options ){
        // ...
    } 

    $[pluginName] = plugin;
})
```

`$(".foo").pluginName( { name:"value" } );` Attach to $.fn because they want to participate in the chained API style when operating with a node list. 
```javascript
// pluginName.js

(function (factory) {
    if (typeof define === 'function') {
    ...
})(function ($) {
    'use strict';
    var pluginName = 'defaultPluginName';
    
    function plugin( element, options ) {
        // ...
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            // ...
        })
            
    });
})
```

`$.ajax( { dataType:"jsonpi" } );`  custom jQuery ajax request http://api.jquery.com/extending-ajax/
```javascript
// pluginName.js

(function (factory) {
    if (typeof define === 'function') {
    ...
})(function ($) {
    'use strict';
    var pluginName = 'jsonpi';
    
    $.ajaxTransport( pluginName , function(opts, originalOptions, jqXHR) {
        // ...
    });
})
```

`$( 'div:inline' );`  custom jQuery selector
```javascript
// pluginName.js

(function (factory) {
    if (typeof define === 'function') {
    ...
})(function ($) {
    'use strict';
    var pluginName = 'defaultPluginName';
    
    $.expr[':'][pluginName] = function(element) {
        return $(element).css('display') === 'inline';
    };

    $(':inline');  // Selects ALL inline elements
    $('a:inline'); // Selects ALL inline anchors
})
```

`$( '#element' ).on('cumstomEvent', function(){});`  custom jQuery Event
```javascript
// pluginName.js

(function (factory) {
    if (typeof define === 'function') {
    ...
})(function ($) {
    'use strict';
    var eventName = 'customEventName';
    
    $.event.special[eventName] = {
        // called when the event is bound
        setup: function(data, namespaces) {
            var $this = $(this);
        },
        // called when event is unbound
        teardown: function(namespaces) {
            var $this = $(this);
        },
        // called when event is dispatched
        handler: function(event) {
            var $this = $(this);
        },
        // similar to setup, but is called for each event being bound
        add: function(event) {
            var $this = $(this);
        },
        // similar to teardown, but is called for each event being unbound
        remove: function(event) {
            var $this = $(this);
        }
    };

    // bind custom event
    $("#element").on("customEventName.myNamespace", function(evt) {});
    // remove all events under the myNamespace namespace
    $("#element").off(".myNamespace");

})
```

`$( 'textarea.foo' ).val();`  custom form element value hook
```javascript
// valHooks.js

(function (factory) {
    if (typeof define === 'function') {
    ...
})(function ($) {
    'use strict';

    $.valHooks.textarea = {
        get: function( elem ) {
            return elem.value.replace( /\r?\n/g, "\r\n" );
        }
    };

})
```


**[⬆ back to top](#markdown-header-table-of-contents)**
