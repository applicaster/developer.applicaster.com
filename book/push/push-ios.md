
# Push plugin - iOS

The iOS push plugin for Zapp is based on implementing the `ZPPushProviderProtocol`.
The protocol goes through all of the functions for initializing a push provider.

## Create a new push provider

This chapter describes how to build a push provider plugin. What kind of preparations are necessary, which protocol methods should be implemented etc.

### General Implementation
Before you start, please do the following important steps:

1. In your cocoapods files, add a dependency to `ZappPushPluginsSDK`. This SDK is mandatory dependency for your push provider plugin. The SDK is available from the public repository cocoapods source `git@github.com:applicaster/PluginsBuilderCocoaPods.git`.
2. Create a new class for you plugin adapter that inherits from ZPPushProvider.
3. Import `ZappPushPluginsSDK` and `ZappPlugins` 
4. Start the plugin development

*__Notes__:*
* By inheriting `ZPPushProvider` which is a base class for a push provider protocol you can wrap your push provider logic and use it inside the Applicaster app.
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

## Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)