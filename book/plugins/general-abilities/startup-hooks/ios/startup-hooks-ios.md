# Startup Hooks

Some plugins need an initial startup to either:
* Present a screen gateway at app launch
* Do an initial setup and try to silently login, update entitlements, etc.

In order to implement this, a plugin needs to utilize the `ZPAppLoadingHookProtocol` protocol.

For convenience, the protocol methods were set to optional.

In addition, you will need to set a proper configuration inside the manifest file.

## Protocol Methods
The `ZPAppLoadingHookProtocol` protocol contains the following functions:
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

Please note - the completion will basically delay any further progress in place the hook is applied to - so be thoughtfull if a completion is needed.

Some best practices regarding this:
* If the completion can continue in the background, Please call the completion immediately
* If the completion does some processing but doesn't display any UI, consider adding a loading view controller and managing it until you can dismiss it and call the completion. (For example, after the App Root Presentation happened)
* If completion requires presenting any UI and a certain flow (like a login gateway to the app), call the completion after finishing dismissing the view controller.