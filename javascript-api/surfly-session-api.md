<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>


# Surfly Sessions

The Javascript API provides a set of functions allowing you to start and control the behaviour of your Surfly sessions.

Once a session has been initialized, you'll be able to use several events in order to check the session status and, if necessary, make modifications depending on this status. More information on how to handle events can be found on the [session events](session-events.md) page.

# SurflySession Object

> <a name="start-leader">SurflySession SurflySession.startLeader( [ iframeSelector ], [ userData ] )</a>

> <a name="start-follower">SurflySession SurflySession.startFollower( [ iframeSelector ], [ userData ] )</a>

_(not available inside a session)_

Initialize a cobrowsing session, open a new iframe/browser tab if necessary, and put the session in support queue.

`iframeSelector` - (optional) CSS selector string to an iframe element on the current page. If specified, Surfly will open a session in this iframe instead of creating a new one. Note that Surfly cannot open a session in an iframe when 3rd-party cookies are disabled. Also, this is not compatible with the `open_in_new_window` option.

`userData` - (optional) a plain object with additional data to be attached to the joining user. This will be visible in subsequent user-related events (`viewer_joined`, for example), and can be used to track users when they join or leave the session. There are some special fields that have additional effects:
- `name`: this will be displayed as a user name in chatbox inside a session
- `email`: this will be used for Gravatar lookup
- `agent_id`: will pin the (unpinned) session to a specific Agent. Agent must belong to the company owning the widget key that was used for creating the session.

`userData` from `.startLeader()` call will be visible on the Queue page in Surfly dashboard, so you can easily distinguish between the users in the queue.

##### Example:
```javascript
var session = Surfly.session().startLeader();
// now send `session.followerLink` to someone else

// in another browser
Surfly.session({}, followerLink)
      .startFollower(null, {name: 'John Doe', foo: 'bar'});
```

<hr />

> <a name="create">SurflySession SurflySession.create()</a>

_(not available inside a session)_

Just initialize a new session (retrieve a leader and follower links from Surfly server) without opening a cobrowsing window. In most cases there is no need to call this function explicitly. It will be called automatically from `SurflySession.startLeader()` and `SurflySession.startFollower()`.

Note that you still _must_ call `SurflySession.startLeader()` or `SurflySession.startFollower()` at some point, to open a cobrowsing window.

If the session is already initialized, `SurflySession.create()` does nothing.

<hr />

> <a name="end">SurflySession SurflySession.end( [redirectUrl] )</a>

gracefully ends the current session (as long as the current user has permissions to do so).

If specified, `redirectUrl` should be a valid URL string. The user will be redirected there after session ends. The exception is when `end_of_session_popup_url` settings is set. In this case, it will have priority over `redirectUrl`.

Note that by default a user is redirected to the page that was last visited inside the session.

<hr />

> <a name="settings">Object SurflySession.settings</a>

_(read only, not available inside a session)_

returns the session settings by which the session was created

<hr />

> <a name="on">SurflySession SurflySession.on( eventName, callback )</a>

set an event handler. Inside the `callback` function, `this` will be set to the current `SurflySession` instance. See [Events](session-events.md) section for more details.

Returns a reference to the current `SurflySession`, so chained calls are possible:
```javascript
Surfly.session().on(/*...*/).on(/*...*/).startLeader();
```

<hr />

> <a name="log">SurflySession SurflySession.log( entry )</a>

log message to the Audit log (available in Surfly Dashboard after session ends). `entry` must be a plain string.

<hr />

> <a name="send-message">SurflySession.sendMessage( message, targetOrigin )</a>

This function is useful when you need to establish a communication channel between your JS code on the original page, and its proxified version inside the session.

It is available on both sides, and works in symmetric way: it will trigger a `message` event on the other side of the channel (see [Events](session-events.md) section).

`message` argument must be a plain JSON-serializable object.
`targetOrigin`should be set to the [origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) of the expected recipient. If set to `"*"`, message will be delivered regardless of the recipient's origin.

<hr />

> <a name="give-control">SurflySession.giveControl( clientIndex )</a>

Switch control to the user with specified `clientIndex`. `clientIndex` is always 0 for the leader and 1 or more for followers.

See also [Control options](widget_options.md#control-options)

<hr />

> <a name="request-control">SurflySession.requestControl()</a>

Request control from the session leader. This call will be silently ignored if the user is already in control, if she is a leader, or if one of `agent_can_request_control` and `allow_control_switching` options is disabled.

<hr />

> <a name="relocate">SurflySession.relocate( newUrl )</a>

_(not available inside a session)_

Navigate current tab to `newUrl`

<hr />

> <a name="set-drawing-settings">drawingSettings SurflySession.setDrawingSettings( [drawingSettings] )</a>

_(not available inside a session)_

get or set drawing settings. Example:
```javascript
session.drawingSettings({mode: 'permanent', color: '#ff0000'});
```

<hr />

> <a name="started">Boolean SurflySession.started</a>

_(not available inside a session)_

boolean, set to true if the session window is opened

<hr />

> <a name="leader-link">String SurflySession.leaderLink</a>

_(not available inside a session)_

contains a leader link. This is a URL that `SurflySession.startLeader()` opens. It can only be opened in one browser at a time.

<hr />

> <a name="follower-link">String SurflySession.followerLink</a>

_(not available inside a session)_

contains a URL that can be used for joining the session. This is a URL that `SurflySession.startFollower()` opens.

<hr />

> <a name="pin">Number SurflySession.pin</a>

contains a 4-digit PIN code that can be used to join the session. This becomes available only after the session is started (either manually by `.startLeader()` call, or automatically by Surfly Button).

<hr />

> <a name="node">HTMLIFrameElement SurflySession.node</a>

_(not available inside a session)_

if a session is opened in an iframe, it contains a reference to its DOM node

<hr />

> <a name="window">Window SurflySession.window</a>

_(not available inside a session)_

reference to the session window (either tab window or contentWindow of the iframe container)
