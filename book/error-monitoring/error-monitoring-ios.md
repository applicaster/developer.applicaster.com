
# Error Monitoring plugin - iOS

The iOS Error Monitoring plugin for Zapp is based on `ZPCrashlogsBaseProvider` implementing the `ZPCrashlogsPluginProtocol`.
The `ZPCrashlogsPluginProtocol` goes through all of the functions for initializing an error monitoring provider.

## Create a new Error Monitoring provider

This chapter describes how to build an error monitoring provider plugin. What kind of preparations are necessary, which protocol methods should be implemented etc.

### General Implementation

Before you start, please do the following important steps:

1. In your cocoapods files, add a dependency to `ZappCrashlogsPluginsSDK`. This dependency is a mandatory dependency for your error monitoring provider plugin. The dependency is available from the public repository cocoapods source `git@github.com:applicaster/PluginsBuilderCocoaPods.git`.
2. Create a new class for you plugin adapter that inherits from ZPCrashlogsBaseProvider.
3. Import `ZappCrashlogsPluginsSDK` and `ZappPlugins`
4. Start the plugin development

*__Notes__:*

* By inheriting `ZPCrashlogsBaseProvider` which is a base class for an error monitoring provider protocol you can wrap your error monitoring provider logic and use it inside the Zapp app.
* `ZappCrashlogsPluginsSDK` has a dependency to `ZappPlugins`. This SDK is not mandatory but it gives the developer access to use the Applicaster plugin tools, extensions, helper methods, ZappConnector logic, etc.
* The `ZPCrashlogsBaseProvider` class implements the `ZPCrashlogsPluginProtocol` protocol which is the protocol you should implement in every error monitoring provider plugin.

### Protocol description

The below describes the `ZPCrashlogsPluginProtocol` protocol methods.

#### Configure Provider

Initialize and register to your monitoring provider provider and call the completion when it done

```swift
func func activate(object: NSObject?, completion: ((NSObject?) -> Void)?)
```

## Plist Addition

We give that ability to add key-value parameters to app plist file. You can add new values in the plugin manifest `api.plist` section.

In the following example we added three parameters to the plist:

```json
"api": {
    "require_startup_execution": false,
    "class_name": "CrashlogClass",
    "modules": [
      "ZappCrashlogProvider"
    ],
    "plist": {
      "key": "value",
      "key2": "value2"
    }
}
```

## Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)
