
# Error Monitoring plugin - iOS
Supported from iOS SDK 13 and above

The iOS Error Monitoring plugin for Zapp implementing the `CrashlogsPluginProtocol`.
The `CrashlogsPluginProtocol` goes through all of the functions for initializing an error monitoring provider.

## Create a new Error Monitoring provider

This chapter describes how to build an error monitoring provider plugin. What kind of preparations are necessary, which protocol methods should be implemented etc.

### General Implementation

Before you start, please do the following important steps:

1. In your cocoapods files, add a dependency to `ZappCore`. This dependency is a mandatory dependency for your error monitoring provider plugin. The dependency is available from the public repository  `https://github.com/applicaster/AppleApplicasterFrameworks.git`.
2. Import `ZappCore`
3. Start the plugin development

*__Notes__:*

* In Dependency `ZappCore` provided protocol `CrashlogsPluginProtocol`
* This protcol must be implemented as part of `error_monitoring` plugin type.


### Protocol description

The below describes the `CrashlogsPluginProtocol` protocol methods.

#### Configure Provider

Initialize and register to your monitoring provider provider and call the completion when it done

```swift
func prepareProvider(completion: (_ isReady: Bool) -> Void)
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
