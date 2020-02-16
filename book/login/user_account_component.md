# User Account Component (Login/Logout)

## Overview

The User Account Component is a UI component that can be added to screens via Zapp Studio (aka the UI builder) to trigger the Login / Logout functionality of the Login Plugin used by the app.
The typical usage of this component is on a Settings screen, where the app lets the user login to / logout out their account.

Login plugin developers should follow the implementation notes below to make sure their login plugin is compatible with the User Account Component.


## Implementation Notes

### Android

1. **Login**: UAC calls the following method: `login(Context context, Playable playable, Map additionalParams, LoginContract.Callback callback)` from the `LoginContract` interface.
You can determine that login method was called from UAC by checking `additionalParameters` map. 
UAC will pass string field `UserAccountTrigger` with `true` value into `additionalParameters Map<String, String>`.

 > NOTE: To guarantee that UAC data will be properly updated you must trigger `LoginContract.Callback callback` after finishing `login` action

2. **Logout**: UAC calls method `logout(Context context, Map additionalParams, Callback callback)` of `LoginContract` interface. 
You can determine that logout method was called from UAC by checking `additionalParameters` map. UAC will pass string field `UserAccountTrigger` with `true` value into `additionalParameters Map<String, String>`.

 > NOTE: To guarantee that UAC data will be properly updated you must trigger `LoginContract.Callback callback` after finishing `logout` action

3. During UAC init, the component will determine the current state of the user using `LoginContract.getToken()` call and checking that it is not null or empty.

### iOS

1. **Login:**  UAC calls method `login` of `ZPLoginProviderProtocol` protocol.

 > NOTE: You can determine that login function was called from UAC by checking `additionalParameters` dictionary. UAC will pass boolean field `UserAccountTrigger` with `true` value into `additionalParameters dictionary`.

2. **Logout**: UAC calls method `logout` of `ZPLoginProviderProtocol` protocol.

3. After performing login/logout action UAC each time calls function `isAuthenticated` of `ZPLoginProviderProtocol` protocol to change UAC label text.
