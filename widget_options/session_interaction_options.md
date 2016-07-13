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