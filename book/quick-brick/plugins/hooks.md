# Hook Plugin

## Concepts

Hook plugins allow you to implement custom logic between the transition between two screens.
A Hook plugin is basically an object which contains several properties to customize the hook behaviour, and a `Component` property which contains a react component to render when evaluating the hook.

The flow is as follows:

1. the user presses on a cell, this triggers a navigation action with a specific payload (the entry of the cell)
2. the target route is being resolved by the Quick Brick App's navigation module
3. The hooks manager looks for hooks to run when reaching that target, from the ui builder configuration
   3.b if the target is a player, the hook manager will look for all hook plugins flagged as having a player hook
4. If hooks manager finds a hook, it starts to run them sequentially. As the hook's evaluation is asynchroneous, the apps renders the hook plugin's component until the hook completes.
5. the hook plugin runs its own custom login. Once it is done, it invokes a callback to complete the hook. Completion can yield 3 outcomes:
   5.1 success: the hook was successful, so the process can continue, to either evaluate the next hook, or execute the transition
   5.2 cancel: the hook was cancelled, so the process is stopped. the navigation engine of the app will then abort the transition and leave the user on the screen opened before the transition
   5.3 error: the hook failed. If the hook plugin is flagged as being a flow blocker, this will terminate the hook evaluation and abort the transition. If not, the hook manager will proceed to evaluate the next hook

The React Component in the screen hook is a basic React Component and can use all the APIs available in the Quick Brick framework. It also receives the data which initiated the transition, so this data can be mutated and passed along the transition. The main use case for this is for authorizing content, when it is required to append a token to a stream url, based on data available in local storage for instance. See the API reference below for more details

## API reference

A Hook plugin is a simple javascript object containing several properties :

```typescript
type HookPlugin = {
  Component: React.ComponentType<HookProps>;
  hasPlayerHook?: boolean;
  skipHook?: () => boolean;
  isFlowBlocker?: () => boolean;
  presentFullScreen: boolean;
};

type HookProps = {
  payload: ZappPipesDataSourceEntry | ZappRiverScreen;
  configuration: ZappPluginConfiguration;
  callback: (HookCallBackargs) => void;
};

type HookCallbackArgs = {
  success?: boolean;
  payload: ZappPipesDataSourceEntry | ZappRiverScreen;
  callback?: () => void;
};
```

### Component

React Component displayed when executing the hook. At minimum it will render an activity indicator, but it can also contain a login form, or anything else. This component will also be the entry point for the hook's logic.

This component will receive these props:

- **payload:** data that triggered the transition
- **configuration:** values populated in the plugin configuration of the plugin
- **callback:** function to invoke when completing the hook

The callback function takes a single object as argument, with the following properties:

- **success:** boolean flag for success. don't use it in order to cancel the flow
- **payload:** the data you want to inject back to the next hook or screen. the hooks manager will deeply merge that paylaod object with the original one so you can only add here the properties to change
- **callback:** this property lets you define code to evaluate after the hook has completed. This can be useful mainly to trigger a redirection in the app. As the hook manager will go to the target location when the hook completes, a redirection within a hook will be ineffective. Instead, you can use this function to redirect after the hook is completed.

### hasPlayerHook

In the quick brick app, there is no need to define the player as a screen to add the hook plugin to it in the UI builder. You can simply add the `hasPlayerHook: true` property to your hook plugin object, and it will be included before getting through the player.

### skipHook

Is an synchronous function that should return a `Boolean` value.

- If `true` is returned, execution of the hook will be skipped
- If `false` is returned or attribute is not set, the hook will proceed as normal.

## Plugin manifest

In order to be properly flagged in the UI builder, you need to specicify specific fields in your plugin manifest, as follows:

```
{
  ...
  "type": "general",
  "screen": true,
  "ui_builder_support": true,
  "react_native": true,
  "preload": true,
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

## Example

This video explains how to create a hook plugin from scratch, including project set up
[![Video](https://i.ytimg.com/vi/cJXjmbZtzjs/hqdefault.jpg)](https://youtu.be/cJXjmbZtzjs)
