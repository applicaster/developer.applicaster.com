# Inside QuickBrick

## Philosophy

QuickBrick is a UI framework made to facilitate the creation of rich-featured apps based on the Zapp platforms. These apps can run on different platform while leveraging React-Native's ability to reuse code across platforms.

The QuickBrick framework isn't an app. The app's react-native entry point is generated every time an app is built, or a workspace is prepared for work. This repository contains a `development-app` workspace, which is empty and .gitignored. This is where the QuickBrick cli tool will generate your app when you start working. Until you run the cli tool to prepare your workspace, there is no app to run.

QuickBrick uses dependency injection patterns to provide any app with the data it needs to run - both in terms of components, and configuration. In a nutshell, the generated app will look like this :

```
// import core packages (including ui components)
// import plugins (custom screens, data source providers, custom ui_components, hooks...)
// import configuration, assets, fonts (gathered at build time from Zapp)

const QuickBrickApp = createQuickBrickApp({ components, plugins, baseApp, ... });

const App = <QuickBrickApp { ...{ configuration, assets, fonts, ... } } />

startQuickBrickApp(() => App);

```

## Modularity

The QuickBrick code base is made of several packages which interact with one another. This allows for a very modular setup. These packages can be used together, but also, to some extend, independently from one another. All these packages are scoped to the applicaster domain, but they are publicly accessible[^1].

The main packages are :

- `@applicaster/quick-brick-core`: The core package containing the utility to create and start QuickBrick apps
- `@applicaster/zapp-react-native-bridge`: provides modules wrapping the native features of the Zapp app
- `@applicaster/zapp-react-native-redux`: provides the logic for state management inside the app
- `@applicaster/zapp-react-native-utils`: utilities to interact with primitive types, plugins, etc...
- `@applicaster/zapplicaster-cli`: CLI tool to manage the QuickBrick app development workflow
- `@applicaster/zapp-react-native-ui-components`: Base set of UI components to compose the app - the components exposed directly in the package match the UI Builder components, but this package may include other components & decorators for more reusability.

On top of these main packages, there are other packages which provide specific functionality per platform

- `@applicaster/zapp-react-native-<%= platform- %>cli-template`: repository containing the files & specific commands to prepare a workspace for a specific platform
- `@applicaster/zapp-react-native-<%= platform- %>app`: the core App component for a given platform. Provides custom routing components & layout for the platform
- `@applicaster/zapp-react-native-<%= platform- %>ui-components`: specific UI components for the platform.

This modularity allows to abstract most features in generic component which actual implementation can be tweaked for a specific platform if needed. Each platform can also have its own dependencies and fine-tune its build process to satisfy the requirements of the platform.

## Deeply rooted in Zapp

The QuickBrick app isn't intended to be used as a standalone UI framework outside of Zapp (although that could be possible). It relies on the complex and powerful set of configuration files provided by the Zapp CMS (screens, plugins, feeds...), and existing native modules which are already implemented as part of the native SDKs in Zapp-iOS, Zapp-Android, Zapp-tvOS, Zapp-Tizen...

The QuickBrick app isn't built directly on its own. It requires a builder SDK to be ran on a platform.

The Samsung platform, which is web-based, can theoretically run on its own, without an underlying SDK. However, in order to provide a common base, the specific Samsung TV platform app injects all the functionality provided by the native layer on the other platforms in React-Native's `NativeModules`. This allows for consistency across all the platforms.

## Digging deeper

As explained above, QuickBrick uses a dependency injection pattern to insert the desired pieces of logic that constitute the app. There are very few static features which cannot be overriden by injecting custom dependencies in the app's entry point.
Typically, the `@applicaster/quick-brick-core` package provides a `createZappApp` function, which takes a configuration object to provide the pieces the app needs : components, rivers configuration, styles, plugin modules & their configuration, the base platform app, etc.
All you need to do from this point is to create an app using the generated `ZappApp` component, inject your custom props, then start the react app with the provided function.

Your typical entry point file will look like this:

```javascript
import React from "react";
import { AppRegistry } from "react-native";

// import your plugins, custom ui components & configuration files
// the CLI tool will generate this automatically from the Zapp configuration of your app version
import pluginX from "plugin-x";
import pluginY from "plugin-y";
import customComponentA from "custom-component-a";
import customComponentB from "custom-component-b";
import { baseApp } from "@applicaster/zapp-react-native-$platform-app";

import {
  rivers,
  styles,
  pluginConfigurations,
  remoteConfigurations,
} from "./config";

// import the QuickBrick App package
import {
  createZappApp,
  startZappApp,
} from "@applicaster/zapp-react-native-app";

// expose your plugins - this is also automatically generated from your plugins' manifest when using the CLI tool
const plugins = [
  {
    module: pluginX,
    name: "pluginX",
    type: "general",
  },
  {
    module: pluginY,
    name: "pluginY",
    type: "ui_component",
  },
];

// expose your components - they will be merged with the default built-in components
const components = {
  customComponentA,
  customComponentB,
};

// expose your custom reducers & middlewares
const reduxStoreOptions = {
  additionalReducers,
  additionalMiddlewares,
};

// create your ZappApp component
const ZappApp = createZappApp({
  components,
  rivers,
  styles,
  pluginConfigurations,
  remoteConfigurations,
  plugins,
  reduxStoreOptions,
  appSettings: {},
  App: baseApp,
});

// create your App - here props will come from the native app
const App = props => <ZappApp {...props} />;

// start your app !
startZappApp(AppRegistry, App);
```

## App Logic

From there on, the `ZappApp` component will start to render the app based on the provided data. There are 4 key principles:

**Screens:**

The app will try to compose `screens`, which are defined from the rivers.json configuration. For each `screen`, the app will either render a plugin, or a `River` component which corresponds to the UI Builder's general content screen. A `River` will then render all `ui_components` it contains, and pass it the data associated with that component in the rivers.json
Each screen as data attached to it, including navigation data, but also in most cases a data source information which can be resolved to actual data through the Zapp-Pipes engine.

**Layout:**

The app will compose the screen inside a layout. Each platform specific app package provide a custom layout for the QuickBrick app to know how components, menu, and other parts of the app need to be layed out on that platform.
The platform app packages also provide other customisation :

- routing components
- decorators
- contexts
- app loading & initialization code
- interaction manager to customize how the user interactions are handled on that platform

**Routes:**

The app's navigation is managed by a recursive route pattern of the shape `/:screen_type/:screen_id`. When you tap on a navigation element on the screen, the app will try to resolve the expected content to render, and an identifier. Arbitrary data can also be passed when navigating to a route, which allows each screen and component to be provided with the full expected context to be rendered.
For instance, when tapping on an item in a list on the home screen:

- if this item points to another feed, it will generate a route like `/river/<home-river-id>/river/<target-river-id>`
- if this item points to an article, it will generate a route like `/river/<home-river-id>/article/<target-article-id>`
  In the second scenario, the navigation layer will try to resolve a plugin capable of consuming content of the `article` type, and compose a screen with this plugin, in the relevant platform layout, and inject into it the data retrieved for this article

**Plugin decoration:**

When injecting a custom plugin or component in the App, a few features are automatically injected through a Higher Order Component pattern.
Each component gets automatically:

- a navigator object to `replace` or `push` routes (allowing for custom data injection), or `goBack`, and a `routeData` function to retrieve the current's route specific data
- a zapp pipes data connector which will automatically attempt to load data from the data source specified in this component, if any

On top of this, another decorator is provided for plugins written for the existing react-native infrastructure of Zapp-iOS and Zapp-Android. This HoC passes props as they are expected by a legacy Zapp React Native plugins which relies on the current native adapters for iOS & Android. It will need to be specifically applied to the exported plugin in order to take effect.

if you want to find out more check out the following links :

- [API documentation](Api-documentation.md)
- [Architecture - Zapp-Pipes in QuickBrick](Architecture/Zapp-Pipes.md)
- [Focus Manager](focus-manager/focus-manager.md)

[1]: Authentication to our npm account is still required as this stage, since the app relies on Zapp-Pipes packages which access is still restricted.
