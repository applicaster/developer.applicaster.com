# @applicaster/zapp-react-native-ui-components

![npm version](https://badge.fury.io/js/%40applicaster%2Fzapp-react-native-ui-components.svg)

This package is our ui component library. It contains the main UI Builder components, and some decorators which are wrapped on top of the components to pass in features like navigation tools, zapp-pipes data connector...

## Available Components

### AppContainer

The AppContainer components wraps the content of the app in a canvas, and passes the screen's dimensions to its children. It also applies the background color of the app if any

**props**:

- `styles`: style data - expects at least a `{ app: { backgroundColor: "" } }` property
- `children`: function which takes the react-native `Dimensions` object and renders the children to load inside the AppContainer

### River

The River component renders an entry in `rivers.json` by assembling a screen made of the `ui_components` inside the corresponding `general_content` screen in the UI builder. It will pass the component data to each `ui_component`, which allows components to access the datasource, and other configuration from the UI Builder. When rendering the `ui_components`, the River component automatically applies decorators which provide the component with the zapp-pipes data loader and a navigator object which can be used to call a new route for the app to show.

**props**:

- `rivers`: map of entries in `rivers.json`, where the key is the river id, and the value is the river data
- `screenId`: id of the river to display. This component is wrapped by a decorator which will resolve the river based on the `screenId` and the provided `rivers` map

### Grid, List, Hero

These components render UI Builder `grid`, `list` and `hero` components inside a `River`.

**props**:

- `styles`: styles data from Zapp
- `component`: the `ui_component` data from `rivers.json` for this component
- `zappPipesData`: object representing the data for that component, from the data source defined in the `component` prop.
  - `loading`: boolean which indicates if the zapp pipes data is being loading or not
  - `url`: datasource url resolved for this component
  - `data`: result of the fetched datasource. this property will be populated when the zapp pipes data has been successfuly loaded.
- `navigator`: navigator object, useful for navigating in the app
  - `push: (item: any) => void`: will push a new nested route to navigate to the item. the entire `item` data will be stored in the route's state
  - `replace: (item: any) => void`: will replace the current root route with the provided one. used mainly for main level navigation. the entire `item` data will be stored in the route's state
  - `canGoBack: () => boolean`: tells wether the navigation is at the main root level or not
  - `goBack: () => void`: returns to the previous route
  - `routeData: () => any`: returns the current route's state (the `item` provided when calling `push` or `replace`)
