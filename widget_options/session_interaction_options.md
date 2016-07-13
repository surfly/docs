![logo](../images/logosmall.png)
# Session interaction options



####Session Interaction Options

|  Option | Default | Description |
| ---------------| ------------|------------|
| agent_can_request_control | false | The agent can request control, after which it can be granted by the controller |
| agent_can_take_control | false | The agent can take control without the requirement that the controller needs to grant it |
| agent_can_end_session | true | Show End Session button on follower's end |
| allow_original_file_download | false | Allow users to download shared files (when set to false, users can only view them) |
| blacklist | "[]" | (enterprise only) Restrict access to the specific resources. [More...](#restrictions)|
| enable_sounds | true | Enable sound notifications |
| filesharing | true | Allow file sharing |
| follower_redirect_url | "" | After session end redirect the follower to a custom URL |
| format_session_id | true | Change the session id to something easy to communicate over the phone (eg, 123-123-123) |
| leader_redirect_url | "" | After the session ends, redirect the leader to a custom URL |
| low_quality_video | false | Video quality is limited to 320x240@15 |
| newurl  | true | Should we show the 'newurl button' in the widget? |
| on_end_redirect_follower_to_queue | false | After session end return the follower to the Surfly Queue page |
| sharing_button | true | Should we show the 'sharing button' in the widget? |
| splash | true | Do we need to show the splash screen on session start? |
| start_muted | false | All participants start with muted microphone |
| store_chat_logs | false | If enabled, chat logs will be available for download in Surfly dashboard |
| videochat | true | Is videochat allowed? |
| whitelist | "[]" | (enterprise only) Allow access only to the specific resources.
| only_embedded_sessions | false | By default, if 3rd-party cookies are disabled, we start the session in a new browser tab. If this option is set to true, Surfly will not start session when 3rd-party cookies are disabled. |

#### Whitelist and Blacklist format
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

## Session Continuation

The high performance of Surfly can be attributed to our proxy approach. If a
user wants to continue the web-session as-is, it is necessary to transfer
all information to our proxy.

This feature is called 'session continuation', and works as follows:

 - A Surfly session is started on the current website from the same url in a
   hidden iframe
 - The widget makes sure that Surfly knows about session variables (cookies)
 - After the session has been started we synchronize the current state with the
   fresh state loaded through the iframe
 - When Surfly finish is about to end, we transfer session data to the original
   page

Session continuation is currently supported only for sessions started with
Surfly widget.
There are several ways to set up session continuation.

### Full session continuation

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


### Soft session continuation

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

