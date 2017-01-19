<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
# A Surfly session


The main points covered in this section are:

 - [Inviting users to join your session](<#inviteUser>)
 - [Navigating to a new website](<#newUrl>)
 - [Chat box](<#chatBox>)
 - [Video chat](<#videoChat>)
 - [Document sharing](<#document_sharing>)
 - [Window size options](<#windowSize>)
 - [Drawing mode](<#drawingMode>)
 - [Control switching](<#customiseControlSwitching>)
 - [Adding metadata to the queue](<#metadata>)
 - [Ending the session display or redirect to another page](<#popupurl>)

<a name="inviteUser"></a>
#### Inviting users to join your session{#inviteUser}

If you start a session from the Surfly admin panel, you'll be able to invite people to join you as soon as the session starts.
The leader can also add users from within a Surfly session by clicking the "add user" icon in the dock.

Both of these methods will load the following screen:
![invite_user](https://raw.github.com/surfly/tutorial/master/screens/invite_user.png)

You can then decide to either share the url of the session, or send an email to the users you wish to invite.

<a name="newUrl"></a>
#### Navigating to a new website{#newUrl}

At any given time during a Surfly session, the leader can decide to surf to another website within the co-browsing session. In order to do so, you can use the "navigate to new url" button in the chat box. You will then see the following screen asking you to enter the new url:

![new_url](https://raw.github.com/surfly/tutorial/master/screens/new_url.png)

However, if you wish to open a new tab you can simply hold CTRL and click on the link you want to open. When the last tab has been closed, the normal Surfly session will resume.

{% em color="#ffffe0" %}Please note:
The standard CTRL + T shortcut to open a new tab will not open a tab within the Surfly session. {% endem %}


<a name="chatBox"></a>
####Chat box{#chatBox}

Surfly provides a [chat box](../widgetOptions.md/#chatboxOptions) which can be used to communicate with other users. We will display your gravatar in the chat box. The name is taken from the name as configured in the admin panel. If you prefer, you can also use session options to change the name that gets displayed.

The default chatbox color is a soft red, however, this can be altered to match your website's theme. Modifying the chat box can not only change its appearance, but also limit or extend the amount of control that the leader and the followers can have.

If you want to monitor the conversations between the agents and the users, you can choose to store the chat logs. You can access them by navigating to 'History' in your Surfly admin panel. The chat log section will have two icons inside, allowing you to either view the logs, or download them.

<div align="center">
  <img src="https://raw.github.com/surfly/tutorial/master/screens/logged_icon.png">
</div>

If you do not want to have the chat functionality, you can either use dock mode to only display the control panel, or remove it completely.

<a name="videoChat"></a>
#### Video chat{#videoChat}

Surfly also allows you to communicate in your session with [video chat](../widgetOptions.md/#videoOptions). You can maximise the video to full screen, or restrict the video quality. However, if you do not wish to use this functionality you can easily disable it.

<a name="documentSharing"></a>
#### Document sharing{#documentSharing}

If you wish to [share documents](../widgetOptions.md/#filesharingOptions) during the Surfly session, you can click the paper icon to the bottom right of the chat box. Once you have clicked on it, you can upload a document from your desktop. By default, shared documents can only be viewed, and not downloaded. However, you can change the settings so that the files can be downloaded. It is also possible to share documents by dragging them directly to the chat box.
If you wish, you may also disable the document sharing tool.

<a name="windowSize"></a>
#### Window size options{#windowSize}

The size of the [window](../widgetOptions.md/#screenOptions) is normally set to the person with the smallest screen, as this allows for a smooth transition into the Surfly session. If you see blank edges at the side of your screen, it is only because your screen is larger than the person you are co-browsing with. However, you can also decide to set a maximum or minimum size for the window.
Alternatively, you may decide to remove the set to smallest screen functionality altogether. In this case, the window will be set to the size of the leader's screen.

<a name="drawingMode"></a>
#### Drawing mode{#drawingMode}

The [drawing option](../widgetOptions.md/#drawingOptions) allows the followers within the Surfly session to highlight the areas on the screen that they wish to bring attention to. It works in a similar way to a highlighter, or a magic marker. By default, the drawings are temporary (they will fade out) and the color of the drawing tool is set to match that of the user's cursor. For example, the highlighter color for the first follower will be yellow, green for the second, and so forth. Of course, if you would prefer to have something different, both of these parameters can be changed, or you can turn the drawing function off entirely. You can also set the pixel size and the timeout length.

In our example website we adapted the code so that the drawing mode would be permanent, and that the color of the drawings would be in our blue theme color.

![changed drawing color](https://raw.github.com/surfly/tutorial/master/screens/drawing.png)

<a name="customiseControlSwitching"></a>
#### Control switching{#customiseControlSwitching}

If you want to be able to [switch control](../widgetOptions.md/#videOptions) between the leader and the follower, you can choose between either allowing the agent to take control, or to request it from the leader. This could be useful for when users require further guidance through the website.


<a name="metadata"></a>
#### Adding metadata to the queue{#metadata}

When a user is being queue'd, you may want to pass some information to the agents, allowing them to know a bit more about the clients, or to identify a specific client. For instance, if a user has logged in to your site, you could pass some of that information to the agent. As shown in the image, the information is added to the 'meta data' section in the queue panel.


![queue metadata](https://raw.github.com/surfly/tutorial/master/screens/queue_metadata.png)

<a name="popupurl"></a>
#### Exiting the session display or redirect to another page{#popupurl}

You may want to show a user another page after the session has finished. In this case, you can either show a popup window within the host website, or you can send them to another webpage.

In the example below, we have chosen to show the leader a popup url within their screen after the session has finished.
The user can exit the popup window by clicking on the cross to the top right of the window.

![Popup url](https://raw.github.com/surfly/tutorial/master/screens/popup-cake.png)

This can be especially useful if you wish to receive feedback by asking your visitors to fill out a survey when the session ends.
