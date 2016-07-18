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

Cookies can be carried over from your website, and into the Surfly session. For example, if a user is logged into your website, they will remain logged in for the duration of the session. Once the session has finished, the information is sent back to the website. This allows a smooth transition into, and out of, the session.

There are two main ways to set up session continuation:

 - Full session continuation allows the transfer of all data, including (unlike soft session continuation), cookies with a HttpOnly tag.
 - Soft session continuation is more limited, and excludes cookies with a HttpOnly tag.

More information on session continuation can be found [here](./widget_options/widget_options.md#session_continuation)

{% em color="#ffffe0" %}Please note: 
This is only supported for sessions started with the Surfly widget. {% endem %}
 

<a name="security_features"></a>
#### Security Features{#security_features}

Surfly's security features allow you the option to protect users' data during the session, and, if required, restrict access to selected webpages. 

 - [Field masking](#field_masking)
 - [Blacklisting and Whitelisting](#blacklist_whitelist)

<a name="field_masking"></a>
##### Field masking{#field_masking}

Field masking allows you to protect the leader's data during the Surfly session. If the user is required to enter sensitive information (such as payment details), into your website, you can hide that input from the session followers. The leader is still able to read what they are typing into the form, but the followers (including the agent) will only see a series of x's.

{% em color="#ffffe0" %}Please note: 
Whilst the leader can mask their data, and hide it from the followers, the followers cannot hide their data from the leader. {% endem %}


<a name="blacklist_whitelist"></a>
##### Blacklisting and Whitelisting{#blacklist_whitelist}

Blacklisting is used to ban users from a select few webpages, whereas whitelisting is more restrictive, and allows access only to the pages specified in the code snippet.
More information can be found [here](./widget_options/widget_options.md#restrictions).

{% em color="#ffffe0" %}Please note: 
This option is only available to enterprise clients.  {% endem %}


<a name="session_log_info"></a>
#### Add information to the session log{#session_log_info}

The surfly.log() function can be used to [log custom messages](./widget_options/widget_options.md#surfly_log) during the Surfly session. You can then use [the REST API](./rest_api.md) to track occurrences of that message.

In our example website, we wanted to track the amount of times an agent had made a sale. Everytime the "buy" button is clicked, we create a "Sale completed" Surfly log message indicating that the sale has been completed.  We matched the "Sale completed" message to the agent's id and counted the amount of times that this message had been logged using the REST API. A page can then be created showing the number of sales the agent has made.


<a name="customise_appearance_for_user"></a>
#### Customise website appearance depending on who is in control{#customise_appearance_for_user}

Surfly sessions are always comprised of one leader, and one or more followers. The leader is the only person who can click or type during the session, but you can switch control between the leader and the followers. You can specify the features you want to give to the leader and the followers during the session by enabling or disabling icons in the dock. Moreover, you can adapt the status of the elements of a page depending on who is in control. For example, you may want to make a button clickable only when the leader (the person who initiated the session) is in control.


 