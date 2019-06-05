## Single Bundle React Naitve

![single-bundle.png](./single-bundle.png)

### OVERVIEW
Single bundle is a plugin that makes multiple react native components implemenation stable, increase it's perfomance and it is more efficient and easy to handle in a native app. This plugin gives ability to change version of react native and react. It also aggregate all react native plugins into one single bundle and upload it to S3. Plugins becomes modules under the names specified as plugin identifiers from plugin configuration."

### PLUGINS PREPERATIONS

#### Add "Single Bundle Plugin" to project configuration
Add  `"single bundle plugin"`  and from available list of versions of `react-native`, `react` and `react-native-zapp-bridge` *(Applicaster standard bridge for communicating react native with Applicaster SDK)* please select the one which is supported by your plugins. Save plugin configuration and rebuild. Please note rebuild is necesery every time you change versions or adding/removing other react native plugins.

![Single Bundle Configuration]( https://assets-production.applicaster.com/applicaster-employees/zapp_team/anna_bauza/react_native/single-bundle-config.png  "Single Bundle Configuration")

#### Make sure plugins support selected versions
Your React Native plugins need to be build and published to NPM for selected versions of react and react-native.


#### Migrate your plugins
In order to make Single Bundle aggregator work please make sure all your react native plugins has been migrated and published to npm as following [Plugins Migration](/react-native/plugins-migration.md) instructions advice.

### RUNNING LOCAL SERVER FOR SINGLE BUNDLE

In Zapp-Android folder execute command :
`bundle exec rake single_bundle_aggregator:build`.


Rake process will create a folder `single-bundle-aggregator` - this is your local server for single bundle.

If you wish to debug package inside your single-bundle please place the package folder inside `single-bundle-aggregator/packages`. Please edit `single-bundle-aggregator/index.js` to give information about local packages.

Local single bundle is ready to run.

### PLUGIN IS MISSING EXPECTED VERSIONS?
The Zapp Team can add version when territories have tried specific version in development and confirm it is working.
