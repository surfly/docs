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


##### Drawing

There are multiple ways to communicate within a Surfly session. One of them is
the drawing feature. This is enabled by default and allows users who are not
in control to highlight features on the page in the style of a "magic marker".
As can be seen from the session appearance options table above, there are
four options used to change the drawing behavior: `drawing_mode`, `drawing_color`,
`drawing_width`, and `drawing_timeout`. They can be set both as session options and via postMessage API
(see the [postMessage commands](#postMessage_commands) section).

As the `drawing_color` is set to the `"default"` value, this means that each user will
draw with their own color. You can set it to any color you like (specify a valid CSS
color string, e.g. `"blue"` or `"#0000ff"`). In this case all users will draw
with the same color.

The `drawing_mode` option can be set to one of the following values:
- "temporary" - drawings will fadeout automatically
- "permanent" - drawings will stay there until the next drawing_mode change
- "disabled" - drawing functionality disabled

The `drawing_width` option controls the width in pixels of the "magic marker".

When the `drawing_mode` is set to "temporary" the `drawing_timeout` option
controls the time in seconds after which each drawn line starts to fade out.



