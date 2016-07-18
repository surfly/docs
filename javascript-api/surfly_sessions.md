# Surfly Sessions

[SurflySession API](surflysession_objects.md)

SurflySession initialises a Surfly session. 
This allows you to initialize a cobrowsing session, open a new iframe/browser tab if necessary, and put the session in support queue.

[Session Events](session_events.md)

Once initialized, SurflySession dispatches a number of events which you can use to track the session status. You can set handlers with the `SurflySession.on()` method. Callback functions should accept two arguments:
    - `SurflySession` instance that triggered the event
    - JSON object with event attributes
