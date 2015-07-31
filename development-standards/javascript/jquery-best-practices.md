#jQuery Best Practices

## Table of Contents

  1. [Determine jQuery Objects](#markdown-header-determine-jquery-objects)
  1. [Document Ready](#markdown-header-document-ready)
  1. [Event Bind / Live / Delegate](#markdown-header-event-bind-live-delegate)
  1. [Event Prevent](#markdown-header-event-prevent)
  1. Method Chaining
  1. Toggling Element Visibility
  1. [Element Create](#markdown-header-element-create)
  1. [Element Exists](#markdown-header-element-exists)
  1. [Performance](#markdown-header-performance)
  1. [Plugins](#markdown-header-plugins)
  1. Animation



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

Cache jQuery lookups
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

For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > .ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

Use `find` with scoped jQuery object queries. (Note: Performance in long )
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
