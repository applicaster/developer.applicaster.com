# Migrating existing React Native Plugin

In order to make existing React Native plugins compatible with QuickBrick, two changes are required :

- The plugin needs to be converted to an npm package
- The main package export should expose the plugin's main app component

Imagine a plugin repository with the following structure:

```
|-- src
|---- App.js # App entry point
|---- Components # folder containing the components
|-- package.json
|-- index.js
```

where index.js is something like this

```javascript
import React from "react";
import { AppRegistry } from "react-native";
import App from "./src/App";

const RNRoot = props => <App {...props} platform="iOS" />;

// Module name
AppRegistry.registerComponent("RNRoot", () => RNRoot);
```

All you need to do is the following:

1. Update your package name in your package.json file. If you want your plugin's access to be restricted, then you need to use a scoped name `@applicaster/my-plugin-name`
2. Add a `main: "./export.js"` property to your package.json
3. Create a `export.js` file which will import from your root component, and export it as a default export:

```javascript
import MyPlugin from "./src";

export default MyPlugin;
```

4. update your zapp plugin manifest with the `dependency_name` and `dependency_version` fields, matching the values in your package.json file
5. publish your plugin to npm
6. publish your updated plugin manifest to Zapp with the zappifest tool

You should end up with a structure like this :

```
|-- src
|---- App.js # App entry point
|---- Components # folder containing the components
|-- package.json
|-- zappifest.json # we advise that you keep your zapp manifest in the repo
|-- index.js
|-- export.js # target of your package.json "main" property
```

with `package.json`:

```javascript
{
  "name": "@applicaster/my-awesome-plugin",
  "version": "1.4.2",
  "main": "./export.js",
  // ...
}
```

and in your `zappifest.json`:

```javascript
{
  "identifier": "awesome-plugin",
  "version": "1.4.2", // this isn't mandatory, but we encourage you to keep zappifest version in sync with your npm version
  "dependency_name": "@applicaster/my-awesome-plugin",
  "dependency_version": "1.4.2",
  // ...
}
```

That's it ! your plugin is now ready to be used in QuickBrick

This setup is perfectly compatible with the bundle deployment on s3, and both approach can coexist in the same repository.
As a more advanced setup, you can add a step in your CircleCI config to automatically release on npm when merging to master, and update your plugin manifest in Zapp at the same time.
