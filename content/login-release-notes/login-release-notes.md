# Login Release Notes

#### Product Description

Login is an Applicaster service which enables our customers to collect user data and/or authorize access to content via end user authentication.

This is supported both via a plugin system for native SDKs and via APIs for mobile web options which can be launched in-app.

#### Release Notes
#### Version 2.0

##### Overview
Version 2.0 provides a plugin system for integrating third-party native login providers with SDKs into an Applicaster Zapp App. The system also provides a series of API endpoints through which the plugin developer can support login and authentication functionality. Login 2.0 is supported on Zapp SDK Versions 4.5.5 (Android) and 4.2.9 (iOS) and up.

##### Features

Login 2.0 supports the following abilties for login native plugins:

* To use the provider's UI or to build the UI on the plugin to interact with the third party API
* To initiate the login activity upon app launch 
    * We've  added two entry points to the application loading flow which can be used by a login plugin. One on app launch *before* loading the application data, which enables the plugin to require login at the start of the app launch. The other entry point occurs on app launch *after* loading the application data, in case any of the data loaded during that process, such as account id, is required by the third party provider. For example, this enables the plugin to check that if the token is valid, not to launch the login interface.
* To initiate the login activity via URL Scheme
* To initiate the login activity when a user attempts to access a locked VOD Item or a locked (not free) Live Stream
	* Content that is ingested can also ingest Subscription IDs. Similarly Subscription IDs associated with a user can be sent by the login and stored locally. If these do not match, then the app can determine that the user is not authorized to access the content and then trigger the login activity via URL Scheme.
* To manage communication between the app and the plugin to determine whether or not a user is authorized to access an item
	* This can be done when the user tries to access an item, as well as when a cell representing the item is rendered (so that a locked icon can be presented in the UI) 
* To initiate the login activity when any other plugin is launched (i.e. a Video Player Plugin)
* To initiate the logout activity via URL Scheme
    * It's worth noting that URL Scheme can be used here in the same way as all URL Schemes in the app (via link categories, settings, take over activities, etc.). If you have any questions on the various flexible ways URL Schemes can be used, speak with your Account Manager or Applicaster Support.
* To send and receive metadata about a VOD Item 
    * i.e. The app sends the ID of a VOD Item and the login provider sends back whether or not the item is locked
    * This can be done when the user tries to access an item, as well as when a cell representing the item is rendered
* To check if the user is logged in or not

#### Version 1.0

Version 1.0 collects user data for users who log in anywhere in the app via Facebook or via Applicaster's Stitcher Product, as well as provides an API through which login web products can be launched in app and deliver data onwards to Applicaster. It is supported on Zapp SDK Versions 2.6.24 (Android) and 3.0.3 (iOS) and up.

Version 1.0 sends user profile data to [Mixpanel People](https://mixpanel.com/people/). Most analytics providers (Flurry, Google Analytics, Facebook Analytics, etc.) do not enable you to send PII (Personally Identifiable Information) or profile-level user data. Therefore, Applicaster delivers this user data to Mixpanel, which does support the storage of PII data. Mixpanel can also serve as an analytics tool and provides engagement and remarketing tools based on this data.

Additionally, developers can use Login 1.0 as a service to deliver user data for any web-based product that can be delivered in-app by use of [JS-2-Morpheus](http://developer.applicaster.com/docs/public/JS-2-Morpheus), an API that can receive analytics data and operates as a component of Applicaster's [JS-2-Native API](http://developer.applicaster.com/docs/public/js2native).

Lastly, developers can combine this offering with Applicaster's [Authentication Service](http://developer.applicaster.com/docs/public/authorization-provider) if they want the login to serve as a gateway to accessing content, hence incentivizing the act of logging in.