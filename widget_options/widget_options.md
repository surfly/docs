<a href="https://www.surfly.com/">![logo](../images/logosmall.png)</a>

# Setting advanced Widget options

Here, you can find more detailed examples of the options that require specific syntax. 

<a name="restrictions"></a>
#### Blacklist and Whitelist format{#restrictions}
A string representation of the JSON array is expected. Every element of the array is an object with the following properties:
 - `pattern` - regular expression. The requested url will be matched to this regular expression
 - (optional) `redirect` - an url to redirect the user to. You can also specify the special `{{referer}}` pattern in the beginning of a redirect link, and that will be replaced by the Referer value at the moment of redirect. Basically, the user will be redirected to the page where they clicked the restricted link.
 - (optional) `type` - restriction type. If present, and set to `"all"`, restriction will be applied to all requests (otherwise restrictions affect only requests to top-level pages)

A blocked url is always added as a query parameter to the redirect url:
```
http://mysite.com/restricted?blocked_url=https%3A%2F%2Fexample.com
```

If a session was started with the Surfly button, and you want to end the session when a user requests a restricted page, redirect them to the page that includes `widget.js` and execute the following code:
```
Surfly.endSession(redirect_url);
```

`endSession` function will trigger the following events:
 - session continuation
 - end of the session
 - leader is redirected to the page specified in `redirect_url`

##### Blacklist example:
Restrict access to the website `example.com`. When the user tries to access `example.com` they will be redirected to the default page provided by Surfly

```
{
    "pattern": ".*example\\.com.*"
}
```

##### Whitelist example:
Allow access only to the `example.com`. When the user tries to access any other website they will be redirected to the provided redirect url

```
{
    "pattern": ".*example\\.com.*",
    "redirect": "https://example.com/restricted"
}
```

<a name="anchor_start"></a>
#### Using a special anchor link{#anchor_start}

Another way to start a session is to add the anchor '#surflystart' to any page
on which the Javascript snippet has been added. This can be used in various
ways, if you want to create a customized button that starts a session you can
simply put it within a "A" anchor. For example:

```html
<a href="#surflystart"> Start a surfly session </a>
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

<a name="session_continuation"></a>
## Session Continuation{#session_continuation}

The high performance of Surfly can be attributed to our proxy approach. If a user wants to continue the web-session as-is, it is necessary to transfer all information to our proxy.

This feature is called 'session continuation', and works as follows:

 - A Surfly session is started on the current website from the same url in a hidden iframe
 - The widget makes sure that Surfly knows about session variables (cookies)
 - After the session has been started we synchronize the current state with the fresh state loaded through the iframe
 - When Surfly finish is about to end, we transfer session data to the original page

Session continuation is currently supported only for sessions started with the Surfly widget.
There are several ways to set up session continuation.

Please note: When integrating Surfly into your website, it is important to know that top level domains do not transfer third party cookies to the iframe, so instead you may choose to open a session in a new tab, or to use a CNAME.

<a name="full_session"></a>
#### Full session continuation

This approach allows the transfer of all session data, including cookies with a `httpOnly`
flag. However, it requires some collaboration from the integrating website.
To make it work, the website needs to forward all HTTP requests for the path `/surfly_cookie_transfer/`
to the Surfly server. This is usually a small adjustment in load balancer configuration.
For example, if you use nginx, just add these lines in your config file:

```
location /surfly_cookie_transfer/ {
    proxy_pass https://surfly.com;
    proxy_set_header X-Continuation-Origin https://example.com;
    proxy_set_header X-Widget-Key 24d1414c71a94cbf9f205ed4fc4999b5;
}
```

In case of haproxy, see the example configuration below:

```
frontend example-com-https
  acl surfly_session_continuation hdr(host) -i example.com path_beg /surfly_cookie_transfer/
  use_backend surfly_continuation_point_https if surfly_session_continuation
  ...your custom configuration here...

backend surfly_continuation_point_https
    http-request set-header X-Continuation-Origin https://example.com
    http-request set-header X-Widget-Key 24d1414c71a94cbf9f205ed4fc4999b5
    http-request set-header Host surfly.com
    server surfly surfly.com:443 ssl
```

Please note that you also need to set additional request headers:
`X-Widget-Key` should contain your widget key (the same that is used in javscript snippet).
`X-Continuation-Origin` should contain the origin of the page where Surfly widget is integrated.
That is, a protocol scheme followed by domain name and a port in case it is non-standard.

After setting up the continuation point, add the following widget options:

```javascript
  cookie_transfer_enabled: true,
  cookie_transfer_proxying: true,
  cookie_transfer_urls: ["https://example.com/surfly_cookie_transfer/"]
```
<a name="soft_session"></a>
#### Soft session continuation

It is also possible to integrate session continuation without changing load
balancer configuration. All you need to do is to make sure that the Surfly widget
is present on all the pages you want to transfer cookies from (this is not necessarily
the same page where you start Surfly session from). However, soft session continuation
has some limitations:

- we will only transfer cookies from the current page
- for security reasons, a session will be transferred back only if the last page
  opened inside the session is on the same domain *and* has a Surfly widget on it
- since, in this case, Surfly doesn't have access to the HTTP requests, we *won't transfer
httpOnly cookies*

Make sure that you set the following options in your widget:
```javascript
  cookie_transfer_enabled: true,
  cookie_transfer_proxying: false
```

If you need more help with this, please contact us at support@surfly.com. We can
consult you on the implementation, or build the integration for you.

<a name="metadata"></a>
## Queue Behaviour Customization{#metadata}

It is possible to integrate Surfly into your website with a support
button. Once a user clicks this button, their support request will be queue'd
where one of the available agents can then answer the request. The user will be
the 'leader' of the session and the agent who joins will be the follower of the
session.

Surfly comes with a relatively straightforward dashboard. We not only allow you to enrich
the information presented on this dashboard but you can also completely build your own dashboard
and integrate it in your own web application.

Our Queue functionality works as follows:

  1. The user requests a session, through any of the provided options (button, #surflystart or Javascript call)
  2. We optionally enrich the Queue request by calling `QUEUE_METADATA_CALLBACK`, if set
  3. We call `QUEUE_HANDLER` with a *callback* and a *JSON Request Object* containing (enriched) session information.
    - Our own `QUEUE_HANDLER` will make a REST call to `QUEUE_ENDPOINT` with this *JSON object*
    - Once the QUEUE was succesfully called, `QUEUE_HANDLER` should call the provided *callback* with the status and
       a *JSON Response Object*
  4. On any further Queue status change we call `QUEUE_CALLBACK` with this *JSON Session Object*


#### Set a custom Queue Endpoint

You can configure the 'QUEUE_ENDPOINT' in the Javascript snippet to specify where
we should fire a request each time a new user wants to start a session.


##### JSON Request Format

As long as an agent is Queue'd, we will fire a POST request to this endpoint
containing the following JSON in the request body:


```
{
    "url": <actual url to start a session on>,
    "id": <session_id>,
    "viewer_link": <the link the agent needs to open to join the session>,
    "ip_address": <ip address of the website visitor>
}
```

Your controller that handles this request can then display or dispatch the
viewer link to any of the available agents.

##### JSON Response Format

The endpoint is expected to respond with a JSON object. It must contain at least one
field - `identifier`, which should be a unique string identifying the current session:

```
{
    "identifier": "<unique_id>",
    ...additional session metadata from server side...
}
```

We will pass the endpoint response to `QUEUE_CALLBACK` every time (see below), so you can
store session metadata in additional fields.


#### Set up custom Javascript Queue Handler

If you want to completely handle the Queue functionality yourself, you can also
provide us with a custom Javascript function object as a `QUEUE_HANDLER` option.

If it is specified, we will call `QUEUE_HANDLER` when a user requests a Surfly
session (instead of making an AJAX call to `QUEUE_ENDPOINT`). `QUEUE_HANDLER`
will be given two arguments:

- A JSON object with session information (see *JSON Request Format* for `QUEUE_ENDPOINT` above)
- A success callback function, `QUEUE_HANDLER`, must call this callback after a successful
  queue join. You must pass a session metadata object as a first argument (see *JSON
  Response Format* for `QUEUE_ENDPOINT` above)

<a name="queue_metadata_callback"></a>
#### Enriching a Queue request with Metadata{#queue_metadata_callback}

Prior to making the call to `QUEUE_HANDLER`, we will call `QUEUE_METADATA_CALLBACK`, which can enrich
the Queue request with additional METADATA from the client side. For example, if you have the widget
added to a section of your web application where the user is required to be logged in, you probably
have some knowledge about the user which might be useful to pass along to the agent. Information such
as the users' name, email or even their phonenumber.

To make sure that this information becomes available in the dashboard you can set `QUEUE_METADATA_CALLBACK`
to a special function that will return an object that provides these values as key, value pairs. For example:

```
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+123123123123"
}
```

Of these key,value pairs, `name` and `email` will also be provided to the Surfly session so that the session can display the
name of the user in the chatbox and make sure that the accompanying gravatar matches his email address.



#### Tracking queue status

You can also provide a Javascript function in the `QUEUE_CALLBACK` option to trace the status of the queue on the client side.
We will call this function every time a user is being queue'd, rejoins, or leaves the queue.

It will be called with two arguments:

 - status (true or false)
   - true   (on successful join or rejoin)
   - false  (after cancel, close)
 - session - a *JSON Response object* describing the session (this is received from `QUEUE_HANDLER` or `QUEUE_ENDPOINT`)

<a name="surfly_logs"></a>
## Creating custom log messages{#surfly_logs}
It is possible to create custom log message during the Surfly session using log function:
```
Surfly.log("Custom message");
```

