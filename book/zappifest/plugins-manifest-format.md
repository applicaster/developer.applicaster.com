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
  "min_zapp_sdk": "4.7.0",
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
  ],
  "thumbnail":{
    "height":36,
    "url":"https://assets/thumbnail.png",
    "width":160
  },
  "preview":{
    "general":[
      {
        "url":"https://assets/x.png"
      },
      {
        "url":"https://assets/y.png"
      }
    ]
  },
  "styles": {
    "fields": [
      {
        "key":"state",
        "label":"Component State",
        "initial_value":"visible",
        "options":[
          {
            "text":"Visible",
            "value":"visible"
          },
          {
            "text":"Overlay",
            "value":"overlay"
          },
          {
            "text":"Hidden",
            "value":"hidden"
          }
        ],
        "rules":"none",
        "type":"select"
      },
      {
        "key":"background_type",
        "label":"Background Type",
        "placeholder":"Select Background Type",
        "initial_value":"Color",
        "options":[
            "color",
             "image"
         ],
         "rules":"none",
         "type":"select"
      },
      {
        "conditional_fields":[
          {
              "condition_value":"color",
              "key":"styles/background_type"
          },
          {
            "condition_value":[
              "visible",
              "overlay"
            ],
            "key":"styles/state"
          }
        ],
        "rules":"all_conditions",
        "key":"background_color",
        "label":"Color",
        "initial_value":"#000000ff",
        "type":"color_picker"
       },
       {
         "conditional_fields": [
         {
           "key": "styles/family",
           "condition_value": "FAMILY_1",
           "options": [
             {
               "text": "cell 1",
               "value": "cell_1",
               "tooltip": {
                 "thumbnail": {
                   "url": "http://some-asset-url"
                 }
               }
             },
             {
               "text": "cell 2",
               "value": "cell_2",
               "tooltip": {
                 "thumbnail": {
                   "url": "http://some-asset-url"
                 }
               }
             },    
           ]
         },
         {
           "key": "styles/family",
           "condition_value": "FAMILY_2",
           "options": [
             {
               "text": "cell 3",
               "value": "cell_3",
               "tooltip": {
                 "thumbnail": {
                   "url": "http://some-asset-url"
                 }
               }
             },
             {
               "text": "cell 4",
               "value": "cell_4",
               "tooltip": {
                 "thumbnail": {
                   "url": "http://some-asset-url"
                 }
               }
             }  
           ]
         }
         ],
         "key": "cell_styles",
         "rules": "conditional",
         "type": "multi_select"
       }
    ]
  },
  "data": {
    "fields": [
      {
        "key": "source",
        "label": "Url",
        "placeholder": "Enter URL",
        "label_tooltip": "some information with ability for html tags <a href=''>here</a>.",
        "type": "text_input"
      }
    ]
  }
}
```

## Fields :
(please note that some of the fields are relevant to only one platform or only one type of a plugin)

### Mandatory fields :
- **author_name**
- **author_email**
- **manifest_version**: defines the version of the manifest.
- **identifier**: An identifier for your plugin. A unique field to identify your plugin.
- **name**: The name of the plugin. This is the name that will be in use when choosing plugin to App Version.
- **description**: Describes the plugin.
- **type**: Plugin type out of predefined types.
- **min_zapp_sdk**: minimum zapp version required for the plugin
- **whitelisted_account_ids**: Optional. Array of Applicaster's account_ids as individual strings. To find the relevent account_ids go to `accounts.applicaster.com`. If empty, plugin will be available across all accounts.

### Optional fields:
- **api/class_name**: Optional field for the class name to be use when launching the plugin.
- **api/android_proguard_rules**: Optional field for `Android` plugins to be added to the `proguard-rules` file.
- **api/require_startup_execution**: Optional field. This will allow the plugin to be opt in to the application startup flow. The plugin must implement the relevant `ios/android` protocol.
- **api/react_packages**: Optional for react plugins. An array of
- **ui_builder_support**: Optional. If the plugin should be supported to be used in Zapp's UI Builder apps, set to true.
- **tooltip_text**: For any custom configuration fields, a text describing the tooltip is required. More about that can be found in the "Custom Field Tooltips" section of the document [here](http://zapp-tech-book.herokuapp.com/zappifest/zappifest.html).
- **platform**: The platform of the plugin - should be either `ios/android/tvos`
- **dependency_name**: The name of the dependency as it defined in the repository
- **dependency_version**: The version to be use for this dependency.
- **dependency_repository_url**: A list of repo urls the plugin uses.
_NOTE: for ANDROID use it as an object consists out of url and credentials. For any other platform provide a list of url's_
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
- **configuration_panel_disabled**: set as true if the plugin configuration should not appear in the plugin gallery. It is recommended to do so when the plugin has a dedicated section in Zapp (Screens, Navigations, etc.)
- **zapp_configuration**: this key allows to collect options for zapp configuration. Currently, the only available option is to hide specific sections in the UiBuilder configuration
Example:
```
"zapp_configuration": {
  "disable_section": {
    "target_screen": true
  }
}
```
- **npm_dependencies**: An array of npm packages to be installed. Mainly in use for RN plugins.
- **react_native**: Boolean field to indicate if the plugin is a React Native plugin.
- **react_bundle_url**: Url to the react native bundle.
- **deprecated_since_zapp_sdk**: Will indicate deprecation of the plugin starting from the given sdk version
- **unsupported_since_zapp_sdk**: indicates that the plugin will not work starting from the given sdk version
- **scheme**: (data source plugins only): scheme to be used for the plugin
- **data_types**: (data source providers only): array of data_types handled by the plugin
- **screenshots**: array of screenshot urls
- **cover_image**: Illustration of the plugin in the Plugin Gallery 278px W x H 146px
![Alt text](../assets/cover_image.png?raw=true "Cover Image")
- **about**: In depth description of the plugin which will populate the "About" tab of the Plugin Gallery.
- **guide**: Description of how the plugin should be used and configured.
The `about` and `guide` properties can both either be a string or markdown. If using a markdown file, do not add these keys to the manifest, as it would take precedence over the markdown file indicated in the publish command
- **custom_configuration_fields**: An optional section the defines an App Version specific fields to be customized via Zapp CMS.
This works as a blacklist system - only sections appearing here will be skipped.

The current input options for `custom_configurations_fields`:
* Text
* Text Area
* Checkbox
* Dropdown
* Multi select dropdown (Array)
* Tags (Comma separated text field)
* Color Picker

- **thumbnail**: plugin screenshot, see example above.  268px W x H 150px
![Alt text](../assets/thumbnail.png?raw=true "Thumbnail")
- **preview**: plugin screenshots, preview is holding a general array of objects, each object has a `url` string of the
asset. This assets can appear in the Ui-Builder preview section. 640px W x H 976px
![Alt text](../assets/preview.png?raw=true "Preview")
- **assets**: An optional section the defines plugin assets configuration. See below for the structure.
In the placeholder of the uploader, please use the following format "XXXpx W x H XXXpx"
- **styles**: An optional section the defines plugin styles configuration. See below for the structure.
- **rules**: An optional section the defines plugin rules configuration. See below for the structure.
- **data**: An optional section the defines plugin data source configuration. See below for the structure.

###### **Navigation plugin fields:**
- **max_nav_items**: the amount of navigation items that plugin can accept.
1. **supported_nav_items**: For navigation types plugins (Menu and Navigation Bar). Array of allowd Navigation items for the plugin.

  - List of available navigation items:
    - `nav_chromecast`
    - `nav_live`
    - `nav_screen`
    - `nav_url`
    - `nav_header`
    - `nav_nested_menu`
    - `nav_epg`
    - `nav_settings`

#### Configuration sections in UiBuilder structure:
##### for **assets**, **styles**, **rules** & **data**

* each section will contain `fields` array, as you can see in example above, each object will be representation of a configurable plugin form field.

1. **form field attributes**:
  - key: mandatory, name of the field
  - label: the label next to the field, if not set, will be using normalized key value
  - placeholder
  - label_tooltip: i icon, that will display the content of the given string value, support html tags
  - type: mandatory, field type, existing types are:
    - `text_input`
    - `number_input`
    - `inline_input`
    - `multi_select`
    - `react_select`
    - `color_picker`
    - `uploader`
    - `switch`
    - `link`
    - `BUTTON`
    - `hidden`
  - initial_value
  - options: for `multi_select` and `react_select` types
  - conditional_fields: if a certain field is depending in another for display or for option values,  see in example above. Conditional field is an array of conditions, with the following structure:
    - key: contains in a string with the section and the key of the depending field, separated by `/`, for example "styles/background_type"
    - condition_value: the value of conditional field, that needs to be fulfilled, it can be a string or an array of a few valid values.
    - options: if the options of the field is changing, depending of conditional field

  - rules: valid values is:
    - `none`
    - `conditional`: if a field is conditional
    - `all_conditions`: all conditional_fields must be fulfilled
