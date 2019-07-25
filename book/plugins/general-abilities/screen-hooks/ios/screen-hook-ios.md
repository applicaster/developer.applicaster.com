## Zapp Hooks Plugins
### Availible from SDK: 10.0.3

1. <a href="#description">Description</a>
2. <a href="#general">General</a>
3. <a href="#creation">Hook Plugin creation</a>
4. <a href="#clientExplanation">Client side explanation</a>
5. [Native Hook Example](https://github.com/applicaster/PreHookExample-iOS)
6. [React Native Hook Example](https://github.com/applicaster/PreHookExample-RN)
* * *

<a name="description" />

##### Description
`Screen Hooks` are hooks that are presented before or after loading the screens. They can be attached to a screens launched from navigation bar, root (menu) or on cell click inside application. Screen hooks can be native or react native. In this document you'll find a guide that explains how to configure such a plugin.
![ScreenPluginsGeneral.png](/ui-builder/ios/Files/PreHooks/preHookGeneral.png)
***

<a name="general" />

##### General

`Hooks Plugins` can be two types.
1. `Screen Plugin Hooks` - This types of hooks are [Screen Plugins](../../../../screen/ios/screen-plugin-ios.md) that can defined and customized from Zapp's App Builder.
	
  __Note:__ These plugins must conform to [Screen Plugins](../../../../screen/ios/screen-plugin-ios.md) protocol, for example Login and Storefront screens.
  
2. `Hooks Plugin` - Plugin that does not require UI, or that the UI is controlled by the plugin itself, and should not act as screen. For example, Analytics or Advertisement plugin.

***

<a name="creation" />

##### Hook Plugin creation

###### Client Side
1. Implement `ZPScreenHookAdapterProtocol` to enable logic of the hook. This part will include general implementation of the hook plugin and difference between `hook plugin` and `hook screen plugin` in relevant section.

___General Native___
###### [Native Hook Example](https://github.com/applicaster/PreHookExample-iOS)

This method is general method that will be used to invoke `hook plugin` It will be called when <a href="#clientExplanation">GAScreenHookManager</a> will invoke current hook.

`presentationIndex` - currently not in use (experimental)

`dataDict` - is used to pass dictionary between hooks.

`screenModel` - ScreenModel of the host screen

`taskFinishedWithCompletion` - Completion closure that must be send in the end of the hook invocation.

  `succeed` -  Bool Value if hook finished successfully, canceled or passing some error.
  
  `error` -  Error object if some error happened in hook
  
  `dataDict` - Dictionary instance if current hook wants to pass dictionary to next hook if required.
  
__Note:__ Make sure you always pass `dataDict` as a param in `taskFinishedWithCompletion` for further hooks to use it


```swift
@objc func executeHook(presentationIndex:NSInteger,
                           dataDict:[String:Any]?,
                           taskFinishedWithCompletion:@escaping (_ succeed:Bool,
                           _ error:NSError?,
                           _ dataDict:[String:Any]?) -> Void)
```

___Hooks Plugin___

Implement Initializer func.

`pluginModel` - Plugin Model that was retrieved from `plugin_configurations.json`. Instance of the plugin model contains information about hook plugin to initialize.

`dataSourceModel` - Data source of your screen plugin (optional). In some cases, your plugin will have data source.

__Note:__ `pluginModel` and `dataSourceModel` params will be passed from the rivers.json API. These params will be used in the target screen and will be used after all hooks will finish their invocation.

```swift
init?(pluginModel:ZPPluginModel,
      dataSourceModel:NSObject?)
```

___Hooks Screen Plugin___

Make sure that your `hook screen` plugin manifest indicates that it is a screen plugin - [Screen Plugin](../../../../screen/ios/screen-plugin-ios.md)

Implement Initializer func.

`pluginModel` - Plugin Model that was retrieved from `plugin_configurations.json`. Instance of the plugin model contains information about hook plugin to initialize.

`screenModel` -  Screen Model that was retrieved from `river.json`. Instance of the screen model contains information about screen that was defined in Zapp's App builder initialize.

`dataSourceModel` - Data source of your screen plugin (optional). In some cases, your screen will require dynamic data source configured by the user. If you want to allow users to launch the screen from a tap on a cell the data source of the cell (as defined in the data source entry) will be passed automatically.


```swift
init?(pluginModel:ZPPluginModel,
      screenModel:ZLScreenModel,
      dataSourceModel:NSObject?)
```

`Optionals func`

Getter method to determine if the plugin is a flow blocker. A flow blocker is a plugin that prevents the target screen to be presented in case of hook failure. It can be relevant in cases of `Login` plugin that should prevent the user from proceeding to the target until they enter proper password.

```swift
@objc optional var isFlowBlocker:Bool { get }
```

Request `screen hook` plugin if screen that belongs to hook can be presented (optional). An example is `Login` plugin where users should not see the login screen again if they already logged in.

__Note:__ Make sure you implement this method if you don't want the hook to be presented every time the hook will be executed.

```swift
@objc optional func requestScreenPluginPresentation(completion:@escaping (_ allowScreenPluginPresentation:Bool) -> Void)
```

This methods will be called as notification of `screen hook` plugin in case screen was removed by user or navigation for any reason.

```swift
@objc optional func hookPluginDidDisappear(viewController:UIViewController)
```

___General React Native___
###### [React Native Hook Example](https://github.com/applicaster/PreHookExample-RN)
###### [Plugins manifest format](/zappifest/plugins-manifest-format.md)
If your screen plugin is using `ZPReactNativeDefaultProvider` you do not need to implement anything. Hooks logic was already implemented in `ZPReactNativeDefaultProvider` class. If you will not use this class, make sure plugin will conform to `ZPScreenHookAdapterProtocol` as described in native side. - <a name="Native hook creation" />.

###### Manifest
More inforamtion about [Pre hook manifest](https://github.com/applicaster/PreHookExample-RN)

2. Create manifest for you plugin.
	* Add key to your plugin manifest. This key will allow to define plugin as prehook.
	```
    "preload": true
    ```
3. If you want to make your hook as screen plugin add key to manifest:
    ```
    "screen": true,
    ```
    More details about [Screen Plugin](../../../../screen/ios/screen-plugin-ios.md)
4. Upload manifest of your plugin.

__Manifest Example__
```javascript
{
  "api": {
    "require_startup_execution": false,
    "class_name": "PrehookExample.HookManager",
    "modules": []
  },
  "dependency_repository_url": [],
  "platform": "ios",
  "author_name": "Anton Kononenko",
  "author_email": "a.kononenko@applicaster.com",
  "manifest_version": "1.0.0",
  "name": "Prehook Example Hook Screen",
  "description": "Example prehook plugin",
  "type": "general",
  "screen": true,
  "identifier": "hook_screen",
  "ui_builder_support": true,
  "dependency_name": "PrehookExample",
  "dependency_version": "1.0.0",
  "whitelisted_account_ids": ["57d7bee06466610018000000"],
  "min_zapp_sdk": "10.0.1-Dev",
  "deprecated_since_zapp_sdk": "",
  "unsupported_since_zapp_sdk": "",
  "react_native": false,
  "preload": true,
  "styles": {
    "fields": [
      {
        "type": "tag_select",
        "key": "presentation",
        "tooltip_text": "Presentation style",
        "options": [{ "text": "Push", "value": "push" },
            { "text": "Present", "value": "present" }],
        "initial_value": "push"
      }
    ]
  },
  "general" : {
    "fields" : [{
      "type": "switch",
      "key": "is_flow_blocker",
      "tooltip_text": "Define if hook will block flow in case cancelation",
      "initial_value": false
    },
    {
      "type": "switch",
      "key": "allow_screen_plugin_presentation",
      "tooltip_text": "Define if",
      "initial_value": false
    }]
  }
}

```

__React Native native module__

RN screen hook should pass an interface to ReactNativeContext
```objective-c
@interface RCT_EXTERN_MODULE(HookManager, Object)
RCT_EXTERN_METHOD(hookListener(): Boolean
                 errorMessage: String
                 dataMap: HashMap<String, Any>
                 isFlowBlocker: Boolean
@end
```

***

<a name="clientExplanation" />

##### Client Explanation

We invoke hooks in 3 places in our SDK:
1. When application is trying to open screen - that usually happens when user push on cell or nav bar item.
2. When user navigate using Root Plugin (side menu, bottom tab bar, etc.).
3. When user switching between `screen picker` components tabs.

`1` and `2` cases are using `GAScreenHookManager`.
`3` case is using `CAScreenPickerBodyPrehookHelper`.

Behind the scenes when screen is trying to be presented from the screen model that was taken from the `river.json`, `GAScreenHookManager` or `CAScreenPickerBodyPrehookHelper` searching dictionary with key `hooks`

__Example:__
```javascript
  "hooks": {
    "preload_plugins": [
        {
            "screen_id": "e6dca9ed-27ff-4764-94aa-818df06a39a0",
            "identifier": "hook_screen",
            "type": "general"
        }
    ]
  }
```

`preload_plugins` - Array of hook plugins.

`screen_id`: Optional key that will be available only in case pre hook plugin that was added is `screen plugin` otherwise this parameter will be empty.

`identifier`: This key is string identifier of the plugin.

`type`: This key is a plugin type.


Inside application this parameters can be retrieved from `ZLScreenModel` from variable `hooksPlugins`.
Also avalible helper extension of `ZLScreenModel` in file `ZLScreenModel+HooksPlugins.swift` inside it defined all helper func and var.


###### GAScreenHookManager
This manager responsible for creation and invocation of the hooks plugins.
You can read in this section what happens with the `GAScreenHookManager` behind the scenes.

1. The manager tries to retrieve hook plugins from the app available plugins list.
2. The manager will try to create `pre-hook` plugins

    ```swift
    @objc optional func requestScreenPluginPresentation(completion:@escaping (_ allowScreenPluginPresentation:Bool) -> Void)
    ```
3. The manager will try to present a screen if the hook requires it
4. The manager will execute hook with protocol method.
```swift
@objc func executeHook(presentationIndex:NSInteger,
                           dataDict:[String:Any]?,
                           taskFinishedWithCompletion:@escaping (_ succeed:Bool,
                           _ error:NSError?,
                           _ dataDict:[String:Any]?) -> Void)
```
5. After the hook sends completion in `taskFinishedWithCompletion`, the manager will check the state. If hook `isFlowBlocker` and failed, next hook/target screen will not be executed.
6. In case of success or failure and `isFlowBlocker==false` next hook will be executed.
7. After finishing the execution of all hooks, the host(target) screen will be presented.