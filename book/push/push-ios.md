
# Push plugin - iOS

The iOS push plugin for Zapp is based on implementing the `ZPPushProviderProtocol`.
The `ZPPushProviderProtocol` goes through all of the functions for initializing a push provider.

## Create a new push provider

This chapter describes how to build a push provider plugin. What kind of preparations are necessary, which protocol methods should be implemented etc.

### General Implementation

Before you start, please do the following important steps:

1. In your cocoapods files, add a dependency to `ZappPushPluginsSDK`. This dependency is a mandatory dependency for your push provider plugin. The dependency is available from the public repository cocoapods source `git@github.com:applicaster/PluginsBuilderCocoaPods.git`.
2. Create a new class for you plugin adapter that inherits from ZPPushProvider.
3. Import `ZappPushPluginsSDK` and `ZappPlugins` 
4. Start the plugin development

*__Notes__:*

* By inheriting `ZPPushProvider` which is a base class for a push provider protocol you can wrap your push provider logic and use it inside the Zapp app.
* `ZappPushPluginsSDK` has a dependency to `ZappPlugins`. This SDK is not mandatory but it gives the developer access to use the Applicaster plugin tools, extensions, helper methods, ZappConnector logic, etc.
* The `ZPPushProvider` class implements the `ZPPushProviderProtocol` protocol which is the protocol you should implement in every push provider plugin.

### Protocol description

The below describes the `ZPPushProviderProtocol` protocol methods.

#### Base Parameters

Add base parameters

```swift
func setBaseParameter(_ value:NSObject?, forKey key:String)
```

#### Get Provider Key

Return a unique `string` base key

```swift
func getKey() -> String
```

#### Configure Provider

Initialize and register to your push provider and return the state setup

```swift
func configureProvider() -> Bool
```

#### Add/Remove Tags

UNSubscribe/Subscribe to all relevant tags

```swift
@objc optional func addTagsToDevice(_ tags: [String]?, completion: @escaping (_ success: Bool ,_ tags: [String]?) -> Void)

@objc optional func removeTagsToDevice(_ tags: [String]?, completion: @escaping (_ success: Bool, _ tags: [String]?) -> Void)
```

#### Get Device Tags

Get device's tag list

```swift
@objc optional func getDeviceTags() -> [String]?
```

#### Notifications

Register Token with push server

```swift
@objc optional func didRegisterForRemoteNotificationsWithDeviceToken(_ deviceToken: Data)
```

Register userNotificationSettings with push server

```swift
@objc optional func didRegisterUserNotificationSettings(_ notificationSettings: UIUserNotificationSettings)
```

## Rich Media Notifications

When push notification arrives in an iOS app,  you may want to be able to download content in response to it or edit the content before it’s shown to the user. In iOS 10 and later, Apple allows apps to do that using new Notification Service Extension.

The following steps will help you setup and add a Notification Service Extension to an app:

1. Inside the plugin manifest JSON add an extra dependency for the `Notification Service Extension` which should be published with cocoapods. In the following example, we added support for the `UrbanAirship App Extensions` file.

    ```javascript
    "extra_dependencies": [
        {
            "NotificationServiceExtension": {
                "ZappPushPluginUrbanAirship/UrbanAirshipAppExtensions": "'~> 7.0.0'"
            }
        }
    ],
    ```

2. If the app extension is on different cocoapods dependency source than your push plugin, you will need to add the source (in a SSH format) to the `dependency_repository_url` array inside the manifest JSON.

3. In the manifest `custom configuration fields` JSON array you should include the following parameters in addition to the mandatory provider key/value parameters:

    ```javascript
    "custom_configuration_fields": [
        {
            "type": "checkbox",
            "key": "allow_enterprise_rich_push_notifications",
            "default": 1
        },
        {
            "type": "uploader",
            "key": "notification_extension_provisioning_profile",
            "tooltip_text": "Upload Notification Extension Provisioning Profile for Store builds only"
        }
    ]
    ```

    *__note__:* We are using the `notification_extension_provisioning_profile` file on the Zapp app relese proccess.  

## Plist Addition

We give that ability to add key-value parameters to app plist file. You can add new values in the plugin manifest `api.plist` section.

In the following example we added three parameters to the plist:

```javascript
"api": {
    "require_startup_execution": false,
    "class_name": "APPushProviderUrbanAirship",
    "modules": [
      "ZappPushPluginUrbanAirship"
    ],
    "plist": {
      "NSLocationAlwaysAndWhenInUseUsageDescription": "Your current location will be used to enable location based push notifications.",
      "NSLocationWhenInUseUsageDescription": "Your current location will be used to enable location based push notifications.",
      "NSLocationAlwaysUsageDescription": "Your current location will be used to enable location based push notifications."
    }
}
```

## Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)
* [How to Enable Rich Push Notifications for Store Versions on iOS](https://applicaster.zendesk.com/hc/en-us/articles/360021701432-How-to-Enable-Rich-Push-Notifications-for-Store-Versions-on-iOS-Notification-Service-Extension-)
* [How to Enable Rich Push Notifications for Debug Enterprise Versions on iOS](https://applicaster.zendesk.com/hc/en-us/articles/360024894431-How-to-Enable-Rich-Push-Notifications-for-Debug-Enterprise-Versions-on-iOS)
