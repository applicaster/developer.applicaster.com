## Android UI Builder

Explanation about how to use the zapp ui builder from the android client side.
The UI builder from zapp is a replacement for use of templates.

## Project structure and flow

The Ui builder related components are contained in the com.applicaster.genericapp.zapp package.
The main classes are : ScreensManager, ZappScreen and UiComponent.

<b>ScreensManager:</b> responsible for managing and returning the screens for a specific screen type.

<b>ZappScreen:</b> is what used to be a ComponentsMetaData jsons. The ZappScreen class contains list of UiComponents screen_type and a layout_family.

<b>screen_type:</b> ui_tag is no longer be used and instead there is a screen_type in the APCategory and APCollection classes, it is used to identify which zappScreen needs to be displayed for a collection or a category.

<b>UiComponent:</b> all the ui component metadata is defined in the uiComponent : rules, styles, and a component type.

<b>ComponentsManager:</b> is an adapter class that converts ZappScreens and the UiComponents to the ComponentsMetaData that are currently being used with all the components.

## ZappScreen types
There are two types of ZappScreens:
1. screens with pre-defined data sources for the ui components, for those screens we don't need to load the parent datasource and we only load the data for every uiComponent
2. screens that are 'connected screens' that don't have data sources but they are filled with the parent data source to retrive all the uiComponents data sources.

## Cell styles & Layout families
In the new implementation instead of the templates we have layout families.
A component can have several cell styles and a layout family is a set of cell styles.

<b>Creation of a new cell style:</b>
- Copy an existing layout xml of a similar cell style so the same IDs will be kept,
make the needed changes for the new style.
- Add the new style to the ComponentStyles enum with the name that was defined on the ui builder (LIST_3,GRID_4 etc).
- Add specific handling if needed for the new style in the components in the ComponentsUtil class.

## UI Components
Every screen is composed of a list of ui components.
<b>Component type:</b> currently there are several supported component types like : tabs, section picker, list, grid, webview.
<b>Style:</b> the components style contains the cell style and the layout family of the component.
<b>Rules:</b> any rules that are related to the specific component are defined here, rules can be max number of items and other custom rules that are needed for the component.
<b>Header:</b> data related to the header style and if the header needs to be shown for the specific category is stored in here.
<b>dataSource:</b> data source currently has source id and ZappDataSourceType currently we have APPLICASTER_COLLECTION, APPLICASTER_CATEGORY and APPLICASTER_ATOM_FEED data source types.
## Creation of a new UI component:
To create a new ui component after we define it on zapp we need to add the component type both to the ComponentMetaData ComponentType, and the ZappComponentType inside the ZappScreen class.

Then we need to add the component handling to the CompositeComponentListLayout.class
1. create a new class that extends from the ComponentLayout.
2. in the List<CompositeRowHolder> setAdapter() we need to add handling for the new component.
3. in the getView() we need to return pass the component metadata and return the new component view.

## UI Builder app flow vs regular app flow:
The ui builder based app uses a template named 'ui_builder' which has a flag isUiBuilder.
In the Ui builder based app at the IntroActivity the screens json is being loaded and saved to the screensManager.
Every navigation click handling is being passed through the screensManager to retrive the correct metadata for the screen instead of the componentsMetaData.properties file that was used to load retrive the metadata from.
ui_tags used less instead screen_types are used, the settings screen still has a ui_tag since it is not componontised yet.

## Ui builder JSON example
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
