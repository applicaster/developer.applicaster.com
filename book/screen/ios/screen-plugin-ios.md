## Zapp Screen Plugins infrastructure
Infrastructure that enables development of standalone screen (views) plugins.

1. [Description](#description)
2. [General](#general)
3. [Connection Plugins Screen with River.json](#connection)
4. [Client side explanation](#clientExplanation)
5. [Styles, keys and data source](#keys)
6. [React Native screen and Native screens](#screens)

* * *

##### Description {#description}
`Screen Plugins` are plugins that are presented as standalone screens, a user can trigger the launch of a screen from the navigation bar, root (menu) or click on any cell inside the application.These plugins can be native or react native. </br>
In this document you will find a guide that explains how to configure such a plugin. In addition, a screen plugin provides an API that gives developers to ability to customize their plugin via Zapp's UI-Builder.

![ScreenPluginsGeneral.png](/ui-builder/ios/Files/ScreenPluginsGeneral.png)
***

##### General {#general}

Any plugin can be defined as Screen Plugin. In order to do so, please follow these steps:
1. Implement `ZPPluggableScreenProtocol`. This protocol provides a simple initialization for your plugin. This is a simple initialization for your plugin.
The interface provides 3 parameters to the plugin:
- `pluginModel` Plugin Model itself will be passed in any case.
- `screenModel` ScreenModel that connected to your plugin
- `dataSourceModel` Data source of your screen plugin (optional). In some cases, your screen will require dynamic data source configured by the user. If you want to allow users to launch the screen from a tap on a cell the data source of the cell (as defined in the data source entry) will be passed automatically.

```
    init?(pluginModel:ZPPluginModel,
          screenModel:ZLScreenModel,
          dataSourceModel:NSObject?)
```
2. In the manifest of the plugin the `screen: true` key must be added. This key is needed to explain to UI Builder that this plugin can be added in the screen section. [Plugins manifest format](/zappifest/plugins-manifest-format.md)
3. A default presentation should be provided, read more below. <a href="#clientExplanation">Client side explanation</a>

##### Connect Plugin with Rivers API {#connection}

After adding `screen: true` flag on Zapp manifest, you will able to see your plugin in the available screens list when adding a screen in the UI Builder.

__Example:__ Contact Us or Settings Twitter Login
![ScreenPluginsCreateScreen.png](/ui-builder/ios/Files/ScreenPluginsCreateScreen.png)

When a user selects `Screen Plugins`, behind the scenes `UI Builder` will add the relevant plugin to `plugins.json` that will be sent to the app during application creation process.

##### Rivers.json Screen Plugin Example
This is an example of a screen plugin that will be passed with `rivers.json`.</br>
`type` field is representation of your plugin id, in this example "`settings_contact_us_legacy`". Using this ID, the client will locate the plugin and will try to create it with `ZPPluggableScreenProtocol` initialization method.

```
    {
        "id": "7e8bca21-5f98-4f1b-8541-ce084fffffa6",
        "name": "settings_contact_us_legacy",
        "type": "settings_contact_us_legacy",
        "data": {},
        "styles": {
            "family": "FAMILY_1",
            "presentation": "push"
        },
        "advertising": {},
        "general": {},
        "rules": {},
        "home": false,
        "ui_components": []
	}
```

##### Client side explanation {#clientExplanation}
###### GAScreenPluginGenericViewController

All screen plugins will be created in `GAScreenPluginGenericViewController`.</br>
`GAScreenPluginGenericViewController` works in a similar way to `GAGenericViewController`. It creates a container that will use same rules for same type of the plugins screens.

Screen Plugin Container will be used to add your screen plugin inside. This container will be used for native and react native screens.

![ScreenPluginContainer.png](/ui-builder/ios/Files/ScreenPluginContainer.png)

The `screen plugins` can be used from the root menu or the app navigation like any other Zapp screen.

###### Presentation type of the plugin
There are 2 states that a screen can be presented:
1. `Push`
2. `Present`

Generally this behaviour will take affect if you will select a cell inside your app.</br>
If you going to add a `screen` plugin to `root` or `nav_bar`, the screen plugin will use default rules of Root or Navigation bar.
The default behaviors are:
* `Push` for any root (menu) plugin
* `Present` for Navigation Bar

If you select in presentation type present and you do not want to have a navigation bar, you have to set add `force_nav_bar_hidden: true` key to the plugin manifest. If you will use this key make sure you add a functionality to close screen, since nav bar will be hidden and close button will not be available.

##### Styles, keys and data source {#keys}
Screen plugin allows you to pass additional customization that are set in the UI Builder.

Here is an example manifest:</br>
__Note:__
1. The example presented below shows a plugin that does not allow the user to select `presentation` style
2. Key `background_color` will allow user to select background color with a color picker.
3. You can use the special data keys to leverage the feeds that are set in the Feeds section in the UI Builder, allowing the users to set data feeds on the screen plugin, more info could be found in Zappifest documentation. [Zapp Plugins Manifest](/zappifest/plugins-manifest-format.md)
```
{
    "api": {
        "require_startup_execution": false,
        "class_name": "GAEPGContainerViewController",
        "modules": []
    },
    "dependency_repository_url": [],
    "platform": "ios",
    "author_name": "Anton Kononenko",
    "author_email": "a.kononenko@applicaster.com",
    "manifest_version": "0.1.0",
    "name": "EPGLegacyScreen",
    "description": "Legacy EPG Screen",
    "type": "general",
    "identifier": "epg_legacy_screen",
    "screen": true,
    "ui_builder_support": true,
    "whitelisted_account_ids": [
        "57d7bee06466610018000000"
    ],
    "min_zapp_sdk": "7.0.0-Dev",
    "deprecated_since_zapp_sdk": "",
    "unsupported_since_zapp_sdk": "",
    "react_native": false,
    "custom_configuration_fields": [],
    "styles": {
        "fields": [
            {
                "key": "presentation",
                "type": "hidden",
                "initial_value": "push"
            },
            {
                "key": "force_nav_bar_hidden",
                "type": "hidden",
                "initial_value": true
            },
            {
                "key": "background_color",
                "label": "Background Color",
                "type": "color_picker",
                "initial_value": "rgba(43,43,43, 1)",
                "label_tooltip": "Background color of cards."
            },
        ]
    },
    "data": {
        "fields": [
            {
                "key": "source",
                "type": "text_input"
            },
            {
                "key": "type",
                "type": "select"
            }
        ]
    }
}
```

##### React Native screen and Native screens {#screens}
This section describes the difference between React Native and native screen plugins.

###### Native

Native Screen plugins must implement `ZPPluggableScreenProtocol`. If your plugin will have data source it will be passed as NSObject?. If you need to retrieve dictionary from it, use `ZAAppConnector` helper method `ZAAppConnector.sharedInstance().genericDelegate?.datasourceModelDictionary(withModel: dataSourceModel)` - this will return raw dictionary of your model.

###### React Native

If you use custom RN plugin and you implement subclass of `ZPReactNativeDefaultProvider` you may want to override `ZPPluggableScreenProtocol` method
Implementation for React Native screens

During init of protocol method we use standard method of initialization and passing data source and screen models as initial props where we use func `extraScreenPropsWithData(screenModel:dataSourceModel:)`
```
    public required convenience init?(pluginModel:ZPPluginModel,
                          screenModel:ZLScreenModel,
                          dataSourceModel:NSObject?) {
        guard let reactBundleUrlString = pluginModel.reactBundleUrl,
            let reactBundleURL = URL.init(string: reactBundleUrlString) else {
                return nil
        }
        self.init(configurationJSON: pluginModel.configurationJSON,
                  bundleUrl: reactBundleURL,
                  moduleName:  ZPReactNativeManager.Constants.defaultReactModuleName,
                  extraParams: ZPReactNativeBaseProvider.extraScreenPropsWithData(screenModel: screenModel,
                                                                                  dataSourceModel: dataSourceModel))
    }
```

Example of receiving props:
1. `ZLScreenModel` is passed as `reactProps[uibuilder_screen_model]`
2. If we have DS we wil pass dictionary of the data source with key `reactProps[data_source_model]`
3. For backward compatibility reasons, we will flat map of `ZLScreenModel` dictionary to give ability to retrieve keys without additional migration. __Note:__ This is a temporary solution and plugin should be migrated to use `ZLScreenModel`.
At the end you will get something like this

```
        {
        "uibuilder_screen_model": {
            "id": "7e8bca21-5f98-4f1b-8541-ce084fffffa6",
            "name": "settings_contact_us_legacy",
            "type": "settings_contact_us_legacy",
            "data": {},
            "styles": {
                "family": "FAMILY_1",
                "presentation": "push"
            },
            "advertising": {},
            "general": {},
            "rules": {},
            "home": false,
            "ui_components": []
        },
        "data_source_model": {
            "source": "general-provider://fetch_data?url=aHR0cDovL2Fzc2V0cy1wcm9kdWN0aW9uLmFwcGxpY2FzdGVyLmNvbS9hY2hpZXZlbWVudC1jZW50ZXIvZ2VuZXJpYy1kYXRhLXNvdXJzZS9uZXdzLnhtbC9OZXdzLUJ1c2luZXNzLnhtbA%3D%3D&type=APPLICASTER_ATOM_FEED",
            "type": "APPLICASTER_ATOM_FEED"
        },
        //Flat map of the `ZLScreenModel` dictionary
        "family": "FAMILY_1",
        "presentation": "push"
        }

```
##### Lifecycle Events
This section describes the lifecycle events provided to RN Plugins

###### ZPReactNativeScreenPluginBridge

The `ZPReactNativeScreenPluginBridge` will emit the following lifecycle events:

```
private struct Events {
        static let viewWillAppear = "ViewWillAppear"
        static let viewDidAppear = "ViewDidAppear"
        static let viewWillDisappear = "ViewWillDisappear"
        static let viewDidDisappear = "ViewDidDisappear"
    }
```

In your plugin you can register to the desired events by doing the following:

```
// Import the NativeEventEmitter & NativeModules
import { NativeEventEmitter, NativeModules } from 'react-native';

// Get instance of ScreenPlugin module
const { ScreenPlugin } = NativeModules;

// Create emitter and subscribe to event (in this case "ViewDidAppear")
const screenPluginManagerEmitter = new NativeEventEmitter(ScreenPlugin);
const subscription = screenPluginManagerEmitter.addListener (
      'ViewDidAppear',
      (event) =>{ 
      console.log(event, 'TEST EVENT')
      }
    );
```
With these events you can control many aspects of your plugin such as when to start playback and end playback on your video player for example. 


