<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>

Surfly JS API dispatches a number of events that you can listen to and attach custom handler functions using [Surfly.on()](surfly-object-api.md#on) and [SurflySession.on()](surfly-session-api.md#on). Callback functions are provided with arguments, depending on the event type.

# Global Events{#global-events}

Global events can be registered with [Surfly.on()](surfly-object-api.md#on) method. 
Global event handlers will be provided with 2 arguments:
    - a reference to the global Surfly object
    - JSON object with event attributes

```javascript
// this will be triggered for all sessions, including the restored ones
Surfly.on('agent_status', function(api, event) {
  if (event.available) {
    console.log('There is an available support agent');
  } else {
    console.log('There is no support agents available at the moment');
  }
});

```

<a name="agent-status"></a>
> agent_status

triggered when a support agent availability changes. Parameters:

- `available` is set to `true` if a support agent has just become available, and `false` if all agents have become unavailable.


# Session Events{#session-events}

Session event handlers can be set with the [SurflySession.on()](surfly-session-api.md#on) method, or with the global [Surfly.on()](surfly-object-api.md#on) method. The latter will affect _all existing and future sessions_.

Callback functions should accept two arguments:
    - `SurflySession` instance that triggered the event
    -  JSON object with event attributes

```javascript
// this will be triggered for all sessions, including the restored ones
Surfly.on('session_ended', function(session) {
  console.log(session, 'has ended');
});

function startCobrowsing () {
  Surfly.session({docked_only: true})
    // these handlers will only be called for this particular session
    .on('session_started', function(session) {
      console.log(session, 'is fully initiated');
    })
    .on('viewer_joined', function(session, event) {
      console.log('there are', event.count, 'users in total');
    })
    .startLeader();
}
```

#### Available events{#available-events}

<a name="session-created"></a>
> session_created

triggered when a session is created (usually after `SurflySession.create()` call).

<hr />

<a name="session-queued"></a>
> session_queued

triggered when the session has been placed in the waiting queue, and the PIN code is generated

<hr />

<a name="session-started"></a>
> session_started

triggered when a session window has been loaded (usually after a call to `SurflySession.startLeader()`). Has no additional parameters.

<hr />

<a name="viewer-joined"></a>
> viewer_joined

triggered when a follower joins the session. Parameters:

- `count` updated number of users in the session
- `clientIndex` index of the user. Can be used in subsequent `SurflySession.giveControl()` calls
- `userData` data provided in `userData` argument of [`SurflySession.start*()`](surfly-session-objects.md) call

<hr />

<a name="viewer-left"></a>
> viewer_left

triggered when a follower leaves the session. Parameters:

- `count` updated number of users in the session
- `clientIndex` index of the user
- `userData` data provided in `userData` argument of [`SurflySession.start*()`](surfly-session-objects.md) call

<hr />

<a name="session-ended"></a>
> session_ended

triggered when the session has been properly finished (normally by `SurflySession.end()` call)

<hr />

<a name="message"></a>
> message

triggered when the message is received. Parameters:

- `data` message object sent from the other side
- `origin` the [origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) of the sender window

<hr />

<a name="user-activity"></a>
> user_activity

triggered when master clicks, moves mouse, or presses any key. Triggered once per second if activity is present.

<hr />

<a name="relocated"></a>
> relocated

_(not available inside a session)_

triggered when the current tab inside a Surfly session navigates to another page. Parameters:
- `url` absolute URL of new location

<hr />

<a name="error"></a>
>  error

_(not available inside a session)_

triggered on common errors. Parameters:
- `reason` error description. Currently may be one of the following:
  -  `"other_connection"` the leader_link was opened elsewhere. The new window/browser becomes the leader and the old leader is kicked out. It also happens if viewer_link was open twice in the same browser
  -  `"connect_failed"` The WebSocket connection to Surfly cannot be established

<hr />

<a name="control"></a>
> control

triggered when control over the session has been transferred. Parameters:
- `to` index of the client that now has the control. Always 0 for the leader, 1 or more for a viewer
- `userData` user data of the user who received the control
- `gained` set to true if control was given to the current user
