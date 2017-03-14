<a href="https://www.surfly.com/">![logo](images/logosmall.png)</a>
<a name="widgetOptions"></a>
# Surfly options


Here, you can find the reference tables for each of the Surfly session options. You can choose the aspects of Surfly's functionality you want to integrate into your website and personalize your co-browsing sessions. These parameters can be set in the options panel or used in the Javascript or REST API.


{% em color="#ffffe0" %}Please note:
Changes to the code will take priority over changes to the options panel.{% endem %}


## Reference Tables


<h3 class="table_class">Control Panel Options</h3>

<a name="chatboxOptions"></a>
##### Chat box options{#chatboxOptions}
|  Option | Default | Description |
| ---------------| ------------|------------|
| chat_box_color | #eb777f | Color of UI (chatbox) elements inside the session |
| dock_top_position | false | By default we place the dock at the bottom-left, with this option you can put it on top |
| docked_only | false | Only show the control options, do not show a video / textchat box |
| ui_off | false | Just co-browsing, no user interface (enterprise only) |
| newurl  | true | Should we show the 'newurl button' in the widget? |
| store_chat_logs | false | If enabled, chat logs will be available for download in Surfly dashboard |
| sharing_button | true | Should we show the 'sharing button' in the widget? |
| allow_control_switching | true | Enable control switching functionality |

<a name="drawingOptions"></a>
#####Drawing options{#drawingOptions}
|  Option | Default | Description |
| ---------------| ------------|------------|
| drawing_color | "default" | "Magic marker" color |
| drawing_mode | "temporary" | "Magic marker" mode  |
| drawing_width | 15 | "Magic marker" width |
| drawing_timeout | 3| "Magic marker" timeout |

<a name="videoOptions"></a>
##### Video{#videoOptions}
|  Option | Default | Description |
| ---------------| ------------|------------|
| videochat | true | Is videochat allowed? |
| low_quality_video | false | Video quality is limited to 320x240@15 |

<a name="filesharingOptions"></a>
##### File sharing{#filesharingOptions}
|  Option | Default | Description |
| ---------------| ------------|------------|
| filesharing | true | Allow file sharing |
| allow_original_file_download | false | Allow users to download shared files (when set to false, users can only view them) |

<a name="sounds"></a>
##### Sounds{#sounds}
|  Option | Default | Description |
| ---------------| ------------|------------|
| start_muted | false | All participants start with muted microphone |
| enable_sounds | true | Enable sound notifications |

<a name="button_table"></a>
##### Button appearance{#buttonTable}
|  Option | Default | Description |
| ---------------| ------------|------------|
| hidden | false | Do not show the button |
| position | 'bottomleft' | Positions the Surfly Support Button. The options are: 'bottomleft', 'bottomright', 'middleright' |

##### Control switching{#control-switching}
|  Option | Default | Description |
| ---------------| ------------|------------|
| agent_can_request_control | false | A follower can request control, after which it can be granted by the leader |
| agent_can_take_control | false | A follower can switch control without an explicit leader consent |
| agent_can_end_session | true | Allow terminating a session from the follower's end |

<h3 class="table_class">Session configuration</h3>

<a name="screenOptions"></a>
##### Screen options/viewport{#screenOptions}
|  Option | Default | Description |
| ---------------| ------------|------------|
| max_height | 0  | Restrict max height of the viewport |
| max_width | 0 | Restrict max width of the viewport |
| min_height | 0 | Restrict min height of the viewport |
| min_width | 0 | Restrict min width of the viewport |
| set_to_smallest | true | By default we resize the active viewport to the viewport size of the participant with the smallest screen. This can be disabled |

##### Enterprise options
|  Option | Default | Description |
| ---------------| ------------|------------|
| white_label | false | Do not show a Surfly logo (enterprise only) |
| blacklist | "[]" | (enterprise only) Restrict access to the specific resources.|
| whitelist | "[]" | (enterprise only) Allow access only to the specific resources. |

More information on [restrictions](./widgetOptions/widgetOptions.md/#restrictions)

<h3 class="table_class">Session Interaction</h3>

##### Session start
|  Option | Default | Description |
| ---------------| ------------|------------|
| url | _&lt;current page&gt;_ | Initial URL that will be opened inside the session |
| autohide_button | true | Hide the Surfly button when no agent is available |
| stealth_mode | true | When enabled, users can use CTRL + ENTER to start a Surfly session |
| format_session_id | true | Change the session id to something easy to communicate over the phone (eg, 123-123-123) |
| splash | true | Do we need to show the splash screen on session start? |
| block_until_agent_joins | true | If using the Surfly button, block the screen until a follower joins |
| start_docked | false | starts the chat box in docked mode, but can be expanded during the session |


##### Cookies
|  Option | Default | Description |
| ---------------| ------------|------------|
| only_embedded_sessions | false | By default, if 3rd-party cookies are disabled, we will start the session in a new browser tab. If this option is set to true, Surfly will not start session when 3rd-party cookies are disabled. |
| cookie_transfer_enabled | true | |
|  cookie_transfer_proxying | true | |
|  cookie_transfer_urls | | | |

More information on [session continuation](./widgetOptions/widgetOptions.md/#sessionContinuation)

##### Session end
|  Option | Default | Description |
| ---------------| ------------|------------|
| follower_redirect_url | "" | After the session ends, redirect the follower to a custom URL |
| leader_redirect_url | "" | After the session ends, redirect the leader to a custom URL |
| on_end_redirect_follower_to_queue | false | After the session ends, return the follower to the Surfly Queue page |
| end_of_session_popup_url | false | If this parameter is set, after the  session ends the user will see a popup window with contents from the specified URL |


