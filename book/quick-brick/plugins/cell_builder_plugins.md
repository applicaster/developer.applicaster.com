# `cell_builder` Plugins ▦
> Read slowly and carefully! The concept is simple, yet the interface is strict.

## Start Here
- A plugin of type `cell_styles` does _nothing_ except getting a `configuration` and returning a rendering function that accepts two props: `item` and `state`.
- The returning function is used to render a cell in a component.

---

## Plugin Interface / Signature
### Module Root
- The exported `index.js` _must be_ a function that gets a `configuration` object:
```
// index.js
import { Foo } from "./src";

const FooPlugin = (configuration) => Foo(configuration);

module.exports = FooPlugin;
```

### Returned Function
- The returned function _must_ accept two props `item` and `state`
- Simplified example: a function that returns two `<Text/>` nodes showing the title of the item and the state
```
// src/Foo.js
import * as React from "react";
import { View, Text } from "react-native";

export function Foo(configuration) {
  // doing something with the configuration object...

  return function RenderFoo({ item, state }) {
    return (
      <View>
        <Text>Title: { item.title }</Text>
        <Text>State: { state }</Text>
      </View>
    )
  }
}
```

---

## Objects and Props in-depth
### `configuration`
```
type Configuration = {
  component: {             // component configuration, as-is, from rivers.json
    component_type: string // the most useful property 
    ...
  },
  styles: any,             // styles.json via redux store
  cellStyles: any          // cell_styles.json via redux store
};
```
- [Reference - component object](https://developer.applicaster.com/ui-builder/ios/Rivers.html)
- `styles` is 100% identical to styles configuration of the app version in Zapp, visible in `app version > info > reveal build parameters > styles_url`
- The `styles` data can be used effectivly to provide _common styling_ across the various cell styles, like app background color, or main text color. Please refer to the examples below.
- `cellStyles` is the combined configuration of all of the cell styles that were created _for the layout_ in the Cell Styles Builder tab in the Ui Builder
- [Reference - cell_styles.json structure](https://github.com/applicaster/zapp/wiki/Cell-Styles-S3-output#cell_stylesjson)

### `item`
```
type item = {
  id: string,
  title: string,
  type: {
    value: string
  },
  media_group: [
    media_item: [
      {
        src: string,
        key: string,
        type: string,
      },
      ...
    ]
    ...
  ]
  ... // many more optional properties!
};
```
- [Reference: feed item schema](https://developer.applicaster.com/Zapp-Feed/0.-Schema.html)
- The item parameter is actually a an _entry_, taken straight from the feed assigned to the Ui Component.
- The item will always have an id and a title, but all the other fields could be optional / missing.
- Please refer to current built-in cell styles plugins in this repo to get an idea of how data is retrieved from an item object.
- **IMPORTANT :** It is the plugin's total responsability to dig into the `media_group` and `media_item` objects in order to retrieve thumbnail images, video files etc.
- It is a good practice for a plugin to provide decent fallbacks for missing fields, e.g. placeholder for missing thumbnail image(s).

### `state`
```
type state =
  | "default"
  | "selected"
  | "focused";
  | undefined
```
- The `state` string represent the abstract "ui state" of the cell. Fallback is always to "default"
- Common examples for states:
  - "selected": mark some "current item" in a screen picker
  - "selected": give a feedback for the user when he taps the cell
  - "focused": highlight current focused cell in a TV app
- **TAKE CARE :** Each platform deals with states in a different way - e.g. TV apps makes extensive use of _compound_ "focused" states, while mobile apps use that state only to give some sensory feedback to a selection. YMMV!

---

## Real Life Examples
### Demo Cell Builder Plugin
- [code](https://github.com/applicaster/QuickBrick/blob/master/plugins/quick-brick-demo-cell-builder-plugin/src/index.js)
- This is a rather complex example, but worth looking into
- This plugin checks for the `component_type` property of the component, and returns matching styles / view trees / configuration for each component type.
- This plugin extracts the matching configuration for the cell style, and uses the `masterCellBuilder` to create trees for each UI state.
- This plugin uses both the global `styles` from Zapp and the _individual_ configuration of a cell style to draw cells:
  - Since text color is taken from the global `styles`, it is consistent with the whole app
  - The backround color, on the other hand, is taken from the plugin configuration - where we can fine-tune a specific color for the "default" and "focused" states.

### Quick Brick Master Cell
- [code](https://github.com/applicaster/QuickBrick/tree/master/plugins/zapp-react-native-master-cell)
- This plugin exhibits a complex configuration, all found in the plugin's manifest
- Except a few hard-coded constants, almost any visual aspect of the resulting cell is to be controlled from the configuration panel, including positioning of elements.
