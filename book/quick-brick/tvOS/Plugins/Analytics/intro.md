## TvOS Analytics plugins

### Introduction

This Document will describe the general structure of Analytics plugins, and how they are working on TvOS with QuickBrick

#### Supported Apple TV variant:

Apple TV 4th Generation or later using tvOS 11.0 or higher

#### Available from ZappSDK 10.0.0 and above

#### Required Applicaster Frameworks:

- ZappPlugins
- ZappAnalyticsPluginsSDK

### Content

- <a href="#general">General</a>
- <a href="#api">API</a>

- [How To Create New Plugin?](/quick-brick/tvOS/Plugins/Analytics/GeneralAnalyticsHowCreate.md)

### Plugins

- [Google Analytics](/quick-brick/tvOS/Plugins/Analytics//GoogleAnalytics/GoogleAnalytics.md)

<a name="general" />

### General

Our tvOS SDK is using QuickBrick at its core.
This means that plugins are initialized from React Native.

The following is an example of a general implementation of an Analytics plugin based on a combination of Native and React Native code.

All analytics plugins must conform to the ZPAnalyticsProviderProtocol protocol as included in the ZappAnalyticsPluginsSDK framework. This protocol provides the necessary calls that each plugin of this type must implement.

##### Plugin initialization

1.  During the application launch phase - the `PluginManager` will try to initialize analytics plugin through the the `AnalyticsManager`.
    the AnalyticsManager will retrieve all available analytics plugins from the `plugin_configurations.json`.

        __Example:__ `plugin_configurations.json`
        ```
        [
            {
                "plugin": {
                    "api": {
                        "require_startup_execution": false,
                        "class_name": "ZappAnalyticsPluginGAtvOS.GoogleAnalyticsPluginAdapter",
                        "modules": []
                    },
                    "dependency_repository_url": [],
                    "platform": "tvos",
                    "author_name": "Anton Kononenko",
                    "author_email": "a.kononenko@applicaster.com",
                    "manifest_version": "0.1.1",
                    "name": "Google Analytics tvOS 2.0",
                    "description": "Provide Google Analytics as agent",
                    "type": "analytics",
                    "identifier": "google_analytics_tvos2",
                    "ui_builder_support": true,
                    "dependency_name": "ZappAnalyticsPluginGAtvOS",
                    "dependency_version": "0.1.1",
                    "whitelisted_account_ids": [
                        "5ae06cef8fba0f00084bd3c6"
                    ],
                    "min_zapp_sdk": "10.0.0",
                    "deprecated_since_zapp_sdk": "",
                    "unsupported_since_zapp_sdk": "",
                    "react_native": false
                },
                "configuration_json": {
                    "blacklisted_events": ""
                }
            }
        ]
        ```

2.  `AnalyticsManager` will save to local storage instances of the created plugins.
3.  After the Analytics manager will finish the initialization process for all plugins - they would be ready to use.

##### Sending events

1. Call `zapp-react-native-utils/manager.js` in order to send analytics events.
2. `zapp-react-native-utils/manager.js` will pass the event to the native bridge module.
3. The native bridge module will pass the event to the `AnalyticsManager`
4. `AnalyticsManager` will dispatch the event to all the previously initialized analytics plugins

The react native of the manager is implemented inside the following manager - zapp-react-native-utils/manager.js.
Please go to the <a href="#api">API</a> section for more details.

<a name="api" />

#### React-Native API

##### zapp-react-native-utils/manager.js

This helper is used to pass analytics events from React Native to the native side of the SDK.
**Note:** All events from React Native should use the following method and utility.

###### Public API

```
/**
 * Post event to application with event name and additional parameters
 *
 * @param {string} eventName Analytic event name
 * @param {Object} payload   Additonal parameters that will be passed with event
 */
function postAnalyticEvent(eventName, payload)
```

```
/**
 * Start timed event with event name and additional parameters
 *
 * @param {string} eventName Analytic event name
 * @param {Object} payload   Additonal parameters that will be passed with event
 */
function startAnalyticsTimedEvent(eventName, payload)
```

```
/**
 * Finish and post previously started timed event with event name and Additional parameters.
 * Additional parameters are merged with previous parameters before sending them.
 *
 * @param {string} eventName Analytic event name
 * @param {Object} payload   Additonal parameters that will be passed with event
 */
function endAnalyticsTimedEvent(eventName, payload)
```

#### Native API

##### ZPAnalyticsProviderProtocol in ZappAnalyticsPluginsSDK Framework

Each analytics plugin must conform to this protocol on the native side.
This protocol defines the main functions that need to be implemented including among others - initialization and sending events.

##### ZPAnalyticsProvider in in ZappAnalyticsPluginsSDK Framework

This class is a basic implementation for an analytics plugin.
It is highly advisable for other analytics plugins to inherit this class rather than conform to the protocol directly in order to simplify any integration.

<a name="newPlugin" />

### How to crete a new analytics plugin?

Please review the following [Example Project](https://github.com/applicaster/ZappAnalyticsPluginGAtvOS) to see a fully implemented analytics plugin example.
