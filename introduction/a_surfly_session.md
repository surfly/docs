# A Surfly session


Surfly comes with several different options for communicating with other users. You may decide to video or text chat, share documents and highlight areas with the tool. 
If Surfly is integrated into your website, you can adapt the way a session starts, looks and behaves by changing the default settings. 

The main points covered in this section are: 

 - [Inviting users to join your session](#invite_user)
 - [Navigating to a new website](#invite_user)
 - [Chat box](#chat_box)
 - [Video chat](#video_chat)
 - [Document sharing](#document_sharing)
 - [Window size options](#window_size)
 - [Drawing mode](#drawing_mode)
 - [Control switching](#customise_control_switching)
 - [Adding metadata to the queue](#metadata)
 - [Ending the session display or redirect to another page](#popupurl)

[](#invite-user)
#### Inviting users to join your session

You can invite a user to join your session from your Surfly admin panel or from within a Surfly session: 
 - To start a session from the Surfly admin panel, navigate to the "start" button at the top left of your screen. 
 - Within the Surfly session the leader can, by default, invite people by clicking on the "add user" icon in the dock.

Both of these methods will load the following screen:

![invite_user](https://raw.github.com/surfly/tutorial/master/screens/invite_user.png)

You can then decide to either share the url of the session, or send an email to the users you wish to invite. During a session, there is always one leader at any given time, but there can be multiple followers.

<a name="new_url"></a>
#### Navigating to a new website 

At any given time during a Surfly session, the leader can decide to surf to another website within the co-browsing session. In order to do so, you can use the "navigate to new url" button in the chat box. You will then see the following screen asking you to enter the new url:

![new_url](https://raw.github.com/surfly/tutorial/master/screens/new_url.png)

However, if you wish to open a new tab you can simply hold Ctrl and click on the link you want to open. When the last tab has been closed, the normal Surfly session will resume.

Please note: the standard Ctrl + T shortcut to open a new tab will not open a tab within the Surfly session

<a name="chat_box"></a>
####Chat box

Surfly provides a chat box which can be used to communicate with other users. 
The default chatbox color is a soft red, however, this can be altered to match your website's theme. Modifying the chat box can not only change its appearance, but also limit or extend the amount of control that the leader and the followers can have. 

If you want to monitor the conversations between the agents and the users, you can choose to store the chat logs. You can access them by navigating to 'History' in your Surfly admin panel. The chat log section will have two icons inside, allowing you to either view the logs, or download them.

![chatlogs](https://raw.github.com/surfly/tutorial/master/screens/logged_icon.png)

If you do not want to have the chat functionality, you can either have just the dock, displaying the control panel, or remove it completely.

<a name="video_chat"></a>
#### Video chat

Surfly also allows you to communicate in your session with video chat. You can maximise the video to full screen, or restrict the video quality. However, if you do not wish to use this functionality you can easily disable it.

<a name="document_sharing"></a>
#### Document sharing 

If you wish to share documents during the Surfly session, you can click the paper icon to the bottom right of the chat box. Once you have clicked on it, you can upload a document from your desktop. By default, shared documents can only be viewed, and not downloaded. However, you can change the settings so that the files can be downloaded. It is also possible to share documents by dragging them directly to the chat box. 
If you wish, you may also disable the document sharing tool. 

<a name="window_size"></a>
#### Window size options

The size of the window is normally set to the person with the smallest screen, as this allows for a smooth transition into the Surfly session. If you see blank edges at the side of your screen, it is only because your screen is larger than the person you are co-browsing with. However, you can also decide to set a maximum or minimum size for the window.
Alternatively, you may decide to remove the set to smallest screen functionality altogether. In this case, the window will be set to the size of the leader's screen.

<a name="drawing_mode"></a>
#### Drawing mode

The drawing option allows the followers within the Surfly session to highlight the areas on the screen that they wish to bring attention to. It works in a similar way to a highlighter, or a magic marker. By default, the drawings are temporary (they will fade out) and the color of the drawing tool is set to yellow. Of course, if you would prefer to have something different, both of these parameters can be changed, or you can turn the drawing function off entirely. You can also set the pixel size and the timeout length. 

In our example website we adapted the code so that the drawing mode would be permanent, and that the color of the drawings would be in our blue theme color. 

![changed drawing color](https://raw.github.com/surfly/tutorial/master/screens/drawing.png)

<a name="customise_control_switching"></a>
#### Control switching

If you want to be able to switch control between the leader and the follower, you can choose between either allowing the agent to take control, or to
request it from the leader. This could be useful for when users require further guidance through the website.


<a name="metadata"></a>
#### Adding metadata to the queue

When a user is being queue'd, you may want to pass some information to the agents, allowing them to know a bit more about the clients, or to identify a specific client. For instance, if a user has logged in to your site, you could pass some of that information to the agent. As shown in the image, the information is added to the 'meta data' section in the queue panel.


![queue metadata](https://raw.github.com/surfly/tutorial/master/screens/queue_metadata.png)

<a name="popupurl"></a>
#### Exiting the session display or redirect to another page

You may want to show a user another page after the session has finished. In this case, you can either show a popup window within the host website, or you can send them to another webpage.

In the example below, we have chosen to show the leader a popup url within their screen after the session has finished.
The user can exit the popup window by clicking on the cross to the top right of the window.

![Popup url](https://raw.github.com/surfly/tutorial/master/screens/popup-cake.png)

This can be especially useful if you wish to receive feedback by asking your visitors to fill out a survey when the session ends.