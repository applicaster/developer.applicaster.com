##Rivers.json
Rivers this file defines main structure of the __UI_Builder__ project.
Litarelly it is array of __Screen Models__ that will be presented inside application/

__Link template:__ https://assets-secure.applicaster.com/zapp/accounts/ `account_id`/apps/`bundle_identifier`/apple_store/`app_version`/rivers/rivers.json

Example:

```
[{
		"data": {},
		"id": "02eaecd3-d241-410b-81fb-c320c5d90661",
		"name": "Category",
		"styles": {},
		"type": "general_content",
		"ui_components": [{
			"component_type": "list",
			"data": {
            "
            	"target" : "c320c5d90661-d241-410b-81fb-c320c5d90661"
				"connected": true,
				"source": "URL",
				"type": "APPLICASTER_ATOM_FEED"
			},
			"position": 1,
			"rules": {
               "datasource_limit" : 10
            },
			"styles": {
				"header": {
					"style": null,
					"visible": false
				}
			}
		}]
	}
]
```

__Screen model schema__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  data          |  Dictionary  | Stores data source of the screen                 |
|  id            |  String      | Unique id of the Screen model                    |
|  name          |  String      | Screen title                                     |
|  styles        |  Dictionary  | Screen styles                                    |
|  ui_components |  Array       | Component model, that will be presented in screen|
|  navigations   |  Array       | Navigation model, defines application navigation |
|  home          |  Bool        | Representation if screen is Home screen          |
|  type          |  String      | Type of the screen. Example: 'general_content'   |

__Screen model schema: data__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  source        |  String      | URL of the data source item                      |
|  type          |  String      | Type id of the data source. Example: 'televisa_collection' |
|  connected     |  Bool        | Define if screen connected                       |
|  parent        |String        | Parent screen id                                 |

__Screen model schema: styles__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  family        |  String      | Name of the Family                               |

######Component model defines representation of single component
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
|  source        |  String      | URL of the data source item                      |
|  type          |  String      | type id of the data source. Example: 'televisa_collection' |
|  connected     |  Bool        | Define if component connected to another screen  |
|  target        |String        | Screen id of the target model                    |

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

######Navigation model defines representation of general navigation item that can be presented per screen.Example: Navigation Bar
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

######Navigation item defines representation of single entity in navigation model. Like navigation button in nav bar or cell inside root menu
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

__NavigationItem schema: data__

| key            | Type         | Description                                      |
|--------------- |--------------| ------------------------------------------------ |
|  source        |  String      | URL of the data source item                      |
|  type          |  String      | type id of the data source. Example: 'televisa_collection' |
|  connected     |  Bool        | Define if component connected to another screen  |
|  target        |String        | Screen id of the target model                    |