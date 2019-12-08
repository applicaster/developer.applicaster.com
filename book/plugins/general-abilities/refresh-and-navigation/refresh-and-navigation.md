# Navigation and Refresh

In this chapter we'll talk about the ability of screen navigation and screen refresh.

`Screen navigation` allows you to navigate to a different screen while in `screen refresh` you will retrieve a new screen model and refresh the screen.

## iOS Implementation

To use the following utility methods you first need to do the following:

1. In your podspec file add a dependency to `ZappPlugins`. The minimum `ZappPlugins` version required is v11.0.3.
2. In your plugin adapter class add an import to `ZappPlugins`.
3. The plugin can be tested with Zapp-iOS v13.0.0 and above.

See below the main useable methods:

1. Clean the app screens stack and open the `Home` screen. The behavior is equivalent to restart app without showing a splash screen. In this process, the home screen data model will be retrieved again.

    ```swift
    ZAAppConnector.sharedInstance().navigationDelegate?.reloadRootViewController()
    ```

2. Reload the current data model and refresh the screen. The `shouldReloadStack` boolean variable determines whether to refresh all `pushed` app stack view controllers or just the current top view controller.

    ```swift
    ZAAppConnector.sharedInstance().navigationDelegate?.reloadCurrentScreen(shouldReloadStack: Bool)
    ```

## Android Implementation

To use the following utility methods you first need to do the following:

1. In your plugin gradle file add a dependency to `applicaster-android-sdk`. Please note that the minimum version required is v4.2.5.
2. The plugin can be tested with `Zapp-android` v13.0.0 and above.

### Redirect

The `AppRedirectReceiver` class provides a redirect functionality for GenericBaseFragmentActivity

See below the main useable methods:

1. Clean the app screens stack and open a screen according to `screenId` parameter. The behavior is equivalent to restart app without showing a splash screen and open the relevant screen.

    ```swift
    AppRedirectReceiver.INSTANCE.redirect(screenId)
    ```

### Refresh

The `AppRefreshReceiver` Class provides a refresh functionality for GenericSetBaseFragment through the LiveData observable. Note that if a screen can't be refreshed right away we will do lazy refresh which means that the screen will be updated once it is possible.

See below the main useable methods:

1. Refresh the screen according to the `screenId` parameter. Once showing the relevant screen, the data model will get retrieved and the screen will get refreshed.

    ```swift
    AppAppRefreshReceiverReceiver.INSTANCE.triggerRefreshEvent(screenId)
    ```

2. The method will refresh all app stack screens and not just the current showed screen.

    ```swift
    AppAppRefreshReceiverReceiver.INSTANCE.triggerRefreshEvent()
    ```
