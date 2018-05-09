##Root Menu Plugin infrastructure
These plugins provide a main navigation structure for the application.

1. <a href="#description">Description</a>
2. <a href="#general">General behaviours</a>
3. <a href="#datasource">Data Source</a>
4. <a href="#helperClasses">Helper classes</a>
4. <a href="#protocol">Protocols</a>
5. <a href="#api">UIBuilder Api</a>
6. <a href="#createMenuPlugin">How to create a new Root menu plugin</a>
	* <a href="#devEnv">How to prepare development environment</a>
	* <a href="#howToTest">How to test</a>

* * *

<a name="description" />

##### Description
Root navigation plugins are the main navigation of the app. They provide a UI to present different screens. Each screen will fill the provided application container, and can control navigation bar view.

The Root menu can be customized in the UI Builder via the Navigation section, as illustrated below. The customized navigation bar will be available on each screen as part of zapp rivers api.

![menuUIBuilder.png](./Files/menuUIBuilder.png)
***

<a name="general" />

##### General behaviours

The Root menu plugin infrastructure  provides general features which will be implemented in any plugin of this type.

######Plugin creation
When enabling Use `UI Builder Root API` flag on App version general settings, the application will try to populate the first occurrence of Navigation in the home river as defined in Zapp rivers api.
Application will get first `menu` plugin from the `home` screen navigations and take it identifier. After doing so `ZPRootPluginFactory` will try to find `menu` type plugin within Zapp plugin configurations API with the identifier specified on rivers API. If no plugin will be found the current logic will be used.
![EnableCustomRootBehaviour.png](./Files/EnableCustomRootBehaviour.png)

Example:
__Note:__ Some unnecessary items were removed from example
__Plugin json:__ key -`identifier` representation of the `menu` plugin unique id
```
[
    {
        "plugin": {
            "api": {
                "class_name": "ZappRootPlugins.ZPTwoLevelRNViewController",
            },

            "dependency_name": "ZappRootPlugins/TwoLevelRNMenu",
            "dependency_version": "3.2.0",
            "identifier": "side_menu",
            "manifest_version": "0.4.0",
            "name": "2-Level Menu",
            "type": "menu",
        }
    },
    {
	"plugin": {
		"api": {
			"class_name": "ZappRootPlugins.ZPTwoLevelRNViewController",
		},

		"dependency_name": "ZappRootPlugins/TwoLevelRNMenu",
		"dependency_version": "3.2.0",
		"identifier": "two_level_rn_menu",
		"manifest_version": "0.4.0",
		"name": "2-Level Menu",
		"type": "menu",
	}
]
```

__Rivers json:__ key -`navigation_type` representation of the `menu` plugin unique id
```
[
    {
        "home": true,
        "id": "87706774-8436-4273-87bd-9a5cfa9f37ff",
        "name": "Home",
        "navigations": [{
                "category": "menu",
                "id": "736c94c4-f5ca-4edf-83fe-969591f688b8",
                "name": "2-Level Menu",
                "nav_items": [...navigation items],
                "navigation_type": "two_level_rn_menu"
            }],
        "styles": {
            "family": "FAMILY_1"
        },
        "type": "general_content",
        "ui_components": [...ui components]
    }
]
```

__Result:__ In this example, plugin with identifier `side_menu` will be ignored. Application will take plugin with identifier `two_level_rn_menu`.

######Home screen
Each app has home screen defined in rivers API (Please add example). The home screen is the main screen of the application and will use custom rules regarding other plugins.
In `menu` plugin this screen must be presented as first screen of the application.
The home key appears as a boolean in the api and in used in `ZLScreenModelas` in `isHomeScreen` property in `river.json` a key for it `"home": false`. Please check [Rivers.json](Rivers.md) documentation for more details and <a href="#datasource">Data Source</a> section for understanding data source creation.

######Controlling of the navigation bar view
By default navigation bar container is controlled by `GARootViewContainerController`.

In some cases complicated UI or other specifications where the root menu needs to control navigation bar view, `ZPRootViewContainerControllerDelegate` protocol should be implemented. When doing so, `GARootViewContainerController` will delegate all configuration logic of navigation bar view to the root menu.
In this case developer __must__ implement all cases to support default behavoiurs of the nav bar, like `presentation_type` (on_top or overlay).
For more deatails please check documentation of the [Nav bar plugin](http://zapp-tech-book.herokuapp.com/ui-builder/ios/NavigatioBarPlugins.html)

![NavigationBarStates.png](./Files/NavigationBarStates.png)

######Menu button or special button
Some menu plugins will require communication with `Navigation Bar`.
__Example:__ Menu button on nav bar will send action to `root menu` to present side menu

This behavior is optional. When a plugin wants to communicate with the `Navigation Bar` plugin, the menu button must implement `performSpecialAction:` (part of `ZPAdapterRootProtocol`).
If the method was implemented, `Navigation Bar` will present the menu button in the place that was defined in the Navigation Bar Style

__Please Note__: Api supports only one button of this type.

######Customization per screen
The root menu can be customized per screen. This gives the ability to use different settings for each screen as it relates to the customer’s needs. Behind the scenes, when the end-user selects a new screen, the application will send a notification to update the navigation bar title and navigation bar model.
Example: Tab Bar plugin change tabs color regarding presentation of a screen.

<a name="datasource" />
#####Data Source
Data source for `Root menu` plugin must be taken from [Rivers.json](Rivers.md) under `navigations` dict in `ZLNavagationModel` of your `ZLScreenModel`.
Developer must take `ZLNavigationModel` of the `menu plugin` from `ZLScreenModel of home` screen.
Plugin `ZLNavigationModel` consist `children` with `ZLNavigationItem` array, that must be parsed and used as data source for `menu` plugin.

######ZLNavagationItem Types
In `menu` plugin must be defined types of the navigation items that can be supported by current plugin.

__Please note:__ Each plugin can have different supported naviagation items. As example, Tab bar plugin does not supports `nested_menu` since it does not have ability to present children of the children

![NavigationItemsAdd.png](./Files/NavigationItemsAdd.png)

Availible Navigation Items for menu:

| Button type | Description                         | Api button key         |
|-------------|-------------------------------------| ---------------------- |
| Screen      | Opens generic screen                | label                  |
| URL         | Opens URL or WebView                | label                  |
| Header      | Used to define header object        | live_drawer            |
| EPG         | Respresentation of EPG sceen        | applicaster_epg        |
| Settings    | Respresentation Settings screen     | applicaster_settings   |
| Nested Menu | Model that consist nested nav items | nested_menu            |

__Please Note__: It is the `Menu` developer responsibility to add supportted navigation items to plugin manifest
***

<a name="protocol" />
##### Protocols
`ZPAdapterRootProtocol` - This protocol defines main interface for Root Menu, each menu plugin should implement the protocol.

`ZPRootViewContainerControllerDelegate` - This protocol defines interface to use presentation for nav bar view. If this protocol will be implemented, `GARootViewContainerController` will not implement navigation bar logic, and menu plugin will responsible to control it.

***

<a name="helperClasses" />

##### Helper Classes

Root menu plugin can use helper classes that help to use generic behaviour for all menu plugins. Such classes will be described bellow

######ZappAppConnector
This library provide bridge between application and plugin. It can be used to get any information from plugin.
To use it call `ZAAppConnector.sharedInstance()` and select protocol type what you want to use.
__Note:__ Each plugin and each native framework visible `ZAAppConnector` so it can be called almost from any place of the application.

######GARootHelper
This class is bridge between `menu` plugin and rest of application. Each action that the application needs to send to `menu` plugin will be send to `GARootHelper` and then `GARootHelper` will send action to `root menu` plugin

######GAViewControllerFactory
This is class is responsible to create create view controller from ZLNavigationItems that will create each screen.
` class open func viewController(fromNavigationItem navigationItem:Any) -> UIViewController?` - Call this method to retrive ViewController from ZLNavigationItem.

<a name="api" />

To make more understanding of this section Please read: [Rivers.json API](Rivers.md) for more details

Navigation Bar api placed in `navigations` array inside `screen model`
The `category` - of the navigation model is defined in navigation model. Navigation model type is `nav_bar`

Example:
```
{
        "id" : "uniqueID",
        "category": "menu",
        "rules": {},
        "nav_items" : [
            {
                "id" : "uniqueID",
                "title" : "Home Screen",
                "type" : "label",

                "data" : {
                    "target" : "c320c5d90661-d241-410b-81fb-c320c5d90661"
                    "connected": true,
                    "source": "URL",
                    "type": "APPLICASTER_ATOM_FEED"
                },
                "assets" : {},
                "nav_items" : [],
                "rules" : {},
                "styles" : {}
            },
            {
                "id" : "uniqueID",
                "title" : "Home Screen",
                "type" : "nested_menu",

                "data" : {
                    "target" : "c320c5d90661-d241-410b-81fb-c320c5d90661"
                    "connected": true,
                    "source": "URL",
                    "type": "APPLICASTER_ATOM_FEED"
                },
                "assets" : {},
                "nav_items" : [
                         {
                        "id" : "uniqueID",
                        "title" : "All Shows",
                        "type" : "label",

                        "data" : {
                            "target" : "c320c5d90661-d241-410b-81fb-c320c5d90662"
                            "connected": false,
                            "source": null,
                            "type": null
                        },
                        "assets" : {},
                        "nav_items" : [],
                        "rules" : {},
                        "styles" : {}
                    }
                ],
                "rules" : {},
                "styles" : {}
            }
        ],
        "styles": {},
        "assets" : {}
    }
```
***

<a name="createMenuPlugin" />
##### How to create a new Root menu plugin

#### ZappRootPlugins
1. Create target for your new plugin `MyAwesomeRootPluginPlugin`
2. Inside your target folder add files that you will want to use.
3. Add your target as `dependency` to `BuildAll` target. A closed SDK should be created.
![navBarPluginDependency.png](./Files/navBarPluginDependency.png)
4. Add in `pofile` new target for building with all relevant dependencies. Please look for `Base` target as an example.
5. Add in `ZappRootPlugins.podspec` and `ZappRootPlugins-Dev.podspec` subspec of your new plugin.
6. Implement your plugin according to the above mentioned guide.
7. Make sure `menu` adapter implements `ZPAdapterRootProtocol`.
8. If you menu plugin wants to control navigation bar view behaviour, make sure that you will implement your `ZPRootViewContainerControllerDelegate`
9. If you need to support `menu button` make sure that method of `ZPAdapterRootProtocol` is implemented `performSpecialAction:`
10. Write unit tests - if someone wants to use TDD than the test could be written before the code.

##### UIBuilder
1. Create manifest for new navigation plugin with plugin type `menu`. How to create manifest please check zappifest documentation.
2. Add supported navigation items for menu, more detail in <a href="#datasource">Data Source</a> section
2. Upload manifest to the zapp.

<a name="devEnv" />
###### How to use dev environment
1. Clone in `yourFolderPath` `https://github.com/applicaster/ZappRoot-iOS.git`
2. In Podfile of Zapp-iOS project remove  line `pod 'ZappRootPlugins', '~> *`
3. Add in podfile
```
    pod 'ZappRootPluginBase', :path => 'yourFolderPath/ZappRoot-iOS/ZappRootPluginBase-Dev.podspec
    pod 'ZappRootPlugins', :path => 'yourFolderPath/ZappRoot-iOS/ZappRootPlugins-Dev.podspec'
```
4. This will give ability to create develompent pod of the RootMenuPlugin
5. Make sure that this test changes will not be merged to Zapp-iOS __This is only for your testing__

<a name="howToTest" />
###### How to test

1. Open UI Builder and add your navigation plugin in `navigation` section.
2. Customize the menu as desired and add Navigation items.
3. Copy ID of the application version of your tesing application
4. Use ZappTool to prepare application environment. (Read Zapptool docs for further information)
5. If your plugin has dependencies and you are using development environment for navigation plugin, find Zapp-iOS pod in `podfile` with your plugin dependency under `# Zaptool pods - Do not remove or change.` section. It will look something like `pod 'ZappRootPlugins/MyAwesomePlugin', '~> 0.4.1'` and It should be and change it to `pod 'ZappRootPlugins/MyAwesomePlugin', :path => 'yourFolderPath/ZappRoot-iOS/ZappRootPlugins-Dev.podspec`. This will remove issue with dependecy conflicts