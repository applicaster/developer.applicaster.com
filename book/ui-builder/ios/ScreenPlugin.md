## Zapp Screen Plugins infrastructure
Infrastructure that enables development of standalone screen (views) plugins.

1. <a href="#description">Description</a>
2. <a href="#general">General</a>
3. <a href="#connection">Connection PlugnsScreen with River.json</a>
4. <a href="#clientExplanation">Client side explanation</a>
4. <a href="#keys">Styles, keys and data source</a>
5. <a href="#screens">React Native screen and Native screens</a>

* * *

<a name="description" />

##### Description
`Screen Plugins` are plugins that are presented as standalone screens, A user can trigger the launch of a screen from navigation bar, root (menu) or click on any cell inside application. These plugins can be native or react native. In this document you can find a guide that explains how to configure such a plugin. In addition, a screen plugins provide an API that gives developers to ability to customize their plugin via Zapp's UI-Builder.

![ScreenPluginsGeneral.png](./Files/ScreenPluginsGeneral.png)
***

<a name="general" />

##### General

Any plugin can be defined as Screen Plugin. In order to do so, please follow these:
1. Implement `ZPPluggableScreenProtocol`. This protocol provides a simple initialization for your plugin. This is a simple initialization for your plugin.`
The interface provides 3 parameters to the plugin:
`pluginModel` - Plugin Model itself will be passed in any case.
`screenModel` - ScreenModel that connected to your plugin
`dataSourceModel` - Data source of your screen plugin (optional). In some cases, your screen will require dynamic data source configured by the user. If you want to allow users to launch the screen from a tap on a cell the data source of the cell (as defined in the data source entry) will be passed automatically.

```
    init?(pluginModel:ZPPluginModel,
          screenModel:ZLScreenModel,
          dataSourceModel:NSObject?)
```
2. In the manifest of the plugin the `screen`: `true` key must be added. This key is needed to explain UI Builder that this plugin can be added in the screen section. [Plugins manifest format](https://developer-zapp.applicaster.com/zappifest/plugins-manifest-format.html)
3. A default presentation should be provided, read more below. <a href="#clientExplanation">Client side explanation</a>

<a name="connection" />

##### Connect Plugin with Rivers API

After adding `screen: true` flag on Zapp manifest, you will able to see your plugin in the available screens list when adding a screen in the UI Builder.

__Example:__ Contact Us or Settings Twitter Login
![ScreenPluginsCreateScreen.png](./Files/ScreenPluginsCreateScreen.png)

When user will select `Screen Plugins`, behind a scenes the `UI Builder` will add plugin the relevant plugin to `plugins.json` that will be sent to app during application creation process.

###### River.json screen plugin example
This is an example of screen plugin that will be passed with `river.json`
`type` field is representation of your plugin id `settings_contact_us_legacy`. Using this ID, the client will locate the plugin and will try to create it with `ZPPluggableScreenProtocol` initialization method.

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
<a name="clientExplanation" />

##### Client side explanation
###### GAScreenPluginGenericViewController

All screen plugins will be created in `GAScreenPluginGenericViewController`. `GAScreenPluginGenericViewController` works in a similar way to `GAGenericViewController`. It creates a container that will use same rules for same type of the plugins screens.

Screen Plugin Container will be used to add your screen plugin inside. This container will be used for native and react native screens.

![ScreenPluginContainer.png](./Files/ScreenPluginContainer.png)

The `screen plugins` can be used from the root menu or the app navigation like any other Zapp screen.

###### Presentation type of the plugin
There are 2 states that a screen can be presented:
1. `Push`
2. `Present`

Generally this behaviour will take affect if you will select cell inside your app.
If you going to add a `screen` plugin to `root` or `nav_bar`, screen plugin will use default rules of Root or Navigation bar.
The default behaviors are:
* `Push` for any root (menu) plugin
* `Present` for Navigation Bar

If you select in presentation type present and you do not want to have navigation bar, you have to set in manifest key `force_nav_bar_hidden`:`true`. If you will use this key make sure you add a functionality to close screen, since nav bar will be hidden and close button will not be available.

<a name="keys" />

##### Styles, keys and data source
Screen plugin allows you to pass additional customization that are set in the UI Builder.

Here manifest example:
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
<a name="screens" />

##### React Native screen and Native screens
This section describes the difference beetween React Native and native screen plugins.

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
3. For backward compatibility reasons, we will flat map of `ZLScreenModel` dictionary to give ability to retrieve keys without additional migration. Note This is a temporary solution and plugin should be migrated to use `ZLScreenModel`.
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
