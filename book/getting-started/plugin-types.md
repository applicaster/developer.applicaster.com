# Plugin types

Before going into the technical parts of how a plugin is created and submitted, let's quickly discuss the different types of plugins and the functionalities that the applicaster platform offers.

## Plugin types

### Advertisement
Advertisement type plugins are plugins wrapping ad SDKs.
These plugins can be used for serving banners and interstitial ads.

For more info about Advertisement Plugins, [Click Here](/advertisement/intro.md).

### Analytics
Analytics type plugins are plugins created to report analytics events from within the applications.

These types of plugins can report different kinds of data such as events with only a title, events with a dictionary of properties, timed events, user profiles with both standard and PII user properties, and screen views.
Additionally, many analytics providers include their own data tracking functionality automatically via their SDKs.

For more info about Analytics Plugins, [Click Here](/analytics/overview.md).

### Article
Article type plugins are used to display item metadata in the form of an article screen.

While classically the Zapp SDK would launch a video player for a media item, sometimes an article is a more appropriate type of screen for the user to encounter.

### Authorization provider
Authorization provider plugins can be implementations of various simple authorization systems.

Please note: This implementation is limited to using authorization providers in case videos are stored and served by [Applicaster's video backend](https://admin.applicaster.com).
For most use cases, please consider using a full fledged *login plugin*.

For more info about Authorization Flow, [Click Here](http://developer.applicaster.com/docs/public/authorization-provider).

### Broadcaster selector
Broadcaster selector plugins are used when a single app uses [Applicaster's video backend](https://admin.applicaster.com) and has multiple content libraries (for example multiple languages).
These plugins can be used at app startup or during the app runtime to switch the content library that is currently used.

### Cell Style Family
Cell style family plugins enable developers to introduce different cell styles and components, which can then be used in Layouts tab of Zapp's UI Builder.
This will enable developers to create their own tables, collections, and various cells to be used in screens.

More than one cell style family can be used inside an application.

For more info about Components and Cell Styles, [Click Here](/ui-builder/components-and-cell-styles/intro.md).

### Data Source Provider
Datasource providers are used in order to fetch and parse data from 3rd party management systems or content feeds and translate them into Applicaster Atom feeds.
Applicaster Atom feeds are the data form that Zapp apps consume in order to display content inside the app.

*Note:* Datasource providers are implemented in Javascript and published to both platforms. Currently supported in iOS and Android, Android TV and Fire TV. Coming soon for TV AppleTV and Roku.

For more info about Datasource Providers, [Click Here](/Zapp-Pipes/Home.md).

### General
General type plugins don't match the description of any of the other plugin types.
Plugins of this type can be extended for user management, support per item handling with different policies and entitlements, and offer in app purchases.

For more info about Plugin Abilities, [Click Here](/getting-started/plugin-abilities.md)

### Login
Login plugins are used to implement authentication and authorization logic.
These type of plugins can be extended for user management, give per item handling with different policies and entitlements and offer in app purchases.

For more info about login plugins, [Click Here](/login/intro.md)

### Menu
Menu plugins are used to customize the presentation of base navigation such as side menu, tab bar, etc.

For more info about Root Menu Plugins, [Click Here](/ui-builder/RootMenuPluginsIntro.md)
For more info about Navigation Plugins, [Click Here](/ui-builder/NavigationBarPluginsIntro.md)

### Player
Player plugins are used to integrate third party players or change the default player plugin flow.
Once a player plugin is selected for an app, it will replace the Applicaster default player as the player launched for all VOD and live items.

For more info about Player Plugins, [Click Here](/player/intro.md).

### Push providers
Push provider plugins are implementations of push notifications services.

### Error Monitoring providers
Error Monitoring provider plugins are implementations of error monitoring services.

[Plugin abilities](/getting-started/plugin-abilities.md)
