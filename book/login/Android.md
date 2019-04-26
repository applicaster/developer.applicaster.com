# Login Plugin - Android

The iOS Login plugin for Zapp is based on implementing the `LoginContract` contract.
The contract goes through all of the functions for initializing, checking complience and presenting a login.

This guide will go through the basic terms and functions that need to be implemented in order to create a login plugin and extends on some additional topics that provide additional functionality such as users, startup processing and login and screen hooks.

## The Login Provider Contract
The contract used for login plugins is `LoginContract`.
All login plugins must implement this contract as it's part of how the Zapp apps are expecting when initializing a login plugin.

### Login and Logout
The following methods are used for logging in:
``` java
  void login(Context context, Map additionalParams, Callback callback);
  void login(Context context, Playable playable, Map additionalParams, Callback callback);
```
The difference between the two is the first one is generic while the second one is more specific to Playable items - thus usually ran in context of a playback or a specific video item.

For more info about `Playable` [Click Here](/player/Android.md)

The following method is used for logging out:
``` java
  void logout(Context context, Map additionalParams, Callback callback);
```

The following property is used to understand the state of the user:
``` java
  boolean isTokenValid();
```

### User token and data
The following methods are used for getting and setting user tokens.

``` java
  default void getToken(Context context, Callback callback);
  String getToken();
  void setToken(String token);
```

The set user token (`setToken(String token)`) can be used in order to allow webviews and react native views to set the token.

The following methods are used for accessing the user data:
``` java
  default Map getUserData();
  default void setUserData(Map userData);
```

### Verifying access
The following functions are used to check user authorization or entitlement for specific data:

``` java
  boolean isItemLocked(Object model);
  default void isItemLocked(Context context, Object model, Callback callback);
```

Please implement the appropriate one according to the usage.

## Screen Hooks
A common way to involve the login plugin as a part of the flow of the app is setting it up as a hook between screens.
This means the plugin will be called before screen presentation and can choose to check complience, show login or deny access.

For more about Hook Plugins [Click Here](/ui-builder/android/ScreenHooks.md).

## Startup Hooks

Some login plugins need an initial startup for either:
* Present a login gate at the beginning of the app
* Do an initial setup and try to sliently login, update entitlements etc.

In order to implement this - a login plugin needs to implement some functions to run at the app launch and set the proper configuration in the manifest.

Those functions can be found in the `ApplicationLoaderHookUpI` which contains the following functions:
``` java
  /***
     * this function called after all the data loaded and before main activity opened.
     * @param context generic intro activity
     * @param listener listener to continue the application flow after execution finished.
     */
    void executeOnApplicationReady(Context context, HookListener listener);


    /***
     * this function called after Plugins loaded, you can add logic that not related to the application data
     * as Zapp strings or applicaster models.
     * @param context APIntroActivity
     * @param listener listener to continue the application flow after execution finished.
     */
    void executeOnStartup(Context context, HookListener listener);
```