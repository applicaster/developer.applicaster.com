#  Analytics Overview

Applicaster provides a broad set of custom analytics events to help customers understand their end user behavior and thereby more effectively make data-driven business decisions. These events are sent to behavioral analytics providers and can be found here: [Applicaster Custom Events](https://applicaster.zendesk.com/hc/en-us/articles/115005587003-Applicaster-Custom-Analytic-Events)

Applicaster handles and delivers analytics data through an internal tool called Morpheus, described further below.

## Building an Analytics Plugin
Please use one of the following guides to build an analytics plugin for the relevant platform:
* [iOS](/analytics/iOS.md)
* [Android](/analytics/android.md)

## Morpheus
Morpheus supports a plugin system, where third party analytics providers can be "plugged in" to the system and automatically start receiving all of the events referenced above. Additionally, most analytics provider have their own set of "out-of-the-box" functionality and events (i.e. retention reporting, session tracking) as part of their SDK, which Applicaster also supports. 

Check the plugin gallery for the most up-to-date list of supported analytics providers.

The links below outline different aspects of our analytics infrastructure in more detail.

### Table of Contents:
* [Morpheus](/analytics/morpheus/morpheus.md)
* [Client Side API - Adding New Analytics Events](/analytics/client_side_api/client_side_api.md)
* [Mobile Web Support](/analytics/mobile_web_support/mobile_web_support.md)
* [Analytics Utility](/analytics/analytics_utility/analytics_utility.md)
