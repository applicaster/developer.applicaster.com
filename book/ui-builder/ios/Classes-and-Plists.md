# Classes and Plists

* * *
###### ZLComponentsMapping.plist
The old style mapping plist used in ComponentsSDK was added to the ZappLayoutsComponentsSDK in order to prevent adding Xibs that are not relevant to the ComponentsSDK.

Structure Dictionary:

`component_type` - Dictionary that represent the ID of an old style component
  * `viewController` - Dictionary UIViewController subclass title that implements the current component logic
  	* key `mappedStyleName` - String mapped style name that uses inside jsons
  	* value `xibName` - xibname for current style

* * *
###### ZLCustomizationLayouts.plist
The ZappLayouts file is used to store UIBuilder templates. This plist uses the same structure as the old style JSON files.

Structure Dictionary:

* `families` - Dictionary of the existing Families
* `family_name` - Dictionary Name of the family that is defined in Zapp
 * `builder_component_type_id` - Dictionary of the ZappLayoutComponentSDK type.
   * `component_zapp_style_id` - Dictionary ID of the zapp style that will be defined in the UIBuilder API.
     * `style` - String Style mapped to `ZLComponentsMapping.plist`
     * `devices` - Dictionary templates for a specific style for different devices.
       * `universal` - Dictionary attributes that may be relevant for iPhone and iPad
	     * key `attribute` - Key for a specific attribute
 	     * value `attribute_value` - Value of a specific attribute
       * `iphone` - Dictionary attributes that may be relevant only for iPhone
         * key `attribute` - Key for a specific attribute
 	     * value `attribute_value` - Value of a specific attribute
       * `ipad` - Dictionary attributes that may be relevant only for iPad
         * key `attribute` - Key for a specific attribute
 	     * value `attribute_value` - Value of a specific attribute

`baseAttributes` - Dictionary of basic attributes that are common to all templates.
* `builder_component_type_id` - Dictionary of the ZappLayoutComponentSDK type
 * key `attribute` - Key for a specific attribute
 * value `attribute_value` - Value of a specific attribute

* * *
###### ZLScreenModel
A model that stores information about the base screen parameters and all the components that are relevant for screen.

###### ZLComponentModel
A model that stores information about the component and its attributes.

###### ZLGenericViewController: CAGenericViewController
A new layer between GAGenericViewController and ComponentsSDK
This file describes all the logic that is relevant to the creation and the usage of the Generic Component Screen with the ZappLayoutsComponentesSDK. In the current implementation, `GAGenericViewController` inherits from `ZLGenericViewController`. `ZLGenericViewController` inherits from `CAGenericViewController`

###### ZLRulesHelper
A Helper Class where helper methods which help working with Rules for `ZLComponentModel`are implemented.

###### ZLCustomizationManager
A Helper Class where helper methods which help working with Layouts and customizations are implemented.

###### ZLComponentsManager
A Helper Class where helper methods which help to init and prepare ZappLayoutsComponentsSDK for work are implemented.

###### ZLComponentURLHelper
Helps to create a url for an API for a selected environment.

###### ZLScreenBuilder
Wraps ZLScreenModel to CAComponentModel and prepares for old style ComponentsSDK use.

###### ZLComponentBuilder
Wraps ZLComponentModel to CAComponentModel and prepares for old style ComponentsSDK use.

###### ZLDefines
Definitions for all the keys that are used in ZappLayoutsComponentsSDK.

###### ZLComponentBuilderProtocol
A Protocol that describes the rules that each component builder subclass should conform to.
