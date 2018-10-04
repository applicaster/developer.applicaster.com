# @applicaster/zapp-react-native-redux

![npm version](https://badge.fury.io/js/%40applicaster%2Fzapp-react-native-redux.svg)

This package contains the redux store and most of its features.

## API

- `createZappReduxStore: (config: {[string]: any }) => ReduxStore` : creates the redux store. See below for configuration options
- `loadAppContextData: (dispatch: Function, appContext: {[string]: any}) => void`: loads app context data in the store. see an example below
- `connectToStore: (mapStateToProps: state => { [string]: any }, actions: {[string]: Function}) => Function`: returns a connector function to bind store data and actions to a react component

```javascript
import { createZappReduxStore, loadAppContextData, connectToStore } from "@applicaster/zapp-react-native-redux";
import fooReducer from "./reducers/Foo";
import { customMiddleware, otherCustomMiddleware } from "./middlewares/MyCustomMiddlewares";

const store = createZappReduxStore({
  addedReducers: { foo: fooReducer }, // optional - map of additional reducers to add to the store
  addedMiddlewares: [customMiddleware, otherCustomMiddleware], // optional - array of additional reducers - already includes thunk
  initialState = {}, // optional initialState for the store,
  env: __DEV__ ? "development" : "production" // optional env. Defaults to the value here, but left for testing purposes or other custom settings
});

// now let's say we want to inject styles, rivers, and a components list to the store
// this function requires access to the store's dispatch function, so it can be used only in a connected component or a middleware
const styles = { /* .. */ };
const rivers = { /* .. */ };
const components = { /* .. */ };
loadAppContextData(dispatch, { styles, rivers, components });

// and last but not least, let's create a connector function to add styles and rivers to a component
// the example below will add 3 props : styles, rivers, and a customReduxAction bound to redux's dispatcher
import UnconnectedComponent from "./components/UnconnectedComponent";
const connector = connectToStore(state => ({ styles: state.styles, rivers: state.rivers }), { customReduxAction });
const MyConnectedComponent = connector(UnconnectedComponent);
```

## Context Data

In the Redux store, context data is made of styles, rivers, plugins, components, and appSettings. The data from these reducers are read-only. Data can be replaced in the reducer by using the `loadAppContextData` function declared above. When using this function, depending on the context data you are loading, a specific loader will be invoked to format the incoming data for a more convenient use in the redux store. These loaders are fairly straight forward - refer to the source code to see more details about the transformation applied.

## Available reducers

all these reducers can be used by any plugin or component, by using the `connectToStore` function above

**styles**:
Available styles for the app. Color codes are fixed for React Native, and style properties are grouped in a more structured way, for more convenient use than the native side's flat map of keys.

**rivers**:
Rivers configured for the app. Only change is the array from rivers.json is changed to a map where each river is accessible with its id.

**plugins**:
Array of plugins available in the app. No transformation is applied when this data is loaded.

**pluginConfigurations**:
Map of plugin configuration. For each plugin identifier, this reducer contains the plugin_configuration object coming from zapp, including the `configuration_json` property, with the configuration set by zapp users.

**remoteConfigurations**:
Custom remote configurations properties available in Zapp.

**components**:
Map of available components for the app. No transformation is applied when this data is loaded.

**appSettings**:
AppSettings data injected in the ZappApp component. No transformation is applied when this data is loaded.

**zappPipes**:
The Zapp Pipes reducer keeps track of the feed data used by the app.
A `loadPipesData: (dataSourceUrl: string, clearCache: bool = false) => void` action creator is available to manually load a datasource url in the store. This function is used by the ZappPipesDataConnector decorator which automatically retrieves data from feeds for `ui_components`. But it can also be used manually in plugins for instance, or in components, in order to implement features like pull-to-refresh, or automatic reload of the data...
When a datasource is retrieved through this action, it is stored in the reducer with the datasource url as key, and the returned data as value. Requesting an already fetched datasource url will skip the request, unless the `clearCache` option is set to true.
