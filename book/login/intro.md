# Login Plugins

Login plugins are used in order to integrate the following capabilities:
* User registration: offer app user to register for an account
* User authentication: authenticate existing users with the backend
* User authorization: after authenticating, make sure the user has a valid entitlement for an action
* Offering various payment models: usually through in app purchases like subscriptions and one time purchases
* Expose user profile within the app for various uses such as analytics

The base functionality contains the 2 following actions:
* Upon encountering a locked item, check user compliance to a policy.
* Login with or without a certain context (Usually login is offered as a part of a flow such as playback or transitioning to a content screen. This function would cover offering a login button in the app)

Any login plugin can implement part or all of the mentioned functionalities and affect the app in multiple entry points such as:
* Application startup
* Check authentication or authorization between screens
* Check authentication or authorization before video playback

The following guides are here to go through the integration for each platform:
* [iOS](/login/iOS.md)
* [Android](/login/Android.md)