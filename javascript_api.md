![logo](images/logosmall.png)
# Javascript API


### Load Surfly widget

To use the Surfly JS API, you will first need to include our snippet on your webpage:

```html
<script>
(function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
l.src='https://surfly.com/widget.js';y.parentNode.insertBefore(l,y);})
(window,document,'script','Surfly');
</script>
```

Once it is there, the `Surfly.init()` function will be immediately available. Note that it is on you to make sure that you don't make any other API calls until `readyCallback` is called.

### init() function

> Surfly.init( [ settings ], [ readyCallback ] )

This function **must** be called (just once per page) before any other API call is made. This initializes the environment for Surfly, settings based on `settings` object, tests required browser features, and passes the result to the `readyCallback` function. `readyCallback` should be a function accepting one argument with the following structure:

```javascript
{
  "success": true|false,
  "errorMsg": "<error message or null if no error occured>"
}
```

We load the Surfly widget code asynchronously, so that it doesn't slow down your page load. This also means that Surfly API is _**not initialized immediately after the snippet code is executed**_. That's why it is important that you always start with calling `Surfly.init()`, and don't make any other API calls before `readyCallback` is called.

```javascript
var settings = {
  widget_key: '24d1414c71a94cbf9f205ed4fc4999b5',
  only_embedded_sessions: true
};
Surfly.init(settings, function(initResult) {
  if (initResult.success) {
    console.log('All good for happy cobrowsing!');
    // it is now safe to use API
    Surfly.button();
  } else {
    console.log('Your browser lacks features required by Surfly');
  }
});
```

