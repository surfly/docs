<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
# Styling{#styling}
Surfly uses CSS classes to change the appearance of DOM elements it handles. You can easily customize the look-and-feel of those elements by overriding the CSS rules for these classes.

For more complex customizations, consider providing your own DOM element to Surfly Button / iframe initialization functions.

### Surfly Button{#surfly-button}

The Surfly button element can be created automatically, or provided by you using the `elementSelector` argument of the `SurflyButton` constructor. In both cases we will add the following CSS classes depending on the situation:

> surfly-button

set on all initialized Surfly buttons.

> surfly-button-hidden

> surfly-button-visible

set on Surfly buttons, depending on the visibility state.

### Session iframe{#session-iframe}
If the session is opened in an iframe, we will also set a CSS class on a corresponding `<iframe>` element.

> surfly-window

set on Surfly session iframe element.
