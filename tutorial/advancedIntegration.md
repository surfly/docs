<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>

#Advanced Integration


<a name="receipt"></a>
#### Enabling session continuation

If we want to make sure that the transition into a Surfly session is as smooth as possible we can enable [session continuation](../widgetOptions/widgetOptions.md/#sessionContinuation). This will allow the session state to be synchronized so that session data (for example, a user's cart or login status) will be maintained even when the session ends.

There are two types of session continuations:
 - [full session continuation](../widgetOptions/widgetOptions.md/#fullSession): allows the transfer of all cookies, including http-only cookies
 - [soft session continuation](../widgetOptions/widgetOptions.md#softSession): excludes http only cookies

In our example, we will use soft session continuation. We need to add the snippet code to all the pages we wish to transfer cookies from. We also have to set two cookie options to ensure soft session continuation (including on the landing page):

``` javascript
<script>
  (function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
  l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
  l.src='https://surfly.com/surfly.js';y.parentNode.insertBefore(l,y);})
  (window,document,'script','Surfly');

  var settings={
    widget_key:'**your widget key here**',
    cookie_transfer_enabled: true,
    cookie_transfer_proxying: false
  }

  Surfly.init(settings, function(init) {
  });

</script>
```
Once these options have been set, session continuation is ensured and, for instance, it is possible to use cookies to store information about an order placed from within a Surfly session.

![receipt](http://i.imgur.com/TAjpIOt.jpg)

<a name="blacklist"></a>
#### Configuring the blacklist{#blacklist}

We want to restrict access from certain pages during the session.

In order to restrict access to this specific page (in our case, its path is '/about'), we can add the [blacklist](../widgetOptions/widgetOptions.md/#restrictions) option to our settings list:
``` javascript
blacklist: JSON.stringify([{"pattern":".*/about.*","redirect":"https://example.com/restricted"}])};
```
As can be seen above, we chose to redirect the user to our custom restricted page which informs them that this page is restricted:

![restricted](http://i.imgur.com/FyDZtqK.jpg)


<a name="metadata"></a>
#### Queue metadata{#metadata}

We now want to retrieve the login details of our customers and pass them on as metadata in the queue so that, for instance, our agents can greet them by name.

In our example, we pass the name and email of the user to the ```Surfly.session().startLeader()``` function :
``` javascript
<script>
  var metadata = {"name": "RoseF","email": "rose@example.com"};

  var settings = {
    widget_key:'**your widget key here**',
    block_until_agent_joins: false,
    end_of_session_popup_url: "https://example.com/survey",
    cookie_transfer_enabled: true,
    cookie_transfer_proxying: false,
    blacklist: JSON.stringify([{"pattern": ".*/about.*", "redirect": "https://example.com/#restricted"}])
  };

  Surfly.init(settings, function(init) {
    if (init.success) {
      Surfly.session().startLeader(null, metadata);
    }
  });
</script>
```
{% em color="#ffffe0" %}Please note:
If the visitor to your website is logged in, the data passed as metadata could also be retrieved from their account information. {% endem %}

As can be seen below, the agents can directly see this information from the 'Queue' panel:

![Queue panel](http://i.imgur.com/OLyMKD5.png)

<a name="controlAppearance"></a>
#### Change appearance based on who is in control{#controlAppearance}

You can change the way the website behaves depending on who is in control. This is especially useful with regards to payment forms when you only want to allow the client to confirm the order.

To do this, you can use the ```.on()``` function of the [SurflySession API](../javascript-api/surflysession_api.md#on) to set an event handler. More specifically, we catch the ```control``` event which is fired every time the control is switched within a Surfly session. Then, we detect who is in control (by checking the ```to``` parameter of the event), and set the elements we wish to enable/disable.

In our example below, we disable the 'Order' button when the agent is in control, only allowing the leader to confirm payment:

``` javascript
<script>
  var settings = {
    widget_key:'**your widget key here**',
    cookie_transfer_enabled: true,
    cookie_transfer_proxying: false
  };

  Surfly.init(settings, function(init) {
    if (init.success) {
      var sess;
      if(!Surfly.currentSession){
        sess = Surfly.session();
      }
      else {
        sess = Surfly.currentSession;
      }
      sess.on('control', function(session, event) {
        var element = document.getElementById("order_button");
        if (event.to==0) {
          element.disabled = false;
          element.style.backgroundColor = "#87cefa";
        }
        else {
          element.disabled = true;
          element.style.backgroundColor = "#e6fff2";
        }
      })
    }
  });
</script>
```

<a name="removeUi"></a>
### Customize Surfly's look and feel{#removeUi}

Finally, we wanted to completely strip everything down to [co-browsing](https://www.surfly.com/). By default, Surfly provides more tools and features than our example application needs. With the ```docked_only``` option we've already removed a few features we don't need but we'd like to go even further. In fact, we're only interested in the co-browsing functionality and, ideally, we wish for Surfly to be completly invisible on our website.

Fortunately, there's an option which removes the Surfly user interface (UI) and therefore allows us to use our own custom elements to control the appearance and feel of the sessions:

Add this option to your list of settings:
``` javascript
ui_off: true // make Surfly invisible
```

<a name="exitButton"></a>
#### Create your own exit button{#exitButton}

We already have our own start button and landing page, but now that we have removed the UI, we can't exit a session or use the chat. It's up to us to choose which functionality we want to add to our website and customize the way it will look.

In our example, we chose to create our own exit session button and add it to all the necessary pages.
Make sure that the page you are adding the button to contains the snippet code.

* First we add our custom button
* Considering that it's an exit button, we don't want it to be shown when the customer isn't in a session.  We can easily make sure that the exit button is visible only when there's an on-going Surfly session
* Finally, we define the action triggered by the button, in this case, a function that ends the Surfly session and redirects the user to a different page (this is of course optional).

``` javascript
<button class="button" id="exit_button" style="display: none" onclick="exitSession()">Exit session</button>

<script>
  Surfly.init(settings, function(init) {
    if (init.success) {
      if (Surfly.currentSession) {
        // inside the session, show exit button
        document.getElementById('exit_button').style.display="block";
      }
    }
  });

  function exitSession(){
    Surfly.currentSession.end('https://example.com');
  }
</script>
```

![exit button](http://i.imgur.com/BhlkW24.png)

{% em color="#ffffe0" %}Please note:
Considering how our website is built, there's a unique 'get help' button which means that our customers can only start a session from the home page (by clicking a button which redirects them to the landing page). However, [stealth mode](../introduction/integration.md/#stealthMode) is activated by default on all the pages containing the Surfly widget and allows to start a session instantly by pressing CTRL + ENTER. Stealth mode can also be disabled, if you prefer.  {% endem %}

<a name="smallButton"></a>
#### Session ID approach{#smallButton}

Adding Zopim to our website has made text chat the primary method of communication. Therefore, we no longer want our customers to start a Surfly session themselves, but rather that an agent directs them to one.  We decided to remove the landing page, and to add a smaller cake icon to the footer of our webpage.

The flow of our website has now completely changed. Instead of people initiating a session and waiting for an agent to join them, visitors will first use Zopim when they need help. If, during the conversation, the agent decides a Surfly session is required, they can direct the user to the bottom of the webpage to click on the cake.

When the cake icon is clicked, the user will be added to the queue, and the session id will be shown in place of the cake. The user can pass that number on to the agent, who will then be able to use the id to join the correct session in the queue.  That way, there is a seamless transition from the text chat into the co-browsing session, reducing the potential waiting time in the queue.

* First, we create a button that will start a session when clicked
* We then initialize the session
* In order to keep all the options we previously set in the landing page, we need to pass those settings to the Surfly.session() function.
* Finally, we use the [SurflySession API](../javascriptApi/surflysessionApi.md) to retrieve the pin and display it in place of the cake icon:

``` javascript
<button id="start-button" onclick="sessionStart()"><img id="id-cover" src="**our_cake_image**"></button>

<script type="text/javascript">
  Surfly.init({widget_key:'**your widget key here**'}, function(init) {
    if (init.success) {
      if (!Surfly.currentSession) {
        // Display start-button
        document.getElementById("start-button").style.display="block";

        function sessionStart() {
          var settings = {
            block_until_agent_joins: false,
            hide_until_agent_joins: true,
            end_of_session_popup_url: "https://example.com",
            docked_only: true,
            cookie_transfer_enabled: true,
            ui_off: true
          };

          Surfly.session(settings)
          .on('session_started', function(session, event) {
            // inside the session, show exit button
            document.getElementById('exit_button').style.display="block";
            // replace the cake image with the session-id
            document.getElementById("id-cover").style.display="none";
            var showId = document.getElementById("start-button");
            showId.style.display = "block";
            showId.textContent = session.pin;
          }).startLeader();
        }
      }
    }
  });
</script>
```

<div align="center">
  <img src="http://i.giphy.com/3o7TKq5AiyXl7tTPhu.gif">
</div>
<br>

The user tells the agent this ID, and the agent can use it to identify the correct customer in the queue. The co-browsing session will start, and they can continue talking via Zopim.

