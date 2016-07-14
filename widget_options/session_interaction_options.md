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

