![logo](images/logosmall.png)
<a name="widget-options"></a>
# Surfly options


Here, you can find the reference tables for each of the Surfly options that can be specified in the code snippet, set from the 'Options' panel or used with the REST API.


## Reference Tables


<h3 class="table_class">Control Panel Options</h3>

<a name="chatbox-options"></a>
##### Chat box options
|  Option | Default | Description |
| ---------------| ------------|------------|
| chat_box_color | #eb777f | Color of UI (chatbox) elements inside the session |
| dock_top_position | false | By default we place the dock at the bottom-left, with this option you can put it on top |
| docked_only | false | Only show the control options, do not show a video / textchat box |
| ui_off | false | Just co-browsing, no user interface (enterprise only) |
| newurl  | true | Should we show the 'newurl button' in the widget? |
| store_chat_logs | false | If enabled, chat logs will be available for download in Surfly dashboard |
| sharing_button | true | Should we show the 'sharing button' in the widget? |

#####Drawing options
|  Option | Default | Description |
| ---------------| ------------|------------|
| drawing_color | "default" | "Magic marker" color |
| drawing_mode | "temporary" | "Magic marker" mode  |
| drawing_width | 15 | "Magic marker" width |
| drawing_timeout | 3| "Magic marker" timeout |

##### Video 
|  Option | Default | Description |
| ---------------| ------------|------------|
| videochat | true | Is videochat allowed? |
| low_quality_video | false | Video quality is limited to 320x240@15 |

##### File sharing
|  Option | Default | Description |
| ---------------| ------------|------------|
| filesharing | true | Allow file sharing |
| allow_original_file_download | false | Allow users to download shared files (when set to false, users can only view them) |

##### Sounds
|  Option | Default | Description |
| ---------------| ------------|------------|
| start_muted | false | All participants start with muted microphone |
| enable_sounds | true | Enable sound notifications |


##### Button appearance
|  Option | Default | Description |
| ---------------| ------------|------------|
| theme_font_background | surfly-red | The support button background color |
| theme_font_color | white | The support button foreground color|
| theme_font_size | 14 | The size of the text in the button |
| hidden | false | Do not show the button |
| position | 'bottomleft' | Positions the Surfly Support Button. The options are: 'bottomleft', 'bottomright', 'middleright' |

##### Agent roles
|  Option | Default | Description |
| ---------------| ------------|------------|
| agent_can_request_control | false | The agent can request control, after which it can be granted by the controller |
| agent_can_take_control | false | The agent can take control without the requirement that the controller needs to grant it |
| agent_can_end_session | true | Show End Session button on follower's end |

<h3 class="table_class">Session configuration</h3>

##### Queue management
|  Option | Default | Description |
| ---------------| ------------|------------|
| QUEUE_METADATA_CALLBACK | false |  A JS callback that can provide optional metadata (see queue customization section below) |
| QUEUE_ENDPOINT | false | Custom queue endpoint (see queue customization section below) |
| QUEUE_HANDLER | false | Custom JS queue handler (see queue customization section below) |
| QUEUE_CALLBACK | false | JS callback for queue monitoring (see queue customization section below) 
|

##### Screen options/ viewport
|  Option | Default | Description |
| ---------------| ------------|------------|
| max_height | 0  | Restrict max height of the viewport |
| max_width | 0 | Restrict max width of the viewport |
| min_height | 0 | Restrict min height of the viewport |
| min_width | 0 | Restrict min width of the viewport |
| set_to_smallest | true | By default we resize the active viewport to viewport size of the participant with the smallest screen. This can be disabled |


##### Enterprise options
|  Option | Default | Description |
| ---------------| ------------|------------|
| white_label | false | Do not show a Surfly logo (enterprise only) |
| blacklist | "[]" | (enterprise only) Restrict access to the specific resources.|
| whitelist | "[]" | (enterprise only) Allow access only to the specific resources. |

<h3 class="table_class">Session Interaction</h3>

##### Session start
|  Option | Default | Description |
| ---------------| ------------|------------|
| auto_start | false | Instead of showing a button, immediately start a session |
| autohide_button | true | Hide the Surfly button when no agent is available |
| stealth_mode | true | When enabled, users can use CTRL + ENTER to start a Surfly session |
| format_session_id | true | Change the session id to something easy to communicate over the phone (eg, 123-123-123) |
| splash | true | Do we need to show the splash screen on session start? |
| block_until_agent_joins | true | In case of Surfly button, block the screen until a follower joins |


##### Cookies
|  Option | Default | Description |
| ---------------| ------------|------------|
| only_embedded_sessions | false | By default, if 3rd-party cookies are disabled, we start the session in a new browser tab. If this option is set to true, Surfly will not start session when 3rd-party cookies are disabled. |
| cookie_transfer_enabled | true | |
|  cookie_transfer_proxying | true | |
|  cookie_transfer_urls | | | |

##### Session end
|  Option | Default | Description |
| ---------------| ------------|------------|
| follower_redirect_url | "" | After session end redirect the follower to a custom URL |
| leader_redirect_url | "" | After the session ends, redirect the leader to a custom URL |
| on_end_redirect_follower_to_queue | false | After session end return the follower to the Surfly Queue page |
| end_of_session_popup_url | false | if this parameter is set, after session end the user will see a popup window with contents from the specified URL |


