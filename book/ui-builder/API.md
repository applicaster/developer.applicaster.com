#### API example

***
###### Screen Model
`id` - ID is used for screen type.

`name` - The Name of the screen. In the future it would possibly be the title of the screen. (not used at that moment).

`type` - The Type of a specific screen. For example: `general_content` - This screen will be created from GAGenericViewController. Other types are mapped on some custom ViewControllers that are inherited from GAGenericViewController.

`nav_bar_id` - Navigation bar id to be used for the screen, if noe set, will be use default

`data` - An optional section in the screen configuraiton with data source dictionary

`styles` - An optional section in the screen configuraiton with Dictionary of the component styles, it includes mandatory fields per component, if exist.

`hooks`: An optional section in the screen configuraiton with two attributes: `preload_plugins` and `postload_plugins`
	* `preload_plugins` -  An array of the screens/plugins to be loaded them before the screen
	* `postload_plugins` -  An array of the screens/plugins to be loaded after the screen load

`ui_components` - An array of the `Component` model items

***
###### Component Model
`component_type` - Mapped types of the component.

`data` - Data source dictionary
* `source` - DataSource ID
* `type` - Type of the data source


`position` - unused

`rules` - Specific rules that a selected component can use. Example: `data_source_limit`

`styles` - Dictionary of the component styles, it includes mandatory fields per component, if exist.
* `family` - (Mandatory) The Family ID every component uses.
* `header` - Header dictionary, consists of information regarding visibility and header style.
	* `visible` - If the header should be enabled.
	* `style` - Header mapped style.
* `cell_styles` - (Mandatory) An array of the cell styles a component is using.
***
```
[{
	"id": "65878854-9119-4e26-83f1-8f02c9769ca2",
	"name": "Home",
	"type": "general_content",
	"data": {},
	"styles": {},
	"ui_components": [{
		"component_type": "list",
		"data": {
			"source": "3126",
			"type": "APPLICASTER_COLLECTION"
		},
		"position": 1,
		"rules": {
			"item_limit": "6"
		},
		"styles": {
			"family": "FAMILY_1",
			"header": {
				"visible": false,
				"style": "No Header"
			},
			"cell_styles": ["LIST_2"]
		}
	},
   {
		"component_type": "hero",
		"data": {
			"source": "3119",
			"type": "APPLICASTER_COLLECTION",
			"connected": false
		},
		"position": 3,
		"rules": {
			"item_limit": "4"
		},
		"styles": {
			"family": "FAMILY_1",
			"layout": "HERO_1",
			"header": {
				"visible": false,
				"style": ""
			},
			"cell_styles": ["HERO_CELL_1"]
		}
	},
   {
		"component_type": "html_ticker",
		"data": {
			"type": "APPLICASTER_COLLECTION",
			"source": "3118"
		},
		"position": 5,
		"rules": {},
		"styles": {
			"family": "FAMILY_1",
			"cell_styles": ["TICKER_1"],
			"header": {
				"visible": false,
				"style": null
			}
		}
	},
  {
		"component_type": "grid",
		"data": {
			"source": "3139",
			"type": "APPLICASTER_COLLECTION"
		},
		"position": 6,
		"rules": {
			"item_limit": "6"
		},
		"styles": {
			"family": "FAMILY_1",
			"header": {
				"visible": true,
				"style": "HEADER_1"
			},
			"cell_styles": ["GRID_1"]
		}
	},
  {
		"component_type": "grid",
		"data": {
			"source": "",
			"type": ""
		},
		"position": 8,
		"rules": {},
		"styles": {
			"header": {
				"visible": false,
				"style": null
			}
		}
	},
  {
		"component_type": "grid",
		"data": {
			"source": "3127",
			"type": "APPLICASTER_COLLECTION"
		},
		"position": 37,
		"rules": {
			"item_limit": "6"
		},
		"styles": {
			"family": "FAMILY_1",
			"header": {
				"visible": true,
				"style": "HEADER_1"
			},
			"cell_styles": ["GRID_1"]
		}
	}]
}]
```
