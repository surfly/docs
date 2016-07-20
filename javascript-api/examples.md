<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
# Examples
Here you can find some examples for common integration scenarios.

All the code snippets below assume that Surfly widget script is loaded, and the API is already initialized with the `Surfly.init()` function. For example:

```html
<head>
...
<script>
(function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
l.src='https://surfly.com/widget.js';y.parentNode.insertBefore(l,y);})
(window,document,'script','Surfly');
</script>
<script>
  window.addEventListener('DOMContentLoaded', function() {
    Surfly.init({widgetkey: '24d1414c71a94cbf9f205ed4fc4999b5'}, function(init) {
      if (init.success) {
        // use Surfly API here
      }
    });
  });
</script>
...
</head>
```

### Zero configuration
If you just want to add a Surfly button on your webpage, you need nothing more than
```javascript
Surfly.button();
```

You can also start a session right away, without a button:
```javascript
Surfly.session().startLeader();
```

### Custom button
We provide a convenient `Surfly.button()` function for rendering a nice default button. But it really doesn't do much, and it is very easy to make a custom button:

```html
<button class="my-custom-button">Start cobrowsing!</button>

<script>
  var myBut = document.querySelector('.my-custom-button');
  
  if (Surfly.currentSession) {
    // inside the session, just hide the button element
    myBut.style.display = 'block';
  } else {
    // outside the cobrowsing session, button click will start a session
    myBut.addEventListener('click', function() {
      Surfly.session().startLeader();
    });

    // you can use Surfly.isAgentAvailable() to hide the button
    // when there is no support agent available
    setInterval(function(){
      if (Surfly.agentAvailable) {
        myBut.style.display = 'block';
      } else {
        myBut.style.display = 'none';
      }
    }, 10000);
  }
</script>
```

### Custom session window
If you need full control over the session window (e.g. if you want to build a custom UI on top of cobrowsing frame), you can use the `iframeSelector` argument of `SurflySession.startLeader()` / `SurflySession.startFollower()` functions to pass your own window container:
```html
<iframe class="my-custom-cobrowsing-window"></iframe>
<script>
Surfly.session().startLeader('.my-custom-cobrowsing-window');
</script>
```

### Custom queue management
Surfly comes with a basic Support queue functionality in the web dashboard. However, you could easily make your own implementation based on session events.

```javascript
Surfly.session({hide_until_agent_joins: true})
  .on('session_started', function(session) {
    // at this moment, cobrowsing window has been opened.
    // User doesn't see it because `hide_until_agent_joins` is set to true

    // enqueueUser();
  })
  .on('viewer_joined', function(session, event) {
    // support agent has joined the session
    // session window appears for the user automatically

    // dequeueUser();
    // agentBusy();
  })
  .on('session_ended', function(session) {
    // cobrowsing session has ended

    // freeAgent();
  })
  .startLeader();
```

### Joining a session from an existing link

It is possible to create a session beforehand (with `.SurflySession.create()` or the REST API), and open a session later using the JS API. Note that you must open a leader link within 30 seconds after its creation, or it will expire.

On the leader side:
```html
<iframe id="my-custom-iframe"></iframe>
<script>
Surfly.session()
  .on('session_created', function(session) {
    console.log(session.followerLink);   // here you could send a join link to the other user
  })
  .startLeader('#my-custom-iframe');
</script>
```

On the follower side:
```html
<iframe id="my-custom-iframe"></iframe>
<script>
// followerLink is received from the session creator
Surfly.session(null, followerLink).startFollower('#my-custom-iframe');
</script>
```


### Seamless social cobrowsing
Let's say we have a web shop, and we want to add a functionality of "shopping with a friend". In this case we probably want to enable session continuation and remove restrictions from followers:

```javascript
Surfly.button({
  cookie_transfer_enabled: true,
  agent_can_request_control: true,
  agent_can_take_control: true,
  agent_can_end_session: true,
  block_until_agent_joins: false,
  splash: true
});
```

### Communication with the cobrowsing window
While the Surfly session is active, it is possible to exchange messages between the original page and the page inside the session. You will need the Surfly widget to be loaded on both pages. The `targetOrigin` and `srcOrigin` parameters allow you to authenticate the other party, and protect the messages from being read or faked by unauthorized scripts:
```javascript
Surfly.session()
  .on('session_started', function(session) {
    session.sendMessage({foo: 'bar'}, window.location.origin);
  })
  .on('message', function(session, event) {
    if (window.location.origin === event.origin) {
      console.log('page from the session says:', event.data);
    } else {
      console.log('got message from', event.origin, event.data);
    }
  }).startLeader();
```

### Custom styles
For many visual customizations, overriding default CSS styles is enough:
```html
<style>
/* make a session window look like a popup */
.surfly-window {
  height: 70%;
  width: 70%
}

/* change font of the button */
.surfly-button {
  font-family: Geneva, Arial, Helvetica, sans-serif
}
</style>

<script>
Surfly.button().show();
</script>
```

### Service code button

Should you choose the "service code" flow, you can use the `hide_until_agent_joins` setting to delay a session window from opening.

```html
<button id="mybutton">Get service code</button>
<script>
var myBut = document.getElementById('mybutton');
myBut.addEventListener('click', function() {
  Surfly.session({hide_until_agent_joins: true})
    .on('session_started', function(sess) {
      myBut.value = sess.pin;
      myBut.disabled = true;
    })
    .startLeader();
});
</script>
```