# [![](/images/logosmall.png)](https://www.surfly.com)

# Webhooks

If your pricing plan allows API usage, you can register webhooks on the Integration page. Every webhook must be set with a valid URL and subscribed to at least one event.

When an event is triggered, we will send an HTTP POST request with a corresponding event data to each subscribed webhook. Request body is always a JSON-encoded object with the following structure:

```json
{
  "sequence_id": <integer>,
  "type": <string>,
  "data": <object>
}
```

* `sequence_id` is a unique ID assigned to the event. Sequence ids start from a certain positive number and increase with each new event. This way you can restore the correct sequence of events if they get out of order.
* `type` is a string representing an event type.
* `data` contains a JSON object. The object structure depends on the event type \(see below\)

If we detect that an event cannot be delivered \(for example, if the webhook URL is not available\), we will try again after some delay. If the delivery doesn't succeed after a reasonable number of retries, the webhook will be automatically deactivated, and admin users will be notified via email.

### Available events

Currently you can subscribe to the following events:

* `session.queued` 
  triggered when a session is placed in the queue
  ```json
  {
      "session_id": <string>,
      "leader_link": <string>,
      "viewer_link": <string>,
      "pin": <string>,
      "tags": <list of strings>,
      "meta": <string>,
      "start_time": <string timestamp>
  }
  ```



