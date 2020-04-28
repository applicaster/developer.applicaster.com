# How to create a UI Component for Quick brick

UI Components for Quick Brick are simply an npm package exporting a React component.

The folder structure will be something like this:

```bash
-- manifests
 |-- manifest.config.js
 |-- ios.json
 |-- android.json
 |-- ...
-- src
 |-- index.js
 |-- ...
-- package.json
```

### Package.json

In your package.json, prefix your package name with `@applicaster/quick-brick-` if you want your package to be compiled when running on web-based platforms (Samsung TV, LG).
If you want to use the `@applicaster/zapplicaster-cli publish_plugin` script, you need to add the following to your package.json

```json
{
  "applicaster": {
    "supportedPlatforms": ["ios", "android"],
    "zappOwnerAccountId": "<account_id>"
  }
}
```

you will need to make the first push of the plugin manually with the `--new` flag, but after that, you can use the script to publish. run `@applicaster/zapplicaster-cli publish_plugin help` to know more about the options for this CLI command. It will automatically publish to npm, generate your manifests (see below), push your manifests to Zapp. and commit the file changed.

### Manifest

The rules for creating a ui component manifest for QuickBrick are the same as the rules for native. The only addition is to flag the plugin as being available for `ui_frameworks: ["quickbrick"]`.
if You need your component to apply to TV, make sure you select the right target in your manifest `targets: ["tv"]`. Your plugin can support both TV and mobile if you provide both targets to the manifest.

**Using the publish script**
If you want to use the publish plugin script from `@applicaster/zapplicaster-cli` you need to create a file at `<root>/manifests/manifest.config.js`. This file contains the code to generate the manifests for all platforms, while maintaining everything in the same place:

```javascript

const baseManifest = {
  name: "My awesome plugin",
  identifier: "my-awesome-plugin",
  dependency_name: "@applicaster/quick-brick-my-awesome-plugin",
  general: {
    fields: [ ... ]
  }
 };

function createManifest({ platform, version }) {

  const manifest = {
    ...baseManifest,
    dependency_version: version,
    manifest_version: version,
    platform,
  }

  if (platform === "ios") {
    manifest.special_prop_for_ios = { ... }
  }

  return manifest;
}

module.exports = createManifest;
```

### The component

the main export of your package is the react component itself. The first thing to do is to use our `ZappUIComponent` decorator to automatically bind your component to the Zapp Pipes engine.

```javascript
import * as React from "react";

import { ZappUIComponent } from "@applicaster/zapp-react-native-ui-components/Components/ZappUIComponent";

function MyAwesomeComponent(props) {
  // code here
}

export default ZappUIComponent(MyAwesomeComponent);
```

From that point, you can use the props to render your component, pull extra data through the redux store, and use all the features available in the QuickBrick packages.

The available props are the following:

```typescript
type Props = {
  CellRenderer: React.ComponentType<{ item: Object; state: string }>;
  component: ZappUIComponentType;
  navigator: {
    push(FeedEntry): void;
    replace(FeedEntry): void;
  };
  zappPipesData: {
    data: {
      entry: [FeedEntry];
    };
  };
};
```

Explaination of the props:

- CellRenderer: component to render a cell, pulled from Cell Styles builder config. see usage below;
- component: the data of the ui component in the zapp rivers API. contains, styles, rules, data property, etc, everything defined in the UI builder configuration panel
- navigator: use this to navigate somewhere. push will add an entry to the navigation stack, while replace will reset it
- zappPipesData: contains the data resolved from zapp pipes

Example:

```javascript
import * as React from "react";
import { TouchableHighlight, View } from "react-native";

import { ZappUIComponent } from "@applicaster/zapp-react-native-ui-components/Components/ZappUIComponent";

function MyAwesomeComponent(props) {
  const entries = props.zappPipesData.data?.entry;

  return (
    <View style={ {flex: 1} }>
      {
        entries.map((entry, index) => (
          <TouchableHighlight onPress={() => navigator.push(entry)}>
            <CellRenderer item={item} state="default" />
          </TouchableHighlight>
        )
      }
    </View>
  );
}

export default ZappUIComponent(MyAwesomeComponent)
```
