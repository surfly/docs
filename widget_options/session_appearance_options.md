![logo](../images/logosmall.png)
# Session_appearance_options


### Session appearance options

|  Option | Default | Description |
| ---------------| ------------|------------|
| max_height | 0  | Restrict max height of the viewport |
| max_width | 0 | Restrict max width of the viewport |
| min_height | 0 | Restrict min height of the viewport |
| min_width | 0 | Restrict min width of the viewport |
| chat_box_color | #eb777f | Color of UI (chatbox) elements inside the session |
| dock_top_position | false | By default we place the dock at the bottom-left, with this option you can put it on top |
| docked_only | false | Only show the control options, do not show a video / textchat box |
| set_to_smallest | true | By default we resize the active viewport to viewport size of the participant with the smallest screen. This can be disabled |
| ui_off | false | Just co-browsing, no user interface (enterprise only) |
| white_label | false | Do not show a Surfly logo (enterprise only) |
| drawing_color | "default" | "Magic marker" color  |
| drawing_mode | "temporary" | "Magic marker" mode  |
| drawing_width | 15 | "Magic marker" width |
| drawing_timeout | 3| "Magic marker" timeout |


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