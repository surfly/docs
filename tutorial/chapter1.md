<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>

# Basic Integration

<a name="website"></a>
#### Cake shop website

Our example application features a bespoke cake shop, specialising in personalized cakes. 
Here is a screenshot of the home page before we integrate Surfly:

![website](http://i.imgur.com/zD0dd03.jpg)

As you can see, it's a standard website with different pages and possible actions. 
We are now going to integrate Surfly into our website, selecting the aspects of Surfly's functionality that best suit our needs.


<a name="integrate"></a>
#### Adding a Surfly button{#integrate}

As you can see below, after adding the widget code to our website, we see a red 'get live help' button. This button is shown when an agent is logged in, and, when clicked, allows us to start a session. Surfly works straight away: we can instantly start a session and receive calls without any further configuration required. 

``` javascript
<script>
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init({widgetkey:'**your api key**'}, function(init) {
    if (init.success) {
      // use Surfly API here
      Surfly.button();
	}
   });
 });
</script>
```
<div align="center">
  <img src="http://i.imgur.com/AhyWO6b.png">
</div> 
<br>
When a client clicks on the red 'get live help' button, they are queue'd until an agent joins the session. The agent will be able to see the list of queue'd users in the Queue panel on the Surfly admin page.

![user queue'd](http://i.imgur.com/zOJHW1X.jpg)


<a name="widget"></a>
#### Customise the button{#widget}

We will now change the support button so we can use our own theme color. You can do this by setting a few options in the Surfly widget code.
In our case, we only used a handful of custom options:

``` javascript
Surfly.button({chat_box_color: "#87cefa", videochat: false});
```

In the image below, you can see that the icons in the chat box are now in our website's theme color. We also chose to disable the video chat feature that is included by default, as we felt that it was not required. 

 ![widget options 2](http://i.imgur.com/b1bZihA.jpg)

The API has an [extensive list of widget options](../widget_options.md).

<a name="stealth_mode_popup"></a>
#### Display a popup to confirm session start{#stealth_mode_popup} 
If you would prefer not to use a button, you can enable stealth mode instead. This can be done by either changing the setting in the "options" panel, or by setting ``` {stealth_mode: true} ``` in the code snippet.

To display a confirmation popup, you can use the Javascript API to detect whether a session has started or not. We then display a confirm box. If the user presses cancel, the session ends, otherwise the user stays in the session.  

```javascript
var settings={widgetkey:'b84defc4621441ecae5eb10bdec1cb5a', splash: false, ui_off: true};
          window.addEventListener('DOMContentLoaded', function() {
            Surfly.init(settings, function(init) {
              if (init.success) {
                 // check if a session has started
                 if (Surfly.currentSession) {
                   // inform the user that they are in a session
                   // if they press "cancel" the session will end 
                   if (window.confirm("You started a Surfly session, press ok to continue") === false) {
                        Surfly.session().end();
                    }
                 }
              }
            });
          });

```

<a name="start_button"></a>
#### Create your own button{#start_button}

We'd like to create our own button to start a [co-browsing session](https://www.surfly.com/) so that we can customise it and control its behaviour more easily.

First, we need to remove Surfly's button and to only show our custom button when we're outside of a Surfly session:
``` javascript
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init({widgetkey:'**your api key**'}, function(init) {
    if (init.success) {
      if (Surfly.currentSession) {
        // inside the session, hide the get help section
        document.getElementById('get_help').style.visibility="hidden";
      }
	}
  });
});
```

In particular, we have chosen to use the image of a cake as a get help button for our customers:

![custom button](http://i.imgur.com/vZfILGS.png)


<a name="landing"></a>
#### Build your own landing page{#landing}

When a visitor initiates a session they are queue'd and, by default, have to wait for an agent to take the call before they can navigate within the session. The screen is blocked, and a red banner appears at the top of the screen with their queue pin. In our example application, the page that the user starts a session from is the home page, and consequently, this is the page that gets blocked. We would prefer to have our own custom landing page, where we can tell our customers that they are in the queue, and that an agent will be with them soon. 

The flow will be as follows; the user clicks on the support button and is shown a page with their unique pin code, and information about the session. When an agent joins them, the user is redirected to the home page.

In order to use such a page, we first remove the red banner blocking the session by setting the 'block_until_agent_joins' option to 'false' in the settings options:
``` javascript
var settings={widgetkey:'**your api key**', hidden: true, block_until_agent_joins: false};
```
Next, we add the snippet code to our landing page (since it will be the page from which sessions start) and call Surfly.session().startLeader() so that a session will start automatically (as soon as the user is redirected to our landing page):

``` javascript
window.addEventListener('DOMContentLoaded', function() {
  Surfly.init(settings, function(init) {
    if (init.success) {
      Surfly.session().startLeader();
	}
  });
});
```
Then, we adapt our custom button (get_help_button in our example), which will redirect the user to our custom landing page:
``` html
<button class="my-custom-button" id="get_help_button" onclick="landing()"></button>
```
``` html
<script>
function landing(){
  window.location.href = '/landing_page';
}	  
</script>
```

Finally, we want to display the queue ID on the landing page when a session starts. This is so that the customer is aware that they're in the queue and, in some cases, so that they can communicate the ID to an agent that they were already in contact with (over the phone for example). The agent will then be able to find the customer on the queue page, and join their session.
To do this, we use the [REST API](https://www.surfly.com/cobrowsing-api/) to get information about the session, keeping only the data we're interested in:
``` javascript
<script>
// using the REST API to get information about the session
var request = new XMLHttpRequest();
request.open('GET', 'https://api.surfly-s1.com/v2/sessions/?api_key=**your api key**&active_session=true');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    if(window.__surfly){
      var body = this.responseText; 
      // we extract the queue_id from the string we get from the request
      var index = body.indexOf("queue_id");
      var id = body.substring(index+10, index+14);
      // we display this id on the button
      document.getElementById("id_button").innerHTML=id;
    }
  }
};

request.send();
</script>
```
![landing page](http://i.giphy.com/l0HlVOXW4bAmrbarS.gif)

We now have our own personalised landing page to greet our customers.


<a name="session"></a>
#### Field masking{#session}

When a client places an order during a session, we don't want the agent to be able to see their payment details. Therefore, we will mask some form data from the agent.

To enable [field masking](../introduction/integration_options.md/#field_masking) (the follower will not see the leader's input), add the 'surfly_private' attribute to fields containing sensitive information:
``` html
<span>Card Number</span>
<input type="text" size="20" data-stripe="number" surfly_private>
```
In our example, we will use field masking on the last three fields of our order form as they contain information about the client's card. As can be seen in the image, the agent only see crosses (x's) instead of the leader's input:

![field masking](http://i.imgur.com/lRIa8hf.jpg)


{% em color="#ffffe0" %}Please note: 
Whilst the leader can mask their data, and hide it from the followers, the followers cannot hide their data from the leader. {% endem %}

<a name="popup"></a>
#### End of session popup{#popup}

After the session ends, we will display a survey in a pop-up window. This is a useful way of getting feedback from the session. 

We use the 'end_of_session_popup_url' option to point to the url of our survey page. Again, we add this as an option in settings:
``` javascript
var settings={widgetkey:'**your api key**', block_until_agent_joins: false, end_of_session_popup_url: "https://example.com/survey"};
```

![survey](http://i.imgur.com/WpWxQMv.jpg)

{% em color="#ffffe0" %}Please note: 
You might need to set the 'hidden' option to 'false' for this option to work correctly.  {% endem %}


<a name="chat"></a>
##### Integrate an already existing chat solution{#chat}

Finally, we'd also like to be able to continue chatting with our clients in a Surfly session. In our application, we were using Zopim prior to integrating Surfly. 

First, we need to remove Surfly's default chat box by adding the 'docked_only' option to the session settings of the page we wish to add Zopim to:
``` javascript
var settings={widgetkey:'**your api key**', docked_only: true};
```
Then, we can simply add the Zopim snippet code the page and we'll be able to communicate with our clients inside and outside of a Surfly session without any disturbance when we enter/exit one:
``` html
<!-- Adding Zopim Live Chat -->
<script>
	if(!window.__surfly){
	    window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
	    d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
	    _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
	    $.src="//v2.zopim.com/?40l495kTPWFGA7JFrUDzK03KARqCPsNL";z.t=+new Date;$.
	    type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
	}
</script>
<!--End of Zopim Live Chat Script-->
```
We added a condition in the beginning of the script to make sure that a second Zopim chat window doesn't open when a Surfly session starts.
