<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>
#Surfly integration with Tag Manager

In this chapter we'll show you how to add Surfly to your website using Google Tag Manager.

####The Features

Within this example we make use of the [session-id approach](../tutorial/advanced-integration.md), which gives you the following use-case:

- The user is already chatting with an agent, and is directed to the "Get Help"-button to start a Surfly co-browsing session

<div align="center">
  <img src="../images/get-help-button.png">
</div>


- After the user clicks the "Get-Help"-button, a Surfly session is initiated, and the button now shows the session-id (which is by default a four-number code)
- The user can now provide the session-id to the agent. The agent then uses the session-id to identify the correct session from the queue in his/her admin panel

<div align="center">
  <img src="../images/olark-chat-box.png">
</div>

- The agent joins the session, and the session now becomes visible to both users

####How it works

With Google Tag Manager (GTM) you are able to inject HTML into your website. As long as you put it in between the correct tags, you can add divs, css, javascript, etc., to your website's page(s). The tag you inject through GTM can even contain more than one script, and even scripts of a different nature.

In short, you add a tag to your website as follows:

- Register at https://www.google.nl/tagmanager/
- Log in and create an account for your website
- Add an account-name and a container (which is the url), and set the destination
- You receive two code snippets, follow the instructions on how to add these to your website
- You can create a new tag on the “workspace” console, or click on “tags” >> “new”
- Add a name
- Click on “tag configuration ” select "custom tag", then add the code snippet. You can add any code snippet as long as it’s in HTML
- Enable document.write
- Add a trigger. You can select the pages where you want the tag to be implemented
- When you’re ready to review, click the caret-down next to “publish” to create a new version
- Go to “versions” >> “actions” >> “review” to test the tag's functionality on your website
- If everything is working properly, go to “versions” >> “actions” >> “publish” to make your tag go live

{% em color="#ffffe0" %} For more info on Google Tag Manager, please visit https://www.google.com/analytics/tag-manager {% endem %}

####Example tag with existing chat solution

Below you'll find an example of what a tag would look like with the session-id approach. The example also includes the option of adding a third-party chat solution to your website.

The tag is structured as follows:

- First we add a div with an id of "footer". In the div we create two buttons: one to start a Surfly session and the other to end it
- Then we add the css by placing it between style tags
- The last part of the tag is Javascript. First, we've made sure that GTM will show our buttons. Then we've added the Surfly snippet, the Surfly init function, a sessionStart() function, the Olark snippet and a sessionEnd() function.

```html
<!-- Buttons to control the Surfly session -->
<div class="footer" id="footer">
  <button class="basic-button" id="btn-start-session" onclick="sessionStart()">Get Help</button>
  <button class="basic-button" id="btn-end-session" onclick="sessionEnd()">Stop sessie</button>
</div>

<!-- Button styling -->
<style type="text/css">
  .basic-button {
    background-color: #ffd05b;
    width: 115px;
    border: 1px solid #ffd05b;
    border-radius: 33px;
    height: 50px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 1px;
    font-family: sans-serif;
    font-weight: bold;
    position: absolute;
    left: 15px;
    bottom: 15px;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
    position: fixed;
  }

  .basic-button:hover {
    cursor: pointer;
  }

  .basic-button p {
    margin-top: 14px;
    font-size: 13px;
  }

  #btn-end-session, #btn-start-session {
    display: none;
  }
</style>

<script>
  // Make sure that GTM does not hide the buttons
  document.getElementById('footer').parentElement.removeAttribute('style');

  // Add the Surfly snippet -->
  (function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
  l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
  l.src='https://surfly.com/surfly.js';y.parentNode.insertBefore(l,y);})
  (window,document,'script','Surfly');

  // Implement the Surfly init code, ADD YOUR OWN WIDGET KEY
  Surfly.init({widget_key:'** add your own Surfly widget key **'}, function(init) {
    if (init.success) {
      if (Surfly.isInsideSession) {
        // Inside the session, display the btn-end-session
        document.getElementById('btn-end-session').style.display = "block";
      } else {
        // Outside the session, display the btn-start-session
        document.getElementById("btn-start-session").style.display = "block";

        // Add your chat box snippet code here

      }
    }
  });

  // Function sessionStart() that starts the Surfly session, so that it can be applied to the "Start Session"-button
  // Add options according to you wishes
  function sessionStart() {
    var settings = {
    block_until_agent_joins: false,
    hide_until_agent_joins: true,
    start_docked: true,
    cookie_transfer_enabled: true,
    cookie_transfer_proxying: false,
    splash: false
  };

  // Code that shows the session-id so that it can be passed to the helpdesk agent
  var startButton = document.getElementById("btn-start-session");
  startButton.disabled = "true";
  Surfly.session(settings)
    .on('session_started', function(session, event) {
      startButton.textContent = session.pin;
    })
    .startLeader();
  }

  // Function that ends the session, so that it can be applied to the "end Session"-button
  function sessionEnd() {
    Surfly.currentSession.end();
  }
</script>

```
{% em color="#ffffe0" %} Google Tag Manager tends to add `<style = “display: none; visibility: hidden;”>` to the code you inject. Make sure you remove this attribute within the tag (as shown in the example above), otherwise the divs you've added will not appear. {% endem %}

If you choose to use this code snippet on your website, there are a couple of things you need to take into account:

- You might have to adjust the CSS if you want the "Get Help"-button to match your own chatbox styling
- Read through the code, and make sure you add both your own Surfly widget key, as well as your own chatbox code snippet
- If you're ready for a more advanced integration, take a look at the [surfly options](../widget-options.md), and adjust the options in the above example if needed