![logo](images/logosmall.png)
# Integration guide


Our tutorial guides you through the steps we take as we integrate Surfly into our example application. We start by adding the widget code to our website, and make small adaptations to the code in order to customize the way the session behaves and appears. As we progress through the tutorial, we strip away Surfly's extra functionality, so that in our final application, Surfly acts as a transparent layer on our page. 

Major steps and changes are illustrated by an image/gif and, for each modification, you can refer to our [repository](https://github.com/MathildeJ/Cake_shop_example), where you'll find the corresponding commit. 
<p>Here is a list of all the examples you can find in this guide:</p>
 - Basic Integration
   - [Initial website](tutorial/chapter1.md/#website)
   - [Adding a Surfly button](tutorial/chapter1.md/#integrate)
   - [Create your own button](../chapter1.md/<#surflystart_anchor>)
   - [Build your own landing page](<#session_id>)
   - [Session behaviour](<#auto_start>)
   - [End of session popup](<#integrate_chat>)
   
   
 - Advanced Integration
   - [Enabling session continuation](<#session_continuation>)
   - [Configuring the blacklist](<#security_features>)
   - [Queue metadata](<#session_log_info>)
   - [Customize Surfly's look and feel](<#customise_appearance_for_user>)
     - Create your own exit button
     - Integrate an already existing chat solution
     - Adding a discrete button


{% em color="#ffffe0" %}Please note: 
If you wish to integrate Surfly, you need to give Surfly access to the server. This is especially important when you are developing locally.  {% endem %}


