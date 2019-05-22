# Applicaster Zapp App Connector utilities for iOS plugins
One of the key tools to help plugins communicate with the Zapp Apps is using the Zapp App Connector.

The Zapp App Connector is a shared instance with multiple delegates set up at the app launch with helper methods that should be utilized by all apps.
Before importing various pices of the Applicaster SDK - please look for an App Connector delegate that might provide the desired functionality.

## Accessing Zapp App Connector
To access the Zapp App connector instance simply use:
``` swift
  ZAAppConnector.sharedInstance()
```

## App connector delegates
The following is a partial list documenting the main delegates and their functionalites.

### Localization
The Localization delegate used to fetch localized texts.

Calling the delegate: `ZAAppConnector.sharedInstance().localizationDelegate`
Implemented protocol: `ZAAppDelegateConnectorLocalizationProtocol`

### Navigation
The navigation delegate is used to provide current and top view controllers and to perform some basic navigation actions.

Calling the delegate: `ZAAppConnector.sharedInstance().navigationDelegate`
Implemented protocol: `ZAAppDelegateConnectorNavigationProtocol`

### Styles
The Styles delegate is used to fetch different styles per key (Dictionary comprised of Color, Font, Size).
The delegate contains helper methods for assigning styles to views, buttons, and labels.

Calling the delegate: `ZAAppConnector.sharedInstance().layoutsStylesDelegate`
Implemented protocol: `ZAAppDelegateConnectorLayoutsStylesProtocol`

### URL
The URL delegate is mainly used to fetch the app URL scheme

Calling the delegate: `ZAAppConnector.sharedInstance().urlDelegate`
Implemented protocol: `ZAAppDelegateConnectorURLProtocol`

### Chromecast
This delegate requires the Chromecast plugin to be added to the app.
This delegate helps communicating with a standard chromecast implementation for actions such adding chromecast button, showing extended player, and playing an item.

Calling the delegate: `ZAAppConnector.sharedInstance().chromecastDelegate`
Implemented protocol: `ZAAppDelegateConnectorChromecastProtocol`

### Facebook AcountKit
Helper wrapper for communicating with the Facebook SDK and with Facebook AccountKit.
This enables logging into Facebook, performing graph requests, and using Facebook Account Kit for authentication.

Calling the delegate: `ZAAppConnector.sharedInstance().facebookAccountKitDelegate`
Implemented protocol: `ZAAppDelegateConnectorFacebookAccountKitProtocol`

### Connectivity
Allows getting the current connectivity status or adding a class as a connectivity listener to get notifications for connectivity updates.

Calling the delegate: `ZAAppConnector.sharedInstance().connectivityDelegate`
Implemented protocol: `ZAAppDelegateConnectorConnectivityProtocol`

### Identity
The Identity delegate is used for getting the device ID and login tokens from current plugins.

Note: Currently the login plugin supports getting authentication status from plugins without a completion.

Calling the delegate: `ZAAppConnector.sharedInstance().identityDelegate`
Implemented protocol: `ZAAppDelegateConnectorIdentityProtocol`

### Images
The Images delegate is a helper wrapper for setting images with a URL.
It implements additional optional capabilities such as masking, placeholders, server resizing and setting image animations.
This uses a cache mechanism.

Calling the delegate: `ZAAppConnector.sharedInstance().imageDelegate`
Implemented protocol: `ZAAppDelegateConnectorImageProtocol`

### Audio Session
The Audio Session delegate is a helper wrapper to consolidate setting audio sessions. For example, it simplifies setting audio playback behavior in the background.

Calling the delegate: `ZAAppConnector.sharedInstance().audioSessionDelegate`
Implemented protocol: `ZAAppDelegateConnectorAudioSessionProtocol`

### Sticky view
This Delegate helps present sticky views (such as mini players) throughout the application.

Calling the delegate: `ZAAppConnector.sharedInstance().stickyViewDelegate`
Implemented protocol: `ZAAppDelegateConnectorStickyViewProtocol`

### HQME (High Quality Media Experience)
The HQME delegate is a helper wrapper around the Applicaster VOD download system; it enables downloading eligible VOD items, getting progress updates, and deleting them.

Calling the delegate: `ZAAppConnector.sharedInstance().hqmeDelegate`
Implemented protocol: `ZAAppDelegateConnectorHqmeProtocol`
