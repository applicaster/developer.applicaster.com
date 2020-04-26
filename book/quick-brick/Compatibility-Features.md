# Compatibility & Features

QuickBrick is still under active development, but it can already be usedas an alternative options for building feature-rich react-native apps to applicaster customers on TV platforms.
This page summarizes the available features, and the guidelines for using it.

## Environments

- React 16.8.3
- React Native 0.59.10
- React Native Web 0.11.5 (for samsung, web & webOS only)

** Tizen (samsung) and webOS environments are running on web engines compatible with Chrome 38 and earlier version. Full transpilation to valid ES5 javascript is required **

## Available features

**latest update : June 27th, 2019**

### Platforms

| Platform         | state  |
| ---------------- | ------ |
| ios (mobile)     | beta   |
| android (mobile) | beta   |
| tvOS             | stable |
| Tizen (samsung)  | stable |
| Android_tv       | beta   |

### UI Components

| Feature       | ios / android       | tvos | samsung | android_tv |
| ------------- | ------------------- | ---- | ------- | ---------- |
| Hero          | yes (static styles) | yes  | yes     | yes        |
| Grid          | yes (static styles) | yes  | yes     | yes        |
| List          | yes (static styles) | yes  | yes     | yes        |
| Rails         | no                  | yes  | yes     | yes        |
| Screen Picker | no                  | yes  | yes     | yes        |
| Tabs          | no                  | no   | no      | no         |
| Webview       | no                  | no   | no      | no         |
| html_ticker   | no                  | no   | no      | no         |

### Style Families

Quick Brick doesn't rely on the classic style families. It uses a new type of plugins: Cell Styles plugins, which provide the same functionality.

In the current state, only one cell style is available by default, with colors being configurable in Zapp.

### Navigations

QuickBrick uses UI Builder navigations, and provides default plugins, though custom navigation bar / menu can be created

#### Default plugins

##### mobile

- Navigation Bar
- Side Menu

##### TV

- TV apps don't have a navigation bar separated from the menu
- Top Menu bar TV

### Bridged features

| Feature                 |  ios / android | tvos    | samsung | android_tv |
| ----------------------- | -------------- | ------- | ------- | ---------- |
| Zapp-Pipes              | yes            | yes     | yes[^6] | yes        |
| Favorites[^1]           | yes            | yes     | yes     | yes        |
| Reminders               | yes            | no      | no      | no         |
| Native Share[^2]        | yes            | no      | no      | no         |
| Analytics               | yes            | yes     | yes     | yes        |
| Advertising[^3]         | partially      | no      | no      | no         |
| Login[^4]               | partially      | yes[^7] | yes[^7] | yes[^7]    |
| Payments                | no             | yes[^7] | yes[^7] | yes[^7]    |
| Fullscreen Video player | yes            | yes     | yes     | yes        |
| Inline Video player[^5] | yes            | no      | no      | no         |
| Local / Session Storage | yes            | yes     | yes     | yes        |

## Create custom features & Plugins

You can easily and freely create plugins for ui components or fullscreen experiences. The only pre-requisite is for these plugins to be whitelisted.
QuickBrick plugins can leverage the following data :

- app data (same props currently passed to all RN components)
- rivers.json
- styles.json
- bundled fonts & assets
- custom plugin configuration
- mobile only: [navigation bar](plugins/navigation_plugins.md)
- mobile only: [side menu](plugins/navigation_plugins.md)

The plugin publishing procedure is the same as for any zapp plugin. In fact, you can make use any react-native plugin in quick-brick, provided you followed the [plugin migration guide](migration-guide.md).

Check out the [setup guide](Setup.md) to see how to setup your plugin project

## Support

Support on QuickBrick is currently provided jointly by Support Team & the Zapp Team.

[^1]: Favorites have been re-implemented at the react-native layer. For most scenarios, this should not make any difference, but be aware that purely native elements of the app will not be aware of the favorite state of a given piece of content.
[^2]: Components should use React Native's share feature
[^3]: Advertising data set up in the UI builder will be injected in the components, but there is no built-in implementation of advertising providers
[^4]: Login API is available through the bridge as a headless access to the native Login API. Specific login screen plugins may be required
[^5]: this requires the native player plugin used to actually support inline mode
[^6]: Back end must allow CORS request from any origin to work on samsung
[^7]: These features are available through the Hooks Plugin infrastructure
