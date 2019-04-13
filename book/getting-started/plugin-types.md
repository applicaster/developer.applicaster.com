# Plugin types

Before going into the technical parts of how a plugin is created and submitted let's quickly discuss the different types of plugins and functionalities the applicaster platform offers.

## Plugin types

### Advertisement
Advertisement type plugins are plugins wrapping ad SDKs.

These plugins can be used for serving banners, interstitial ads and video ads.

### Analytics
Analytics type plugins are plugins created to report analytics events from within the applications.

These types of plugins can report different kind of events such as events with only a title, events with a dictionary of parameters and timed events.
This would be also a great place to implement custom dimentions, user properties etc.

### Article
Article types plugins are used to display item metadata in the form of an article screen.

While classically the Zapp SDK would launch a video player per item - sometimes an article is a more appropriate type of screen for the user to encounter.

### Authorization provider
Authorization provider plugins can be implementations of various simple authorization systems.

Please note: This implementation is limited to using authorization providers in case videos are stored and served by [Applicaster's video backend](https://admin.applicaster.com).
For most usecases - please consider using a full fledged *login plugin*.

### Broadcaster selector
Broadcaster selector plugins are used when a single app uses the [Applicaster's video backend](https://admin.applicaster.com) and has multiple content libraries (for example multiple languages).
These plugins can be used at app startup or during the app runtime to switch the content library that is currently used.

### Cell Style Family
Cell style family plugins enable developer to introduce different cell styles and components to be used in Zapp App Builder screens.
This will enable developers to create their own tables, collections and various cells to be used in screens.

More than one cell style can be used inside an application.

### Data Source Provider
Datasource providers are used in order to fetch and parse data from 3rd party management systems or content feed and translate them to Applicaster Atom feeds.
Applicaster Atom feeds are the data form that Zapp apps consume in order to display content inside the app.

*Note:* Datasource providers are implemented in Javascript and published to both platforms. Currently supported in iOS and Android, Android TV and Fire TV. Coming soon for TV AppleTV and Roku.

### General
General type plugins that don't fit one of the other groups.
These plugins can implement custom screens and functionality, do startup time processing, handle custom URL schemes etc.

Read more about [plugin abilities](/getting-started/plugin-abilities.md)

### Login
Login plugins are used to implement authentication and authorization logics.
These type of plugins can be extended for user management, give per item handling with different policies and entitlements and offer in app purchases.

### Menu
Menu plugins are used to customize the presentation of base navigation such as side menu, Tab bar etc.

### Nav Item

### Payments

### Player
Player plugins are used to integrate third party plugins or change the default player plugin flow.
Once a player plugin is selected for an app - it will replace the Applicaster default player as the player launched for all VOD and live items.

### Push providers
Push provider plugins are implementations of push notifications services.

### Ui Component

[Plugin abilities](/getting-started/plugin-abilities.md)