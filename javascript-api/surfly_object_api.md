# Surfly object API

> SurflySession Surfly.currentSession

_(read only)_

If called from inside a session, this returns a [SurflySession](surflysession_api.md) object referring to a session we are currently in. Otherwise, it returns null. It allows you to detect whether the current page is loaded under Surfly, and also use the `SurflySession` API for communication with the outer window.

##### Example
```javascript
if (Surfly.currentSession) {
  curSession.on('message', function (session, event) {
    if (event.origin === window.location.origin) {
      console.log('outer window says:', event.data);
    } else {
      console.log("outer window has a different origin");
    }
  });
}

```
<hr />
> boolean Surfly.agentAvailable

contains `true` if there is at least one company agent online

##### Example
```javascript
// this is how you might hide a custom element depending on
// agent availability
var but = document.getElementById('my-custom-button');
if (!Surfly.agentAvailable) {
  but.style.display = 'none';
} else {
  but.style.display = 'block';
}
```
<hr />
> SurflySession Surfly.session( [ sessionSettings ], [ sessionUrl ] )

Creates a session object with provided settings. Some properties of the returned SurflySession may not be initialized. You can bind callbacks using `.on()` method to hook on specific points of session lifetime.
Note that you will need to call `.create()` or `.startLeader()` / `.startFollower()` methods to actually create a session and open a cobrowsing window respectively.

`sessionSettings`: (optional) session settings object

`sessionUrl`: (optional) URL string with leader or follower session link. If specified, Surfly will not create a new session, and will just open the provided session link instead. This is useful, for example, when a session has been created beforehand using the REST API.


##### Example
```javascript
Surfly.init({widget_key: '24d1414c71a94cbf9f205ed4fc4999b5'}, function(init) {
  if (init.success) {
    Surfly.session({docked_only: true}).startLeader();
  }
});
```

<hr />
> Surfly.button( [ settingsObject ] )

_(not available inside a Surfly session)_

Adds a Surfly button to the current page. When a user clicks the Surfly Button, it will create a new Surfly session, and open a leader window. The Surfly button will automatically hide itself under the Surfly session, or if there is no support agent online (unless `autohide_button` is set to false).

`settingsObject`: here you can set settings that will be applied to all sessions created with this button. If there is a conflict, settings provided here will override the ones passed to `Surfly.init()`.

Inside a session, `Surfly.button()` calls will be silently ignored.

The Surfly button is just a shortcut for a quick integration, and doesn't allow for much customization. For more fine-grained integration, use [SurflySession API](sessions.md).

#### Example
```javascript
Surfly.init({widget_key: '24d1414c71a94cbf9f205ed4fc4999b5'}, function(init){
  if (init.success) {
    Surfly.button({autohide_button: false, position: 'bottomleft'});
  }
});
```

