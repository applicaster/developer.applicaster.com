# Plugin Manifest Format

The plugin manifest is a JSON document which describes the interface between Zapp system and the plugin. Zapp only needs the plugin manifest file and you are ready to use it!

For your convenience we created [Zappifest Tool](https://github.com/applicaster/zappifest) to help you create this file step by step.

## Example Manifest
```json
{
  "author_name": "Ran Meirman",
  "author_email": "ran.meirman@zapp-plugins.com",
  "manifest_version": "1.0",
  "identifier": "video_360",
  "name": "Kolor Eyes 360 video player",
  "description": "360 player",
  "platform": "android",
  "dependency_repository_url": [
    {
      "url": "http://maven.com",
      "credentials":{
        "username": "user",
        "password": "pass",
      }
    },
  ],
  "dependency_name": "AP360Player",
  "dependency_version": "1.1",
  "type": "player",
  "api": {
    "class_name": "AP360Player",
    "proguard_rules": "-keep class com.applicaster.ap360player.activities.KolorEyePlayer360Activity {*;}",
  },
  "react_native": false,
  "custom_configuration_fields": [
    {
      "section": "player_configuration",
      "type": "text",
      "key": "player_secret_key",
      "tooltip_text": "This secret key is used for security to connect to the proper 360Player account. \nTo learn more about it, click <a href=http://developer.applicaster.com target=_blank>here</a>.",
      "default": 1
    }
  ]
}
```

## Fields :
(please note that some of the fields are relevant to only one platform or only one type of a plugin)

- **author_name**
- **author_email**
- **manifest_version**: defines the version of the manifest.
- **identifier**: An identifier for your plugin. A unique field to identify your plugin.
- **name**: The name of the plugin. This is the name that will be in use when choosing plugin to App Version.
- **description**: Describes the plugin.
- **type**: Plugin type out of predefined types.
- **whitelisted_account_ids**: Optional. Array of Applicaster's account_ids as individual strings. To find the relevent account_ids go to `accounts.applicaster.com`. If empty, plugin will be available across all accounts.
- **platform**: The platform of the plugin - should be either `ios/android/tvos`
- **dependency_repository_url**: A list of repo urls the plugin uses.
 _NOTE: for ANDROID use it as an object consists out of url and credentials. For any other platform provide a list of url's_
- **dependency_name**: The name of the dependency as it defined in the repository
- **dependency_version**: The version to be use for this dependency.
- **extra_dependencies**: Relevant for iOS/tvOS only. An array of extra dependencies. Each element in the array is a map of the name of the dependencies and the relevant pod specs. For example:
```
"extra_dependencies": [
    {
      "RNVectorIcons": ":path => 'node_modules/react-native-vector-icons'"
    },
    {
      "BVLinearGradient": ":path => 'node_modules/react-native-linear-gradient'"
    },
    {
      "React": ":path => 'node_modules/react-native', :subspecs => ['Core','RCTText','RCTImage','RCTAnimation','RCTNetwork','RCTWebSocket','RCTLinkingIOS']"
    }
  ]
```
- **npm_dependencies**: An array of npm packages to be installed. Mainly in use for RN plugins.
- **api/class_name**: Optional field for the class name to be use when launching the plugin.
- **api/android_proguard_rules**: Optional field for `Android` plugins to be added to the `proguard-rules` file.
- **api/require_startup_execution**: Optional field. This will allow the plugin to be opt in to the application startup flow. The plugin must implement the relevant `ios/android` protocol.
- **api/react_packages**: Optional for react plugins. An array of
- **supported_nav_items**: For navigation types plugins (Menu and Navigation Bar). Array of allowd Navigation items for the plugin.
- **custom_configuration_fields**: An optional section the defines an App Version specific fields to be customized via Zapp CMS.
- **react_native**: Boolean field to indicate if the plugin is a React Native plugin.
- **react_bundle_url**: Url to the react native bundle.
- **project_dependencies**: (Android only) Project level counterpart dependencies of RN npm dependencies, Zappifest will ask to optionally add one for each npm dependency detected. Example:
```"project_dependencies": [
    {
      "react-native-linear-gradient": "node_modules/react-native-linear-gradient/android"
    },
    {
      "react-native-video": "node_modules/react-native-video/android"
    }
  ]
```
- **zapp_configuration**: this key allows to collect options for zapp configuration. Currently, the only available option is to hide specific sections in the UiBuilder configuration
Example:
```
"zapp_configuration": {
  "disable_section": {
    "target_screen": true
  }
}
```
This works as a blacklist system - only sections appearing here will be skipped.

The current input options for `custom_configurations_fields`:
* Text
* Text Area
* Checkbox
* Dropdown
* Multi select dropdown (Array)
* Tags (Comma separated text field)
* Color Picker
