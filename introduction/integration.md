<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
# Adding Surfly to your Website 

<a name="add_surfly"></a>


If you integrate Surfly with your website, visitors will be able to click the 'get live help' button to request a session. They will then be queue'd until an agent (the person who receives the call) joins them. By default, the person who initiated the session is the leader and the agent who takes the call will be the follower, however you can choose to swap control at any time during the session.

To integrate Surfly, you need to add the Surfly code snippet into your website's source code. You can then use the [Javascript API](../javascript_api.md) or the 'options' panel from the admin page to customise the way the session looks and behaves. The options panel allows you to save your preferred options. If you do decide to use our JS API to set some options, this will take priority over the settings configured in the 'options' panel.


![options panel](../images/options-panel.jpg)

#### The Surfly Code Snippet

This can be found by clicking on the 'integration' panel in your account settings.
If you get a message telling you that you do not have the API key set up yet, click on 'Generate API'.

You should now be looking at:

![The integration page](https://raw.github.com/surfly/tutorial/master/screens/snippet_initial_screen.png)

In the 'domain names' section on the integration page, you need to specify the domain of your website. For instance, if your website is hosted on "https://example.com", simply add "example.com" to the domain name list. This will allow Surfly to accept the requests coming from your domain.

Finally, copy the code snippet and add it to the source code of your website.

It should look something like the following:
``` javascript
<script>
(function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
l.src='https://surfly-s1.com/surfly.js';y.parentNode.insertBefore(l,y);})
(window,document,'script','Surfly');
</script>
```

You will also need to initialise the session

``` javascript
var settings = {
  widget_key: '**your key here**',
};
Surfly.init(settings, function(initResult) {
  if (initResult.success) {
    // display the default Surfly button
    Surfly.button();
  } else {
    // log an error
    console.log('Your browser lacks features required by Surfly');
  }
});
```

When you open your webpage, you should see a 'get live help' button at the bottom left of your screen. If a visitor clicks on this, they will be queue'd for support. You can answer this request via the Surfly admin panel.

**Please see the [integration guide](../the_surfly_tutorial.md) for a detailed step by step guide on how to integrate Surfly into your website.**

###### Responding to incoming requests

To accept an incoming request, log in to your Surfly account, and navigate to the 'Queue' panel. Here, you can see a list of the queue'd users, their location, and the time they have been waiting. To answer, simply press the 'take call' button. If your visitors are logged in on your website already, you can also display meta-data, such as the visitor's name in the queue, so that the agent greeting them knows who they are.

![The Queue panel](https://raw.github.com/surfly/tutorial/master/screens/queue_panel.png)

