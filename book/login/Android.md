# Login Plugin - Android

The Android Login plugin for Zapp is based on implementing the `LoginContract` contract.
This contract goes through all of the functions for initializing, checking complience and presenting a login screen.

This guide will go through the basic terms and functions that need to be implemented in order to create a login plugin and extends on some additional topics that provide additional functionality such as users, startup processing, and login and screen hooks.

## The Login Provider Contract
The contract used for login plugins is `LoginContract`.
All login plugins must implement this contract as it's part of what Zapp apps are expecting when initializing a login plugin.

### Login and Logout
The following methods are used for logging in:
``` java
  void login(Context context, Map additionalParams, Callback callback);
  void login(Context context, Playable playable, Map additionalParams, Callback callback);
```
The difference between the two is the first one is generic while the second one is more specific to Playable items, thus usually ran in the context of a playback or a specific video item.

For more info about `Playable`, [Click Here](/player/Android.md)

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
This means the plugin will be called before screen presentation and can choose to check complience, present login, or deny access.

For more about Hook Plugins [Click Here](/ui-builder/android/ScreenHooks.md).

## Startup Hooks

Some login plugins need an initial startup to either:
* Present a login gateway at app launch
* Do an initial setup and try to silently login, update entitlements, etc.

For more information check the following [guide](/plugins/general-abilities/startup-hooks/android/startup-hooks-android.md).