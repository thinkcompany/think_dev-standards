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
  1. Animation



## Determine jQuery Objects
  - Determine if an object is a jQuery object:

    ```js
    // bad (fast)
    if( obj.jquery ){}

    // good (slow)
    if( obj instanceof jQuery){}
    ```

**[⬆ back to top](#markdown-header-table-of-contents)**


## Document Ready
  - Begin executing statements with jQuery as soon as the DOM is ready:

    ```js
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

  - `.bind()` is deprecated -- use `.on()` to start listening for events:

    ```js
    // bad
    $( "#members li a" ).bind( "click", function( e ) {} ); 

    // better
    $( "#members li a" ).click( function( e ) {} ); 

    // good
    $( "#members li a" ).on( "click", function( e ) {} ); 

    ```

  - Use the `.on()` method in lieu of deprecated `.live()` and `.delegate()` methods:
    ```js
    // bad, .live() deprecated jQuery 1.7, removed jQuery 1.9
    $( "#members li a" ).live( "click", function( e ) {} );

    // good
    $( document ).on( "click", "#members li a", function( e ) {} ); 

    ```

    ```js
    // bad, as of jQuery 1.7, .delegate() has been superseded by the .on() method
    $( "#members" ).delegate( "li a", "click", function( e ) {} );

    // good
    $( "#members" ).on( "click", "li a", function( e ) {} ); 
    ```

**[⬆ back to top](#markdown-header-table-of-contents)**


## Event Prevent
  - Don't use `return false` to halt the default action of an event:

    ```js
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
  - Create an element dynamically:

    ```js
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
  - Check to see if an element exists:

    ```js
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
  - Cache jQuery lookups
    ```js
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

  - For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > .ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

  - Use `find` with scoped jQuery object queries.
    ```js
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
  - Use `event delegation` with list of elements.
    ```html
    <ul>
      <li>list1</li>
      <li>list2</li>
      <li>list3</li>
      <li>list4</li>
      <li>list5</li>
    </ul> 
      ```
  
    ```js
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
