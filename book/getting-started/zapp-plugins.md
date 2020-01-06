# Getting Started with Zapp Plugin

New plugins for the Zapp platform can be created as native iOS (swift, objective c), native Android (Java, Kotlin) or as React Native (JS) projects.

## What is a plugin?

A plugin is a wrapper between Zapp protocol / interface to a specific code base, like your own feature or integration of an SDK.

Zapp supports different types of plugins: app navigation, datasource providers, media players, login & payments, fullscreen, analytics providers, and push providers.

In addition, Zapp includes a few protocols / interfaces that can be used by any type of plugin, for example: loading time hook or handle url scheme.

Open source tools, examples, and live plugins can be found in [GitHub](https://github.com/topics/zapp-plugin) for your use.

## Plugin development flow

**1. Create your project**

The first step in creating a new plugin is to create the plugin project. Our recommendation is first to create the project with the most basic relevant implementation (`hello world`), then make sure it successfully builds inside Zapp before moving to the full implementation. 

In the creation of your project you can use one of following tools / code examples:

- [Examples projects](https://github.com/applicaster/zapp-plugins-examples)
- [Live open source plugins](https://github.com/topics/zapp-plugin)
- [Xcode templates](https://github.com/applicaster/zapp-plugins-ios-templates). 

**2. Publish to Zapp** 

Each plugin should be pushed to its own git repository and deployed (preferably by CI) to a dependency manager; CocoaPods for [iOS](/getting-started/ios-podspec.md), Maven for [Android](/getting-started/set-up-bintray-and-circle-ci.md), and NPM for React-Native and Datasource providers.

Then publish the [Zapp plugin manifest](/zappifest/plugins-manifest-format.md) (zappifest), which is a JSON that declares the plugin getaways (Class name, Pod/Maven/NPM, and more) and enables the plugin developer to add custom plugin configuration fields in Zapp. You can do it easliy by using the [zappifest cli](https://github.com/applicaster/zappifest).

**3. Build your app and download the development project**

In order to enable the plugin developer to develop the plugin in the most realistic environment, we have created the *Zapp development project*. Follow the guide to build your app and generate the development project, [for more details](/getting-started/download-development-project.md).

**4. Finalize your plugin, test it, and publish the final version**

Use the development project and finalize your plugin, don't forget to test it locally. Then, publish an updated version of your plugin to Zapp and re-build your app.

Plugins can be submitted as a public plugin or a whitelisted plugin. 
A whitelisted plugin is a plugin that will be available only to specific accounts in Zapp, whereas a public plugin will be available to all accounts and applications to use.

New plugins are always submitted as whitelisted plugins and can be upgraded to a public status only after review according to the [plugins submission guideline](/plugins-guidelines/plugin_submission_guideline.md).

## Next steps
* [Different types of plugins (in detail)](/getting-started/plugin-types.md)
* [Getting started with an iOS Plugin](/dev-env/iOS.md)
* [Getting started with an Android plugin](/dev-env/android.md)
* [Getting started with a React native plugin](/dev-env/react-native.md)
* [Getting started with a Datasource provider plugin](/dev-env/node.md)
