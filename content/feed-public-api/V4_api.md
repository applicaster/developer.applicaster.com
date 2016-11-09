Stars Public API v4
=======================================

This document describes the Stars Public API and it is used to read events
form both the Feed & Crossmates Applicaster products.

For details about terminology and prerequisites please follow the v3 API documentation.
The changes made in this v4 API only act upon the request made in order to fetch events

## Workflow

> Note: The v4 API follows the same logic as the v3 API but reimplements the way the events are being fetched.


### Request a list of events
Returns as many events as the client requests from the server (max 1000)

For the first request put the `start_time` of the episode.

As an addition, the client now can ask for events that happended before or after the `since` timestamp being sent in the query string. In order for the server to know which event to return a paramater `direction` should be sent in the query string with the possible values of `-1` - for events launched before the specified timestamp, and `1` - for events that where launched after the specified timestamp.

In order to get a specific amount of events the client can send a parameter named `amount`.

**Request:**
```
<Base URL>/v3/zones/<zone_id>/events.json?feed_ids[]=<feed_id1>&feed_ids[]=<feed_id2>&feed_ids[]=<feed_id_n>&since=:unix_timestamp_utc&direction=-1&amount=13
```

**Response:**

The response looks identical to the v3 responses in terms of attributes being returned. The response in this case will include only **13** events that belong to the event sources in the query string and this events will all have in common that they all were launched before the specified `since` timestamp.
