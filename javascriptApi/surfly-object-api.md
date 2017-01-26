<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
# The Surfly Object

<a name="current-session"></a>
> SurflySession Surfly.currentSession

If called from inside a session, this returns a [SurflySession](surflysession-api.md) object referring to a session we are currently in. Otherwise, it returns null. It allows you to detect whether the current page is loaded under Surfly, and also use the `SurflySession` API for communication with the outer window.

##### Example
```javascript
if (Surfly.currentSession) {
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

<a name="agent-available"></a>
> boolean Surfly.agentAvailable

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

<a name="test-connection"></a>
> Surfly.testConnection( callback )

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

<a name="session"></a>
> SurflySession Surfly.session( [ sessionSettings ], [ sessionUrl ] )

Creates a session object with provided settings. Some properties of the returned SurflySession may not be initialized. You can bind callbacks using `.on()` method to hook on specific points of session lifetime.
Note that you will need to call `.create()` or `.startLeader()` / `.startFollower()` methods to actually create a session and open a cobrowsing window respectively.

`sessionSettings`: (optional) session settings object

`sessionUrl`: (optional) URL string with leader or follower session link. If specified, Surfly will not create a new session, and will just open the provided session link instead. This is useful, for example, when a session has been created beforehand using the REST API.


##### Example
```javascript
Surfly.init({widget_key: '**your key here**'}, function(init) {
  if (init.success) {
    if(!Surfly.currentSession){
      Surfly.session({docked_only: true}).startLeader();
    }
  }
});
```

<hr />

<a name="button"></a>
> Surfly.button( [ settingsObject ] )

_(not available inside a Surfly session)_

Adds a Surfly button to the current page. When a user clicks the Surfly Button, it will create a new Surfly session, and open a leader window. The Surfly button will automatically hide itself under the Surfly session, or if there is no support agent online (unless `autohide_button` is set to false).

`settingsObject`: here you can set settings that will be applied to all sessions created with this button. If there is a conflict, settings provided here will override the ones passed to `Surfly.init()`.

Inside a session, `Surfly.button()` calls will be silently ignored.

The Surfly button is just a shortcut for a quick integration, and doesn't allow for much customization. For more fine-grained integration, use [SurflySession API](surfly_sessions.md).

#### Example
```javascript
Surfly.init({widget_key: '**your key here**'}, function(init){
  if (init.success) {
    Surfly.button({autohide_button: false, position: 'bottomleft'});
  }
});
```

