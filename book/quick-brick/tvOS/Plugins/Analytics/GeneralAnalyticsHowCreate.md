## TvOS How to Creatte New Analytics plugins

### Introduction
This Document will explain general structure how Analytics plugin are working on TvOS with QuickBrick

#### Supported Apple TV variant:
Apple TV 4th Generation or later using tvOS 11.0 or higher

#### Available from ZappSDK 10.0.0 and above

#### Required Applicaster Frameworks:
* ZappPlugins
* ZappAnalyticsPluginsSDK

1. Create new repo and project in Xcode
2. Make sure that you have installed `Cocoapods``1.5.3`.
3. Use the following template as a base of the Podfile and add any additional required dependancies.
```
    platform :tvos, '10.0'
    use_frameworks!

    source 'git@github.com:applicaster/CocoaPods.git'
    source 'git@github.com:applicaster/CocoaPods-Private.git'
    source 'git@github.com:CocoaPods/Specs.git'

    target MyAnalyticsPlugin' do
      pod 'ZappAnalyticsPluginsSDK'
      pod 'ZappPlugins'

      target 'MyAnalyticsPluginTests' do
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
6. In the newly created class add the following import - import `ZappAnalyticsPluginsSDK`.
7. The class should inherit from ZPAnalyticsProvider. Here is a reference of how the top part of the new class should look
```
 import Foundation
 import ZappAnalyticsPluginsSDK

 class MyAnalyticsPluginAdapter: ZPAnalyticsProvider {}
```
8. Implement the specific code for your analytics provider by adding the functions described above in the protocol.
9. Make sure to implement all event tracking methods as relevant (also for the optional functions if relevant)
10. Add unit tests

##### Plugin preperation.

1. Create a `podspec` file for your plugin and fill it.
2. Create `cocoapod` dependency of your plugin in `git@github.com:applicaster/CocoaPods-Private.git` amd upload it.

##### Create manifest and upload to Zapp
Please go to the [Zappifest Documentation](../../../../zappifest/zappifest.html) and [Zappifest API Documentation](../../../../zappifest/plugins-manifest-format.html) for more details.
1. Install [Zappifest](https://github.com/applicaster/zappifest)
2. Create manifest with [Zappifest](https://github.com/applicaster/zappifest) using tips.
	__Note:__ in field `class_name` make sure that you will add proper class name. If you are using swift do not forget to add `module name` before class name. __Example:__ `ZappAnalyticsPluginGAtvOS.GoogleAnalyticsPluginAdapter`
3. Upload manifest to Zapp using [Zappifest](https://github.com/applicaster/zappifest)



