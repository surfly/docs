![logo](images/logosmall.png)

# Introducing Surfly

### Welcome to Surfly

###### What is co-browsing?

Surfly's co-browsing technology enables you to share your browser with others, synchronising mouse clicks and key events. You can start a Surfly session simply by entering the url of the website you want to browse into the 'start session' panel on your admin page. Then, invite people to join you by sharing the session url with them. This is the easiest and quickest way to co-browse and does not require any configuration. 

![simply_browse](images/simplybrowse.jpg)

However, if you wish to use Surfly as a feature on your own website, you can also add a Surfly button to your website. By doing this, you will be able to fully customize your session and use as much, or as little, of Surfly's functionality within your own product.

The introduction gives an overview of what Surfly is, and outlines the various ways in which it can be integrated and adapted for your own needs. More information on how to make these changes can be found in the [Integration guide](./the_surfly_tutorial.md), in the [Javascript API](./javascript_api.md) and [REST API](https://www.surfly.com/cobrowsing-api/) documentation.

###### During the session

During the session, the mouse arrows from all users will be visible. The leader will navigate the site, and the follower can help guide them through it. There can only be one leader, but you can have multiple followers, and switch control between the different users during the session. Only the leader can select or click items on the page, and if the leader decides to navigate to another url, the followers' screens will be synchronised so that they can also see this new page. The followers can take advantage of the drawing tool provided in order to highlight areas on the screen. During the session, users can communicate via text or video chat, share documents and invite others to join them.

###### Responding to incoming requests

To accept an incoming request, log in to your Surfly account, and navigate to the 'Queue' panel. Here, you can see a list of the queue'd users, their location, and the time they have been waiting. To answer, simply press the 'take call' button. If your visitors are logged in on your website already, you can also display meta-data, such as the visitor's name in the queue, so that the agent greeting them knows who they are.

![The Queue panel](https://raw.github.com/surfly/tutorial/master/screens/queue_panel.png)

###### The Admin panel

Surfly's admin panel allows you to track your users and your agents, and can be customised to suit your needs.

The buttons on the admin panel are:

 - The 'start' button, this allows you to immediately start co-browsing.  When you click on this link you are asked to invite someone to join your session, by either sending them the session url directly, or via email.
 - The 'queue' button, which gives you a list of queued users.  You can add meta-data to this panel so that the agent knows more information about the user.
 - The 'history' button gives a brief overview of your session. You can also choose to record the chat logs which will then be accessible from the history panel.
 - The 'agent' button allows you to add agents to your account, and also gives you access to some information about agents such as their ID and the amount of sessions they have joined.
 - The 'settings' button lets you change your profile settings, and also includes your account details. Here, you can review your account plan, billing and personal information. The settings button also contains your integration information, the Surfly code snippet and the REST API key. 
 - The 'log out' button lets you exit the admin panel.


<a name="chrome-extension"></a>
###### The chrome extension

If you do not want to immediately add the code to your website, but still want to take a look at how Surfly's integration can work for you, use our Chrome extension. This extension will add our Javascript snippet code to any website you are currently browsing, it will also give you all the options to easily configure the snippet and try out various settings. 

In order to install the extension do the following: 
 - Either download the [Chrome Extension](https://www.surfly.com/wp-content/uploads/2015/08/chrome-extension.zip) here, or from the [chrome store](https://chrome.google.com/webstore/detail/surfly-integration-helper/oingifpjfediijcohlhniecfmadhndok). 
 - Open ChromeGo to Tools / Preferences / Settings (depends on your OS)
 - Go to ‘Extensions’
 - Click on ‘Load unpacked extension’
 - Point it to the downloaded file

