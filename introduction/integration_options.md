![logo](../images/logosmall.png)
# Integration Options

<a name="integration_options"></a>
### Integration Options

This section covers:

 - [Session continuation](<#session_continuation>)
 - [Security Features](<#security_features>)
 - [Add information to a session log](<#session_log_info>)
 - [Customising the website appearance depending on who is in control](<#customise_appearance_for_user>)


<a name="session_continuation"></a>
#### Session continuation{#session_continuation}

[Session continuation](./widget_options/widget_options.md#session_continuation) is used to pass data into, and out of, the Surfly session. For example, if a customer needs help whilst they are filling out a form, the information that they have already entered will be carried over into the Surfly session so that they do not have to repeat what they have already done. This allows for a smooth transition into, and out of, the session.

More information on session continuation can be found [here](./widget_options/widget_options.md#session_continuation)

<a name="security_features"></a>
#### Security Features{#security_features}

Surfly's security features allow you the option to protect users' data during the session, and, if required, restrict access to selected webpages. 

 - [Field masking](#field_masking)
 - [Blacklisting and Whitelisting](#blacklist_whitelist)

<a name="field_masking"></a>
##### Field masking{#field_masking}

Field masking allows you to protect the data during the Surfly session. If the user is required to enter sensitive information (such as payment details), into your website, you can hide that input from the session followers. 


<a name="blacklist_whitelist"></a>
##### Blacklisting and Whitelisting{#blacklist_whitelist}

Blacklisting is used to ban users from a select few webpages, whereas whitelisting is more restrictive, and allows access only to the pages specified in the code snippet.
More information can be found [here](./widget_options/widget_options.md#restrictions).

{% em color="#ffffe0" %}Please note: 
This option is only available to enterprise clients.  {% endem %}


<a name="session_log_info"></a>
#### Add information to the session log{#session_log_info}

You can choose to add a custom message to the Surfly logs in order to register an event. For example, you may want to track the amount of times an individual agent has made a sale. 

<a name="customise_appearance_for_user"></a>
#### Customise website appearance depending on who is in control{#customise_appearance_for_user}

Surfly sessions are always comprised of one leader, and one or more followers. The leader is the only person who can click or type during the session, but you can switch control between the leader and the followers. You can specify the features you want to give to the leader and the followers during the session by enabling or disabling icons in the dock. Moreover, you can adapt the status of the elements of a page depending on who is in control. For example, you may want to make a button clickable only when the leader (the person who initiated the session) is in control.


 