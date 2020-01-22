# Login Plugin - iOS

1. [The Login Provider Protocol](#login)
2. [The User Data Protocol](#user)
3. [The Provider Logic Protocol](#provider)
4. [Screen Hooks](#screen)
5. [Startup Hooks](#startup)

* * *

The iOS Login plugin for Zapp is based on implementing the `ZPLoginProviderProtocol`.
This protocol goes through all of the functions for initializing, checking complience and presenting a login screen.

In order to see a basic implementation of a login plugin, we suggest reviewing the [Login Plugin Demo Project](https://github.com/applicaster/zapp-plugins-examples/tree/master/LoginPlugin/iOS) as it's a good starting point for implementing a login plugin.

This guide will go through the basic terms and functions that need to be implemented in order to create a login plugin and extend on some additional protocols that provide additional functionality such as users, startup processing, and login and screen hooks.

For more info about Initial iOS Plugin Setup, [Click Here](/dev-env/iOS.md)

## The Login Provider protocol {#login}
The main protocol used for login plugins is `ZPLoginProviderProtocol`.
All login plugins must implement this protocol as it's part of what Zapp apps are expecting when initializing a login plugin.

### Initialization and general properties
The `ZPLoginProviderProtocol` protocol inherits from the `ZPAdapterProtocol` in order to initialize the plugin and save the configuration object.

The following initialization methods must be implemented:
``` swift
  public init(configurationJSON: NSDictionary?)
  public init()
```

The `configurationJSON` property should be then set as a property and exposed:
``` swift
  public var configurationJSON: NSDictionary? { get }
```

### Login and Logout
The following method is used for logging in:
``` swift
  func login(_ additionalParameters: [String: Any]?, completion: @escaping ((_ status: ZPLoginOperationStatus) -> Void))
```
The following method is used for logging out:
``` swift
  func logout(_ completion: @escaping ((_ success: ZPLoginOperationStatus) -> Void))
```

Notice the completion object contains a status parameter of type `ZPLoginOperationStatus`.

This status should be sent after the login or logout process (and any additional process if needed - such as authorization and purchase) are performed and can be returned with one of the following values:
* Completed successfully - login or logout process completed successfully
* Failed - login or logout process failed
* Canceled - user canceled the login or logout process

The following methods are helper methods used to understand the state of a user:
``` swift
  func isAuthenticated() -> Bool
  func isPerformingAuthorizationFlow() -> Bool
```

### User Token
The following methods are used for getting and setting user tokens.

The set user token function can be optionally exposed in order to allow webviews and react native views to set the token. If this function recieves `nil` - it should clear the user token.

``` swift
  @objc func getUserToken() -> String
  @objc optional func setUserToken(token: String?)
```

## The User Data Protocol {#user}
The user data protocol is used for enforcing specific user complience and is comprised by 2 optional methods differentiated by the use of a completion method:

``` swift
  @objc optional func isUserComply(policies:[String: NSObject]) -> Bool
  @objc optional func isUserComply(policies:[String: NSObject], completion: @escaping (Bool) -> ())
```

Please implement the appropriate one according to the usage.
The policies object is a dictionary that will contain the metadata giving the specific context.
Example values can be `playable_items` which would be an array of `ZPPlayable` items or `vod_item_id` for an Applicaster VOD item ID.

This complience method is usually called before a screen or a player to validate if a user should have access to the requested content.
To read more about `ZPPlayableItem` please refer to the iOS Player plugin document [Here](/player/iOS.md)

## The Provider Logic Protocol {#provider}
The `ZPLoginProviderLogicProtocol` is a protocol meant for standardizing the structure and calls through a flow.
This protocol is meant to be implemented in cases where the login interface is provided through React Native and is passed at the initialization of a React Native `ZPLoginReactNativeBridge` initialization method.

Here are the functions included in this protocol:

``` swift
  func register(params : [String: Any]?, completion: ((_ success: Bool, _ errorMessage: String?) -> Void)?)
  func login(params : [String: Any]?, completion: ((_ success: Bool, _ errorMessage: String?) -> Void)?)
  func recoverPassword(params : [String: Any]?, completion: ((_ success: Bool, _ errorMessage: String?) -> Void)?)
  func logout(params : [String: Any]?, completion: ((_ success: Bool, _ errorMessage: String?) -> Void)?)
  func loginDone(params : [String: Any]?, completion: ((_ success: Bool, _ errorMessage: String?) -> Void)?)
  func loginCancelled(params : [String: Any]?, completion: ((_ success: Bool, _ errorMessage: String?) -> Void)?)
```

## Screen Hooks {#screen}
A common way to involve the login plugin as a part of the flow of the app is setting it up as a hook between screens.
This means the plugin will be called before screen presentation and can choose to check complience, present login, or deny access.

For more about Hook Plugins [Click Here](/ui-builder/ios/PreHooks-ScreenPlugin.md).

## Startup Hooks {#startup}
Some login plugins need an initial startup to either:
* Present a login gateway at app launch
* Do an initial setup and try to silently login, update entitlements, etc.

For more information check the following [guide](/plugins/general-abilities/startup-hooks/ios/startup-hooks-ios.md).