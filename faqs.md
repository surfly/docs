![logo](images/logosmall.png)
<a name="faq"></a>
# FAQ

If you do not find the answer to your question in one of the sections below, please do not hesitate to <a href="mailto:support@surfly.com">contact us</a>.

This FAQ is divided into several sections:
  - [Functionality](<#functionality>)
  - [Technology](<#technology>)
  - [Security](<#security>)
  - [Pricing](<#pricing>)
  - [Initial setup](<#initialSetup>)


## Functionality{#functionality}

**Is videochat included?**

Yes, all our plans, even the free plan come included with high quality videochat built on top of WebRTC.


**How many sessions can I create?**
<p>Only the free plan has a monthly limit on the amount of sessions you can create, all paid plans come with an unlimited number of sessions.</p>


**Can I invite any team members?**
<p>All our paid plans allow you to invite multiple team members and manage them from a single account.</p>


**Can I integrate Surfly on my website?**
<p>Yes! Just add a few lines of javascript to your website and you or your clients will be able to directly start Surfly sessions straight on your website. This is great for the support case where you can use our widget to show a support button on your website.</p>


**Can I control which parts of my website are visible?**
<p>With our business plan we offer the possibility to tweak which elements should be synchronized, this gives you fine-grained control over which HTML elements should be considered confidential.</p>


**Do you offer a full whitelabel solution?**
<p>With our enterprise offering we offer the option to remove all visible Surfly branding from the Surfly session.</p>


## Technology{#technology}

**Which browsers are supported?**
<p>Cobrowsing with Surfly will work on all modern browsers: Chrome, Firefox, Safari, Internet Explorer 10+, Opera. It will also work on mobile Android devices using the Chrome browser and on Apple iOS devices Surfly supports Safari. Surfly’s videochat uses WebRTC and will run on Chrome, Firefox and Opera without the need to install any software. On other browsers a plugin can be installed the first time videochat is started.</p>


**Why is Surfly so fast?**
<p>We make use of an advanced content-rewriting proxy which allows us to send over the real HTML content from our high performance network. This is in contrast with for example a pure Javascript approach which relies on the upstream of all participants to send over the data.</p>

**
How does Surfly differ from screensharing?**

A few things differentiate us from screensharing:
  1. We do not require any software to be installed
  2. We send over the real content without any loss of quality
  3. We can enable high performance video synchronization


##Security{#security}

**Does Surfly use secure connections?**
<p>Yes, all connections to Surfly are secured using HTTPS.</p>


**Do you store any session data?**
<p>No. All session data only lives within memory during the time of the session. We do not store any session data on disk.</p>


**Are you PCI compliant?**
<p>Yes, not only do we use HTTPS connections everywhere, but we also never store your creditcard as this is all handled by Stripe.</p>


**Can I host Surfly on-premise?**
<p>For larger deployment we do offer this kind of functionality, contact us if this is in your interest.</p>


## Pricing{#pricing}

**Is the FREE version really free?**
<p>Yes, the free version is really free. But the number of cobrowsing sessions you can start is a limited to 5 per month.</p>


**Do I need a credit card for the FREE version?**
<p>No, for the Free version you don’t need to have a credit-card. Also, for bigger clients we offer the option to pay by wire transfer through invoice.</p>


**What happens after the 14 day trial?**
<p>After the 14 day trial of the Pro and Business version your credit card will be charged for the first month, starting at that date. During the 14 day trial period you can cancel your subscription at any moment and your credit card will not be charged after the first 14 days.</p>


**Can I pay by invoice?**
<p>For enterprise clients or clients with more than 10 business seats we do offer the option to pay by invoice and wire-transfer. Please contact us for more information. Can I upgrade or downgrade my subscription? Yes, you can change your subscription at any moment. An upgrade will be effective immediately. A downgrade will be effective at the end of the current contract period (month or year).</p>


**Are the prices subject to VAT or sales tax?**
<p>That depends on your location. Non-EU: For all customers outside the European Union, we do not have to add VAT. EU: For companies in the European Union that have a valid VAT tax ID, we do not have to add VAT. For private individuals or organisations without a valid VAT tax ID within the EU, we have to add your country’s local VAT percentage. The Netherlands: Surfly is based in the Netherlands so we have to add 21% VAT to customers (companies and individuals) based in the Netherlands.</p>


**Can I cancel my subscription?**
<p>Yes, you can cancel your subscription at any moment. The subscription will remain active until the end of the current contract period (month or year). Alternatively, you can also downgrade to the Free Version.</p>


**What is a seat?**
<p>Surfly’s license is user based, this means that while any seat can create an unlimited number of sessions each seat is to be used by a single user. Sharing a single seat over multiple users is not allowed.</p>


##Initial Setup{#initialSetup}

**Where can I find the code snippet?**
<p>The javascript snippet can be found when you login to your Surfly account. Click on the "settings" link on the menu bar to the left of the screen, and then select "Integration". You may have to click on "generate API keys", before the javascript snippet is shown. You will also have to add your websites domain name (e.g example.com) to the "specify domain names" section just below the code snippet, then click on "setup widget".</p>


**Do I have to put the code snippet on every page?**
<p>Unless you want to use session continuation, you only need to put the code snippet on the pages you wish to start a session from. If you would like to use [session continuation](introduction/integrationOptions.md/#sessionContinuation), the code snippet should be on every page you want to transfer cookies from.</p>


**How do I take a call?**
<p>Login to your Surfly account and navigate to the "Queue panel". Click on the "take call" button next to the session request. You will enter a Surfly session with the user who initiated the request.</p>


**How can I customise Surfly's widget?**


You can either specify your preferences directly in the code snippet (see the [widget options](widgetOptions/reference.md) for more details), or from the 'options' panel in your Surfly account.

![options panel](images/options-panel.jpg)

Changes to the widget code have priority over changes to the code snippet.

















