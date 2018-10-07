# @applicaster/zapp-react-native-bridge

![npm version](https://badge.fury.io/js/%40applicaster%2Fzapp-react-native-bridge.svg)

This package contains our interfaces for using the Zapp Native Modules.
By design, modules should be imported by their direct path

```javascript
import { sendQuickBrickEvent } from "@applicaster/zapp-react-native-bridge/QuickBrick";
sendQuickBrickEvent("quickBrickReady");
```

In addition to the above, you can use native bridged modules from [react-native-zapp-bridge](https://github.com/applicaster/React-Native-Zapp-Bridge)

## QuickBrick

This module is used to interact with the main app.

- `sendQuickBrickEvent: (eventName: string, payload: ?{[string]: any}) => void`: sends an event to the QuickBrick native manager. For instance, sending the `quickBrickReady` event will tell the native side that the React Native App has finished its pre-loading tasks, and the view can be mounted. Other events may be added in the future
- `getAppData: () => AppData: { [string]: string | number }`: allows easy access to Applicaster App data (`accountId`, `accountsAccountId` a.k.a zappAccountId, `broadcasterId`, `bundleIdentifier`). See the available data on [iOS](https://github.com/applicaster/ZappReactNativeAdapter-iOS/blob/23cb6d09671ce7d7e6feeddc7647b7bbb60ab5bc/ZappReactNativeAdapter/Bridging/QuickBrickManager.swift#L69) and [android](https://github.com/applicaster/Zapp-Android/blob/2d1678ca2baf621605e7e88fbc76f6ceb30f590e/android_generic_app/src/main/java/com/applicaster/genericapp/quickbrick/AppConstants.java#L29)
- `getLegacyInitialProps: () => InitialProps: {[string]: any}`: allows easy access to the initial props provided by the legacy Zapp-iOS & Zapp-Android react native adapters.

## ZappPipes

In QuickBrick, Zapp-Pipes happens exclusively on the javascript side, in order to avoid native -> js VM -> native -> react native loop.
This module allows to interact with the ZappPipes engine.

- `bootstrapZappPipes: (providers: [Function]) => ZappPipesGetter`: initializes the ZappPipes engine given an array of providers, or data source plugins. It returns a `ZappPipesGetter` adapter:
  - `ZappPipesGetter.get: (dataSourceUrl: string, callback: function) => void`: tells ZappPipes to load the datasource Url, and to invoke the provided callback with the returned data

In most cases, this modules wouldn't need to be used, as ZappPipes is fully integrated in the ui_components and the redux store. However, it is possible to create a ZappPipes engine with the function above.
When calling this, the providers are cached to avoid multiple instantiations. The cache can be set & cleared with these functions :

- `setZappPipesAdapterCache: (providers: [Function], ZappPipesGetter) => void`: will set the providers & adapter in the cache
- `resetZappPipesAdapterCache: () => void`: clears the cached providers & adapter

## Favorites

In QuickBrick, favorites have been re-implemented using React Native's `AsyncStorage` module, which uses [the native global storage under the hood](https://facebook.github.io/react-native/docs/asyncstorage). It shouls be fine in most cases, but there might be edge scenarios where this is problematic, as the native side is not aware of these favorites.

It is not needed to use and store specific keys to manage favorites. Simply use the item data (vod, program, feed, show...), as long as it has an `id` property, the module will manage to handle it.

- `isFavorite: (item: any) => boolean`: tells wether an item is in the favorites
- `setAsFavorite: (item: any) => Promise<any>`: sets an item as favorite. Returns a promise which will return the response from AsyncStorage
- `removeFromFavorite: (item: any) => Promise<any>`: removes an item from favorites. Returns a promise which will return the response from AsyncStorage
- `getAllFavorites: () => Promise<items: [any]>`: returns all the favorites
