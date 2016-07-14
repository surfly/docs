# Introducing Surfly

### Welcome to Surfly

###### What is co-browsing?

Surfly's co-browsing technology enables you to share your browser with others, synchronising mouse clicks and key events. You can start a Surfly session simply by entering the url of the website you want to browse into the 'start session' panel on your admin page. Then, invite people to join you by sharing the session url with them. This is the easiest and quickest way to co-browse and does not require any configuration. However, if you wish to use Surfly as a feature on your own website, you can also add a Surfly button to your website. By doing this, you will be able to fully customise your session and use as much, or as little, of Surfly's functionality within your own product.

The introduction gives an overview of what Surfly is, and outlines the various ways in which it can be integrated and adapted for your own needs. More information on how to make these changes can be found in the Surfly tutorial and in the API documentation.


###### During the session

During the session, the mouse arrows from all users will be visible. The leader will navigate the site, and the follower can help guide them through it. There can only be one leader, but you can have multiple followers, and switch control between the different users during the session. Only the leader can select or click items on the page, and if the leader decides to navigate to another url, the followers' screens will be synchronised so that they can also see this new page. The followers can take advantage of the drawing tool provided in order to highlight areas on the screen. During the session, users can communicate via text or video chat, share documents and invite others to join them.

###### Responding to incoming requests

To accept an incoming request, log in to your Surfly account, and navigate to the 'Queue' panel. Here, agents can see how many users they have queue'd up, their location, and the time they have been waiting. To answer, the agent simply has to press the 'take call' button. If your visitors are logged in on your website already, you can also display metadata, such as the visitor's name in the queue, so that the agent greeting them knows who they are.

![The Queue panel](https://raw.github.com/surfly/tutorial/master/screens/queue_panel.png)

###### The Admin panel

Surfly's admin panel allows you to track your users and your agents, and can be customised to suit your needs.

The buttons on the admin panel are:

 - The 'start' button, this allows you to immediatly start co-browsing.  When you click on this link you are asked to invite someone to join your session, by either sending them the session url directly, or via email.
 - The 'queue' button, which gives you a list of queue'd users.  You can add metadata to this panel so that the agent knows more information about the user.
 - The 'history' button gives a brief overview of your session. You can also choose to record the chat logs which will then be accessible from the history panel.
 - The 'agent' button allows you to add agents to your account, and also gives you access to some information about agents such as their ID and the amount of sessions they have joined.
 - The 'settings' button lets you change your profile settings, and also includes your account details. Here, you can review your account plan, billing and personal information. The settings button also contains your integration information, the Surfly code snippet and the REST API key. 
 - The 'log out' button lets you exit the admin panel.






<a name="integration_options"></a>
### Integration Options

This section covers:

 - [Surfly and third party cookies](#third_party_cookies)
 - [Session continuation](#session_continuation)
 - [Security Features](#security_features)
 - [Add information to a session log](#session_log_info)
 - [Customising the website appearance depending on who is in control](#customise_appearance_for_user)

<a name="third_party_cookies"></a>
#### Surfly and third party cookies

When integrating Surfly into your website, it is important to know that top level domains do not transfer third party cookies to the iframe, so instead you may choose to open a session in a new tab, or to use a CNAME.

<a name="session_continuation"></a>
#### Session continuation

Please note: This is only supported for sessions started with the Surfly widget.

Cookies can be carried over from your website, and into the Surfly session. For example, if a user is logged into your website, they will remain logged in for the duration of the session. Once the session has finished, the information is sent back to the website. This allows a smooth transition into, and out of, the session.

There are two main ways to set up session continuation:

 - Full session continuation allows the transfer of all data, including (unlike soft session continuation), cookies with a HttpOnly tag.
 - Soft session continuation is more limited, and excludes cookies with a HttpOnly tag.

<a name="security_features"></a>
#### Security Features

Surfly's security features allow you the option to protect users' data during the session, and, if required, restrict access to selected webpages. 

 - [Field masking](#field_masking)
 - [Blacklisting and Whitelisting](#blacklist_whitelist)

<a name="field_masking"></a>
##### Field masking

Field masking allows you to protect the leader's data during the Surfly session. If the user is required to enter sensitive information (such as payment details), into your website, you can hide that input from the session followers. The leader is still able to read what they are typing into the form, but the followers (including the agent) will only see a series of x's.

###### Please note: 

Whilst the leader can mask their data, and hide it from the followers, the followers cannot hide their data from the leader.

<a name="blacklist_whitelist"></a>
##### Blacklisting and Whitelisting

Blacklisting is used to ban users from a select few webpages, whereas whitelisting is more restrictive, and allows access only to the pages specified in the code snippet.

###### Please note: 
This option is only available to enterprise clients.

<a name="session_log_info"></a>
#### Add information to the session log

The surfly.log() function can be used to log custom messages during the Surfly session. You can use the REST API to track occurances of that message/ 

In our example website, we wanted to track the amount of times an agent had made a sale. Everytime the "buy" button is clicked, we create a Surfly log message indicating that the sale has been completed.  We matched the "Sale completed" message to the agent's id and counted the amount of times that this message had been logged using the REST API. A page could then be created showing the number of sales the agent has made.


<a name="customise_appearance_for_user"></a>
#### Customise website appearance depending on who is in control

Surfly sessions are always comprised of one leader, and one or more followers. The leader is the only person who can click or type during the session, but you can switch control between the leader and the followers, if required. You can specify the features you want to give to the leader and the followers during the session by enabling or disabling icons in the dock. Moreover, you can adapt the status of the elements of a page depending on who is in control. For example, you may want to make a button clickable only when the leader (the person who initiated the session) is in control.


 