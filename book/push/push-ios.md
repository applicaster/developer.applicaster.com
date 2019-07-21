
# Push plugin - iOS

## Create a new push provider

By implementing `ZPPushProvider` which is a base class for a push provider protocol you can wrap your push provider logic and use it inside an Applicaster app.

Before you start please do the following important steps:

1. In your cocoapods files, add a dependency to `ZappPushPluginsSDK`. This SDK is mandatory dependency for your push provider plugin. The SDK is avilable from the following cocoapods (public repo) source `git@github.com:applicaster/PluginsBuilderCocoaPods.git`.
2. Add a dependency to `ZappPlugins` in your cocoapods files. This SDK is not mandatory but it gives the developer access to use the Applicaster plugin tools, extensions, helper methods, ZappConnector logic, etc. This SDK is also available from the same cocoapods source we mentioned above.
3. Create a new class for you plugin adapter that inherits from ZPPushProvider.
4. Import `ZappPushPluginsSDK` and `ZappPlugins` 
5. Start the plugin development

The `ZPPushProvider` class is implementing our `ZPPushProviderProtocol` protocol. We recomend using it for your base implementation. See below the basic logic:

| Method | Description |
| --- | --- |
| getKey | return a unique `string` base key |
| configureProvider | Initialize and register to your push provider and return the state setup |
| addTagsToDevice | Subscribe to all relevant tags |
| removeTagsToDevice | Remove to all relevant tags |

In addition, as an example, we have created a public Github repository plugin for [firebase](https://github.com/applicaster/zapp-push-plugin-firebase).