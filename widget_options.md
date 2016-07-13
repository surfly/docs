![logo](images/logosmall.png)

# Widget options




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



### Support button appearance

|  Option | Default | Description |
| ---------------| ------------|------------|
| auto_start | false | Instead of showing a button, immediately start a session |
| autohide_button | true | Hide the Surfly button when no agent is available |
| block_until_agent_joins | true | In case of Surfly button, block the screen until a follower joins |
| end_of_session_popup_url | false | if this parameter is set, after session end the user will see a popup window with contents from the specified URL |
| block_until_agent_joins | true | In case of the Surfly button, block the screen until a follower joins |
| end_of_session_popup_url | false | If this parameter is set, after session end the user will see a popup window with the contents from the specified URL |
| hidden | false | Do not show the button |
| position | 'bottomleft' | Positions the Surfly Support Button. The options are: 'bottomleft', 'bottomright', 'middleright' |
| QUEUE_METADATA_CALLBACK | false |  A JS callback that can provide optional metadata (see queue customization section below) |
| QUEUE_ENDPOINT | false | Custom queue endpoint (see queue customization section below) |
| QUEUE_HANDLER | false | Custom JS queue handler (see queue customization section below) |
| QUEUE_CALLBACK | false | JS callback for queue monitoring (see queue customization section below) |
| stealth_mode | true | When enabled, users can use CTRL + ENTER to start a Surfly session |
| theme_font_background | surfly-red | The support button background color |
| theme_font_color | white | The support button foreground color|
| theme_font_size | 14 | The size of the text in the button |


