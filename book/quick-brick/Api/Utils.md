# @applicaster/zapp-react-native-utils

![npm version](https://badge.fury.io/js/%40applicaster%2Fzapp-react-native-utils.svg)

This package contains utility functions that are shared across the other packages
Utilities needs to be imported by their direct path like this
```javascript
import { capitalize, toPascalCase } from "@applicaster/zapp-react-native/stringUtils";
```

`@applicaster/zapp-react-native/stringUtils`

* `capitalize: (input: string) => string`: sets the first letter of the input string as uppercase
* `toPascalCase: (input: string) => string`: transforms a `snake_case` input string to `PascalCase`

`@applicaster/zapp-react-native/objectUtils`

All following functions are curried and can be either called by `f(a, b)` or `f(a)(b)`. They work like all curried Ramda functions

* `filterObj: (predicate: any => boolean) => (object: any) => object: any` uses the predicate function to filter an object values.
* `mapKeys: (mapper: string => string) => (object: any) => (object: any)` maps over an object's keys and applies the mapper function to these keys. Curried function


`@applicaster/zapp-react-native/stylesUtils`
* `fixColorHexCode: string => string`: transforms a `AARRGGBB` hex code into a `RRGGBBAA` hex code - this is required because React Native uses `RRGGBBAA` colors, but Zapp Api provides `AARRGGBB`


`@applicaster/zapp-react-native/pluginUtils`
* `findPluginByType: (type: string, plugins: {[string]: Plugin}) => Plugin`: find a plugin for a given type, in the provided map of available plugins. Returns the callable plugin module.
* `getNavigationPlugin: (type: string, plugins: {[string]: Plugin}, defaultComponents: ?{[string]: Plugin}`: resolves the navigation plugin to use for a given type, from a provided map of available plugins. If provided, will fallback to one of the defaultComponent.

`@applicaster/zapp-react-native/navigationUtils`
* `getNavigationType: (category: "nav_bar" | "menu", navigations: [Navigations]) => string`: retrieves the type of navigation for a given category (either nav_bar or menu), from the navigation data in the rivers.json
* `getPathAttributes: (pathname: string) => [{ screenType: string, screenId: string }]`: transforms a given route into a map of attributes for that specific route. `/foo/bar/baz/qux` becomes :
```javascript
[
  { screenType: "foo", screenId: "bar"},
  { screenType: "baz", screenId: "qux"}
]
```
* `getItemType: (item: any) => string`: gets the type of a given item in a feed.
* `getItemTargetId: (item: any) => string`: gets the target screen id for a given item in a feed.

