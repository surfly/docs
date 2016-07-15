# Reference


### Control Panel Options

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

##### Drawing options
|  Option | Default | Description |
| ---------------| ------------|------------|
| drawing_color | "default" | "Magic marker" color [see Drawing section below](#drawing_section) |
| drawing_mode | "temporary" | "Magic marker" mode [see Drawing section below](#drawing_section) |
| drawing_width | 15 | "Magic marker" width [see Drawing section below](#drawing_section) |
| drawing_timeout | 3| "Magic marker" timeout [see Drawing section below](#drawing_section) |

##### Video 
|  Option | Default | Description |
| ---------------| ------------|------------|
| videochat | true | Is videochat allowed? |
| low_quality_video | false | Video quality is limited to 320x240@15 |


| set_to_smallest | true | By default we resize the active viewport to viewport size of the participant with the smallest screen. This can be disabled |

| white_label | false | Do not show a Surfly logo (enterprise only) |

| max_height | 0  | Restrict max height of the viewport |
| max_width | 0 | Restrict max width of the viewport |
| min_height | 0 | Restrict min height of the viewport |
| min_width | 0 | Restrict min width of the viewport |


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


| on_end_redirect_follower_to_queue | false | After session end return the follower to the Surfly Queue page |

| splash | true | Do we need to show the splash screen on session start? |
| start_muted | false | All participants start with muted microphone |

| whitelist | "[]" | (enterprise only) Allow access only to the specific resources. [More...](#restrictions)|
| only_embedded_sessions | false | By default, if 3rd-party cookies are disabled, we start the session in a new browser tab. If this option is set to true, Surfly will not start session when 3rd-party cookies are disabled. |

