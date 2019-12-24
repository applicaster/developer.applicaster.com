
# Zapp-Pipes

Zapp Pipes is the data loader mechanism for Applicaster Zapp apps, which enables data source plugins.

You can use Zapp-pipes if you need multiple pluggable data sources for your app. This documentation covers the key concepts behind the Zapp-pipes module and explains how to use its data source plugin system.

##Overview
This section provides an overview of Zapp-pipes, and the key concepts used in the rest of this documentation.

If you are not familiar with the `Feed Manager` section in Zapp, here is a short (3 min) introduction. After creating a new data source provider, Zapp users will be able to use it in the `Feed Manager` section.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j6irAyDhe9Y?rel=0" frameborder="0" allowfullscreen></iframe>

### Getting Started
We recommend going over the documentation in order to understand how the zapp-pipes works.

The [Prerequisites](/Zapp-Pipes/0.-Prerequisites.md) and [Setting up the environment](/Zapp-Pipes/1.-Set-up.md) are a good place to start with. Don't forget to do our [step by step tutorial](/Zapp-Pipes/provider-stepbystep.md), it will guide you in all the required steps when creating a new provider.

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
- parses the [datasource url](#datasource-url) to identify which provider must be invoked.
- calls the requested provider, and inject a toolbelt object that handles responses and errors, and provide all the available features of the [js bridge](#js-bridge)
- invokes the native app's callback with the returned data so the data can be loaded inside the app.

The bundle is automatically created and built when you configure the data source feeds in Zapp. [See here](/Zapp-Pipes/7.-Connect-to-Zapp.md) for more details 

### Datasource url

The Zapp-pipes bundle exposes a single 'get' method to the app. This method is invoked with a datasource url, and a callback to handle the data returned by zapp-pipes.

The datasource url is built with a specific pattern : 
`provider://command?type=${feed_type}&url=${feed_url}`

* the scheme `provider` is used by the Zapp-pipes bundle to know which provider should handle the given datasource url. Each provider has a specific scheme. For instance, if you want to use the applicaster provider, the datasource url scheme will be `applicaster://`. See each provider documentation to get its scheme
* the command `command` is the command ran by the Zapp-pipes bundle. Currently, the only allowed command is `fetchData`
* a type parameter which defines the feed_type
* a url parameter which defines the feed url. This feed url is encoded to make sure the datasource url parsing doesn't fail

###JS Bridge

On both platforms, the zapp-pipes library is evaluated inside a javascript bridge which relies on the JavaScriptCore (iOS) and the LiquidCore (android) api. This js environment has some limitations :
- it only allows ECMAScript 5 syntax (this is why the JS code uses babel to transpile to es5)
- it's missing some fundamental browser objects such as the `window` global and the `XMLHttpRequest` object. 
In order to make the js library work as intended these too features are polyfilled in the bridge. So the js code running in the zapp-pipes bridge can invoke the XHR object, attach properties to `window`, and use the javascript console object.

The bridge also contains features that enable data source plugins to get data from the app. The bridge API is described in detail [here](/Zapp-Pipes/3.-Native-bridge-API.md)

## Table of Contents
Browse the following content to know more about Zapp-pipes :
* [Prerequisites](/Zapp-Pipes/0.-Prerequisites.md) : this section will highlight some key development tools which are required to create a new provider
* [Setting up the environment](/Zapp-Pipes/1.-Set-up.md) : this section will help you set up your environment to start development
* [Structure of a provider](/Zapp-Pipes/2.-Provider-structure.md) : this section explains the structure of a provider
* [Native Bridge API](/Zapp-Pipes/3.-Native-bridge-API.md) : this section describes the specific features available in the native JavaScript bridge
* [How to test locally](/Zapp-Pipes/5.-Local-testing.md) : this section describes the procedure to test a bundle locally
* [Feed API](/Zapp-Pipes/5.-Feed-API.md) : this section describes the expected output format for feeds returned by a provider
* [How to publish a provider in Zapp](/Zapp-Pipes/6.-How-to-publish.md) : this section explains how to publish a provider in zapp
* [How configure the app](/Zapp-Pipes/7.-Connect-to-Zapp.md) : this section explains how to set up your app to use Zapp-pipes
* [Step by step tutorial](/Zapp-Pipes/provider-stepbystep.md) : this section will guide throw the steps of creating a new data source provider, in this tutorial we will create a Wordpress provider.
* [Examples](/Zapp-Pipes/8.-Examples.md) : can be used in the Feed manager
* [Protocols](/Zapp-Pipes/11.-Protocols) : this section contains a list of recommended protocols that datasource providers should implement to deliver specific data to the app (advertising, closed captions, login, etc)
