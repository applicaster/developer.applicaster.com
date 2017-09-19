#  Analytics Overview

Applicaster provides a broad set of custom analytics events to help customers understand their end user behavior and thereby more effectively make data-driven business decisions. These events are sent to behavioral analytics providers and can be found here: [Applicaster Custom Events](http://developer.applicaster.com/products-list?docType=Analytics)

Applicaster handles and delivers analytics data through an internal tool called Morpheus, described further below.

Morpheus, like all of Zapp, supports a "Plugin" system, where third party analytics providers can be "plugged in" to the system and automatically start receiving all of the events referenced above. Additionally, most analytics provider have their own set of "out-of-the-box" functionality and events (i.e. retention reporting, session tracking) as part of their SDK, which Applicaster also supports. 

Applicaster supports the following analytics providers:

* Google Analytics
* Mixpanel
* Flurry
* comScore DAX
* Net Metrix
* CoolaData
* Liftoff
* AGOF
* OWA

Additionally, Applicaster also supports the following video analytics providers:

* comScore Stream Sense
* Akamai Media Analytics

If you have needs which are not addressed by the providers above, you can speak with your Territory Manager about using the Plugin architecture to build an integration with a new analytics provider. Doing so will support the native SDK functionality of that provider and the custom events referenced above.

All supported providers can be set up as plugins on versions 4.5.4 (Android) and 4.2.7 (iOS) and up. In order to set up a plugin, reference the documentation [here](https://docs.google.com/a/applicaster.com/document/d/1md3Hmc-gg9NuEyIpQ43iDky_THc_5upcRMq8-QvkXHY/edit?usp=sharing).

For older versions of your app, please follow the directions outlined [here](https://applicaster.zendesk.com/hc/en-us/articles/206419186-Configuring-Analytics-at-Applicaster).


### Table of Contents:
* [Morpheus](/analytics/morpheus/morpheus.md)
* [Client Side API](analytics/client_side_api/client_side_api.md)
* [Mobile Web Support](/analytics/mobile_web_support/mobile_web_support.md)
* [Developing Analytics Plugins](/analytics/developing_analytics_plugins/developing_analytics_plugins.md)
* [Using Analytics Plugins for Integration Apps](/analytics/plugins_integration_apps/plugins_integration_apps.md)
* [Analytics Utility](/analytics/analytics_utility/analytics_utility.md)