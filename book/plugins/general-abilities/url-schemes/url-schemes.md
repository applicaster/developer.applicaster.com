# URL Schemes

The Zapp system allows that one or more URL schemes are defined for each version of the app. The URL scheme can be used to launch the app. Moreover, it can be used to launch different parts of the app such as specific screens or plugins. In the context of plugins, the Plugin Scheme Interface API can be implemented so as to launch the plugin by using a URL scheme. This API also allows custom parameters to be passed on to the plugin.

## Typical Use

Plugin Url schemes are useful for launching the plugin by using a link from a HTML page or a push notification.

## Plugin Scheme Interface

The plugin scheme interface is implemented on both iOS and Android. The plugin can be launched by using a URL scheme like

```
[app_url_scheme]://plugin/?type=[plugin_type]&plugin_identifier=[plugin_identifier]&[custom_parameter]=[custom_value]
```

where the `app_url_scheme` is the URL scheme of the app as set in Zapp, `plugin_type` is the type of the plugin as set in its manifest and `plugin_identifier` is the identifier of the plugin in the Zapp system. The `custom_parameter` and `custom_value` parameters are custom for each plugin.

For example, the following link will open the first tab of the bottom tab bar plugin for an app that has defined `mychannelapp` as its URL scheme.

```
mychannelapp://plugin/?type=menu&plugin_identifier=bottom_tab_bar&tabPosition=1
```

### iOS

On iOS, it is implemented in the `ZappPlugins` module as one of two methods of `ZPAdapterProtocol`.

```
 @objc optional func handleUrlScheme(_ params:NSDictionary) -> Void
```

The parameters dictionary has `(custom_parameter, custom_value)` pairs.

#### Example

The following empty implementation is taken from https://github.com/applicaster/zapp-plugins-examples.

```
    // MARK: - ZPAdapterProtocol implementation
    /**
        Implement this method if you need the plugin to respond to a URL scheme.
        The parameteters of the URL scheme will be passed as a dictionary to be handled by the plugin.
     
        Since this function can be called directly to a plugin by name or by type - please include and verify that the URL scheme should be indeed handled.
     
        Best practices suggestions for this:
        * Use "action" parameter in the URL Scheme
        * Use of further custom parameters in the URL scheme
     
        Note: A "pluginType": "general" field will be populated
     
        In order to display something on top of the current app - please use "ZAAppConnector.sharedInstance().navigationDelegate.topmostModal()"
     */
    @objc public func handleUrlScheme(_ params: NSDictionary) {
        
    }

```

### Android

On Android, a plugin must implement the `com.applicaster.plugin_manager.PluginSchemeI` interface which belongs to the Applicaster SDK. It has only one method.

```
boolean handlePluginScheme(Context context, Map<String, String> data);
```

The `data` Map has `(custom_parameter, custom_value)` pairs. The method returns whether the scheme was handled or not.

#### Example

The following example is taken from https://github.com/applicaster/zapp-plugins-examples.

```
    @Override
    public boolean handlePluginScheme(Context context, Map<String, String> data) {
        boolean verified = false;

        // This will handle the following URLSchema sampleApp://plugin?type=ui_component&action=open
        // Remember that you can define any type of custom "action" for your specific case.
        if ("ui_component".equals(data.get("type"))) {
            if ("open".equals(data.get("action"))) {
                verified = true;
                context.startActivity(FullScreenActivity.getCallingIntent(context));
            }
        }

        return verified;
    }
```

## Screen Plugin URL Scheme

Screen plugins can be launched by using the following URL scheme

```
[app_url_scheme]://present/?screen_id=[app_builder_screen_id]
```

where the `app_url_scheme` is the URL scheme of the app as set in Zapp and `app_builder_screen_id` is the Id of the screen in App Builder.