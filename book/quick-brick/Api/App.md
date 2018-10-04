# @applicaster/zapp-react-native-app

![npm version](https://badge.fury.io/js/%40applicaster%2Fzapp-react-native-app.svg)

This package is our app wrapper. It contains the core logic of the QuickBrick app.
It only exposes 2 functions :

- `createZappApp: (options: {[string]: any}) => React.Component` a higher-order function which takes configuration options as parameters and returns the app component.
- `startZappApp: (AppRegistry: any, App: React.Component>) => void` a function to register the app component and start the react execution on the native side. Its first argument is react-native's `AppRegistry` module, and the second argument is the app you want to mount.

```javascript
// index.js - your react native root
import { AppRegistry } from "react-native";
import {
  createZappApp,
  startZappApp
} from "@applicaster/zapp-react-native-app";
import components from "@applicaster/zapp-react-native-components";

// create a ZappApp component and inject configuration like components, ui builder configuration, plugins...
const ZappApp = createZappApp({ components });

// create a React Native App component - don't forget to transfer props from native to the ZappApp component
const App = props => <ZappApp {...props} />;

// start the App !
startZappApp(AppRegistry, App);
```

Available options for `createZappApp`:

- `styles`: `styles.json` as provided by Zapp
- `rivers`: `rivers.json` as provided by Zapp
- `components`: (optional) map of additional components, where the key should be the `PascalCase`'d name of the UI Builder ui_component type (if the ui_component type is `screen_picker`, the component name here needs to be `ScreenPicker`), and the value should be the React native implementation of the component. This component map is merged with the one provided from `@applicaster/zapp-react-native-ui-components`, but additional components will override default ones if they have the same key.
- `plugins`: array of available plugins. For each plugin, you should declare the following properties:
  - `module`: the plugin's callable function / React component
  - `name`: the name of the plugin - should match the `PascalCase`'d identifier of the plugin. If your plugin's identifier is `react-native-article`, the name should be `ReactNativeArticle`
  - `type`: the type of the plugin, as it is defined in the plugin's manifest in Zapp
- `reduxStoreOptions`: (optional)
  - `additionalReducers`: map of reducers to load in the redux store, on top of the existing ones. See available reducers' names to avoid name collision which would override your own custom reducers
  - `additionalMiddlewares`: array of additional middlewares to load - by default, the ZappApp will have the `thunk` middleware, but others can be added
  - `initialState`: optional initial state for the redux store
- `pluginConfigurations`: the remote configuration options for plugins, as coming from Zapp
- `remoteConfigurations`: Zapp's remote configurations
- `appSettings`: arbitrary app settings which will be stored in the redux store.
  - `runtimeConfigurationUrls`: map of the urls to reload some runtime configuration properties, such as `styles_url`, `plugin_configurations_url`, `remote_configurations_url` and `rivers_url`. If these urls are provided, the app will try to download and apply the latest available remote runtime configuration.
