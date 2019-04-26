# Login Plugin - iOS

The iOS Login plugin for Zapp is based on implementing the `ZPLoginProviderProtocol`.
The protocol goes through all of the functions for initializing, checking complience and presenting a login.

In order to see a basic implementation of a login plugin, we suggest reviewing the [Login Plugin Demo Project](https://github.com/applicaster/zapp-plugins-examples/tree/master/LoginPlugin/iOS) as it's a good starting point for implementing a login plugin.

This guide will go through the basic terms and functions that need to be implemented in order to create a login plugin and extend on some additional protocols that provide additional functionality such as users, startup processing and login and screen hooks.

## The Login Provider protocol
The main protocol used for login plugins is `ZPLoginProviderProtocol`.
All login plugins must implement this protocol as it's part of how the Zapp apps are expecting when initializing a login plugin.

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

### User token
The following methods are used for getting and setting user tokens.

The set user token function can be optionally exposed in order to allow webviews and react native views to set the token. If this function recieves `nil` - it should clear the user token.

``` swift
  @objc func getUserToken() -> String
  @objc optional func setUserToken(token: String?)
```

## The User Data Protocol
The user data protocol is used for enforcing specific user complience and is comprised by 2 optional methods differenciated by the use of a completion method:

``` swift
  @objc optional func isUserComply(policies:[String: NSObject]) -> Bool
  @objc optional func isUserComply(policies:[String: NSObject], completion: @escaping (Bool) -> ())
```

Please implement the appropriate one according to the usage.
The policies object is a dictionary that will be containing the metadata giving the specific context.
Example values can be `playable_items` which would be an array of `ZPPlayable` items or `vod_item_id` for an Applicaster VOD item ID.

This complience method is usually called before a screen or a player to validate if a user should have access to the requested content.
To read more about `ZPPlayableItem` please refer to the iOS Player plugin documente [Here](/player/iOS.md)

## The Provider Logic Protocol

The `ZPLoginProviderLogicProtocol` is a protocol meant for starndartising the structure and calls through a flow.
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

## Screen Hooks
A common way to involve the login plugin as a part of the flow of the app is setting it up as a hook between screens.
This means the plugin will be called before screen presentation and can choose to check complience, show login or deny access.

For more about Hook Plugins [Click Here](/ui-builder/ios/PreHooks-ScreenPlugin.md).

## Startup Hooks

Some login plugins need an initial startup for either:
* Present a login gate at the beginning of the app
* Do an initial setup and try to sliently login, update entitlements etc.

In order to implement this - a login plugin needs to implement some functions to run at the app launch and set the proper configuration in the manifest.
Those functions can be found in the `ZPAppLoadingHookProtocol` which contains the following functions:
``` swift
  /*
    This method called after Plugins loaded locally, but the account load failed
    */
  @objc optional func executeOnFailedLoading(completion: (() -> Void)?)
  /*
      This method called after Plugins loaded, and also after initial account data retrieved, you can add logic that not related to the application data.
  */
  @objc optional func executeOnLaunch(completion: (() -> Void)?)
  
  /*
      This method called after all the data loaded and before viewController presented.
  */
  @objc optional func executeOnApplicationReady(displayViewController: UIViewController?, completion: (() -> Void)?)
  
  /*
    This method called after viewController is presented.
    */
  @objc optional func executeAfterAppRootPresentation(displayViewController: UIViewController?, completion: (() -> Void)?)

  /*
    This method called when the application:continueUserActivity:restorationHandler is called.
    */
  @objc optional func executeOnContinuingUserActivity(_ userActivity: NSUserActivity?, completion: (() -> Void)?)
```

Please note - the completion will basically delay any further progress in the place the hook is applied to - so be thoughtfull if a completion is needed.

Some best practices regarding this:
* If the completion can continue in the background - Please call the completion immediatly
* If the completion does some processing but doesnt display a UI - consider adding a loading view controller and managing it untill you can dismiss it and call the completion. (For example after the App Root Presentation happened)
* If completion requires presenting a UI and a certain flow (Like a login gate to the app) - Call the complition after finishing dismissing the view controller.