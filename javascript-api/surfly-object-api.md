<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
# The Surfly Object{#surfly-object}

> <a name="is-inside-session">Boolean Surfly.isInsideSession</a>

Returns `true` if the current page is loaded within a Surfly session. This makes it possible to change the page behaviour while cobrowsing. Usually used together with [currentSession](#current-session)

##### Example
```javascript
if (Surfly.isInsideSession) {
  console.log('This page is being co-browsed');
}
```
<hr />

> <a name="current-session">SurflySession Surfly.currentSession</a>

If called from inside a session, this returns a [SurflySession](surfly-session-api.md) object referring to a session we are currently in. Otherwise, it returns null. It allows you to detect whether the current page is loaded under Surfly, and also use the `SurflySession` API for communication with the outer window.

_Note: the same can be achieved by using ```Surfly.listSessions()[0]```_

##### Example
```javascript
if (Surfly.isInsideSession) {
  Surfly.currentSession.on('message', function (session, event) {
    if (event.origin === window.location.origin) {
      console.log('outer window says:', event.data);
    } else {
      console.log("outer window has a different origin");
    }
  });
}

```
<hr />

> <a name="list-sessions">Array Surfly.listSessions()</a>

Returns a list of [SurflySession](surfly-session-api.md) objects that were created with JS API, or restored after the page reload. Note that by the time the [init callback](../javascript-api.md) is called, this list can already contain some sessions restored after a page reload.

Inside a session, the return array will contain only one object, representing the currently open session (see [Surfly.currentSession](#current-session)).

##### Example
```javascript
Surfly.listSessions().forEach(function(session) {
  console.log('found a session:', session.followerLink);
});
```

<hr />

> <a name="on">Surfly Surfly.on( eventName, callback )</a>

Sets a global event handler.

If `eventName` is a session event, the handler will affect _all_ sessions, including the currently created ones.

`callback` must be a function. Depending on the type of event, it will be provided with relevant data.

See [Events](session-events.md) section for more details.

Returns a reference to the `Surfly` object, so chained calls are possible:

```javascript
Surfly.on(/*...*/).on(/*...*/);
```

##### Example
```javascript
Surfly.on('session_ended', function(session, eventData) {
  console.log('Session', session.followerLink, 'has just ended');
});
```

<hr />

> <a name="agent-available">boolean Surfly.agentAvailable</a>

contains `true` if there is at least one company agent online

##### Example
```javascript
// this is how you might hide a custom element depending on
// agent availability
var but = document.getElementById('my-custom-button');
if (!Surfly.agentAvailable) {
  but.style.display = 'none';
}
else {
  but.style.display = 'block';
}
```
<hr />

> <a name="test-connection">Surfly.testConnection( callback )</a>

`Surfly.init()` succeeds only if the user's browser supports all features required by Surfly (WebSockets, for example). However, cobrowsing may still not work if there is a blocking firewall between the user and the Surfly server. In this case `SurflySession.startLeader()` and `SurflySession.startFollower()` will raise errors. This function allows to check connection without starting an actual cobrowsing session.

`callback`: a callback function that accepts a test result in following format:
```javascript
{
  "success": true|false,
  "errorMsg": "<error message or null if no error occured>"
}
```

##### Example
```javascript
Surfly.testConnection(function(result) {
  if (!result.success) {
    console.error('Connection to Surfly failed:', result.errorMsg);
  }
});
```

<hr />

> <a name="session">SurflySession Surfly.session( [ sessionSettings ], [ sessionUrl ] )</a>

Creates a session object with provided settings. Some properties of the returned SurflySession may not be initialized. You can bind callbacks using `.on()` method to hook on specific points of session lifetime.
Note that you will need to call `.create()` or `.startLeader()` / `.startFollower()` methods to actually create a session and open a cobrowsing window respectively.

`sessionSettings`: (optional) session settings object

`sessionUrl`: (optional) URL string with leader or follower session link. If specified, Surfly will not create a new session, and will just open the provided session link instead. This is useful, for example, when a session has been created beforehand using the REST API.


##### Example
```javascript
Surfly.init({widget_key: '**your key here**'}, function(init) {
  if (init.success) {
    if(!Surfly.isInsideSession){
      Surfly.session({docked_only: true}).startLeader();
    }
  }
});
```

<hr />

> <a name="button">Surfly.button( [ settingsObject ] )</a>

_(not available inside a Surfly session)_

Adds a Surfly button to the current page. When a user clicks the Surfly Button, it will create a new Surfly session, and open a leader window. The Surfly button will automatically hide itself under the Surfly session, or if there is no support agent online (unless `autohide_button` is set to false).

`settingsObject`: here you can set settings that will be applied to all sessions created with this button. If there is a conflict, settings provided here will override the ones passed to `Surfly.init()`.

Inside a session, `Surfly.button()` calls will be silently ignored.

The Surfly button is just a shortcut for a quick integration, and doesn't allow for much customization. For more fine-grained integration, use [SurflySession API](surfly-session-api.md).

#### Example
```javascript
Surfly.init({widget_key: '**your key here**'}, function(init){
  if (init.success) {
    Surfly.button({autohide_button: false, position: 'bottomleft'});
  }
});
```

