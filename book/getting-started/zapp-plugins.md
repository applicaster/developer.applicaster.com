# Getting Started with Zapp Plugin

New plugins for the Zapp platform can be created as a native iOS (swift, objective c), native Android (Java, Kotlin) or as React Native (JS) projects.

## What is a plugin?

A plugin is a wrapper between Zapp protocol / interface to a specific code base, like your own feature or integration of an SDK.

Zapp is supporting different types of plugins: app navigation, datasource providers, media players, login & payments, full screen, analytics providers and push providers.

In addition, Zapp includes a few protocols / interfaces that can be used by any type of plugin, for example: loading time hook or handle url scheme.

## How plugins are deployed and submitted to Zapp?

Each plugin should be pushed to its own git repository and deployed (by CI) to dependence manager; CocoaPods for iOS, Maven for Android and NPM for React-Native and Datasource providers.

The Zapp plugin manifest (zappifest) is a json that declares the plugin getaways (Class name, Pod/Maven/NPM and more) and enables the plugin developer to add custom plugin configuration fields in Zapp.

Plugins can be submitted as a public plugin or a whitelist plugin. A whitelist plugin is a plugin that will be available only to specific accounts in Zapp and a public plugin will be avail to all. New plugins are always submitted as a whitelist plugins and can be upgrade to a public status only after review according to the [plugins submission guideline](/plugins-guidelines/plugin_submission_guideline.md).