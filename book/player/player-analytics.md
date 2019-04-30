# Player Analytics

The following table represents the expected analytics events and parameters players should implement.
This covers event analytics only - not video analytics plugins at this point.

For more info about Sending Analytics Events, [Click Here](/analytics/client_side_api/client_side_api.md).

## Play VOD Item

Event name: `Play VOD Item`

Timed event: Yes

### Event Description:
Measures that a video item is played, and for how long. 
The item played holds the following parameter: The video type (Applicaster model, or ATOM type), Item Name and the parameters that are related to each type, i.e.: Season Name, Show Name, Show ID, Free/Paid, Item ID for Applicaster video model, and ATOM feed name for ATOM video type. 

Note that if a user leaves during the pre-roll, this event will not be counted. | Yes   | Free or Paid Video | Whether the item is free or paid (i.e. voucher or subscription)

### Event Parameters:

| Property | Explanation | Example | 
|----------|-------------|---------|
| Free or Paid Video | Whether the item is free or paid (i.e. voucher or subscription) | `Free` / `Paid` |
| Item ID | The ID of the item  | 4668901 |
| Item Name | Title of item (or name of the item if it is an embedded video within an ingested item like an article) | `S02E01: A New Dawn` | 
| Item Duration | The duration of the item (regardless of how much of that time was played by the user)  | 00:30:00 | 
| Completed | Whether or not the user completed the item (got to the end of the video before closing) | `Yes` / `No` | 
| VOD Type  | Data type  | `Applicaster Model` / `YouTube` / `ATOM` |
| View | What view the player was in when the video playing session began | `Full Screen` / `Inline` | 

## Play Live Stream

Event name: `Play Live Stream`

Timed event: Yes

### Event Description:
Identify how many live stream plays are triggered and for what channels.

### Event Parameters:

| Property | Explanation | Example | 
|----------|-------------|---------|
| Free or Paid | Whether or not the stream requires a purchase voucher to access | `Free` / `Paid` | 
| Item ID | "ID of the channel, as found in the data source feed" | 48581 | 
| Item Name | "Name of the channel, as found in the data source feed" | The Food Channel |
| View  | What view the player was in when the video playing session began | `Full Screen` / `Inline` | 

## Switch Player View

Event name: `Switch Player View`

Timed event: No

### Event Description:
Identify how frequently users switch the view from which the video play began.

### Event Parameters

| Property | Explanation | Example | 
|----------|-------------|---------|
| Original View | The view the user switched from | `Full Screen` / `Inline` |
| New View | The view the user switched to | `Full Screen` / `Inline` | 
| Free or Paid  | Whether or not the stream requires a purchase voucher to access  | `Free` / `Paid` |
| Item ID | The ID of the item | 4668901 |
| Item Name  | Title of item (or name of the item if it is an embedded video within an ingested item like an article) | S02E01: A New Dawn | 
| Video Type  | Whether the video is VOD or Live | `VOD` / `Live` |
| Item Duration | The duration of the item (regardless of how much of that time was played by the user). Only applicable if Video Type is VOD. | 00:30:00 |
| VOD Type  | Data type of VOD Item. Only applicable if Video Type is VOD | `Applicaster Model` / `YouTube` / `ATOM` |
| Timecode  | The timecode of the duration at point of making the switch. Only applicable if Video Type is VOD | 0:02:20 |
| Switch Instance | 1 + the number of times the user has already switched view in the video play session. For example: if the user already switched views once before this value would be 2. This may seem intuitively accessible to you, but keep in mind we are not sending this to a database and our customers are typically not using SQL or other query skills. It will be difficult for many customers to access this information indirectly without such a property. | 2 |
| Duration In Video | This actually differs from timecode in that users can pause, rewind, seek forward etc. Only do this one if it is not too complicated, won't take too much time, and won't affect performance, but analysts would want to know how much time a user spends on a video before switching views. | `15` |

## Pause

Event name: `Pause`

Timed event: No

### Event Description
Identify the usage of the pause control.

### Event Parameters

| Property | Explanation | Example | 
|----------|-------------|---------|
| Free or Paid | Whether or not the stream requires a purchase voucher to access | `Free` / `Paid` |
| Item ID  | The ID of the item | 4668901 |
| Item Name | Title of item (or name of the item if it is an embedded video within an ingested item like an article) | S02E01: A New Dawn |
| Video Type | Whether the video is VOD or Live | `VOD` / `Live` |
| View | What view the player was in when the video playing session began | `Full Screen` / `Inline` |
| Item Duration | The duration of the item (regardless of how much of that time was played by the user). Only applicable if Video Type is VOD | 00:30:00 |
| VOD Type  | Data type of VOD Item. Only applicable if Video Type is VOD | "Applicaster Model"/ "YouTube" / "ATOM" |
| Timecode  | The timecode of the duration at point of tapping pause. Only applicable if Video Type is VOD | 0:02:20 |
| Duration In Video  | This actually differs from timecode in that users can pause, rewind, seek forward, etc. Only do this one if it is not too complicated, won't take too much time, and won't affect performance, but analysts would want to know how much time a user spends on a video before switching views. | `15` | 

## Seek

Event name: `Seek`

Timed event: No

### Event Description
Identify how users utilize the seeker (if implementing this one would introduce complexity, performance issues, or just take a lot of time, let us know please).

### Event Parameters

| Property | Explanation | Example | 
|----------|-------------|---------|
| Free or Paid | Whether or not the stream requires a purchase voucher to access | `Free` / `Paid` | 
| Item ID | The ID of the item | 4668901 |
| Item Name | Title of item (or name of the item if it is an embedded video within an ingested item like an article) | S02E01: A New Dawn |
| Seek Direction | Whether the user seeks forward or backwards | `Fast Forward` / `Rewind` | 
| Ad Breaks Skipped  | Though the most recent ad break should play when the user stops seeking an analyst would want to know if revenue is lost from this behavior (more than one ad break skipped over). Ad break is equivalent to a UI indication in the seeker bar or a cue point. If there are two ad breaks, each of which include three midrolls, and the user seeks to the end, the value here should be 2, not 6. | `0` / `2` |
| View | What view the player was in when the user hits seek | `Full Screen` / `Inline` |
| Item Duration | The duration of the item (regardless of how much of that time was played by the user) Only applicable if Video Type is VOD  | 00:30:00 |
| VOD Type | Data type of VOD Item. Only applicable if Video Type is VOD | `Applicaster Model` / `YouTube` / `ATOM` |
| Timecode From | The timecode of the duration at point of starting the seek | 00:02:20 |
| Timecode To | The timecode of the duration at the point the seek action stops | 00:06:32 |

## Tap Rewind

Event name: `Tap Rewind`

Timed event: No

### Event Description
Identify the usage of the rewind control.

### Event Parameters

| Property | Explanation | Example | 
|----------|-------------|---------|
| Free or Paid | Whether or not the stream requires a purchase voucher to access | `Free` / `Paid` |
| Item ID | The ID of the item | 4668901 |
| Item Name | Title of item (or name of the item if it is an embedded video within an ingested item like an article) | S02E01: A New Dawn | 
| Video Type | Whether the video is VOD or Live | `VOD` / `Live` |
| View | What view the player was in when the video playing session began | `Full Screen` / `Inline` |
| Item Duration | The duration of the item (regardless of how much of that time was played by the user). Only applicable if Video Type is VOD  | 00:30:00  |
| VOD Type | Data type of VOD Item. Only applicable if Video Type is VOD | `Applicaster Model` / `YouTube` / `ATOM` |
| Timecode | The timecode of the duration at point of making the switch. Only applicable if Video Type is VOD | 0:02:20 |
