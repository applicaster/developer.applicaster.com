## TvOS How to create new Video Player plugin

### Introduction
This Document will explain general structure how Video Player plugin are working on TvOS with QuickBrick

#### Supported Apple TV variant:
Apple TV 4th Generation or later using tvOS 11.0 or higher

#### Available from ZappSDK 10.0.0 and above

#### Required Applicaster Frameworks:

* ZappPlugins

### How to crete a new video player plugin?

Please review the following [Example Project](https://github.com/applicaster/DefaultPlayer-tvOS) to see a fully implemented video player plugin example.

1. Create new repo and project in Xcode
2. Make sure that you are using `Cocoapods``1.5.7`.
3. Use the following template as a base of the Podfile and add any additional required dependancies.
```
    platform :tvos, '10.0'
    use_frameworks!

    source 'git@github.com:applicaster/CocoaPods.git'
    source 'git@github.com:applicaster/CocoaPods-Private.git'
    source 'git@github.com:CocoaPods/Specs.git'

    target MyPlayerDependantPlugin' do
      pod 'ZappPlugins'

      target 'MyPlayerDependantPluginTests' do
          inherit! :search_paths
      end
    end
```

4. Run `pod install` in terminal to retrieve all cocoapods dependencies and create `xcworkspace`
5. Open the generated Xcode workspace and create the new plugin class.
6. Create Adapter file  that you will use as root class of your plugin.
7. Make sure that your adapter will inherit two protocols `QBPlayerObserverProtocol` and `ZPPlayerDependantPluginProtocol` and  implement their methods.
8. Implement your plugin general code.
9. Add unit tests

##### Plugin preperation.

1. Create a `podspec` file for your plugin and fill it.


##### Create manifest and upload to Zapp

Please go to the [Zappifest Documentation](../../../../zappifest/zappifest.html) and [Zappifest API Documentation](../../../../zappifest/plugins-manifest-format.html) for more details.
1. Install [Zappifest](https://github.com/applicaster/zappifest)
2. Create manifest with [Zappifest](https://github.com/applicaster/zappifest) using tips.
	__Note:__ in field `class_name` make sure that you will add proper class name. If you are using swift do not forget to add `module name` before class name. __Example:__ `ZappAnalyticsPluginGAtvOS.GoogleAnalyticsPluginAdapter`
3. Upload manifest to Zapp using [Zappifest](https://github.com/applicaster/zappifest)



