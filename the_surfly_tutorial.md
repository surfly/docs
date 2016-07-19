![logo](images/logosmall.png)
# Integration guide


Our tutorial guides you through the steps we take as we integrate Surfly into our example application. We start by adding the widget code to our website, and make small adaptations to the code in order to customize the way the session behaves and appears. As we progress through the tutorial, we strip away Surfly's extra functionality, so that in our final application, Surfly acts as a transparent layer on our page. 

Major steps and changes are illustrated by an image/gif and, for each modification, you can refer to our [repository](https://github.com/MathildeJ/Cake_shop_example), where you'll find the corresponding commit. 
<p>Here is a list of all the steps of this guide:</p>
 - [Basic Integration](tutorial/chapter1.md)
   - [Initial website](tutorial/chapter1.md/<#website>)
   - [Adding a Surfly button](tutorial/chapter1.md/<#integrate>)
   - [Create your own button](tutorial/chapter1.md/#widget)
   - [Build your own landing page](tutorial/chapter1.md/#landing)
   - [Session behaviour](tutorial/chapter1.md/#session)
   - [End of session popup](tutorial/chapter1.md/#popup)
   
   
 - [Advanced Integration](tutorial/advanced_integration.md)
   - [Enabling session continuation](tutorial/advanced_integration.md/#receipt)
   - [Configuring the blacklist](tutorial/advanced_integration.md/#blacklist)
   - [Queue metadata](tutorial/advanced_integration.md/#metadata)
   - [Customize Surfly's look and feel](tutorial/advanced_integration.md/#remove-ui)
     - [Create your own exit button](tutorial/advanced_integration.md/#exit_button)
     - [Integrate an already existing chat solution](tutorial/advanced_integration.md/#chat)
     - [Adding a discrete button](tutorial/advanced_integration.md/#small_button)


{% em color="#ffffe0" %}Please note: 
If you wish to integrate Surfly, you need to give Surfly access to the server. This is especially important when you are developing locally.  {% endem %}


