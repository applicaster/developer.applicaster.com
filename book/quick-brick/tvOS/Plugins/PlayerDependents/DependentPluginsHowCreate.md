# tvOS Video Player Dependent Plugins

## Introduction
This Document will explain how create Video Player Dependent Plugin

## Supported devices and OS versions:
Apple TV 4th Generation or later using tvOS 11.0 or higher
Available from ZappSDK 10.1.1 and above

## Required Applicaster Frameworks:

Add the following import:`import ZappPlugins`

## How to crete a new video player plugin?

Please review the following [Example Project](https://github.com/applicaster/DefaultPlayer-tvOS) to see a fully implemented video player plugin example.

1. Create new repo and project in Xcode
2. Make sure that you are using `Cocoapods` `1.7.5`.
3. Use the following template as a base of the Podfile and add any additional required dependancies.

###### Example:
```ruby
    platform :tvos, '10.0'
    use_frameworks!

    source 'git@github.com:applicaster/CocoaPods.git'
    source 'git@github.com:applicaster/CocoaPods-Private.git'
    source 'git@github.com:CocoaPods/Specs.git'

    target MyPlayerDependentPlugin' do
      pod 'ZappPlugins'

      target 'MyPlayerDependentPluginTests' do
          inherit! :search_paths
      end
    end
```

4. Run `pod install` in terminal to retrieve all cocoapods dependencies and create a workspace.
5. Open the generated Xcode workspace and create the new plugin class.
6. Create an adapter file. This file will be used as the entry point of your plugin.
7. The adapter should inherit and implement the following protocols - QBPlayerObserverProtocol and ZPPlayerDependentPluginProtocol.
8. Add implementation for the specific plugin functionality
9. Add unit tests

## Plugin preperation.

1. Create a `podspec` file for your plugin and fill it.

###### Example:
```ruby

Pod::Spec.new do |s|
	s.name = "GoogleInteractiveMediaAdsTvOS"
	s.version = "1.0.3"
	s.platform = :tvos
	s.swift_versions = ['5.0']
	s.tvos.deployment_target = "10.0"
	s.summary = "GoogleInteractiveMediaAds"
	s.description = "Zapp Plugins store Protocol and Managers that relevant for Applicaster Zapp Plugin System"
	s.homepage = "https://applicaster.com"
	s.license = 'Appache 2.0'
	s.author = "Applicaster LTD."
	s.source = {
		 :git => 'https://github.com/applicaster/Google-IMA-Client-TV.git',
		 :tag => s.version.to_s
  }

	s.vendored_frameworks = 'tvOS/GoogleInteractiveMediaAdsTvOS/GoogleInteractiveMediaAdsTvOS/GoogleInteractiveAds/GoogleInteractiveMediaAds.framework'
	s.preserve_paths = 'tvOS/GoogleInteractiveMediaAdsTvOS/GoogleInteractiveMediaAdsTvOS/GoogleInteractiveAds/GoogleInteractiveMediaAds.framework'

	s.source_files  = 'tvOS/GoogleInteractiveMediaAdsTvOS/GoogleInteractiveMediaAdsTvOS/**/*.swift'
	s.dependency 'ZappPlugins'

	s.xcconfig = { 'ENABLE_BITCODE' => 'YES',
							'OTHER_LDFLAGS' => '$(inherited)  -framework "GoogleInteractiveMediaAds"',
							'FRAMEWORK_SEARCH_PATHS' => '$(inherited) "${PODS_ROOT}"/**',
							'LIBRARY_SEARCH_PATHS' => '$(inherited) "${PODS_ROOT}"/**',
							'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
							'ENABLE_TESTABILITY' => 'YES',
							'OTHER_CFLAGS'  => '-fembed-bitcode',
							'FRAMEWORK_SEARCH_PATHS' => '/Applications/Xcode.app/Contents/Developer/Library/Frameworks',
							'SWIFT_VERSION' => '5.0',
							 }

end

```

## Create manifest and upload to Zapp

Please go to the [Zappifest Documentation](/zappifest/zappifest.md) and [Zappifest API Documentation](/zappifest/plugins-manifest-format.md) for more details.
1. Install [Zappifest](https://developer.applicaster.com/zappifest/zappifest.html)
2. Create manifest with [Zappifest](https://developer.applicaster.com/zappifest/zappifest.html) [Using Tips](https://developer.applicaster.com/zappifest/plugins-manifest-format.html).
	__Note:__ in field `class_name` make sure that you will add proper class name. If you are using swift do not forget to add `module name` before class name. __Example:__ `ZappAnalyticsPluginGAtvOS.GoogleAnalyticsPluginAdapter`
3. Upload manifest to Zapp using [Zappifest](https://developer.applicaster.com/zappifest/zappifest.html)

###### Manifest Example:

```json
{
    "api": {
        "require_startup_execution": false,
        "class_name": "GoogleInteractiveMediaAdsAdapter",
        "modules": [
            "GoogleInteractiveMediaAdsTvOS"
        ]
    },
    "dependency_name": "@applicaster/quick-brick-google-ima-client-tv",
    "dependency_version": "1.0.2",
    "platform": "tvos",
    "author_name": "Anton Kononenko",
    "author_email": "a.kononenko@applicaster.com",
    "manifest_version": "1.0.2",
    "name": "GoogleInteractiveMediaAdsTV",
    "description": "This plugin allow to add Google Interactive Media Ads to supported players",
    "type": "video_advertisement",
    "identifier": "GoogleInteractiveMediaAdsTv",
    "ui_builder_support": true,
    "whitelisted_account_ids": [
        "572a0a65373163000b000000"
    ],
    "extra_dependencies": [
        {
            "GoogleInteractiveMediaAdsTvOS": ":path => './quick_brick/node_modules/@applicaster/quick-brick-google-ima-client-tv/GoogleInteractiveMediaAdsTvOS.podspec'"
        }
    ],
    "min_zapp_sdk": "10.1.0-Dev",
    "deprecated_since_zapp_sdk": "",
    "unsupported_since_zapp_sdk": "",
    "react_native": true,
    "custom_configuration_fields": [
        {
            "type": "text",
            "key": "tag_vmap_url",
            "tooltip_text": "VMAP URL",
            "default": ""
        },
        {
            "type": "text",
            "key": "tag_preroll_url",
            "tooltip_text": "Preroll URL",
            "default": ""
        },
        {
            "type": "text",
            "key": "tag_postroll_url",
            "tooltip_text": "Postroll URL",
            "default": ""
        },
        {
            "type": "text",
            "key": "tag_midroll_url",
            "tooltip_text": "Midroll URL",
            "default": ""
        },
        {
            "type": "text",
            "key": "midroll_offset",
            "tooltip_text": "Midroll offset",
            "default": ""
        }
    ],
    "targets": [
        "tv"
    ]
}
```



