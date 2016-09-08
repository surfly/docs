<a href="https://www.surfly.com/">![logo](images/logosmall.png)</a>
# Javascript API

## Quickstart
### 1. Load Surfly widget

To use the Surfly JS API, you will first need to include our snippet on your webpage:

```html
<script>
(function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
l.src='https://surfly.com/surfly.js';y.parentNode.insertBefore(l,y);})
(window,document,'script','Surfly');
</script>
```

Once it is there, the `Surfly.init()` function will be immediately available. Note that it is on you to make sure that you don't make any other API calls until `readyCallback` is called.

### 2. Initialize the API

> Surfly.init( [ settings ], [ readyCallback ] )

This function **must** be called (just once per page) before any other API call is made. This initializes the environment for Surfly, settings based on `settings` object, tests required browser features, and passes the result to the `readyCallback` function.

We load the Surfly widget code asynchronously, so that it doesn't slow down your page load. This also means that the Surfly API is _**not initialized immediately after the snippet code is executed**_. That's why it is important that you always start by calling `Surfly.init()`, and don't make any other API calls before `readyCallback` is called.

{% em color="#ffffe0" %}Please note: You should initialize the API in the `<head>` tag of your HTML file. Please refer to our [examples](./javascript-api/examples.md) to see how the API should be initialized. {% endem %}

### 3. Implement a callback function

`readyCallback` should be a function accepting one argument with the following structure:

```javascript
{
  "success": true|false,
  "errorMsg": "<error message or null if no error occured>"
}
```

In addition to `success` check, you probably want to detect if the page is currently loaded under Surfly session by checking if `Surfly.currentSession` exists.

### Example

The following example initializes Surfly JS API and adds a Surfly button on the page:

```javascript
var settings = {
  widgetkey:'**your key here**',
  only_embedded_sessions: true
};
Surfly.init(settings, function(initResult) {
  if (initResult.success && !Surfly.currentSession) {
    console.log('All good for happy cobrowsing!');
    // it is now safe to use API
    Surfly.button();
  } else {
    console.log('Your browser lacks features required by Surfly');
  }
});
```

For more examples of common use cases, see the [Examples](javascript-api/examples.md) page
