# Plugin Manifest

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
  "screen": true,
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
           ]
         }
         ],
         "key": "cell_styles",
         "rules": "conditional",
         "type": "tag_select"
       }
    ]
  },
  "targets": [
    "tv",
    "mobile"
  ],
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
*Please note that some of the fields are relevant to only one platform or only one type of a plugin*

#### Mandatory:
- - -
Field Key                   | Description
----------------------------| -----------
**author_name**         	| Author full name
**author_email**      	    | Author's email address
**manifest_version**:		| defines the version of the manifest.
**identifier**        	    | An identifier for your plugin. A unique field to identify your plugin.
**name**              	    | The name of the plugin. This is the name that will be in use when choosing plugin to App Version.
**description**             | Describes the plugin.
**type**                    | Plugin type out of predefined types.
**min_zapp_sdk**            | minimum zapp version required for the field, when the plugin is a multi platform, please specify the the platform in the following format: `"min_zapp_sdk": { "ios": "1.0.0", "android": "1.0.0" }`
**whitelisted_account_ids** | Array of Applicaster's account_ids as individual strings. To find the relevent account_ids go to `accounts.applicaster.com`. *Please note - this field is only updated when creating a new plugin. Any further changes must be made by admins in the Zapp portal.*
**ui_builder_support**      | Indicates if the plugin should be used in Zapp's UI Builder apps.
**targets**      | Array type. Some platforms (like Android and Android TV) enables to develop the same plugin for mobile and TV. This param indicates if this plugin should be used on mobile or tv or both devise targets.  Currently the valid options is ["mobile"], ["tv"] or ["mobile", "tv"].


#### Optional:
- - -
Field Key                         | Description
----------------------------------| -----------
**api/class_name**                | Optional field for the class name to be use when launching the plugin.
**api/android_proguard_rules**    | Optional field for `Android` plugins to be added to the `proguard-rules` file.
**api/require_startup_execution** | Optional field. This will allow the plugin to be opt in to the application startup flow. The plugin must implement the relevant `ios/android` protocol.
**api/react_packages**            | Optional for react plugins. An array of
**tooltip_text**                  | For any custom configuration fields, a text describing the tooltip is required. More about that can be found in the "Custom Field Tooltips" section of the document [here](/zappifest/zappifest.md).
**platform**                      | The platform of the plugin - should be either `ios/android/tvos`
**screen**                        | Indicates if the plugin should be presented as a fullscreen (setting this to `true` will allow selecting this plugin under the screens section in Zapp)
**supports_offline**              | Boolean, valid option only for the screen plugins, indicates if this screen is supports offline mode in the app.
**dependency_name**               | The name of the dependency as it defined in the repository
**dependency_version**            | The version to be use for this dependency.
**dependency_repository_url**     | A list of repo urls the plugin uses. _NOTE: for ANDROID use it as an object consists out of url and credentials. For any other platform provide a list of url's_, _NOTE: for iOS if the repository is private - please use ssh `git@github.com/<account>/<repository name>.git`_
**extra_dependencies**            | iOS/tvOS only. An array of extra dependencies. Each element in the array is a map of the name of the dependencies and the relevant pod specs. See [example](#extra-dependencies)
**project_dependencies**          | Android only. Project level counterpart dependencies of RN npm dependencies, Zappifest will ask to optionally add one for each npm dependency detected. See [example](#project-dependencies)
**configuration_panel_disabled**  | set as true if the plugin configuration should not appear in the plugin gallery. It is recommended to do so when the plugin has a dedicated section in Zapp (Screens, Navigations, etc.)
**zapp_configuration**            | This key allows to collect options for zapp configuration. Currently, the only available option is to hide specific sections in the UiBuilder configuration See [example](#zapp-configuration)
**npm_dependencies**              | An array of npm packages to be installed. Mainly in use for RN plugins.
**react_native**                  | Boolean field to indicate if the plugin is a React Native plugin.
**react_bundle_url**              | Url to the react native bundle.
**deprecated_since_zapp_sdk**     | Will indicate deprecation of the plugin starting from the given sdk version
**unsupported_since_zapp_sdk**    | Indicates that the plugin will not work starting from the given sdk version
**scheme**                        | Data source plugins. Scheme to be used for the plugin
**data_types**                    | Data source plugins only). Array of data_types handled by the plugin
**screenshots**                   | array of screenshot urls
**cover_image**                   | Illustration of the plugin in the Plugin Gallery 278px W x H 146px ![Alt text](../assets/cover_image.png?raw=true "Cover Image")
**about**                         | In depth description of the plugin which will populate the "About" tab of the Plugin Gallery.
**guide**                         | Description of how the plugin should be used and configured. The `about` and `guide` properties could both either be a string or markdown. If using a markdown file, do not add these keys to the manifest, as it would take precedence over the markdown file indicated in the publish command
**thumbnail**                     | Plugin screenshot, see example above.  268px W x H 150px ![Alt text](../assets/thumbnail.png?raw=true "Thumbnail")
**custom_configuration_fields**   | Read more [here](#custom-configuration-fields)
**preview**                       | Plugin screenshots, preview is holding a general array of objects, each object has a `url` string of the asset. This assets can appear in the Ui-Builder preview section. 640px W x H 976px ![Alt text](../assets/preview.png?raw=true "Preview")
**assets**						  | An optional section the defines plugin assets configuration. See below for the structure. In the placeholder of the uploader, please use the following format "XXXpx W x H XXXpx". Read more [here](#custom-configuration-sections)
**styles**						  | An optional section the defines plugin styles configuration. Read more [here](#custom-configuration-sections)
**rules**                         | An optional section the defines plugin rules configuration. Read more [here](#custom-configuration-sections).
**data**                          | An optional section the defines plugin data source configuration. Read more [here](#custom-configuration-sections).
**advertising**                   | An optional section the defines plugin data source configuration. Read more [here](#custom-configuration-sections).
**preload**                   | An optional boolean key, that defines if plugin can be hooked (loaded), before the screen loads
**localizations**						  | This section defines plugin localizations configuration, the languages is taken from app family configured languages. All the fields types in this section are `textarea`, and there is no need to mention field type in the manifest.  Read more [here](#custom-configuration-sections)

<a name=localizations"></a>
##### Localizations Example

```
"localizations": {
    "fields": [
      {
        "key": "screen_title_text",
        "label": "Screen Title",
        "tooltip":  "some text",
        "initial_value": "With initial value"
      },
      {
        "key": "restore_password",
        "label": "Restore Password",
        "tooltip":  "some text"
      },
      {
        "key": "logout_test",
        "label": "Logout Text",
        "tooltip":  "some text"
      }
    ]
  },

```

<a name="extra-dependencies"></a>
##### Extra Dependencies Example

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
<a name="project-dependencies"></a>
##### Project Dependencies Example

```
"project_dependencies": [
    {
      "react-native-linear-gradient": "node_modules/react-native-linear-gradient/android"
    },
    {
      "react-native-video": "node_modules/react-native-video/android"
    }
  ]
```
<a name="zapp-configuration"></a>
##### Zapp Configuration Example

Allowing the plugin creator to disable sections in the configuration panel.
```
"zapp_configuration": {
  "disable_section": {
    "target_screen": true
  }
}
```
###### **Navigation plugin fields:**

Field Key               | Description
------------------------| -----------
**max_nav_items**       | The maximum number of navigation items that the user will be allowed to add.
**supported_nav_items** | For navigation types plugins (Menu and Navigation Bar). Array of allowd Navigation items for the plugin. Supported types: `nav_chromecast`, `nav_live` (Live drawer screen), `nav_screen`, `nav_url`, `nav_header` (Header - non clickable label), `nav_nested_menu`, `nav_epg`(EPG screen), `nav_settings` (Settings screen), `tv_right_button`, `tv_right_image`, `tv_left_image`, `tv_left_button`
**max_items_per_type**       | Map type. The maximum number of the same navigation item, that the user will be allowed to add to the navigation.

Here is the example:

```
"max_items_per_type": {
   "nav_screen": 2,
   "nav_url": 3,
 }
```
- - -


### Form Builder
Zapp's manifest allows you to provide custom configuration fields to the users. These fields are input fields that should be specific for the use of the plugin dependent on the app the plugin was added (API keys, project id, speicifc colors, etc.)

These fields will be populated in the plugin configuration panel and plugin configuration modal of a version

#### Custom Fields
<a name="custom-configuration-fields"></a>
**custom_configuration_fields**: An optional section in the manifest the defines an App Version specific fields to be customized via Zapp CMS. Supported types: `text`, `textarea`, `checkbox`, `dropdown` , `tags`, `colorpicker`, `uploader`

#### Configuration sections in Zapp's App Builder structure:
<a name="custom-configuration-sections"></a>
Can be used for **assets**, **styles**, **rules**, **data**, **advertising**, **localizations** sections

* Each section will contain `fields` array, as you can see in example above, each object will be representation of a configurable plugin form field.

* **Form field attributes**:

Field Key         | Description
------------------| -----------
**type**          | Required, Field type. Supported types: `text_input`, `number_input`, `inline_input`, `multi_select` , `tag_select`, `color_picker`, `uploader`, `switch`, `link`, `hidden`, `BUTTON` or [special types](#special-field-types)
**key**           | Required, name of the field
**label**         | The label next to the field, if not set, will be using normalized key value
**placeholder**   | Placeholder attribute of the input field
**min_zapp_sdk**  | minimum zapp version required for the field, when the plugin is a multi platform, please specify the the platform in the following format: `"min_zapp_sdk": { "ios": "1.0.0", "android": "1.0.0" }`
**label_tooltip** | Optional, Will add an info icon that will display the content of the given string value, supports html tags
**initial_value** | This value if the user will not change the field. *Use `true/false` for switch*
**options**       | for `tag_select`, `multi_select` types - an array of objects in the format of `{ "text": "Text Option", "value": "option" }`
**mandatory**     | Optional key for select field. If set to `true` the select box will not present an x button to clear the selected option.

<a name="special-field-types"></a>
##### Special Field Types
###### General Fields:
- **ios_font_selector**: Will populate fonts dropdown with iOS system fonts and Zapp app custom uploaded fonts
- **android_font_selector**: Will populate fonts dropdown with Android system fonts and Zapp app custom uploaded fonts
- **nav_bar_selector**:
 --  This selector is allowing to override default navigation bar for a screen.
 --  Each screen in the app can have a different navigation bar.
If the screen want to use this feature, add in the manifest field with `nav_bar_selector` type and `nav_bar_id` key, that will populate all the nav_bars that available for the current layout.
** Important to mention that in order to populate the field and for it to work `nav_bar_selector` type and `nav_bar_id` key is mandatory.

Here is the example:

```
"fields": [
  {
    "key": "nav_bar_id",
    "type": "nav_bar_selector",
    "label": "Navigation Bar",
    "placeholder": "Choose Nav Bar"
  }
]
```

- **preload_plugins_selector** (Screen feature):
 --  This selector is allowing to choose additional screens/plugins in order to load them before your configured screen.
Only works for screen plugins (screen param must be set to true, otherwise this field is ignored).
If the screen needs to present or load some additional feature before the screen presentation, use this selector.
** Important to mention that in order to populate the field and for it to work `preload_plugins_selector` type and `preload_plugins` key is mandatory within the selector.

Here is the example:

```
"hooks": {
    "fields": [
       {
        "key": "preload_plugins",
        "type": "preload_plugins_selector",
        "label": "Select Preload Plugins"
      }
    ]
  },
```

###### Bundled Assets
If there is a need to add image assets that should be compiled in the app (not remotely configured) you can use the following fields:

For iOS:
```
{
"key": "ios_assets_bundle",
"type": "uploader"
"default": "www.some-url/ios_assets.zip"
}
```

*Please note*: The required file should be a zip file, contains a flat list of files following [these](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/image-size-and-resolution/) guidelines. When creating the file the user needs to make sure the Zip file was created by compressing the **flat list of files** and not adding extra folders.

For Android:
```
{
"key": "android_assets_bundle",
"type": "uploader"
"default": "www.some-url/android_assets.zip"

}
```

*Please note*: The required file should be a zip file, contains the required folder structure following [these](https://developer.android.com/training/multiscreen/screendensities/) guidelines. When creating the file the user needs to make sure the Zip file was created by compressing the **drawables folders list** and not adding extra folders.


###### Data section Fields:
If you would like to use data provided by the user to Zapp `Feeds` section you can define:
```
 "data": {
    "fields": [{
      "key": "source",
      "type": "select"
    },
    {
      "key": "type",
      "type": "select"
    }]
  }
```
This will create the `source` and `type` dropdown fields populated with feeds from Zapp's `Feeds` section.

* **conditional_fields** If a certain field is dependent on another field for display or for option values, see in example above. Conditional fields are array of conditions, with the following structure:

Field Key           | Description
------------------- | -----------
**key**             |  A string with the section and the key of the depending field, separated by `/`, for example "styles/background_type"
**condition_value** | the value of conditional field, that needs to be fulfilled, it can be a string or an array of a few valid values.
**options**         | if the options of the field is changing, depending of conditional field
**rules**           | valid values are: `none`/`conditional`(if a field is conditional) / `all_conditions` (all conditional_fields must be fulfilled)

* **Grouping attributes**:

For UI purposes you can choose to group multiple fields under sub section. The subsection is collapsable In order to do so build the field as follows:

Field Key   | Description
----------- |------------
**group**   | Set true if you want to group fields
**label**   | Group label
**tooltip** | Group tooltip
**folded**  | true/false - If set to true the section will be folded when the configuration panel is presented)
**fields**  | Array of fields as mentioned above (All field keys and types are supported)
Example:
```
advertising: {
    fields: [
    {
      group: true,
      label: 'My Section',
      tooltip: 'some tooltip',
      folded: true,
      fields: [
        {
          key: 'name',
          type: 'text_input',
        }, {
          key: 'type',
          type: 'text_input',
        }
      ]
    },
    {
      key: 'some_other_field',
      type: 'text_input',
    }],
  },
```


* **Exporting attributes**:
Export feature gives you the ability to export fields in the manifest to other plugins.
In order to do so build the field as follows:

Field Key   | Description
----------- |------------
**export**   | The hash that holds the exporting data
**allowed_list**| Array in which each object represents the plugin where the fields will be exported
**identifier** | Identifier of the other plugin, in which the fields from the manifest will be exported
**section**  | Section in the other plugin where the fields will be exported
**group**   | Use this field to group multiple fields under sub section
group => **label**   | Group label
group => **tooltip** | Group tooltip
group => **folded**  | true/false - If set to true the section will be folded when the configuration panel is presented)
**allowed_fields**  | Array of fields that the plugin wants to export. If empty, all the fields from the mentioned section will be exported (section must exist in the exporting manifest)
allowed_fields => **section**   | the section where the field is located
allowed_fields => **key**   | The field key
allowed_fields => **min_zapp_sdk** | minimum zapp version required for the field, when the plugin is a multi platform, please specify the the platform in the following format: `"min_zapp_sdk": { "ios": "1.0.0", "android": "1.0.0" }`


** Please note: the exporting plugin should be installed in the app or to be a core plugin (`"core_plugin": true`)

Example:
```
"export": {
  "allowed_list": [
    {
      "identifier": "general_content",
      "group": {
        "label": "refresh",
        "tooltip": "some tooltip",
        "folded": true
      },
      "section": "rules",
      "allowed_fields": [
        {
          "section": "rules",
          "key": "refresh",
          "min_zapp_sdk": {
            "ios": "6.0.0",
            "android": "7.0.0"
          }
        }
      ]
    }
  ]
}
```
