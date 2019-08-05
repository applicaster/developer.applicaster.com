# Open Beta guidelines and information

QuickBrick is still under active development and is provided at this stage to provide alternative options for building feature-rich react-native apps to applicaster customers.
This page summarizes the available features, and the guidelines for using it.

**When using QuickBrick, you recognize and acknowledge you have read and understood the content of this page**

## Using QuickBrick

QuickBrick open beta is provided as-is, in its current state, and its current feature coverage. At this stage, no support is provided, and no feature request will be looked into. You are however more than welcome to create your own whitelisted plugins (custom or generic), or offer to contribute to the development. These documentation pages should provide all the information needed to use QuickBrick effectively. We do however strongly invite you to give us feedback on slack in #quick-brick-beta-feedback.

### Contributing

If you want to contribute to the main QuickBrick repository, simply create a pull request on the [QuickBrick](https://github.com/applicaster/QuickBrick) repo. Your PR will be reviewed by the QuickBrick team. If approved, a version will automatically be generated and made available from Zapp.

### Plugins

You can easily and freely create plugins for ui components or fullscreen experiences. The only pre-requisite is for these plugins to be whitelisted.
QuickBrick plugins can leverage the following data :

- app data (same props currently passed to all RN components)
- rivers.json
- styles.json
- bundled fonts & assets
- custom plugin configuration

The plugin publishing procedure is the same as for any zapp plugin. In fact, you can make use any react-native plugin in quick-brick, provided you followed the [plugin migration guide](/quick-brick/migration-guide.md).

Check out the [setup guide](/quick-brick/Setup.md) to see how to setup your project

### Support

No official support is offered at this stage.

## Available features

**latest update : October 4th, 2018**

### UI Components

| Feature       | availability        |
| ------------- | ------------------- |
| Hero          | yes (static styles) |
| Grid          | yes (static styles) |
| List          | yes (static styles) |
| Rails         | no                  |
| Screen Picker | no                  |
| Tabs          | no                  |
| Webview       | no                  |
| html_ticker   |  no                 |

### Style Families

| Feature  |  availability |
| -------- | ------------- |
| Colorado | no            |
| Hato     | no            |
| Chagres  | no            |
| Rhine    | no            |
| Jordan   | no            |
| Grande   | no            |
| Lerma    | no            |
| Danube   | no            |

### Navigations

| Feature       |  availability |
| ------------- | ------------- |
| Navbar        | yes           |
| Side Menu     | yes           |
| bottom tabs   | no            |
| floating menu | no            |

### Bridged features

| Feature                  |  availability |
| ------------------------ | ------------- |
| Zapp-Pipes               | yes           |
| Favorites[^1]            | yes           |
| Reminders                | yes           |
| Native Share[^2]         | yes           |
| Analytics                | yes           |
| Advertising[^3]          | partially     |
| Login[^4]                | partially     |
| Payments                 | no            |
| Fullscreen Video player  | yes           |
| Inline Video player[^5]  | yes           |

[^1]: Favorites have been re-implemented at the react-native layer. For most scenarios, this should not make any difference, but be aware that purely native elements of the app will not be aware of the favorite state of a given piece of content.

[^2]: Components should use React Native's share feature
[^3]: Advertising data set up in the UI builder will be injected in the components, but there is no built-in implementation of advertising providers

[^4]: Login API is available through the bridge as a headless access to the native Login API. Specific login screen plugins may be required

[^5]: this requires the native player plugin used to actually support inline mode
