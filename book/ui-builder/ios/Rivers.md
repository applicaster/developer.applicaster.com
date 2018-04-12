##Rivers.json
This file describes the Rivers JSON API used by Zapp.
This is used to define the layout composition of the app (including navigations, screens, and components)

__Link template:__ https://assets-secure.applicaster.com/zapp/accounts/ `account_id`/apps/`bundle_identifier`/apple_store/`app_version`/rivers/rivers.json

Example:

```
[
    {
        "id": "f99b28fb-f472-403b-832d-9731287a3639",
        "name": "Show Screen",
        "type": "general_content",
        "data": {
            "connected": true,
            "parent": "9bd8db4b-dc8e-4133-aedd-63135e02c31d"
        },
        "styles": {
            "family": "FAMILY_1"
        },
        "home": false,
        "ui_components": [
            {
                "component_type": "hero",
                "data": {
                    "source": "source_url",
                    "type": ""
                },
                "position": 1,
                "rules": {
                    "item_limit": "10"
                },
                "styles": {
                    "family": "FAMILY_1",
                    "layout": "",
                    "header": {
                        "visible": false,
                        "style": ""
                    },
                    "cell_styles": [
                        "HERO_CELL_1"
                    ]
                }
            },
            {
                "component_type": "tab_bar",
                "data": {
                    "source": "",
                    "type": ""
                },
                "position": 3,
                "rules": {
                    "item_limit": "6"
                },
                "styles": {
                    "family": "FAMILY_1",
                    "layout": "TABS_1",
                    "cell_body_component_type": "list",
                    "cell_styles": [
                        "TABS_CELL_1"
                    ],
                    "cell_body_styles": [
                        "LIST_2"
                    ],
                    "header": {
                        "visible": false,
                        "style": null
                    }
                }
            }
        ],
        "navigations": [
           {
                "id": "4603c9ee-ef43-4415-b2b0-a970e3e41103",
                "name": null,
                "navigation_type": "navigation_bar",
                "category": "nav_bar",
                "styles": {},
                "rules": {},
                "assets": {},
                "nav_items": []
            },
            {
                "id": "2fefe732-d7bc-4323-b1a1-0b590255b287",
                "name": null,
                "navigation_type": "TwoLevelRNMenu",
                "category": "menu",
                "styles": {},
                "rules": {},
                "assets": {},
                "nav_items": []
            }
        ]
    },
]

```

__Screen model schema__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  data          |  Dictionary  | Stores data source of the screen                 |
|  id            |  String      | Unique id of screen                              |
|  name          |  String      | Screen title                                     |
|  styles        |  Dictionary  | Screen styles                                    |
|  ui_components |  Array       | UI Components array, that wil be presented in screen|
|  navigations   |  Array       | Navigation, defines application navigation |
|  home          |  Bool        | Representing if screen is Home screen          |
|  type          |  String      | Type of the screen. Example: 'general_content'   |

__Screen model schema: data__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  source        |  String      | URL of the data source item                      |
|  type          |  String      | Type id of the data source. Example: 'televisa_collection' |
|  connected     |  Bool        | Define if screen connected                       |
|  parent        |  String      | Indicating the screen that is targeting the current screen |

__Screen model schema: styles__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  family        |  String      | External Identifier of the family                |

###### Component model defines representation of single component

__Screen model schema: ui_components - ComponentModel__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  component_type|  String      | Component type								   |
|  data          |  Dictionary  | Stores data source of the component              |
|  rules         |  Dictionary  | Specific rules releavant for component type      |
|  styles        |  Dictionary  | Component styles                                 |

__ComponentModel schema: data__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  source        |  String      | URL of the data source item . URL base 64 encoded |
|  type          |  String      | type id of the data source. Example: 'televisa_collection' |
|  connected     |  Bool        | Define if component connected to another screen  |
|  target        |  String      | Indicating the screen that is targeting the current screen |

__ComponentModel schema: styles__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  cell_styles   |  Array       | Cell styles of the component 					   |
|  family        |  String      | Component family                                 |
|  header        |  Dictionary  | Customization of the header                      |

__ComponentModel schema: header__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  style         |  String      | Cell style of the header                         |
|  visible       |  Bool        | Define if header should be presented             |
|  target        |  String      | indicating the screen that is targeting the current screen |


###### Navigation model defines representation of general navigation item that can be presented per screen.Example: Navigation Bar

__ComponentModel schema: navigations - NavigationModel__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  id            |  String      | Unique id of single model                        |
|  category      |  String      | Type of navigation model. `menu` or `nav_bar    `|
|  assets        |  Dictionary  | Stores assets for the navigation model           |
|  nav_items     |  Array       | Stores navigation items to present               |
|  rules         |  Dictionary  | Specific rules releavant for navigation type     |
|  styles        |  Dictionary  | Navigation styles                                |

__NavigationModel schema: styles__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  style         |  String      | Style of the naviagtion model                    |

###### Navigation item defines representation of single entity in navigation model. Like navigation button in nav bar or cell inside root menu

__NavigationModel schema: nav_items - NavigationItem__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  id            |  String      | Unique id of single model                        |
|  title         |  String      | Title of navigation item                         |
|  type          |  String      | Type of navigation item.                         |
|  data          |  Dictionary  | Stores data source of the navigation model       |
|  assets        |  Dictionary  | Stores assets for the navigation model           |
|  nav_items     |  Array       | Stores nested navigation                         |
|  rules         |  Dictionary  | Specific rules releavant for navigation type     |
|  styles        |  Dictionary  | Navigation styles								   |

__NavigationItem schema: type Navigation Bar__

__Note:__ All this types used to define navigation button inside navigation bar plugin

| value          | Description                                                       |
|--------------- | ----------------------------------------------------------------- |
|  button        | Represenatation of generic screen or URL									 |
|  live_drawer    | Live Drawer component 										     |
|  chromecast    | Chromecast presentation										     |
|  applicaster_feed | Applicaster Feed presentation 								 |
|  applicaster_chromecast | Applicaster Cromecast presentation 					     |

__NavigationItem schema: type Root Menu Plugin__

__Note:__ All this types used to define structure of the Root Menu plugin

| value          | Description                                                       |
|--------------- | ----------------------------------------------------------------- |
|  label         | Define a selectable cell in the root menu,  Represenatation of generic screen or URL|
|  header        | Define a header section in the root menu,  Represenatation of generic screen or URL|
|  collapsed     | Define container category in the root menu that have navigation items as childrens,  Represenatation of screen or URL|
|  Setting       | Define item to open white label Settings Screen |
|  EPG           | Define item to open white label EPG Screen |

__NavigationItem schema: data__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  source        |  String      | URL of the data source item                      |
|  type          |  String      | Type of source as defined by the datasource provider |
|  connected     |  Bool        | Define if component connected to another screen  |
|  target        |String        | Screen id of the target model                    |
