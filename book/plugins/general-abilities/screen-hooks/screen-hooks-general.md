# Screen Hooks

## Description
`Screen Hooks` are hooks that are presented before or after loading the screens. They can be attached to a screens launched from navigation bar, root (menu) or on cell click inside application. Screen hooks can be native or react native. In this document you'll find a guide that explains how to configure such a plugin.

![ScreenPluginsGeneral.png](/ui-builder/ios/Files/PreHooks/preHookGeneral.png)


## General

`Hooks Plugins` can be two types.
1. `Screen Plugin Hooks` - This types of hooks are Screen Plugins that can defined and customized from Zapp's App Builder.
	
    __Note:__ These plugins must conform to Screen Plugins protocol/interface, for example Login and Storefront screens.
  
2. `Hooks Plugin` - Plugin that does not require UI, or that the UI is controlled by the plugin itself, and should not act as screen. For example, Analytics or Advertisement plugin.

For more information check the following guides:
* [Android](/plugins/general-abilities/screen-hooks/android/screen-hook-android.md)
* [iOS](/plugins/general-abilities/screen-hooks/ios/screen-hook-ios.md)