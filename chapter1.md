![logo](images/logosmall.png)

# Basic Integration

####The chrome extension

If you do not want to immediately add the code to your website, but still want to take a look at how Surfly's integration can work for you, use our Chrome extension. This extension will add our Javascript snippet code to any website you are currently browsing, it will also give you all the options to easily configure the snippet and try out various settings. 

In order to install the extension do the following: 
 - Download the Chrome Extension
 - Open ChromeGo to Tools / Preferences / Settings (depends on your OS)
 - Go to ‘Extensions’
 - Click on ‘Load unpacked extension’
 - Point it to the downloaded file


<a name="website"></a>
#### Cake shop website

Our example application features a bespoke cake shop, specialising in personalized cakes. The shop prides themselves on their customer service, meaning that the co-browsing feature Surfly provides is an ideal addition to their website, as it can dramatically improve online communication. 
Here is a screenshot of the home page before we integrate Surfly:

![website](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s1.png)

As you can see, it is a standard website with different pages and possible actions. 
We are now going to integrate Surfly into our website, selecting the aspects of Surfly's functionality that best suit our needs.


<a name="integrate"></a>
#### Integrate Surfly 

First, add the Surfly code snippet to your website's source code. To do this, log into your surfly.com account and navigate to the 'Settings' panel. In the 'Integration' tab, you can find the snippet code that you need to copy and paste into the source code of your website.
It should look something like the following:
``` javascript
<script type="text/javascript">(function(){window['_surfly_settings']=window['_surfly_settings']||{
widgetkey:"**your api key**",
/*
add your custom options here
*/
};
var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src="https://surfly.com/static/js/widget.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n); })();</script>
```

You should also specify the domain name of your website in the integrations panel so that you can accept requests made from it.


As you can see below, after adding the widget code to our website, we see a red "get live help" button.  This button is shown when an agent is logged in, and, when clicked, allows us to start a session. Surfly works straight away: we can instantly start a session and receive calls without any further configuration required. 

![Surfly widget](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s2.png)

When a client clicks on the red "get live help" button, the client is queue'd until an agent joins the session. The agent will be able to see the list of queue'd users in the Queue panel on the Surfly admin page.

![user queue'd](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s3.png)


<a name="widget"></a>
#### Widget options

The default red Surfly button doesn't match our website design, so we'd prefer to use our own theme color. You can do this by setting a few options in the Surfly widget code.
In our case, we simply used a few custom options:
``` javascript
drawing_mode: "permanent", // change drawing mode so that the drawings last
chat_box_color: "#87cefa", // change color of chat box so that it suits our website's theme
theme_font_background: "#87cefa", // change color of button 
videochat: false // remove videochat feature (not needed)
```
In the images below, you can see that the button and the chat box are now in our website's theme color. We also chose to disable the video chat feature that is included by default, as we felt that it was not required. Finally, we decided to make the drawings permanent to facilitate communication.

![widget options 1](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s4.png) ![widget options 2](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s5.png)

The API has an [extensive list of widget options](https://www.surfly.com/cobrowsing-api/).


<a name="start_button"></a>
#### Create your own button

Even though Surfly is now customised to our needs and preferences, we'd like to create our own button to start a co-browsing session so that we can customise it and control its behaviour more easily.

First, we need to hide the default button, as we'll be using our own. To do this, set the 'hidden' option to 'true':
``` javascript
hidden: true, // hide Surfly's default button
```
Then, we add the #surflystart anchor to our custom button (get_help_button in our example):
``` javascript
<a href="#surflystart"> <button class="button" id="get_help_button"></button></a>
```
In particular, we have chosen to use the image of a cake as a get help button for our customers:

![custom button](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s6-zoom.png)


<a name="landing"></a>
#### Build your own landing page

When a visitor initiates a session they are queue'd and, by default, have to wait for an agent to take the call before they can navigate within the session. The screen is blocked, and a red banner appears at the top of the screen with their queue pin. In our example application, the page that the user starts a session from is the home page, and consequently, this is the page that gets blocked. We would prefer to have our own custom landing page, where we can tell our customers that they are in the queue, and that an agent will be with them soon. 

In order to use such a page, we first remove the red banner blocking the session:
``` javascript
block_until_agent_joins: false, // remove red banner
```
Next, we move the snippet code to our landing page (since it will be the page from which sessions start) and add the auto start option so that a session will start automatically (as soon as the user is redirected to our landing page):
``` javascript
auto_start: true, // session will start automatically
```
We now want our button to redirect the user to the landing page. We simply replace the #surflystart anchor with an onclick function that does just that:
``` javascript
<button class="button" id="get_help_button" onclick="landing()"></button>

<script>
    // the get help button redirects the user to the landing page (if they're not already in a session)
    function landing(){
	if(!window.__surfly){
		window.location.href = '/landing_page';
	}
    }
</script>
```
Finally, we want to display the queue ID on the landing page when a session starts. This is so that the customer is aware that they're in the queue and, in some cases, so that they can communicate the ID to an agent that they were already in contact with (over the phone for example). The agent will then be able to find the customer on the queue page, and join their session. To do this, we use the REST API to get information about the session, keeping only the data we are interested in (more information on how to use the REST API can be found in our [API](https://www.surfly.com/cobrowsing-api/) ):
``` javascript
<script>
 	// using the REST API to get information about the session
	var request = new XMLHttpRequest();

	request.open('GET', 'https://api.surfly.com/v2/sessions/?api_key=**your api key**&active_session=true');

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
![landing page](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/landing_page_flow.gif)

We now have our own personalised landing page to greet our customers.


<a name="session"></a>
#### Session behaviour

We have integrated Surfly to our satisfaction, but there are other use cases that we still haven't covered. In particular, when a client places an order during a session, we don't want the agent to be able to see their payment details or to click the 'Order' button for them. 
You can do this by using some of the built-in options provided with Surfly.

To enable field masking (the follower will not see the leader's input), add the 'surfly_private' attribute to fields containing sensitive information:
``` javascript
<span>Card Number</span>
<input type="text" size="20" data-stripe="number" surfly_private>
```
In our example, we will use field masking on the last three fields of our order form as they contain information about the client's card. As can be seen in the image, the agent only see crosses instead of the leader's input:

![field masking](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s8.png)

As for the 'Order' button, we can easily add an eventListener in order to catch the 'surflycontrolchange' event which is fired every time the control is switched within a Surfly session. Then, we check whether or not the leader is in control and disable the order button if they are not.
``` javascript
<script>
// when the leader is in control then the 'Order' button is clickable otherwise, it is disabled
window.addEventListener('surflycontrolchange', function (event) {
    var element = document.getElementById("order_button");
    if (event.leaderHasControl) {
        element.disabled = false;
    } else {
        element.disabled = true;
    }
});
</script>
```


<a name="popup"></a>
#### End of session popup

Since customer service is very important to us, we'd also like to be able to ask for feedback at the end of a session so that we can improve our website and offer the smoothest co-browsing experience to our clients.
We use the 'end_of_session_popup_url' option to point to the url of our survey page:
``` javascript
end_of_session_popup_url: "https://example.com/survey",
```
| Please note: | 
| ------------- |
| You might need to set the 'hidden' option to 'false' for this option to work correctly.| 



![survey](https://raw.githubusercontent.com/MathildeJ/Fantasy_Bakes/master/static/s9.png)
