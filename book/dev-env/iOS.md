# iOS

iOS plugins can be written with Swift or Objective C.

To be able to write iOS native plugins, you will need to make sure you are setting your iOS environment to:

* Xcode version 10.1
* Swift version `4.2`
* Make sure that your plugin is `bitcode enable`
* Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) version `1.5.3`

## Download iOS development project

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRBD1LkNz5SoSH8XM1DkSrFlL5k5wyLtK2uWxoqkC4Mr7aGnL3UWx1mbVhdAXj9m64ptDiB9gp-JaBX/embed?start=false&loop=false&delayms=5000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

Enable developers to develop and debug their plugins on a real env/project.

After downloading the Development Project please make sure to add your local plugin pod by:
1. Updating the `Podfile` to include your `podspec` local path.
2. Run `pod install --no-repo-update` on your terminal to add your plugin pod.
3. Run `pod update YourPlugin --no-repo-update` to update your changes.

## Creating a new iOS Plugin

Each plugin is comprised from a git repository including the following:
* Xcode project generating a dynamic library and optionally a demo project
* Cocoapods podspec for the latest version (optionally have a spec directory containing previous versions) generating
* [Zapp Plugins Manifest](/zappifest/plugins-manifest-format.md)

(Add here an example of expected file structure)

## Starting a new project
There are a couple of options of starting a new plugin project:
* Use one of the [Applicaster examples](https://github.com/applicaster/zapp-plugins-examples/tree/master/VideoPlayer/iOS)
* Start a new Cocopod from scratch
* Use an Applicaster [Zapp Plugin template](https://github.com/applicaster/zapp-plugins-ios-templates) to create a new project.

## Guides per plugin type
* [Screen Plugins](/ui-builder/ios/ScreenPlugin.md)
* [Pre Hook Plugin](/ui-builder/ios/PreHooks-ScreenPlugin.md)
* [Root Menu](/ui-builder/ios/RootMenuPlugins.md)
* [Navigation Bar](/ui-builder/ios/NavigatioBarPlugins.md)
* [Advertisement](/advertisement/ios/ios.md)