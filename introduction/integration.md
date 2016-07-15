# Integration {#add_surfly}

<a name="add_surfly"></a>

If you integrate Surfly with your website, visitors will be able to click the 'get live help' button to request a session. They will then be queue'd until an agent (the person who receives the call) joins them. By default, the person who initiated the session is the leader and the agent who takes the call will be the follower, however you can choose to swap control at any time during the session.

To integrate Surfly, you need to add the Surfly code snippet into your website's source code. The default parameters within the code snippet can be modified to allow for a seamless integration into your website.  The code snippet will allow you to customise the way the session looks and behaves. You can specify your options in either the code snippet itself, or in the 'options' panel from the admin page. The options panel allows you to save your preferred options without adapting the widget code. If you do decide to change the widget code, this takes priority over the settings in the options panel.

![options panel](../images/options-panel.jpg)

Please see the tutorial for a detailed step by step guide on how to integrate Surfly into your website. 

#### The Surfly Code Snippet

This can be found by clicking on the 'integration' panel in your account settings.
If you get a message telling you that you do not have the API key set up yet, click on 'Generate API'.

You should now be looking at:

![The integration page](https://raw.github.com/surfly/tutorial/master/screens/snippet_initial_screen.png)

In the 'domain names' section on the integration page, you need to specify the domain of your website. For instance, if your website is hosted on "https://example.com", simply add "example.com" to the domain name list.

Finally, copy the code snippet and add it to the source code of your website.

When you open your webpage, you should see a 'get live help' button at the bottom left of your screen. If a visitor clicks on this, they will be queue'd for support. You can answer this request via the Surfly admin panel.

**Please see the tutorial for a detailed step by step guide on how to integrate Surfly into your website.**

<a name="start_session"></a>
### Starting a session

 - [Button appearance](#<button_appearance>)
 - [Stealth mode](#<stealth_mode>)
 - [Customise your own button](#<surflystart_anchor>)
 - [Session ID](#<session_id>)
 - [Create an invite page](#<auto_start>)
 - [Integrate with existing chat solutions](#<integrate_chat>)

<a name="button_appearance"></a>
#### Button appearance {#button_appearance}

If you prefer, you can adapt the 'get live help' button that Surfly provides. The button's default appearance is red, with white text and sits to the bottom left of the screen. 

![default button appearance](https://raw.github.com/surfly/tutorial/master/screens/default-button.png)

You can adapt the button appearance by changing its position, colors and size. 

The button, by default, will only be shown if an agent is logged into the Surfly admin page. This can also be disabled, if you wish.

<a name="stealth_mode"></a>
#### Start a session in stealth mode {#stealth_mode}

If you do not wish to have a visual button or link on your webpage, then you can use stealth mode. This allows visitors to initiate a Surfly session simply by pressing CTRL+ENTER.  The visitor will then be queue'd, and the Surfly session will start as usual.

<a name="surflystart_anchor"></a>
#### Customise your own button {#surflystart_anchor}

If you want to create your own button, you can use the #surflystart anchor, which can be integrated into your website's source code. You can choose the text you wish to write onto the button, and it can be fully styled with css so that it compliments your website design.  As you can see in the image below, we chose to use the image of a cake as a button. If a visitor to the website clicks on it, it will lead them to a Surfly session.

![The end result](https://raw.github.com/surfly/tutorial/master/screens/cake-button.png)

<a name="session_id"></a>
#### The session ID approach {#session_id}

The session ID approach is especially useful if you are already in contact with a customer via the phone. If the customer needs help navigating a website, the agent can direct them to start a co-browsing session. 
You can use the REST API to access the session ID and display it. The user can then communicate this ID to the agent so that they will be able to join the session and help them.

Once the agent has the session ID, they can simply enter it into the start session panel on the Surfly admin page, and will immediately join the session.

![Start Surfly](https://raw.github.com/surfly/tutorial/master/screens/enter_session_id.png)

<a name="auto_start"></a>
#### Create an invite page {#auto_start}

Enabling auto_start in the code snippet means that the webpage will immediatly start a Surfly session. This option allows you to fully customise your invite page. The page will display the default red Surfly banner, letting the visitor know that they have been queue'd. 
The red banner may also be removed through a simple change to the code snippet. Just set the "block_until_agent_joins" parameter to "false".

Further customisation is also possible through the use of the REST API. For example, you can use it to detect whether a Surfly session has started or not, and alter your websites' appearance based on this. For instance, if we're in a Surfly session, we can get the unique queue code which identifies the user who initiated the session and display it.

As can be seen below, we were then able to set up our own invite page:

![Queue ID](https://raw.github.com/surfly/tutorial/master/screens/custom-lp.png)


<a name="integrate_chat"></a>
#### Integrate with existing chat solutions {#integrate_chat}

It is also possible to integrate Surfly with existing chat solutions. For example, if you have already established your own video or text chat, you may want to add Surfly's co-browsing functionality to this. In this case, Surfly can be integrated in such a way so that it acts as a transparent addition to your product and allows you to entirely customise the appearance of the session.

Simply add the code snippet to the page including your chat solution, and alter it to either remove the user interface entirely, or to display a dock with session control options (more information on the docked_only option can be found here). You will then be able to use Surfly's co-browsing functionality in addition to your own chat solution.