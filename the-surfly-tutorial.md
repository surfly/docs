<a href="https://www.surfly.com/">![logo](images/logosmall.png)</a>
# Javascript API Integration guide

This tutorial guides you through the steps we take as we integrate [Surfly](https://www.surfly.com/) into our example application. We start by adding the widget code to our website, and make small adaptations to the code in order to customize the way the session behaves and appears. As we progress through the tutorial, we strip away Surfly's extra functionality, so that in our final application, Surfly acts as a transparent layer on our page.

You can view the code in the [repository](https://github.com/MathildeJ/integrationGuide_commits/commits/master).
<p>Here is a list of all the steps of this guide:</p>
 - [Basic Integration](/tutorial/chapter1.md)
   - [Initial website](./tutorial/chapter1.md/#website)
   - [Adding a Surfly button](./tutorial/chapter1.md/#integrate)
   - [Set Surfly options](./tutorial/chapter1.md/#widget)
   - [Create your own button](./tutorial/chapter1.md/#start-button)
   - [Build your own landing page](./tutorial/chapter1.md/#landing)
   - [Field masking](./tutorial/chapter1.md/#session)
   - [End of session popup](./tutorial/chapter1.md/#popup)
   - [Integrate an already existing chat solution](./tutorial/chapter1.md/#chat)


 - [Advanced Integration](/tutorial/advanced-integration.md)
   - [Enabling session continuation](./tutorial/advanced-integration.md/#receipt)
   - [Configuring the blacklist](./tutorial/advanced-integration.md/#blacklist)
   - [Queue metadata](./tutorial/advanced-integration.md/#metadata)
   - [Change appearance based on who has control](./tutorial/advanced-integration.md/#control-appearance)
   - [Customize Surfly's look and feel](./tutorial/advanced-integration.md/#remove-ui)
     - [Create your own exit button](./tutorial/advanced-integration.md/#exit-button)
     - [Session ID approach](./tutorial/advanced-integration.md/#small-button)


<br>
{% em color="#ffffe0" %}Please note:
It is important to note that Surfly needs to be able to reach the server over the network. You can use tools such as [ngrok.io](https://ngrok.com/) or [burrow.io](https://burrow.io/) to allow Surfly access to your local machine whilst you are developing locally.  However, if you really want to work on an isolated LAN, we can set up a special server for you. If you want to have you own local solution, please feel free to contact us. {% endem %}


