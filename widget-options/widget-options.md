<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>

# Options details

Here, you can find more detailed examples of the widget options that require specific syntax.

<a name="restrictions"></a>
#### Blacklist and Whitelist format{#restrictions}
A string representation of the JSON array is expected. Every element of the array is an object with the following properties:
 - `pattern` - regular expression. The requested url will be matched to this regular expression
 - (optional) `redirect` - an url to redirect the user to. You can also specify the special {% raw %}{{referer}}{% endraw %} pattern in the beginning of a redirect link, and that will be replaced by the Referer value at the moment of redirect. Basically, the user will be redirected to the page where they clicked the restricted link.
 - (optional) `type` - restriction type. If present, and set to `"all"`, restriction will be applied to all requests (otherwise restrictions affect only requests to top-level pages)

A blocked url is always added as a query parameter to the redirect url:
``` javascript
http://mysite.com/restricted?blocked_url=https%3A%2F%2Fexample.com
```

If a session was started with the Surfly button, and you want to end the session when a user requests a restricted page, redirect them to the page that includes `widget.js` and execute the following code:
``` javascript
Surfly.session().end(redirect_url);

```

`endSession` function will trigger the following events:
 - session continuation
 - end of the session
 - leader is redirected to the page specified in `redirect_url`

##### Blacklist example:
Restrict access to the website `example.com`. When the user tries to access `example.com` they will be redirected to the default page provided by Surfly

``` javascript
{
    "pattern": ".*example\\.com.*"
}
```

##### Whitelist example:
Allow access only to the `example.com`. When the user tries to access any other website they will be redirected to the provided redirect url

``` javascript
{
    "pattern": ".*example\\.com.*",
    "redirect": "https://example.com/restricted"
}
```

## Detecting a Surfly Session

You might want to change the behaviour of the website depending on whether it is a
Surfly session or not. Example use cases are, for example, hiding a customized 'session
start' button within the Surfly session, or to remove certain toolbars for a more aesthetic
integration.

#### From within Javascript

To detect a Surfly session from the client side, you can simply
check for the existence of a global variable called `__surfly`

For example, to hide a button within a Surfly session, you could implement the
following:

```javascript
if (window.__surfly) {
    document.getElementById('session_start_button').display = "none";
}

```

#### At the backend

As all Surfly sessions will originate from our proxy servers, this could be used
as a way to identify whether the request comes from Surfly or a client directly.
However, we use different IP ranges for our proxy servers, and they also change
over time, so we recommend a different way to do this.

On each session that comes through our proxy, we will add an 'X-Forwarded-For'
header that points to the original IP of the 'leader'.

When creating a request, you can also set the 'headers' option (in both the
Javascript call and the REST call) to add additional headers. These headers can
be used to, for example, add an "Authorization" header to allow to user to be logged
in on your own backend or a custom header which can be used as an identifier. We
will send these headers with each request made during the session.

<a name="metadata"></a>
## Queue Behaviour Customization{#metadata}


Surfly comes with a relatively straightforward dashboard. We not only allow you to enrich
the information presented on this dashboard but you can also completely build your own dashboard
and integrate it in your own web application.

For example, if you have the widget
added to a section of your web application where the user is required to be logged in, you probably
have some knowledge about the user which might be useful to pass along to the agent. Information such
as the user's name, email or even their phonenumber.

To make sure that this information becomes available in the dashboard you can set `userData`
to an object that provides these values as key, value pairs. For example:

``` javascript
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+123123123123"
}
```

You can then pass this variable to the SurflySession.startLeader() function:
``` javascript
Surfly.session().startLeader(null, userData);
```

Of these key,value pairs, `name` and `email` will also be provided to the Surfly session so that the session can display the
name of the user in the chatbox and make sure that the accompanying gravatar matches his email address.

#### Tracking queue status{#queue-tracking}

You can also provide a Javascript function in the `QUEUE_CALLBACK` option to trace the status of the queue on the client side.
We will call this function every time a user is being queue'd, rejoins, or leaves the queue.

It will be called with two arguments:

 - status (true or false)
   - true   (on successful join or rejoin)
   - false  (after cancel, close)
 - session - a *JSON Response object* describing the session (this is received from `QUEUE_HANDLER` or `QUEUE_ENDPOINT`)
