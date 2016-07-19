![logo](../images/logosmall.png)
# Integration Options
<a name="integration_options"></a>

You can fully customise Surfly to suit your needs. Many of these changes can be achieved with a simple adjustment to the code snippet, or the options panel on your admin page. 

This section covers:
 - [Button appearance](<#button_appearance>)
 - [Stealth mode](<#stealth_mode>)
 - [Customise your own button](<#surflystart_anchor>)
 - [Session ID](<#session_id>)
 - [Create an invite page](<#auto_start>)
 - [Integrate with existing chat solutions](<#integrate_chat>)
 - [Session continuation](<#session_continuation>)
 - [Security Features](<#security_features>)
 - [Add information to a session log](<#session_log_info>)
 - [Customising the website appearance depending on who is in control](<#customise_appearance_for_user>)

<a name="button_appearance"></a>
#### Button appearance{#button_appearance}

If you prefer, you can adapt the 'get live help' button that Surfly provides. The button's default appearance is red, with white text and sits to the bottom left of the screen. 

![default button appearance](https://raw.github.com/surfly/tutorial/master/screens/default-button.png)

You can adapt the button appearance by changing its position, colors and size. Please click for a full list of [button options](../widget_options.md/#button_table).

The button, by default, will only be shown if an agent is logged into the Surfly admin page. This can also be disabled, if you wish.

<a name="stealth_mode"></a>
#### Start a session in stealth mode{#stealth_mode}

If you do not wish to have a visual button or link on your webpage, then you can use stealth mode. This allows visitors to initiate a Surfly session simply by pressing CTRL+ENTER.  The visitor will then be queue'd, and the Surfly session will start as usual.

<a name="surflystart_anchor"></a>
#### Customise your own button{#surflystart_anchor}

If you want to create your own button, you can use the [#surflystart anchor](../widget_options/widget_options.md/#anchor_start), which can be integrated into your website's source code. You can choose the text you wish to write onto the button, and it can be fully styled with css so that it compliments your website design.  As you can see in the image below, we chose to use the image of a cake as a button. If a visitor to the website clicks on it, it will lead them to a Surfly session.

![The end result](https://raw.github.com/surfly/tutorial/master/screens/cake-button.png)

<a name="session_id"></a>
#### The session ID approach{#session_id}

The session ID approach is especially useful if you are already in contact with a customer via the phone. If the customer needs help navigating a website, the agent can direct them to start a co-browsing session. The user can then communicate their ID to the agent so that they will be able to join the session and help them.

Once the agent has the session ID, they can simply enter it into the start session panel on the Surfly admin page, and will immediately join the session.

![Start Surfly](https://raw.github.com/surfly/tutorial/master/screens/enter_session_id.png)

<a name="auto_start"></a>
#### Create an invite page{#auto_start}

Enabling auto_start in the code snippet means that the webpage will immediatly start a Surfly session. This option allows you to fully customise your invite page. The page will display the default red Surfly banner, letting the visitor know that they have been queue'd. This red banner may also be removed through a simple change to the code snippet. 

Further customisation is also possible through the use of the [REST API](https://www.surfly.com/cobrowsing-api/). For example, you can use it to detect whether a Surfly session has started or not, and alter your websites' appearance based on this. For instance, if we're in a Surfly session, we can get the unique queue code which identifies the user who initiated the session and display it.

As can be seen below, we were then able to set up our own invite page:

![Queue ID](https://raw.github.com/surfly/tutorial/master/screens/custom-lp.png)


<a name="integrate_chat"></a>
#### Integrate with existing chat solutions{#integrate_chat}

It is also possible to integrate Surfly with existing chat solutions. For example, if you have already established your own video or text chat, you may want to add Surfly's co-browsing functionality to this. In this case, Surfly can be integrated in such a way so that it acts as a transparent addition to your product and allows you to entirely customise the appearance of the session.

Simply add the code snippet to the page including your chat solution, and alter it to either remove the user interface entirely, or to display a dock with session control options (more information on the docked_only option can be found here). You will then be able to use Surfly's co-browsing functionality in addition to your own chat solution.


<a name="session_continuation"></a>
#### Session continuation{#session_continuation}

[Session continuation](../widget_options/widget_options.md#session_continuation) is used to pass data into, and out of, the Surfly session. For example, if a customer needs help whilst they are filling out a form, the information that they have already entered will be carried over into the Surfly session so that they do not have to repeat what they have already done. This allows for a smooth transition into, and out of, the session.


<a name="security_features"></a>
#### Security Features{#security_features}

Surfly's security features allow you the option to protect users' data during the session, and, if required, restrict access to selected webpages. 

 - [Field masking](<#field_masking>)
 - [Blacklisting and Whitelisting](<#blacklist_whitelist>)

<a name="field_masking"></a>
##### Field masking{#field_masking}

Field masking allows you to protect data during the Surfly session. If the user is required to enter sensitive information (such as payment details), into your website, you can hide that input from the session followers. 


<a name="blacklist_whitelist"></a>
##### Blacklisting and Whitelisting{#blacklist_whitelist}

[Blacklisting](../widget_options/widget_options.md#restrictions) is used to ban users from a select few webpages, whereas whitelisting is more restrictive, and allows access only to the pages specified in the code snippet.

{% em color="#ffffe0" %}Please note: 
This option is only available to enterprise clients.  {% endem %}


<a name="session_log_info"></a>
#### Add information to the session log{#session_log_info}

You can choose to add a custom message to the Surfly logs in order to register an event. For example, you may want to track the amount of times an individual agent has made a sale. 

<a name="customise_appearance_for_user"></a>
#### Customise website appearance depending on who is in control{#customise_appearance_for_user}

Surfly sessions are always comprised of one leader, and one or more followers. The leader is the only person who can click or type during the session, but you can switch control between the leader and the followers. You can specify the features you want to give to the leader and the followers during the session by enabling or disabling icons in the dock. Moreover, you can adapt the status of the elements of a page depending on who is in control. For example, you may want to make a button clickable only when the leader (the person who initiated the session) is in control.


 