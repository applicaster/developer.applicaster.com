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

### iOS

On iOS, it is implemented in the `ZappPlugins` module as one of two methods of `ZPAdapterProtocol`.

```
 @objc optional func handleUrlScheme(_ params:NSDictionary) -> Void
```

The parameters dictionary has `(custom_parameter, custom_value)` pairs.

### Android

On Android, a plugin must implement the `com.applicaster.plugin_manager.PluginSchemeI` interface which belongs to the Applicaster SDK. It has only one method.

```
boolean handlePluginScheme(Context context, Map<String, String> data);
```

The `data` Map has `(custom_parameter, custom_value)` pairs. The method returns whether the scheme was handled or not.

## Screen Plugin URL Scheme

Screen plugins can be launched by using the following URL scheme

```
[app_url_scheme]://present/?screen_id=[app_builder_screen_id]
```

where the `app_url_scheme` is the URL scheme of the app as set in Zapp and `app_builder_screen_id` is the Id of the screen in App Builder.