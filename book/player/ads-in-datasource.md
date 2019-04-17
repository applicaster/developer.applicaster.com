# Configuring video ads in datasources
Some of the Applicaster datasources provide some info about video ads display.
Optionally those can be handled at the video player level.
This document describes the structure expected for those video ads.

Currently the following types of ads can be provided and displayed from datasources:
* VAST
* VMAP

## VAST
In the case of VAST - multiple ads can be added in an array form in the datasource playable object.
The array will be returned on the `extensions` - `video_ads` properties of the datasource item.

Each object in the `video_ads` array consists of the following fields:
* `offset`: Determines when the ad should appear. For Preroll / Postroll, the value should be a String (either `Preroll` or `Postroll` - Please use case insensitive handling in the implementation), and for Midrolls the value should be an Integer, indicating the start time of the ad from the beginning of the video (in seconds).
* `ad_url`: A url string of the VAST tag.

### Sample datasource object with VAST configuration
Here is an example of a video entry with ads configuration based on the VAST protocol.
In the example below, the Player Plugin should run a Preroll, a Midroll after 30 seconds and a Postroll:

```
{
  "type": {
    "value": "video"
  },
  "id": "5718802496001",
  "title": "Video with Preroll, Midroll and Postroll",
  "published": "2018-01-24T20:48:01+00:00",
  "extensions": {
    "video_ads": [
      {
        "offset": "preroll",
        "ad_url":"https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
      },
      {
        "offset": 30,
        "ad_url":"https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirectlinear&correlator="
      },
      {
        "offset": "postroll",
        "ad_url":"https://pubads.g.doubleclick.net/gampad
        /ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator="
      }
    ],
  }
}
```

## VMAP
In the case of VMAP - one VMAP configuration URL will be provided as a string under `extensions` - `video_ads`

### Sample datasource object with VMAP configuration
Here is an example of a video entry with ads configured based on the VMAP protocol:
```
{
  "type": {
  "value": "video"
  },
  "id": "5718802496001",
  "title": "Video with VMAP tag",
  "published": "2018-01-24T20:48:01+00:00",
  "extensions": {
    "video_ads":"https://pubads.g.doubleclick.net/gampad/ads?sz=
    640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpostpod&cmsid=496&vid=short_onecue&correlator="
	}
}
```

Note: This means the player should verify the type of object (String or array) in order to set up either one or many VAST tags for single ads or a single VMAP configuration.

As a sample of this implementation - please feel free to review our [Brightcove player plugin](https://github.com/applicaster/zapp-player-plugin-brightcove) that contains an implementation for this protocol for both iOS and Android.