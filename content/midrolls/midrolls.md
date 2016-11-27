# Midrolls Release Notes

### Product Description

Midrolls enables our customers to monetize by serving video ads in the middle of video content, more similar to the TV experience, rather than at the beginning of video content. 

Midrolls are preferrable to pre-rolls as midrolls have less of an impact on video viewing; viewers are less likely to bounce out of a video during an advertisement if the ad comes in the middle of content rather than prior to it. Midrolls are also preferrable to post-rolls as they have higher impression and completion rates.

For information on how to configure midrolls as a customer, see this video-tutorial [here](https://applicaster.zendesk.com/hc/en-us/articles/208005076-Configuring-Midrolls).

As a support agent or PM, for information how to enable the fields for midrolls configuration, see this documentation [here](https://applicaster.zendesk.com/hc/en-us/articles/207983116-How-to-setup-midroll-fields-in-extensions).


### Release 1.0.0

Support for video ads served from Google DFP on Zapp Mobile Apps.

One ad unit per device type (iPhone, iPad, Android Smartphone, Android Tablet). 

Ad insertion is based on an interval in seconds, configured in the CMS, as outlined in the [video tutorial](https://applicaster.zendesk.com/hc/en-us/articles/208005076-Configuring-Midrolls). 

Midroll ad breaks are visualized in the seeker of the video player UI, as demonstrated below:

![midrolls](./midrolls.png)

#### Limitations

Midrolls 1.0 does not support video analytics providers like Akamai Media Analytics or comScore Stream Sense.

Additionally, Midrolls 1.0 requires that a valid ad unit must be configured in the CMS. If the ad unit has a date expiry, be sure to remove the ad unit from the Applicaster CMS before that date hits. If an expired ad unit or one that is otherwise limited (i.e. geotargetted) is configured, and this causes the ad unit to be invalid for a user, then the video content will pause and temporarily load the advertising video player during the middle of video play.

If you cannot provide ad units that will ensure universal validity or use a video analytics provider plugin, we recommend you wait for the release of Midrolls 1.1, as outlined [here](https://roadmap.applicaster.com/#feature_172)