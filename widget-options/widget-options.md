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

<a name="session-continuation"></a>
## Session Continuation{#session-continuation}

The high performance of Surfly can be attributed to our proxy approach. If a user wants to continue the web-session as-is, it is necessary to transfer all information to our proxy.

This feature is called 'session continuation', and works as follows:

 - A Surfly session is started on the current website from the same url in a hidden iframe
 - The widget makes sure that Surfly knows about session variables (cookies)
 - After the session has been started we synchronize the current state with the fresh state loaded through the iframe
 - When Surfly finish is about to end, we transfer session data to the original page

Session continuation is currently supported only for sessions started with the Surfly widget.
There are several ways to set up session continuation.

{% em color="#ffffe0" %}Please note: When integrating Surfly into your website, it is important to know that top level domains do not transfer third party cookies to the iframe, so instead you may choose to open a session in a new tab, or to use a CNAME.  {% endem %}


<a name="full-session"></a>
#### Full session continuation

This approach allows the transfer of all session data, including cookies with a `httpOnly`
flag. However, it requires some collaboration from the integrating website.
To make it work, the website needs to forward all HTTP requests for the path `/surfly_cookie_transfer/`
to the Surfly server. This is usually a small adjustment in load balancer configuration.

For example, if you use nginx, just add these lines in your config file:

``` javascript
location /surfly_cookie_transfer/ {
    proxy_pass https://surfly.com;
    proxy_set_header X-Continuation-Origin https://example.com;
    proxy_set_header X-Widget-Key 24d1414c71a94cbf9f205ed4fc4999b5;
}
```

In case of haproxy, see the example configuration below:

``` javascript
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

In Apache, something like this should do the trick (make sure you have **mod_ssl**, **mod_proxy**, **mod_proxy_http**, and **mod_headers** modules installed and loaded, see [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension) for details):

```xml
SSLProxyEngine On

<Location "/surfly_cookie_transfer/">
    RequestHeader set X-Continuation-Origin "https://example.com"
    RequestHeader set X-Widget-Key "24d1414c71a94cbf9f205ed4fc4999b5"
    ProxyPass "https://surfly.com/surfly_cookie_transfer/"
</Location>
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
<a name="soft-session"></a>
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

<a name="manual-cookie-scopes"></a>
#### Manual cookie transfer configuration

Default session continuation functionality works in most cases. However, if your application is using some special cookie scopes (for example, it sets cookies for specific path or subdomain), you might need to provide this information to Surfly.

This is possible with `cookie_transfer_scopes` setting. If specified, it should contain a list of JSON objects, each of them describing a single cookie using `name`, `path`, and `domain` properties:

```javascript
  cookie_transfer_scopes: [
    {name: 'shoppingcart', path: '/cart', domain: 'example.com'},
    {name: 'sessionid', path: '/', domain: '.example.com'}
  ]
```

The example above describes two cookies: `shoppingcart`, which is available on all pages under `example.com/cart`, and `sessionid`, which is set for all subdomains of `example.com`.

Both full and soft session continuation take `cookie_transfer_scopes` value into account. If `cookie_transfer_scopes` is set and not empty, only specified cookies will be transferred, which makes it possible to transfer only the session data you care about (normally you only need the session identifier).

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

#### Tracking queue status

You can also provide a Javascript function in the `QUEUE_CALLBACK` option to trace the status of the queue on the client side.
We will call this function every time a user is being queue'd, rejoins, or leaves the queue.

It will be called with two arguments:

 - status (true or false)
   - true   (on successful join or rejoin)
   - false  (after cancel, close)
 - session - a *JSON Response object* describing the session (this is received from `QUEUE_HANDLER` or `QUEUE_ENDPOINT`)