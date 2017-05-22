
# Zapp-Pipes

Zapp Pipes is the data loader mechanism for Applicaster Zapp apps, which enables data source plugins.

You can use Zapp-pipes if you need multiple pluggable datasources for your app. This documentation covers the key concepts behind the Zapp-pipes module, and explains how to use its data source plugin system.

##Overview
This section provides an overview of Zapp-pipes, and the key concepts used in the rest of this documentation

### Feeds

Zapp apps populate screens and UI components with *feeds*. Feeds consist of a basic set of metadata, along with a series of *entries* : the elements that constitute the feed. Feeds can be nested, and contain other feeds : 

Home page Feed : 
  * title
  * description
  * entries
    * VOD item
    * Channel
    * Show 1
    * Show 2
    * Children Feed
      * title
      * name
      * entries
        * Show A
        * Show B
        * Show C
        ...

### Providers
Zapp-pipes enable Zapp users to populate the app with feeds coming from any online source : Applicaster CMS, youtube, specific client CMS...
In order to handle feeds coming from a given source, Zapp-pipes must be configured to use the relevant data source plugin, also called *provider*. Each provider will now how to retrieve content from its source, format it in a way the app can use it to populate the screen, and return the data to the app. 

### Zapp-pipes bundle
Each app using Zapp-pipes will have a specific zapp-pipes javascript bundle that contains the providers required to manage the data sources used by the app. For instance, if your app uses feeds coming from Applicaster CMS and Youtube, the zapp-pipes bundle for this app will contain the Applicaster provider and the youtube provider.

Internally, the Zapp-pipes bundle does the following : 
- parses the [feed url](#feed-url) to identify which provider must be invoked.
- calls the requested provider, and inject a toolbelt object that handles responses and errors, and provide all the available features of the [js bridge](#js-bridge)
- invokes the native app's callback with the returned data so the data can be loaded inside the app.

The bundle is automatically created and built when you configure the data source feeds in Zapp. [See here](Zapp-Pipes/6.-Connect-to-Zapp.md) for more details 

### Feed url

The Zapp-pipes bundle exposes a single 'get' method to the app. This method is invoked with a feed url, and a callback to handle the data returned by zapp-pipes.

The feed url is built with a specific pattern : 
`provider://command?param1=foo&param2=bar`

* the scheme `provider` is used by the Zapp-pipes bundle to know which provider should handle the given feed. Each provider has a specific scheme. For instance, if you want to use the applicaster provider, the feed url scheme will be `applicaster://`. See each provider documentation to get its scheme
* the command `command` is the command ran by the Zapp-pipes bundle. Currently, the only allowed command is `fetchData`
* the query parameters of the url are a set of key-value pairs which the provider uses to retrieve the relevant data. These parameters are defined by each provider. Refer to the provider documentation to know which parameter to use. 

For instance: 
* if you want to get collection 3597 in your account in the Applicaster CMS, the feed url will be `applicaster://fetchData?type=collection&collectionId=3597`.
* if you want playlist PLW1MigDP7U3ELkQ265jWpuu2iyxg0AiVL on youtube, the url will be `youtube://fetchData?playlistId=PLW1MigDP7U3ELkQ265jWpuu2iyxg0AiVL`

###JS Bridge

On both platforms, the zapp-pipes library is evaluated inside a javascript bridge which relies on the JavaScriptCore (iOS) and the LiquidCore (android) api. This js environment has some limitations :
- it only allows ECMAScript 5 syntax (this is why the JS code uses babel to transpile to es5)
- it's missing some fundamental browser objects such as the `window` global and the `XMLHttpRequest` object. 
In order to make the js library work as intended these too features are polyfilled in the bridge. So the js code running in the zapp-pipes bridge can invoke the XHR object, attach properties to `window`, and use the javascript console object.

The bridge also contains features that enable data source plugins to get data from the app. The bridge API is described in detail [here](/Zapp-Pipes/3.-Native-bridge-API.md)

## Table of content
Browse the following content to know more about Zapp-pipes :
* [Prerequisites](/Zapp-pipes/0.-Prerequisites.md) : this section will highlight some key development tools which are required to create a new provider
* [Setting up the environment](/Zapp-Pipes/1.-Set-up.md) : this section will help you set up your environment to start development
* [Structure of a provider](/Zapp-Pipes/2.-Provider-structure.md) : this section explains the structure of a provider
* [Native Bridge API](/Zapp-Pipes/3.-Native-bridge-API.md) : this section describes the specific features available in the native JavaScript bridge
* [How to test locally](/Zapp-Pipes/5.-Local-testing.md) : this section describes the procedure to test a bundle locally
* [Feed API](/Zapp-Pipes/5.-Feed-API.md) : this section describes the expected output format for feeds returned by a provider
* [How configure the app](/Zapp-Pipes/6.-Connect-to-Zapp.md) : this section explains how to set up your app to use Zapp-pipes
* [Examples](/Zapp-Pipes/7.-Examples.md)
* [F.A.Q.](/Zapp-Pipes/8.-FAQ.md)


