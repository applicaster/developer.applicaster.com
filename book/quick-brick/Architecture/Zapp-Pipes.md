# ZappPipes

This document explains how QuickBrick loads data through Zapp-Pipes, and the key differences between the native implementation and the native implementation.

## Zapp Pipes Engine in Quick Brick

On Native, we create a javascript context that enables the app to run javascript code on the client side. This javascript context, however, doesn't have the ability to leverate advanced node / ES6/7 features like modules and such. Therefore, the javascript code evaluated in the javascript context is a bundle which is created at build time. All the datasource providers the app uses are included in this bundle which is ready to use in our javascript context.

In Quick Brick, since we are in a react-native environment, datasource providers - which are npm packages - can be installed and accessed directly. However, in order to have consistency across platforms, and to expose an api which can load any data source, regardless of the provider they use, we create a ZappPipes engine which has 2 main roles:

- encapsulate all providers in a unique API
- inject the `nativeBridge` object which providers expect to have, and which provides utility functions for resolving providers responses, and access app data.

On Native platforms, the QuickBrickManager module is responsible for feeding the Zapp-Pipes engine with the data from the native side. On the web, this data is gathered at built time, and loaded in a module which is then use to overload react-native-web `NativeModueles` and expose a consistent API across web & native platforms.

In a nutshell, when the app loads, we have the following pieces :

- data is exposed from native through the QuickBrickManager module
- the ZappPipes engine is initialized with all the data source plugins, creates the ZappPipesGetter object which can inject the nativeBridge to the providers
- An adapter is created so this ZappPipesGetter can be used in redux actions
- There is a redux module which exposes a set of actions regarding Zapp-Pipes data loading, and a `loadPipesData` function which triggers the whole data loading flow.

From this point, all is ready to load data source into Zapp UI components.

## Data Loading flow

Unlike native platforms, QuickBrick doesn't have any data loaders which don't rely on Zapp-Pipes. This is why they lean strongly on the concepts of feeds, and the assumption that data source are assigned to components in the UI Builder.
From these assumptions, the data loading fow is as follows :

- when a `general_content` screen is mounted, we map out the components from that screen and render them
- each component is decorated with a Higher order Component called `ZappPipesDataConnector`. This decorator is bound to the `zappPipes` state of the redux store, and the `loadPipesData` redux action.
- The `ZappPipesDataConnector` takes the data source information from the component data, and gets the data source url. it calls `loadPipesData` with that datasource URL
- The `loadPipesData` function is a thunk. It runs asynchronously and will dispatch redux actions depending on network activity.
- this function will trigger a first action call `ZAPP_PIPES_REQUEST_START`. This action will create an entry in the `zappPipes` redux store, where the key is the data source url, and the value is an object with a `url` property containing the url, and a `loading` boolean flag set to true.
- It will then call `zappPipes.get(datasourceUrl, callback)`, and dispatch a response when the request is successfull.
- when the response lands, the `ZAPP_PIPES_REQUEST_COMPLETE` action is dispatched, with the response from the zapp-pipes call. This will set the `loading` flag to false in the redux store, and add a `data` property with the resulting feed
- the `ZappPipesDataConnector` decorator has the `zappPipes` redux store in its props. after making the request, it will look for the value of `zappPipes[dataSourceUrl]`. When this property is defined, it will render its decorated component, passing the value of this property to a prop called `zappPipesData`. With this, the decorated component can know if the data loading is in process or not, and if the data is available. When it is, it can render it.

On top of this `ZappPipesDataConnector` decorator, we also provide for convenience a `ZappComponent` decorator, which will look at the content of the `zappPipesData` prop, and return `null` until the data is available. When the data is available, it will render its decorated component, forwarding the `zappPipesData` prop, and call the component's `onLoadFinished` prop function to notify the parent river that this given component has finished loading its data.
