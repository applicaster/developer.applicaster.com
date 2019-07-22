
# Push plugin - iOS

## Create a new push provider

### General Implementation
Before you start, please do the following important steps:

1. In your cocoapods files, add a dependency to `ZappPushPluginsSDK`. This SDK is mandatory dependency for your push provider plugin. The SDK is available from the public repository cocoapods source `git@github.com:applicaster/PluginsBuilderCocoaPods.git`.
2. Add a dependency to `ZappPlugins` in your cocoapods files. This SDK is not mandatory but it gives the developer access to use the Applicaster plugin tools, extensions, helper methods, ZappConnector logic, etc. This SDK is also available from the same cocoapods source we mentioned above.
3. Create a new class for you plugin adapter that inherits from ZPPushProvider.
4. Import `ZappPushPluginsSDK` and `ZappPlugins` 
5. Start the plugin development

*__Notes__:*
* By extending `ZPPushProvider` which is a base class for a push provider protocol you can wrap your push provider logic and use it inside the Applicaster app.

* The `ZPPushProvider` class implements the `ZPPushProviderProtocol` protocol which is the protocol you should implement in every push provider plugin.

### Protocol description

The below table describe the `ZPPushProviderProtocol` protocol methods.

| Method | Description |
| --- | --- |
| setBaseParameter | Add base parameters |
| getKey | Return a unique `string` base key |
| configureProvider | Initialize and register to your push provider and return the state setup |
| addTagsToDevice | Subscribe to all relevant tags |
| removeTagsToDevice | Remove to all relevant tags |
| getDeviceTags | Get device's tag list |
| didRegisterForRemoteNotificationsWithDeviceToken | Register Token with push server |
 

### Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)


### Public examples

We have created a public Github repository plugin for [firebase](https://github.com/applicaster/zapp-push-plugin-firebase) for both iOS/Android.