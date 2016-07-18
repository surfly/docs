![logo](../images/logosmall.png)

#Advanced Integration
 

<a name="receipt"></a>
#### Session continuation

Finally, we want to show the customer their receipt. Therefore, we have to make sure that their order information will be passed on, even if the client ends the session before getting their receipt. In order to do so, we can use soft [session continuation](../widget_options/widget_options.md/#session_continuation).

We need to add the snippet code to all the pages we wish to transfer cookies from. We also have to set two cookie options to ensure session continuation (including on the landing page): 
``` javascript
<script type="text/javascript">(function(){window['_surfly_settings']=window['_surfly_settings']||{
widgetkey:"**your api key**",
hidden: true,
cookie_transfer_enabled: true,
cookie_transfer_proxying: false
};
var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src="https://surfly.com/static/js/widget.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n); })();</script>
```
After that, we need to set the cookies when we submit the form. In our example, we chose to only store the name, email and address of the client:
``` javascript
document.getElementById("order").submit();
var get_name = document.getElementById("name").value;
var get_email = document.getElementById("email").value;
var get_address = document.getElementById("address").value;
document.cookie = 'order: name='+get_name+',email='+get_email+',address='+get_address;
```
Finally, we have to get the cookies and display the retrieved data (parsed according to the syntax previously used when we set the cookies):
``` javascript
var cookie = document.cookie;
var index_order = cookie.indexOf("order");
cookie = cookie.substring(index_order, cookie.length);
var info = cookie.split(",");
```
In the gif below, you can see that the order details are available even if the session ends before the client get their receipt:

![receipt](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/receipt.gif)


<a name="blacklist"></a>
##### Blacklisting

We quickly realised that visitors shouldn't be allowed to access our baking shop page while they're in a Surfly session as it's a separate activity, and the agents working for our cake shop aren't necessarily qualified to guide our customers through our baking shop.

In order to restrict access to this page (in our case, its path is '/about'), we can use the [blacklist](../widget_options/widget_options.md/#restrictions) option:
``` javascript
blacklist: JSON.stringify([{"pattern": ".*/about.*", "redirect": "https://example.com/#restricted"}]),
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

![blacklist](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/blacklist.gif)


<a name="metadata"></a>
##### Queue metadata

We'd like to be able to give our repeat customers a more personal experience. More specifically, we want to retrieve their login details and pass them on as metadata in the queue so that, for instance, our agents can greet them by name.

Firstly, we need to store their information when they log in (in 'metaName' and 'metaEmail') and then we can pass this data by using the ['QUEUE_METADATA_CALLBACK' option](../widget_options/widget_options.md/#queue_metadata_callback):
``` javascript
QUEUE_METADATA_CALLBACK: new Function('return {"name": '+sessionStorage.getItem('metaName')+',"email": '+sessionStorage.getItem('metaEmail')+'}'),
```

As can be seen below, the agents can directly see this information from the 'Queue' panel:

![metadata](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/metadata.gif)

<a name="remove-ui"></a>
### Remove the UI

Finally, we wanted to completely strip everything down to co-browsing. By default, Surfly provides more tools and features than our example application needs. In fact, we're only interested in the co-browsing functionality and, ideally, we wish for Surfly to be completly invisible on our website.

Fortunately, there's an option which removes the Surfly user interface (UI) and therefore allows us to use our own custom elements to control the appearance and feel of the sessions:
``` javascript
ui_off: true, // make Surfly invisible
```


<a name="exit_button"></a>
##### Create your own exit button

We already have our own start button and landing page, but now that we have removed the UI, we can't exit a session or use the chat. It's up to us to choose which functionality we want to add to our website and customise the way it will look.

In our example, we chose to create our own exit session button and add it to all the necessary pages. 
First, we have to make sure that the page we are adding the button to contains the Surfly widget and then we can add our custom button:
``` html
<button class="button" id="exit_button" style="visibility:hidden" onclick="exitSession()">Exit session</button>
```
Considering that it's an exit button, we don't want it to be shown when the customer isn't in a session.  We can easily make sure that the exit button is visible only when there's an on-going Surfly session (in a similar manner, we can also control the behaviour of the 'get help' button on the home page):
``` html
<script>
   if(window.__surfly){
	document.getElementById('exit_button').style.visibility="visible";
	document.getElementById('get_help').style.visibility="hidden";
   } else {
	document.getElementById('exit_button').style.visibility="hidden";
	document.getElementById('get_help').style.visibility="visible";
   }
</script>
```
Finally, we define the action triggered by the button, in this case, ending a Surfly session. To do so, we can once again use the REST API. The first request allows us to retrieve the session ID (which we store so that it's accessible from all the pages):
``` html
<script>
// get session ID
var request = new XMLHttpRequest();
request.open('GET', 'https://api.surfly.com/v2/sessions/?api_key=**your api key**&active_session=true');
request.onreadystatechange = function () {
	if (this.readyState === 4) {
		if(window.__surfly){
			var body = this.responseText;
			var index = body.indexOf("session_id");
			var index_end = body.indexOf("agent_id");
			var id = body.substring(index+13, index_end-3);
			sessionStorage.setItem("session_id", id);
		}
	}
};
request.send();	
</script>
```
Once we've stored the session ID, we can use a second request which will use this information to end the current session:
``` html
<script>
    // end session
    function exitSession(){
	var request_end = new XMLHttpRequest();
	request_end.open('DELETE', 'https://api.surfly.com/v2/sessions/'+sessionStorage.getItem("session_id")+'/?api_key=**your api key**');
	request_end.onreadystatechange = function () {
  		if (this.readyState === 4) {
			var body = this.responseText;
			var index = body.indexOf("response");
			// make sure that the session ended
			var success = body.substring(index+11, body.length-2);
			if(success==="Session has been ended successfully"){
				// end the session
				Surfly.endSession('https://example.com');
			}
 		}
	};
	request_end.send();
  }
  </script>
```

![exit button](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s10.png)

| Please note: |
| ------------- | 
| Considering how our website is built, there's a unique 'get help' button which means that our customers can only start a session from the home page (by clicking a button which redirects them to the landing page). However, [stealth mode](introduction/integration.md/#stealth_mode) is activated by default on all the pages containing the Surfly widget and allows to start a session instantly by pressing Ctrl + Enter. Stealth mode can also be disabled, if you prefer.  | 


<a name="chat"></a>
##### Integrate an already existing chat solution

Finally, we'd also like to be able to continue chatting with our clients in a Surfly session. In our application, we were using Zopim prior to integrating Surfly. We can simply add the Zopim snippet code to all the pages of our website and we will be able to communicate with our clients inside and outside of a Surfly session without any disturbance when we enter/exit one:
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


<a name="small_button"></a>
##### Adding a discrete button 

Adding Zopim to our website has made text chat the primary method of communication. Therefore, we no longer want our customers to start a Surfly session themselves, but rather that an agent directs them to one.  We decided to remove the landing page, and to add a smaller icon to the footer of our webpage. If necessary, the agent can direct the user to start a session by clicking on the small cake icon. 

![cake icon](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/cake_icon.png)

As you can see from the code below, by adding the #surflystart anchor, we ensure that a Surfly session starts when this icon is clicked:

``` javascript

<p id="idP"><a href="#surflystart"><img src="../static/cakeicon.png" id="showId"></a></p>

```

We then retrieve the queue ID and display it to the user:


``` javascript
        if(window.__surfly){
        // first check if a session has started (meaning that the icon has been clicked on)
            var request = new XMLHttpRequest();
            request.open('GET', 'https://api.surfly.com/v2/sessions/?api_key=**your api key**&active_session=true');
            request.onreadystatechange = function () {
              if (this.readyState === 4) {
              var body = this.responseText; 
              // we extract the queue_id from the string we get from the request
              var index = body.indexOf("queue_id");
              var id = body.substring(index+10, index+14);
                      // we hide the cake icon
                      document.getElementById("showId").style.visibility='hidden';  
                      var textId = document.createTextNode(id);
                      // replace the cake icon with the session id number
                      document.getElementById("idP").appendChild(textId);
              } 
       	 }
            request.send();
        };
```

The user tells the agent this ID, and the agent can use it to identify the correct customer in the queue. The co-browsing session will start, and they can continue talking via Zopim. 

![Retrieved session id](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/session_id_number.png)