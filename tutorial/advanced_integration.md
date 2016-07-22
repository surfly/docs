<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>

#Advanced Integration


<a name="receipt"></a>
#### Enabling session continuation

If we want to make sure that the transition into a Surfly session is a smooth as possible we can enable [session continuation](../widget_options/widget_options.md/#session_continuation). This will allow the session state to be synchronized so that session data (for example, a user's cart or login status) will be maintained even when the session ends.

There are two types of session continuations:
 - [full session continuation](../widget_options/widget_options.md/#full_session): allows the transfer of all cookies, including http-only cookies
 - [soft session continuation](../widget_options/widget_options.md#soft_session): excludes http only cookies

We will use soft session continuation. First, we need to add the snippet code to all the pages we wish to transfer cookies from. We also have to set two cookie options to ensure soft session continuation (including on the landing page): 
``` javascript
<script>
(function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
l.src='https://x.zok.pw/new-widget-s1.js';y.parentNode.insertBefore(l,y);})
(window,document,'script','Surfly');
</script>

<script>
var settings={widgetkey:'**your api key**', cookie_transfer_enabled: true, cookie_transfer_proxying: false}
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init(settings, function(init) {
    if (init.success) {
      // use Surfly API here
	}
   });
 });
</script>
```


<a name="blacklist"></a>
##### Configuring the blacklist{#blacklist}

We want to restrict access from cetain pages during the session.

In order to restrict access to this page (in our case, its path is '/about'), we can use the [blacklist](../widget_options/widget_options.md/#restrictions) option:
``` javascript
var settings={widgetkey:'**your api key**', block_until_agent_joins: false, end_of_session_popup_url: "https://example.com/survey", cookie_transfer_enabled: true, cookie_transfer_proxying: false, blacklist: JSON.stringify([{"pattern": ".*/about.*", "redirect": "https://example.com/#restricted"}])};
```
We also decided to specify an optional redirect link so that we can design our own restricted page. More specifically, we chose to redirect the client to the home page with a #restricted hash. We can then add a script to implement the desired behaviour: 
``` html
<script>
if (window.location.hash == "#restricted"){
  window.location.href = '/restricted';
}
</script>
```
In our example, we decided to redirect the user to our custom restricted page which informs them that this page is restricted:




<a name="metadata"></a>
##### Queue metadata{#metadata}

We want to retrieve the login details of our customers and pass them on as metadata in the queue so that, for instance, our agents can greet them by name.

Firstly, we need to store their information when they log in (in 'metaName' and 'metaEmail') and then we can pass it to Surfly.session().startLeader() function :
``` javascript
<script>
var metadata = {"name": sessionStorage.getItem('metaName'),"email": sessionStorage.getItem('metaEmail')};

var settings={widgetkey:'**your api key**', block_until_agent_joins: false, end_of_session_popup_url: "https://example.com/survey", cookie_transfer_enabled: true, cookie_transfer_proxying: false, blacklist: JSON.stringify([{"pattern": ".*/about.*", "redirect": "https://example.com/#restricted"}])};
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init(settings, function(init) {
    if (init.success) {
      // use Surfly API here
      Surfly.session().startLeader(null, metadata);
	}
  });
});
</script>
```

As can be seen below, the agents can directly see this information from the 'Queue' panel:


<a name="control_appearance"></a>
##### Change appearance based on who is in control{#control_appearance}

You can change the way the website behaves depending on who is in control. This is especially useful with regards to payment forms when you only want to allow the client to confirm the order. 

To do this, you can use the .on() function of the SurflySession API to set an event handle. More specifically, we catch the 'control' event which is fired every time the control is switched within a Surfly session. Then, detect who is in control (by checking the 'to' parameter of the event to see who is in control) , and set the elements you wish to enable/ disable. 

In our example below, we disable the 'Order' button when the agent is in control, only allowing the leader to confirm the payment.

```javascript
<script>
var settings={widgetkey:'**your api key**', cookie_transfer_enabled: true, cookie_transfer_proxying: false};
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init(settings, function(init) {
    if (init.success) {
      // use Surfly API here
      Surfly.session()
      .on('control', function(session, event) {
        var element = document.getElementById("order_button");
        // when the leader is in control then the 'Order' button is clickable otherwise, it is disabled
    	if (event.to==0) {
          element.disabled = false;
    	} else {
          element.disabled = true;
    	}
      })
	}
  });
});
</script>
```


<a name="remove-ui"></a>
### Customize Surfly's look and feel{#remove-ui}

Finally, we wanted to completely strip everything down to [co-browsing](https://www.surfly.com/). By default, Surfly provides more tools and features than our example application needs. With the 'docked_only' options we've already removed a few features we don't need but we'd like to go even further. In fact, we're only interested in the co-browsing functionality and, ideally, we wish for Surfly to be completly invisible on our website.

Fortunately, there's an option which removes the Surfly user interface (UI) and therefore allows us to use our own custom elements to control the appearance and feel of the sessions:
``` javascript
ui_off: true // make Surfly invisible
```
``` javascript
var settings={widgetkey:'**your api key**', block_until_agent_joins: false, end_of_session_popup_url: "https://example.com/survey", cookie_transfer_enabled: true, cookie_transfer_proxying: false, blacklist: JSON.stringify([{"pattern": ".*/about.*", "redirect": "https://example.com/#restricted"}]), ui_off: true};
```


<a name="exit_button"></a>
##### Create your own exit button{#exit_button}

We already have our own start button and landing page, but now that we have removed the UI, we can't exit a session or use the chat. It's up to us to choose which functionality we want to add to our website and customise the way it will look.

In our example, we chose to create our own exit session button and add it to all the necessary pages. 
First, we have to make sure that the page we are adding the button to contains the snippet code and then we can add our custom button:
``` html
<button class="button" id="exit_button" style="visibility:hidden" onclick="exitSession()">Exit session</button>
```
Considering that it's an exit button, we don't want it to be shown when the customer isn't in a session.  We can easily make sure that the exit button is visible only when there's an on-going Surfly session:
``` javascript
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init({widgetkey:'**your api key**'}, function(init) {
    if (init.success) {
      // use Surfly API here
      // inside the session, hide the get help button 
      document.getElementById('get_help').style.visibility="hidden";
      // inside the session, show exit button
      document.getElementById('exit_button').style.visibility="visible";
	}
  });
});
```
Finally, we define the action triggered by the button, in this case, ending the current Surfly session:
``` html
<script>
function exitSession(){
  Surfly.currentSession.end('https://example.com');
}
</script>
```


![exit button](http://i.imgur.com/BhlkW24.png)

{% em color="#ffffe0" %}Please note: 
Considering how our website is built, there's a unique 'get help' button which means that our customers can only start a session from the home page (by clicking a button which redirects them to the landing page). However, [stealth mode](../introduction/integration.md/#stealth_mode) is activated by default on all the pages containing the Surfly widget and allows to start a session instantly by pressing CTRL + ENTER. Stealth mode can also be disabled, if you prefer.  {% endem %}


<a name="small_button"></a>
##### Session ID approach{#small_button}

Adding Zopim to our website has made text chat the primary method of communication. Therefore, we no longer want our customers to start a Surfly session themselves, but rather that an agent directs them to one.  We decided to remove the landing page, and to add a smaller cake icon to the footer of our webpage. 

The flow of our website has now completely changed. Instead of people initiating a session and waiting for an agent to join them, visitors will first use Zopim when they need help. If, during the conversation, the agent decides a Surfly session is required, they can direct the user to the bottom of the webpage to click on the cake.

When the cake icon is clicked, the user will be added to the queue, and the session id will be shown in place of the cake. The user can pass that number on to the agent, who will then be able to use the id to join the correct session in the queue.  There is a seamless transition from the text chat into the co-browsing session, reducing the potential waiting time in the queue. 



As you can see from the code below, by adding the #surflystart anchor, we ensure that a Surfly session starts when this icon is clicked:

``` javascript

<p id="idP"><a href="#surflystart"><img src="../static/cakeicon.png" id="showId"></a></p>

```

We then use the REST API to retrieve the queue ID and store it:


``` javascript
if(window.__surfly){
// first check if a session has started (meaning that the icon has been clicked on)
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.surfly-s1.com/v2/sessions/?api_key=**your api key**&active_session=true');
  
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var body = this.responseText; 
      // we extract the queue_id from the string we get from the request
      var index = body.indexOf("queue_id");
      var id = body.substring(index+10, index+14);
      sessionStorage.setItem("queue_id", id);
    } 
  }
  request.send();
};
```
Finally, we control the button's behaviour depending on whether or not we're in a Surfly session:
``` javascript
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init({widgetkey:'**your api key**'}, function(init) {
    if (init.success) {
      // inside the session, hide the get help button 
      document.getElementById('get_help').style.visibility="hidden";
      // inside the session, show exit button
      document.getElementById('exit_button').style.visibility="visible";
      
      // behaviour of small button at the bottom of the page
      document.getElementById("showId").style.visibility='hidden';  
      var textId = document.createTextNode(sessionStorage.getItem("queue_id"));
      // replace the cake icon with the session id number
      document.getElementById("idP").appendChild(textId);
	}
  });
});
      
```
The user tells the agent this ID, and the agent can use it to identify the correct customer in the queue. The co-browsing session will start, and they can continue talking via Zopim. 

