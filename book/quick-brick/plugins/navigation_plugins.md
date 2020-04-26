# Navigation Plugins - Mobile

#### Supported plugin types
- `nav_bar`
- `menu`

#### Default / built-in plugins
- [default_nav_bar_mobile](../packages/zapp-react-native-ui-components/Components/NavBar/index.js)
- [default_side_menu_mobile](../packages/zapp-react-native-ui-components/Components/SideMenu/index.js)

## Overview
The navigation plugins are rendered in `packages/zapp-react-native-app/App/Layout/Layout.js`. In the default layout there is a visible navigation bar, and a hidden side menu which is triggered via the `MenuToggleContext`.

### Props passed to _both_ navigation plugins
| prop | type | description |
| ---  | ---- | ----------- |
| `activeRiver` | `object` | Currently active screen |
| `toggleMenu` | `object` |  Getter for the menu toggle. Use this to compare the previous and next value of the context |
| `setToggleMenu` | `function` | Setter for the menu toggle. Use this to notify either of the components that the menu was toggled |
| `navigator` | `object` | Navigator object from `packages/zapp-react-native-ui-components/Decorators/Navigator/index.js` |
| `selected` | `boolean` | Is the active screen selected? Helper for marking the selected navigation in the menu |
| `title` | `string` | Active screen title |
| `home` | `boolean` | Helper: Is the active screen the home screen? |
| `styles` | `object` | Active screen's style |
| `assets` | `object` | Active screen's assets |
| `rules` | `object` | Active screen's rules |
| `nav_items` | `array` | Navigation items of the matching plugin, extracted from `rivers.json` |

### How can I create and use a `nav_bar` plugin?
- Reference: `packages/zapp-react-native-ui-components/Components/NavBar/index.js`
- Create a proper react-native plugin of `nav_bar` type
- The plugin should have some menu button the user can interact with, e.g. `<TouchableHighlight/>`
- The plugin should trigger `this.props.setToggleMenu({})` when appropriate

### How can I create and use a `menu` plugin?
- Reference: `packages/zapp-react-native-ui-components/Components/SideMenu/index.js`
- Create a proper react-native plugin of `menu` type
- The plugin should check if the value of `this.props.toggleMenu` has changed in the `componentDidUpdate` lifecycle stage, like this:
```
  componentDidUpdate(prevProps: Props) {
    if (prevProps.toggleMenu !== this.props.toggleMenu) {
      // Do something about it, like starting an animation
    }
  }
```
- Each change in this prop value should be reflected with the appropriate action - show/hide menu
- It is NOT advised to call `this.props.setToggleMenu({})` from the side menu, since it could cause circular/endless calls.
