# QuickBrick

### What is QuickBrick ?

QuickBrick is [React-Native](https://facebook.github.io/react-native) based UI framework usable on top of all Zapp SDKs on platforms supporting React-Native: Zapp-iOS, Zapp-Android, Zapp-tvos, Zapp-Tizen (samsung).
As a result, QuickBrick apps provide even more flexibility and velocity in the development of new UI related features, such as UI Builder components or fullscreen plugins. When creating a QuickBrick app, the UI is made of a single React Native root. QuickBrick has been designed from the start to provide a seamless user experience when comparing the resulting apps with fully native UI and transitions, so users won't notice any difference. It will however provide a significant performance boost if your app is using many React Native UI components or plugins.

However, using QuickBrick doesn't stop you to use all headless features of the native Zapp SDKs, such as the pluggable player, data source plugins, analytics, pluggable advertising, SSO, etc.

### How can I use it ?

QuickBrick apps rely on Zapp and the UI Builder. Simply go to your app version's general settings from the app family page, and select the "Use QuickBrick" checkbox.
Using this setting will result in using Zapp-Pipes, the UI Builder navbar and the UI Builder root API automatically, even if these options are not selected.

From this point onwards, simply configure your app like you would with any other UI Builder app, and build it. QuickBrick requires no special configuration option to be used from Zapp.
