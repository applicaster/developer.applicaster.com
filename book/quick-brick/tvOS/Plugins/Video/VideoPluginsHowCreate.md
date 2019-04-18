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
2. Make sure that you are using `Cocoapods``1.5.3`.
3. Use the following template as a base of the Podfile and add any additional required dependancies.
```
    platform :tvos, '10.0'
    use_frameworks!

    source 'git@github.com:applicaster/CocoaPods.git'
    source 'git@github.com:applicaster/CocoaPods-Private.git'
    source 'git@github.com:CocoaPods/Specs.git'

    target MyVideoPlayer' do
      pod 'ZappPlugins'
      pod 'yoga', :path => './node_modules/react-native/ReactCommon/yoga'
      pod 'React', :path => './node_modules/react-native', :subspecs => [
        'Core',
        'CxxBridge',
        'DevSupport',
        'RCTAnimation',
        'RCTImage',
        'RCTLinkingIOS',
        'RCTNetwork',
        'RCTPushNotification',
        'RCTSettings',
        'RCTText',
        'RCTWebSocket',
        'tvOS',
      ]
      pod 'DoubleConversion', :podspec => './node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
      pod 'glog', :podspec => './node_modules/react-native/third-party-podspecs/GLog.podspec'
      pod 'Folly', :podspec => './node_modules/react-native/third-party-podspecs/Folly.podspec'
      target 'MyVideoPlayerTests' do
          inherit! :search_paths
      end
    end

    post_install do |installer|
        installer.pods_project.targets.each do |target|
            target.build_configurations.each do |config|
                config.build_settings['ENABLE_BITCODE'] = 'YES'
                config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""
                config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"
                config.build_settings['CODE_SIGNING_ALLOWED'] = "NO"
                config.build_settings['OTHER_CFLAGS'] = ['$(inherited)', "-fembed-bitcode"]
                config.build_settings['BITCODE_GENERATION_MODE']  = "bitcode"
                if config.name == "Debug" && defined?(target.product_type) && target.product_type == "com.apple.product-type.framework"
                    config.build_settings['ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES'] = "YES"
                end
            end
        end
    end
```

4. Run `pod update` in terminal to retrieve all cocoapods dependencies and create `xcworkspace`
5. Open the generated Xcode workspace and create the new plugin class.
6. Create `ReactNative` folder in your project.
7. Inside this folder create file that will be used as module and add there following code changing naming that relevant for your plugin. Also can be added aditional implamentation
    ```
    import Foundation
    import React
    import AVFoundation

    @objc(PlayerModule)
    public class PlayerModule: RCTViewManager {
        static let playerModuleName = "PlayerModule"

        override public static func moduleName() -> String? {
            return PlayerModule.playerModuleName
        }

        override public class func requiresMainQueueSetup() -> Bool {
            return true
        }

        override open var methodQueue: DispatchQueue {
            return bridge.uiManager.methodQueue
        }

        override public func view() -> UIView? {
            guard let eventDispatcher = bridge?.eventDispatcher() else {
                return nil
            }
            return Player(eventDispatcher: eventDispatcher)
        }
    }
    ```
8. In same folder create `.m` file on Objective C to export react native methods to your plugin. Use following code as a template. Export more properties if you need
    ```
    #import <React/RCTBridgeModule.h>
    #import <React/RCTBridge.h>
    #import <React/RCTUIManager.h>
    #import <AVFoundation/AVFoundation.h>
    #import <React/RCTViewManager.h>

    @interface RCT_EXTERN_MODULE(PlayerModule, RCTViewManager)

    RCT_EXPORT_VIEW_PROPERTY(src, NSDictionary);
    RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
    RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);
    RCT_EXPORT_VIEW_PROPERTY(controls, BOOL);
    RCT_EXPORT_VIEW_PROPERTY(volume, float);
    RCT_EXPORT_VIEW_PROPERTY(rate, float);
    RCT_EXPORT_VIEW_PROPERTY(seek, NSDictionary);

    RCT_EXPORT_VIEW_PROPERTY(onVideoLoadStart, RCTBubblingEventBlock);
    RCT_EXPORT_VIEW_PROPERTY(onVideoLoad, RCTBubblingEventBlock);
    RCT_EXPORT_VIEW_PROPERTY(onVideoProgress, RCTBubblingEventBlock);
    RCT_EXPORT_VIEW_PROPERTY(onVideoSeek, RCTBubblingEventBlock);
    RCT_EXPORT_VIEW_PROPERTY(onVideoEnd, RCTBubblingEventBlock);
    RCT_EXPORT_VIEW_PROPERTY(onPlaybackRateChange, RCTBubblingEventBlock);
    @end
```

9. Implement the specific code for your player plugin.
10. Make sure to connect it with exported React native properties
11. Add unit tests

##### Plugin preperation.

1. Create a `podspec` file for your plugin and fill it.
2. Create react native module with depndency of the native plugin.


##### Create manifest and upload to Zapp
__Example Manifest:__ Note: `extra_dependencies` has pospec in node modules
```
{
    "api": {
        "require_startup_execution": false,
        "class_name": "Player",
        "modules": []
    },
    "dependency_repository_url": [],
    "platform": "tvos",
    "author_name": "Anton Kononenko",
    "author_email": "a.kononenko@applicaster.com",
    "dependency_name": "@applicaster/zapp-react-native-tvos-default-player",
    "dependency_version": "1.0.3",
    "manifest_version": "1.0.3",
    "name": "DefaultPlayer",
    "description": "Default Player for tvOS",
    "type": "player",
    "screen": false,
    "identifier": "default_player_tvos",
    "ui_builder_support": false,
    "whitelisted_account_ids": [
        "5ae06cef8fba0f00084bd3c6",
        "572a0a65373163000b000000"
    ],
    "min_zapp_sdk": "6.0.0-Dev",
    "deprecated_since_zapp_sdk": "",
    "unsupported_since_zapp_sdk": "",
    "react_native": true,
    "react_bundle_url": "https://",
    "extra_dependencies": [
        {
            "DefaultPlayer": ":path => './quick_brick/node_modules/@applicaster/zapp-react-native-tvos-default-player/DefaultPlayer.podspec'"
        }
    ],
    "npm_dependencies": [],
    "project_dependencies": [],
    "custom_configuration_fields": []
}
```
Please go to the [Zappifest Documentation](../../../../zappifest/zappifest.html) and [Zappifest API Documentation](../../../../zappifest/plugins-manifest-format.html) for more details.
1. Install [Zappifest](https://github.com/applicaster/zappifest)
2. Create manifest with [Zappifest](https://github.com/applicaster/zappifest) using tips.
	__Note:__ in field `class_name` make sure that you will add proper class name. If you are using swift do not forget to add `module name` before class name. __Example:__ `ZappAnalyticsPluginGAtvOS.GoogleAnalyticsPluginAdapter`
3. Upload manifest to Zapp using [Zappifest](https://github.com/applicaster/zappifest)



