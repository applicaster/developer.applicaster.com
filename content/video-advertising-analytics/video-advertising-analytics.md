# Video Advertisement Analytics

Video advertisements are traditionally tracked via your ad provider (i.e. Google DFP). However, to enable you to understand this activity in the context of the rest of your users' behaviors we've created an event called "Watch Video Advertisement", which you can use in the funnels of your analytics providers.

The event has many properties which can help you to slice the data in more meaningful ways. The available properties are outlined below

| Property Name          | Description                                                                                         | Example                                                                              |
|------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Video Ad Type          | The type of ad used                                                                                 | Preroll Midroll Postroll                                                             |
| Ad Provider            | The name of the ad provider                                                                         | DFP                                                                                  |
| Ad Unit                | The ad unit itself                                                                                  | http://pubads.g.doubleclick.net/gampad/ads?sz=480x320&iu...                          |
| Skippable              | Whether or not the ad was skippable                                                                 | Yes No                                                                               |
| Skipped                | If the video was skippable, whether or not it was skipped                                           | Yes No N/A                                                                           |
| Content Video Duration | Duration of the video on which a video ad was assigned                                              | 00:28:35                                                                             |
| Ad Break Time          | The timecode for the video content at which the video ad began                                      | 00:05:00                                                                             |
| Midroll Interval       | The midroll interval as configured in the CMS at which midrolls should appear (Measured in seconds) | 300                                                                                  |
| Ad Break Duration      | The duration of the ad break                                                                        | 00:00:20                                                                             |
| Ad Exit Method         | How the user finished viewing the ad break                                                          | Completed Skipped Ad Server Error Closed App Clicked Unspecified android_back_button |
| Time When Exited       | Duration of the video ad when the user exits the ad                                                 | 00:00:18                                                                             |
| Ad Server Error        | If applicable, value of error returned from Ad Server                                               | N/A Value returned from ad server                                                    |
| Clicked                | Whether the ad was clicked                                                                          | Yes No                                                                               |
| Item Name              | Name of the VOD Item in which the ad was inserted                                                   | Episode 1: A New Day                                                                 |
| Item ID                | The ID of the item in the Applicaster CMS                                                           | 3313469                                                                              |
| VOD Type               | The data type of the VOD Item                                                                       | Applicaster Model ATOM                                                               |
| ATOM Feed Name         | Title of the RSS feed of ATOM items (applicable only if VOD Type = Atom)                            | Boxeo                                                                                |
| Show Name'*             | Name of Show associated with the VOD Item, if applicable                                            | The Young and Well-Rested                                                            |
| Show ID'*               | The ID of the show associated with VOD Item, if applicable                                          | 5347023                                                                              |
| Season Name'*           | Name of Season associated with the VOD Item, if applicable                                          | Season 3                                                                             |
| Free/Paid'*             | Whether or not the video is a free or paid video                                                    | Free Paid                                                                            |

'* = this property only appears if the VOD Type = Applicaster Model. In other words, the property is only valid if the VOD Item does not come from an ATOM Feed.