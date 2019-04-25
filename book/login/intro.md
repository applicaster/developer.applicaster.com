# Login Plugins

Login plugins are used in order to integrate the following capabilities:
* User registration: offer app user to create new users
* User authentication: authenticate existing users with the backend
* User authorization: after authenticating - make sure user has a correct entitlement for an action
* Offering various payment models - usually through in app purchases like subscriptions and one time purchases
* Expose user profile within the app for various uses such as analytics

The base functionality contains the 2 following actions:
* Upon encountering a locked item - check user complience to a policy.
* Login with or without a certain context.

Any login plugin can implement part or all of the mentioned functionalities and affect the app in multiple entry points such as:
* Application startup
* Check authentication or authorization between screens
* Check authentication or authorization before video playback

The following guides are here to go through the integration for each platform:
* [iOS](/login/iOS.md)
* [Android](/login/Android.md)