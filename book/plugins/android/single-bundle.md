## Single Bundle React Naitve

![single-bundle.png](./single-bundle.png)

### OVERVIEW
Single Bundle is a plugin that makes the implementation of multiple React Native components stable, it increases performance and it is more efficient and easy to handle in a native app. This plugin gives the ability to change the versions of React Native and React. It also aggregates all the React Native plugins into a single bundle and it uploads it to S3. Plugins become modules under the names specified as plugin identifiers from the plugin configuration.

### PLUGIN PREPERATION

#### Add "Single Bundle Plugin" to the Project Configuration
Add  `"single bundle plugin"`  and from the available list of versions of `react-native`, `react` and `react-native-zapp-bridge` *(The Applicaster standard bridge for communicating between React Native and the Applicaster SDK)* please select the combination which is supported by your plugins.

```
"custom_configuration_fields":[ 
    { 
        "key":"react-native",
        "tooltip_text":"React Native Version",
        "default":"0.5.10",
        "options":[ 
            "0.59.0",
            "0.59.10"
        ],
        "type":"dropdown"
    },
    { 
        "key":"react",
        "tooltip_text":"React Version",
        "default":"16.8.3",
        "options":[ 
            "16.8.0",
            "16.8.3"
        ],
        "type":"dropdown"
    },
    { 
        "key":"react-native-zapp-bridge",
        "tooltip_text":"React Native Zapp Bridge",
        "default":"2.7.4",
        "options":[ 
            "2.7.4"
        ],
        "type":"dropdown"
    }
]
```

![Single Bundle Configuration]( https://assets-production.applicaster.com/applicaster-employees/zapp_team/anna_bauza/react_native/single-bundle-config.png  "Single Bundle Configuration")

Save the plugin configuration and rebuild.

**Please note** that rebuilding is necessary every time when you change versions or add/remove React Native plugins.


#### Make Sure that the Plugins Support the Selected Versions
Your React Native plugins have to be built and published to `npm` for the selected versions of react and react-native.


#### Migrate your Plugins
In order to make the Single Bundle aggregator work please make sure that all your React Native plugins have been migrated and published to `npm` by following the instructions from the [Migration Guide](../../quick-brick/migration-guide.md).

### RUNNING A LOCAL SERVER FOR SINGLE BUNDLE

In the Zapp-Android folder execute the command:
`bundle exec rake single_bundle_aggregator:build`.


The `Rake` task will create a folder `single-bundle-aggregator`. This is your local server for Single Bundle.

If you wish to debug a package inside your single-bundle please place the package folder inside `single-bundle-aggregator/packages`. Please edit `single-bundle-aggregator/index.js` adding information about local packages.

Your local Single Bundle is ready to run.

### PLUGIN IS MISSING EXPECTED VERSIONS?
Zapp Team can add new versions when territories have tried a specific version in development and they confirm that it is working.
