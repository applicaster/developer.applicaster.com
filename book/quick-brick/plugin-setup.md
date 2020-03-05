# Setting up a QuickBrick Plugin workspace

1. [Description](#description)
2. [Environment & Compatibility](#env_cap_qb)
3. [Prepare a QuickBrick workspace](#prepare_workspace_qb)
4. [Declaring Native Dependencies](#native_dependencies)
5. [Set up your local QuickBrick app](#setup_qb_app)

***

## Description {#description}

This guide will explain you how to set up a project from scratch, to start creating a new plugin for QuickBrick apps.

Although it is not strictly mandatory, we strongly advise to use [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) in order to have your plugin and your development app coexist peacefully in the same repository

[![Video](https://i.ytimg.com/vi/cJXjmbZtzjs/hqdefault.jpg)](https://youtu.be/cJXjmbZtzjs)

***

## Environment & Compatibility {#env_cap_qb}

Here are the currently used versions of React and React-Native used on the supported platforms:

- React 16.8.3
- React Native 0.59.10
- React Native Web 0.11.5 (for samsung, web & webOS only)

Notes:

Tizen (Samsung) and webOS environments are running on web engines compatible with Chrome 38 and earlier

When your plugin runs on a native platform, React-Native's [Metro Bundler](https://facebook.github.io/metro/) will take care of transpiling your code appropriately.
However, on Tizen (Samsung), web, and webOS platforms, you will need to make sure your code is fully transpiled to valid ES5, including your dependencies.
For performance reasons, our webpack configuration doesn't transpile all `node_modules` on these platforms. We offer you a way to transpile your plugin code automatically by prefixing your npm package name with `@applicaster/quick-brick-`. However, you need to make sure all dependencies you are using are shipping valid ES5 code, or your app may fail to run on the web-based environments.

If you want to transpile your module directly, you can use our babel preset `@applicaster/babel-preset-quick-brick`

***

## Prepare a QuickBrick workspace {#prepare_workspace_qb}

In this step, we will prepare a plugin workspace. It will have a structure like this:

```base
  .
  |-- plugins
  |   |-- plugin_a // actual plugin code
  |       |-- src
  |       |-- index.js
  |       |-- package.json
  |       |-- manifests
  |           |-- tvos.json
  |           |-- samsung_tv.json
  |           |-- ios.json
  |           |-- android.json
  |   |-- plugin_b // actual plugin code
  |       |-- src
  |       |-- index.js
  |       |-- package.json
  |       |-- manifests
  |           |-- tvos.json
  |           |-- samsung_tv.json
  |           |-- ios.json
  |           |-- android.json
  |
  |-- development-app // workspace to start the quick brick app
  |   |-- .keep
  |   |-- config
  |   |-- assets
  |   |-- index.js
  |   |-- package.json
  |
  |-- .gitignore
  |-- .npmignore
  |-- package.json // root package.json
  |-- README.md
  |-- metro.config.js
  |-- yarn.lock
```

To build the structure please follow this guidelines: 

- Create a folder and create a git repository by running `git init`
- Run `npm init` to create a package.json file for your plugin repository. Add the following properties into the `package.json` to enable yarn workspaces
  - `"private": true`
  - `workspaces: ["plugin", "development-app"]`
- Inside the `plugins` directory, create a folder for your plugin. In this folder, create another npm package by running `npm init`. the name in the package.json here will be the actual name of your plugin package. It should be scoped with `@applicaster` domain, and be prefixed with `quick-brick` like this `@applicaster/quick-brick-my-plugin-name`. Make sure the `main` property of this package.json points to the entry point of your plugin. 

  *Note*: Please note that the babel transpiler _will fail miserably in builds_ without `@applicaster/quick-brick-` scope and prefix, it depends on both for picking the dependency correctly.

  Example:

  ```json
  {
    "name": "@applicaster/quick-brick-my-plugin",
    "version": "1.2.3",
    "description": "My QB plugin",
    "main": "index.js",
    "dependencies": { ... }
  }
  ```

- Create a `metro.config.js` file at the root of the workspace. Since we are not running a react-native bundle whose entry point is at the root of the workspace, this is required to provide the relevant configuration to the react-native metro bundler :

  ```javascript
  const { resolve } = require("path");

  const config = {
    resolver: {
      extraNodeModules: {
        "react-native": resolve(__dirname, "./node_modules/react-native")
      }
    },
    projectRoot: resolve(__dirname, "./development-app"),
    /* if you have multiple plugins, add them here so the react packager will watch these too */
    watchFolders: [resolve(__dirname, "./plugin"), resolve(__dirname)]
  };

  module.exports = config;
  ```

- Create a folder named `development-app`. This folder will contain your quick brick development app. We will run React-Native from there. The content of this folder should be in `.gitignore`, but in order to keep it in your repo, we advise to create an empty `.keep` file in it, so git doesn't discard the folder. **This folder is completely re-generated everytime you run the prepare script to set up an app. No custom could should be added here except for testing or debug purposes**
- At the root of the workspace, run `yarn -W add --dev @applicaster/zapplicaster-cli`. This will install the cli tool to control your quick brick app.
- Install react, react-native, and react-native web (samsung only). Currently, you will have to switch react & react native versions depending on wether you want to run the app on samsung or tvos, but this will no longer be needed in the future:
  - tvos: `yarn -W add react@16.8.3 react-native@0.59.10`
  - samsung: `yarn -W add react@16.8.3 react-native@0.59.10 react-native-web@0.11.5`
- Create a `.gitignore` and a `.npmignore` file at the root of the workspace, and add the following rules inside

  ```base
  node_modules
  development-app
  *.log
  ```

  You can of course add in there anything you don't want to push to git or npm
  You now have the main outline of your plugin project.
  If you have native android code on your plugin, it is a good idea to ignore the build folder so you don't push large and unneeded build artefacts to npm.

- Create a `manifests` folder and create the plugin manifests with [`zappifest`](https://developer.applicaster.com/zappifest/plugins-manifest-format.html) for each platform. The plugin name and plugin identifiers should be the same on all platforms. only the platform fields will be different.
- Make sure the `dependency_name` property matches the name of your plugin package defined above, which should be something like `@applicaster/quick-brick-my-plugin-name`. the `dependency_version` should also match the `version` in your plugin's package.json.
- Make sure to set the flag `"react_native": true` in the manifest.
- [publish your manifests](https://developer.applicaster.com/zappifest/zappifest.html) using zappifest.

  Note: 
  At this point, you don't need to publish your plugin to npm yet. Using yarn workspaces will ensure that yarn will resolve the plugin locally in the workspace, instead of using the npm registry.

***

## Declaring Native Dependencies {#native_dependencies}

If your plugin requires native dependencies, you need to provide the relevant information in your plugin manifest to allow the build process to include these dependencies. Usually, these native modules are delivered through npm, and installed via cocoapods (ios) or gradle (android), with references to the files installed in `node_modules` folder, after running npm install.

The build process will then do the following :

1. Run npm install to download the code of your native dependencies
2. Add the required references to the Podfile or the gradle files
3. Run pod install / build the app to retrieve the dependency
4. (Android only) look the name of the react package which require to be initialized when the app starts

Here is a summary of the required information in the manifests:

### Declaring Native Dependencies for iOS / tvOS

1. add the npm dependency name and version in the `npm_dependencies` property of your manifest
2. add the module name (should match the module name in the podspec) and path to the podspec in node modules in the `extra_dependencies` property of your manifest

    Your manifest should contain this (for the react-native svg package):

    ```json
    {
      "identifier": "my-plugin",
      "platform": "ios", // or "tvos"
      ...
      "npm_dependencies": ["react-native-svg@x.y.z"],
      "extra_dependencies": {
        "RNSVG": ":path =>'node_modules/react-native-svg/RNSVG.podspec'"
      }
      ...
    }
    ```

### Declaring Native Dependencies for Android

1. Add the npm dependency name and version `npm_dependencies` property of your manifest.
2. Add the references to add to the gradle file. If the code is non-compiled code, you need to add it as a `project_dependencies`. If the code is a pre-compiled AAR file, you need to add it as a `extra_dependencies`.
3. Add a reference to a class that can be instantiated during the plugin initialization. It can be the class name of the react package if your plugin doesn't have its own native implementation.
4. Add the name of the react package to register in the react native instance manager in `api.react_packages`.
5. If needed, add the proguard rules required, depending on the installation instruction provided by the package.

Your manifest should look like this:

```json
{
  "identifier": "my-plugin",
  "platform": "android",
  "api": {
    "class_name": "com.horcrux.svg.SvgPackage",
    "react_packages": ["com.horcrux.svg.SvgPackage"],
    "proguard_rules": "-keep public class com.horcrux.svg.** {*;}",
  }
  ...
  "npm_dependencies": ["react-native-svg@x.y.z"],
  // if the native code is pre-compiled
  "extra_dependencies": ["com.packagename:x.y.z"],
  // if your native code is not compiled
  "project_dependencies": {
    "react-native-svg": "node_modules/react-native-svg/android",
  },
  ...
}
```

### Setup your app in Zapp

Now that your manifests have been uploaded, you can add your plugin to your app, where you want to use it. Refer to the Zapp & UI builder documentation to know how to add your plugin depending on its type.

***

## Set up your local QuickBrick app {#setup_qb_app}

- In the package.json at the root of your workspace, add a script in the root package json like this: `"zapplicaster": "node_modules/.bin/zapplicaster-cli prepare --yarn --destination-path development-app"`. It will allow you to simply set up a quick brick app by calling `yarn zapplicaster -a <app_version_id>`, making sure it targets the right executable, and provides the right options to the CLI
- Add another script : `"start": "yarn workspace quick-brick-app start"`
- Run `yarn zapplicaster prepare -a <app_version_id>`. This will populate the `development-app` folder with your quick brick app.
- Start the react-native packager by running `yarn start`. This will invoke the script we've just created.
- If you want to run the web app for samsung development, simply point your browser to `http://localhost:4000`

That's it, you're ready to run your app and start coding !
You can refer to the following documentation to start creating your plugin:

- [data source provider](https://developer.applicaster.com/Zapp-Pipes/Home.html)
- [hook plugin (login)](plugins/hooks.md)
- [ui_component](plugins/ui_component.md)
- [full screen plugin](plugins/full_screen_plugin.md)