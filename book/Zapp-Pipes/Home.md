
# Zapp-Pipes

Zapp Pipes is the data loader mechanism for Applicaster Zapp apps which enables data source plugins.

You can use Zapp-pipes if you need multiple pluggable data sources for your app. This documentation covers the key concepts behind the Zapp-pipes module and explains how to use its data source plugin system.

##Overview
This section provides an overview of Zapp-pipes and the key concepts used in the rest of this documentation.

If you are not familiar with the `Feed Manager` section in Zapp, here is a short (3 min) introduction. After creating a new data source provider, Zapp users will be able to use it in the `Feed Manager` section.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j6irAyDhe9Y?rel=0" frameborder="0" allowfullscreen></iframe>

### Getting Started
We recommend going over the documentation in order to understand how Zapp-pipes work.

The [Prerequisites](/Zapp-Pipes/0.-Prerequisites.md) and [Setting up the environment](/Zapp-Pipes/1.-Set-up.md) are a good place to start. Don't forget to do our [step by step tutorial](/Zapp-Pipes/provider-stepbystep.md), it will guide you through all the required steps when creating a new provider.

### Feeds

Zapp apps populate screens and UI components with *feeds*. Feeds consist of a basic set of metadata, along with a series of *entries*: the elements that constitute the feed. Feeds can be nested and contain other feeds: 

Home page Feed: 
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
Zapp-pipes enable Zapp users to populate the app with feeds coming from any online source: Applicaster CMS, YouTube, specific client CMS etc.
In order to handle feeds coming from a given source, Zapp-pipes must be configured to use the relevant data source plugin, also called *provider*. Each provider will know how to retrieve content from its source, format it in a way the app can use it to populate the screen, and return the data to the app. 

### Zapp-pipes Bundle
Each app using Zapp-pipes will have a specific Zapp-pipes JavaScript bundle that contains the providers required to manage the data sources used by the app. For instance, if your app uses feeds coming from the Applicaster CMS and YouTube, the Zapp-pipes bundle for this app will contain the Applicaster provider and the YouTube provider.

Internally, the Zapp-pipes bundle does the following: 
- it parses the [datasource url](#datasource-url) to identify which provider must be invoked
- it calls the requested provider and injects a toolbelt object that handles responses and errors. It also provides all the available features of the [js bridge](#js-bridge)
- it invokes the native app's callback with the returned data so that the data can be loaded inside the app.

The bundle is created and built automatically when you configure the data source feeds in Zapp. [See here](/Zapp-Pipes/7.-Connect-to-Zapp.md) for more details.

### Datasource URL

The Zapp-pipes bundle exposes a single 'get' method to the app. This method is invoked with a datasource URL and a callback to handle the data returned by Zapp-pipes.

The datasource URL is built with a specific pattern: 
`provider://command?type=${feed_type}&url=${feed_url}`

* the scheme `provider` is used by the Zapp-pipes bundle to determine which provider should handle the given datasource URL. Each provider has a specific scheme. For instance, if you want to use the Applicaster provider, the datasource URL scheme will be `applicaster://`. See the documentation of each provider for its scheme.
* the command `command` is ran by the Zapp-pipes bundle. Currently the only allowed command is `fetchData`
* a `type` parameter which defines the `feed_type`
* a `url` parameter which defines the feed URL. It is encoded to make sure the datasource URL parsing doesn't fail

###JS Bridge

On both platforms, the Zapp-pipes library is evaluated inside a JavaScript bridge which relies on the JavaScriptCore (iOS) and the LiquidCore (Android) API. This JS environment has some limitations:
- it only allows ECMAScript 5 syntax (this is why the JS code uses the Babel library to transpile to ES5)
- it is missing some fundamental browser objects such as the `window` global and the `XMLHttpRequest` object. 
In order to make the JS library work as intended, these two features are polyfilled in the bridge so that the JS code running in the Zapp-pipes bridge can invoke the XHR object, attach properties to `window` or use the JavaScript console object.

The bridge also contains features that enable data source plugins to get data from the app. The bridge API is described in detail [here](/Zapp-Pipes/3.-Native-bridge-API.md).

## Table of Contents
Browse the following content to learn more about Zapp-pipes:
* [Prerequisites](/Zapp-Pipes/0.-Prerequisites.md): this section will highlight some key development tools which are required to create a new provider
* [Setting up the environment](/Zapp-Pipes/1.-Set-up.md): this section will help you set up your environment to start development
* [Structure of a provider](/Zapp-Pipes/2.-Provider-structure.md): this section explains the structure of a provider
* [Native Bridge API](/Zapp-Pipes/3.-Native-bridge-API.md): this section describes the specific features available in the native JavaScript bridge
* [How to test locally](/Zapp-Pipes/5.-Local-testing.md): this section describes the procedure to test a bundle locally
* [Feed API](/Zapp-Pipes/5.-Feed-API.md): this section describes the expected output format for feeds returned by a provider
* [How to publish a provider in Zapp](/Zapp-Pipes/6.-How-to-publish.md): this section explains how to publish a provider in zapp
* [How to configure the app](/Zapp-Pipes/7.-Connect-to-Zapp.md): this section explains how to set up your app to use Zapp-pipes
* [Step by step tutorial](/Zapp-Pipes/provider-stepbystep.md): this section will guide you throgh the steps of creating a new data source provider, in this tutorial we will create a WordPress provider
* [Examples](/Zapp-Pipes/8.-Examples.md): can be used in the Feed manager
* [Protocols](/Zapp-Pipes/11.-Protocols.md): this section contains a list of recommended protocols that datasource providers should implement so as to deliver specific data to the app (advertising, closed captions, authorization requirements, etc)
