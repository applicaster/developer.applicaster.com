## Zapp Screens Hook infrastructure
Infrastructure that enables development of pre- and post-loading hooks for UIBuilder's screens.

1. <a href="#description">Description</a>
2. <a href="#general">General Hooks</a>
3. <a href="#interface">Screen Hooks Interface</a>
4. <a href="#rn">RN Hooks</a>
5. <a href="#player&article">Player and Articles hook support</a>
6. <a href="#connection">Screen Hooks Rivers API</a>
7. <a href="#example">Example Of Implementation</a>

***

<a name="description" />

##### Description
`Screen Hooks` are hooks that are presented before or after loading the screens. They can be attached to a screens launched from navigation bar, root (menu) or on cell click inside application. Screen hooks can be native or react native. In this document you'll find a guide that explains how to configure such a plugin.

***

<a name="general" />

##### General Hooks   

To oversee the flow of Hook Screens we introduced `HookScreenManager` class. It decides
if hooks should be executed and caches executed hooks.   
`HookScreenManager` public methods:
  - `init(context: Context, screenId: String, hookManagerListener: HookScreenMangerListener, hookMap: List<Any>?)` - initializes the Hook Screen flow
  - `failCurrentHook(hookProps: Map<String, Any>?)` - fails current Hook and passes `hookProps` to it.
  - `completeCurrentHook(hookProps: Map<String, Any>?)` - completes current Hook and passes `hookProps` to it.
  Main private methods:
  - `processHook(context: Context, hook: HookScreen, hookCacheName:String, hookProps: Map<String, Any>?)` - executes `hook` and passed `HookScreenListener` and `hookProps` to it.   
General idea is that we initialize `HookScreenManager` with list of `HookScreen` and `HookScreenMangerListener`. `HookScreenManager` will traverse through every hook, one at a time, through calling a coroutine method `processHook(context: Context, hook: HookScreen, hookCacheName:String, hookProps: Map<String, Any>?)` as soon as `HookScreen` completes, it will trigger `HookScreenListener` with `hookCompleted` or `hookFailed`. This should be the only way to exit `HookScreen`. `hookCompleted` will trigger `HookScreenManager` to resume coroutine and process next hook, when `hookFailed` will trigger `hookManagerFailed`. Once all hooks are completed we will call `hookManagerCompleted`.   

<a name="interface" />

##### Screen Hooks Interface

Any screen plugin can be defined as Screen Hook. In order to do so please implement `HookScreen`. The interface provides those methods to the plugin:  
`isFlowBlocker()` - Determines if failed hook will abort.  
`shouldPresent()` - Determines if hook screen will be presenting to UI.  
`isRecurringHook()` - Determines if hook can me presented every time specific screen loads.  
`hookDismissed()` - Specifies the logic for cases when user dismissed the hook.
`executeHook(context: Context, hookListener: HookScreenListener, hookProps: Map<String, Any>?)` - execute hook
`getListener()` - Android specific method to return the `hookListener` from Screen Hook   

<a name="rn" />

##### RN Hooks

RN side of screen hook will call `hookFinishedWork(hookFinishedWork: Boolean, errorMessage: String?, hookProps: ReadableMap, isFlowBlocker: Boolean)` of `ReactNativeHookScreenBridge`.
  - hookFinishedWork: Boolean - defines if hook is failed/completed
  - errorMessage: String - custom error message
  - hookProps: ReadableMap - map of properties we pass between hooks
  - isFlowBlocker: Boolean - defines if flow should be interrupted

<a name="player&article" />

##### Player and Articles hook support  

For `Player` and `Article` plugins: Plugin should be converted to `Plugin Screen` and make sure to disable default storefront in plugin manifest by adding to `custom_configuration_fields` for `Player` plugins:  
```
  {
    "type": "checkbox",
    "key": "ignore_default_subscription",
    "default": 0
  }
```   

<a name="connection" />

##### Screen Hooks Rivers API

Rivers' API will add to every screen that needs hooks.

```
"hooks": {  
   "preload_plugins":[  
      {  
         "screen_id": "screen id",
         "identifier": "plugin identifier",
         "type": "plugin type",
         "weight": "plugin weight"
      },
      {  
         "screen_id": "screen id",
         "identifier": "plugin identifier",
         "type": "plugin type",
         "weight": "plugin weight"
      }
   ]
}
```

<a name="example" />

##### Example Of Implementation   

For an example we will set up a `Player` plugin to use `Screen Hooks`.  

1. Set up `Player` plugin:   
    - Implement `PluginScreen` interface for the `Player`.<LINK TO PLUGIN SCREENS>   
    - Disable storefront, adding to manifest's `custom_configuration_fields`:   
    ```   
    {
      "type": "checkbox",
      "key": "ignore_default_subscription",
      "default": 0
    }   
    ```   
2. Set up plugins we want to use as `Screen Hook`:
    - Add this to manifest to enable hooks:   
    ```
      "hooks": {
          "fields": [
            {
              "group": true,
              "label": "Before Load",
              "folded": true,
              "fields": [
                {
                  "key": "preload_plugins",
                  "type": "preload_plugins_selector",
                  "label": "Select Plugins"
                }
              ]
            }
          ]
        }
     ```   

3. Set up screen hooks in `UIBuilder` for the `Player` plugin screen.
<SCREEN PICTURE>   

4. Each plugin that we use as a `Screen Hook` should implement a `HookScreen` interface.  
