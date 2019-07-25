# iOS

iOS plugins can be written with Swift or Objective C.

To be able to write iOS native plugins, you will need to make sure you are setting your iOS environment to:

* Xcode version 10.1
* Swift version `4.2`
* Make sure that your plugin is `bitcode enable`
* Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) version `1.5.3`

## Creating a new iOS Plugin

Each plugin is comprised from a git repository including the following:
* Xcode project generating a dynamic library and optionally a demo project
* Cocoapods podspec for the latest version (optionally have a spec directory containing previous versions) generating
* [Zapp Plugins Manifest](/zappifest/plugins-manifest-format.md)

### Example Podfile
Here is an example of a basic podfile to include the dependencies and configurations used by our plugins:

```
platform :ios, '10.0'
use_frameworks!
install! 'cocoapods', :deterministic_uuids => false

source 'git@github.com:applicaster/CocoaPods.git'
source 'git@github.com:applicaster/PluginsBuilderCocoaPods.git'
source 'git@github.com:CocoaPods/Specs.git'

def shared_pods
  pod 'ZappPlugins'
  pod 'ZappSDK', :path => './ZappPluginExample.podspec'
end

target 'ZappPluginExample-iOS' do
    shared_pods
end

post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
            config.build_settings['SWIFT_VERSION'] = '4.2'
        end
    end
end
```

This Podfile references the podspec and will create a structure where the plugin code is imported like a real project as a development pod.

### Podspec example
Here is a simple example for a podspec for a sample plugin:

```
Pod::Spec.new do |s|

  s.name             = "ZappPluginExample-iOS"
  s.version          = '1.0.0'
  s.summary          = "An Example of a plugin for Zapp iOS."
  s.description      = <<-DESC
                        An Example of a plugin for Zapp iOS.
                       DESC
  s.homepage         = "https://github.com/applicaster/ZappPluginExample-iOS"
  s.license          = 'MIT'
  s.author           = { "Liviu Romascanu" => "l.romasca@applicaster.com" }
  s.source           = { :git => "git@github.com:applicaster/ZappPluginExample-iOS.git", :tag => s.version.to_s }

  s.platform     = :ios, '10.0'
  s.requires_arc = true

  s.public_header_files = 'ZappPluginExample-iOS/**/*.h'
  s.source_files = 'ZappPluginExample-iOS/**/*.{h,m,swift}'

  s.resources = [
                  "ZappPluginExample-iOS/**/*.xcassets",
                  "ZappPluginExample-iOS/**/*.storyboard",
                  "ZappPluginExample-iOS/**/*.xib",
                  "ZappPluginExample-iOS/**/*.png"]

  s.xcconfig =  { 'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
                  'ENABLE_BITCODE' => 'NO',
                  'OTHER_LDFLAGS' => '$(inherited)',
                  'FRAMEWORK_SEARCH_PATHS' => '$(inherited) "${PODS_ROOT}"/**',
                  'LIBRARY_SEARCH_PATHS' => '$(inherited) "${PODS_ROOT}"/**'
                }

  s.dependency 'ZappPlugins'
end
```

This podspec will also generate a bundle for the dynamic framework.
If this is not needed, feel free to remove the resources section.

Please refer to our [Guide for deploying a plugin to cocoapods](/getting-started/ios-podspec.md) for instructions regarding the different options of hosting and serving the different podspec files and correctly versioning them.

_NOTE: When using private pods and pod repositories - it is mandatory to use SSH - `git@github.com/<account>/<dependancy>.git` in the `s.source` field, and invite the CI github user to have access to the code. Unfortunatly HTTPS is not properly supported for this use._

## Starting a new project
There are a couple of options of starting a new plugin project:
* Use one of the [Applicaster examples](https://github.com/applicaster/zapp-plugins-examples/tree/master/VideoPlayer/iOS)
* Start a new Cocopod from scratch
* Use an Applicaster [Zapp Plugin template](https://github.com/applicaster/zapp-plugins-ios-templates) to create a new project.

## Next Steps
* [Applicaster Zapp App Connector utilities for iOS plugins](/dev-env/iOS/utils.md)
* [Deploy & Submit](/getting-started/deploy-and-submit.md)
* [Download a development project](/getting-started/download-development-project.md)

## Guides per plugin type
* [Screen Plugins](/ui-builder/ios/ScreenPlugin.md)
* [Pre Hook Plugins](/ui-builder/ios/PreHooks-ScreenPlugin.md)
* [Root Menu Plugins](/ui-builder/ios/RootMenuPlugins.md)
* [Navigation Bar Plugins](/ui-builder/ios/NavigatioBarPlugins.md)
* [Advertisement Plugins](/advertisement/ios/ios.md)
* [Player Plugins](/player/iOS.md)