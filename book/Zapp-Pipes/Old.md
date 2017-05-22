
## Related repos : 
* [zapp-pipes-packager](https://github.com/applicaster/zapp-pipes-packager)
* [zapp-pipes-dev-kit](https://github.com/applicaster/zapp-pipes-dev-kit)
* [zapp-pipes-provider-applicaster](https://github.com/applicaster/zapp-pipes-provider-applicaster)
* [provider starter kit](https://github.com/applicaster/zapp-pipes-provider-starter-kit)

# Library Logic
Zapp pipes is a javascript library that exposes a single 'get' method to our apps in order to load data. 
From the app, this get method is invoked with a url that has a specific pattern, and a callback to handle the data returned by zapp-pipes.

Internally, zapp-pipes goes through several modules : 
- the router will parse the url invoked from the app to identify how to handle it, i.e. to know which provider to call with which parameters. Urls are of the form `provider-name://fetchData?type=request_type&otherParams=...`
- the provider wrapper will call the requested provider, and inject it with a toolbelt object to handle responses and errors, and get access to some app Data (account id, uuid, bundle identifier...).
- when the provider returns data, it goes through the resolver - which does nothing for now, but will be able to decorate data in the future - which forwards the data back to the router
- the router invokes the native app's callback with the returned data so the data can be loaded inside the app.

# JS Bridge

Zapp-pipes is evaluated inside a javascript bridge which relies on the JavaScriptCore api. This js environment has some limitations :
- it only allows ECMAScript 5 syntax (this is why the JS code uses babel to transpile to es5)
- it's missing some fundamental browser objects such as the `window` global and the `XMLHttpRequest` object. 
In order to make the js library work as intended these too features are polyfilled in the bridge. So the js code running in the zapp-pipes bridge can invoke the XHR object, and attach properties to `window`

To perform network requests inside the js code, we advise to use the axios library, which has been tested and works reliable for get and post requests - including headers settings.

The JS Bridge also exposes a method to get some data from the app. So far, this method provides : 
- the account id
- the broadcaster id
- the bundle identifier
- the device uuid
- the platform used


-- WIP --

As explained in the Concept section, Zapp-pipes relies on a javascript library evaluated inside a JS bridge on both iOS and android platform. 

the current page explains in more depths the architecture of the zapp-pipes project

## Shared native features

On both native platforms, the infrastructure consists in a singleton class which holds a reference to the Javascript context in which the javascript library is evaluated. this classes are extended with helpers and other classes / methods which provide the following features : 
* a loading method, which takes your desired environment as a parameter, and a completion block to run once loading is done
* a static member in the JS loading class can be used to know whether the JSContext is evaluated and ready to use
* If set to `production` environment, the loader will perform a head request to the js bundle's url in order check if the etag has changed since the previous loading. If not, it will use the cached version. If the etag is different, the latest bundle will be fetched and cached
* a `get(String url, Callback callback)` method to actually load data via the JS lirbary
* basic `window` object polyfill
* XMLHttpRequest polyfill to allow the JS library to perform network requests (currently supports GET & POST methods, with header settings)
* a global method called `getAppData`that is used by the JS library to retrieve some data in the app

Both platform check for a boolean in the build params to toggle the use of the Zapp-Pipes project. Make sure this is set properly in your app build params when using this feature

## iOS

On iOS, the JS bridge relies on the JavaScriptCore framework.
The code can be found in ApplicasterSDK-iOS, in the customDataSources folder.

## Android

on Android, the JS bridge relies on the [LiquidCore Library v0.1.0](https://github.com/LiquidPlayer/LiquidCore/wiki/README-(v0.1.0))
The code can be found in applicaster-android-sdk, in the jspipes folder

## Javascript

The JS library itself is an ES5-compatible javascript bundle hosted on s3. The bundle is created by a packager that can be used either locally, or through a CI process. Note that a specific bundle is created for each app, to make sure each app's bundle is built only with the providers required for this app, in order to reduce bundle size and loading time.

The bundle exposes a single `zappPipes` global object which contains the `get(url, callback)` method the native apps use when retrieving data.

Bundles are created via the `zapp-pipes-packager` repo. It is a shell project which pulls the `zapp-pipes-dev-kit` repo (which contains the core library, as well as some dev & test features) and the required providers as npm dependencies. It then runs a series of scripts to configure, test, build and deploy the bundle automatically.

Check the pages about how to create a new provider and how to manually package a bundle to know more about these features

-- WIP --
In the native apps, the zapp-pipes project offers two environments : 

## production
Production is the default environment. It relies on a bundle built with the zapp-pipes-packager, hosted on s3.

## Local
The local environment will fetch a bundle served locally on localhost instead of getting it from s3.
The local bundle can be either : 
- a bundle containing all the providers, if you use the `zapp-pipes` repo with the `npm run start:script` feature
- a bundle containing one provider, with hot reloading of the js code (more info coming soon)

When creating a new provider, it is also possible to use the server feature of the `zapp-pipes-dev-kit` to locally test a provider requests in the browser

You can use the `zapp-pipes-packager` to create a bundle for a specific app-version, with just the providers which are required. 

For this you will need an NPM_TOKEN and a ZAPP_TOKEN to be set in your environment variables. The ZAPP_TOKEN can be created in https://accounts.applicaster.com. Ask for the NPM_TOKEN on [slack](https://applicaster.slack.com/archives/C4W2MEQMB)

You will also need the aws cli to be installed and configured properly.

In order to do so : 
* clone the [`zapp-pipes-packager`](https://github.com/applicaster/zapp-pipes-packager) repo. make sure you are using the latest master code
* install dependencies by running `yarn`
* run `npm run package [app_version_id] provider1 provider2 ...`

You can head to the `zapp-pipes-packager` README for more detailed information about this process


In order to create a new provider, it is advised to start from the starter project in order to make sure the provider respects the Zapp-pipes api, and can be smoothly integrated.

A Provider consists of an npm package published privately in the applicaster npmjs repository. Contact us on slack if you need more information about npmjs private packages.

### Provider Api

The final export of the provider npm package must be an object with the following properties : 

* **name<String>**: name of the provider. this string will be used as the scheme for making requests inside the app, and should only contain UTF-8 compatible alphabetical characters and dashes `-`
* **manifest**: the manifest is an object containing the following properties :
  * **handlers<[String]>**: strings of `request_type` handled by the provider. All request must contain a `type` parameter which matches one of the handlers declared here. If a request is made to an unregistered `request_type`, the zapp-pipes bundle will throw an error.
  * **help&lt;Object&gt;**: the help object is supposed to provide help for all supported `request_type`. Ideally, should provide a description object, and a parameters array which declares all the other parameters required for performing the relevant `request_type`
* **handler: (providerUtils) -> (params) -> providerResult&lt;Promise:Any&gt;** : the handler method should be a curried function which returns the result of the request. The currying enables the core library to inject the parameters and the utility functions the provider may require. 
* **test&lt;Object&gt;**: The test object provides the info required by the packager to run integration tests while building the bundle
  * **testCommand<String>**: the test command that will be used in the integration test. should be something like `{provider-name}://fetchData?type={requestType}&foo=bar`
  * **requestMocks&lt;[Object]&gt;**: the zapp-pipes packager uses [nock](https://github.com/node-nock/nock) to mock server request during the integration test process. The `requestMocks` object allows to register urls and responses that need to be mocked during the integration test. For each mocked request, you should provide an object with the following properties:
    * **host&lt;String&gt;** : the full host name, with the protocol used
    * **method<get|post>** : the http method to use. If using `post`, the nock setup will automatically intercept requests, regardless of the payload sent in the request body
    * **path&lt;String&gt;** : the path of the request, which must start with `/`
    * **httpCode&lt;Number&gt;** : the httpCode of the response, default is `200`
    * **expectedResponse&lt;Object&gt;** : the response nock will return for the request. It is *not* the response expected from the library, but just the request call.

Here is an example of a provider implementation
```javascript
  const provider = {
    name: 'my-provider-name',

    manifest: {
        handlers: ['collection', 'item'],
        help: { 
            collection: {
                description: 'list of items',
                params: { ... }
            ....
            }
       }
    },

    test: {
      testCommand: 'my-provider-name://fetchData?type=allFeeds&id=XXX',
      requestMocks: [{
        host: 'http://api.my-server.com',
        method: 'get',
        path: '/feeds/id/XXX',
        httpCode: 200, // unecessary here cause it will default to 200
        expectedResponse: {}, // full expected response from a get request to http://api.my-server.com/feeds/id/XXX
      }, {
        host: 'https://auth.my-server.com',
        method: 'post',
        path: '/token',
        httpCode: 200,
        expectedResponse: { token: 'XXXX' },
      }],
    },

    handler: providerInterface => params => {

      const { type } = params;

      if (!checkParams(params)) {
        return providerInterface.throwError({ msg: 'invalid params', params });
      }

      if (type === 'collection') {
        return collectionRequest(params)
          .catch(error => providerInterface.throwError({ error, params }))
          .then(response => providerInterface.sendResponse(response));
      }
    }
  };

  export default provider;
```

The `providerInterface` object is a toolbelt object which provides the following methods :
* `log(...msg)`: logs a message
* `throwError(reason)`: will return a 402 bad request response, with a reason message
* `sendResponse(response, code = 200)`: will return a response to the router, with the given http code (default is 200)
* appData() : function which returns data from the native app. returns an object containing the device uuid, the bundle indentifier, and other app / device related data.

the handler has to explicitly return the response using either the `sendResponse()` or `throwError()` method of the providerInterface. Invoking a callback with a request response will break the flow of the bundle, and if the handler doesn't return anything, the bundle might hang or throw.

## Tests

It is better if the provider has tests, but there is no strict enforcement of this. However, integration tests are ran.
This tests rely on the test property of the provider, and bundling will fail if this property is not correctly set according to the documentation above.

Integration test don't test the provider's internal work fully. They just make sure that the provider returns something - even an error.

## Data output

All providers must return either a feed or an entry according to the following format : 
```javascript
const feed = {
  title: '', // title of the feed
  author: { name: 'author name' },
  id: '', // 'id of the feed'
  summary: '', // description of the feed
  link: {
    type: 'atom',
    rel: 'self',
    href: '', // url to get the feed
  },
  type: {
    value: '' // either feed, or the entry type
  },
  mediaGroup: [{
    type: '', // type of media asset : thumbnail...
    media_item: {
      scale: 'small|large',
      src: '', // url of the media asset
    }
  }] // mediaGroup can contain any number of assets
  updated: '' // ISO 8601 timestamp of the latest feed update*,
  entry: [] // array of feed entries
  extensions: {}, // all other data you want to pass
};

const entry = {
  id: '',
  title: '',
  summary: '',
  author: { name: '' },
  type: { value: 'feed|video|article|channel|gallery' },
  link: {
    type: 'atom',
    rel: 'self',
    href: '', // url to get the entry
  },
  ui_tag: '', // may be required in some cases
  screen_type: '', // may be required in some cases
  mediaGroup: [{}], // same as above,
  updated: '',
  extensions: {},
}
```

* https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations

## npm commands

The starter kit is pre-configured to pull the `zapp-pipes-dev-kit` and expose a node server to test the provider in the browser. just run `npm start` to kick off the server, and point your browser to `http://localhost:8080/{provider-name}/fetchData?type={request_type}&params=...`

There are also `pretest` and `prepublish` hooks prepared for testing and releasing the bundle. The `pretest` hook should not be removed, as the `zapp-pipes packager` will need to pull all dependencies - including test dependencies in order to run the provider's test suite.


**this page is only relevant for the Reshet-First team, working on the `reshet` branch of this repo**

This project contains the following files and folders : 

- src : contains the source code of the project
  - config : some config files for the server and the project. It contains the list of providers to load, which by default is `applicaster` and `reshet-first`
  - home : simple home page for the server. not relevant
  - providers : contains the applicaster & reshet-first providers. This is where you need to update code when provider change and you want to deploy a new bundle
  - resolver: not in use currently
  - router : main router logic for the library
  - utils : helpers and utility functions
  - index.js : entry point for the bundle
  - server.js : entry point for the server mode
- test files
- .babelrc : config file for babel
- .eslintrc : config file for eslint
- .gitignore : built files are ignored in the repo
- .npmignore : source files are not pushed to npm when it the package is published
- README.md : handle with care :D may not be the most up to date. The install section should be fine though
- package.json : npm config & dependencies
- webpack-hot.js : webpack config for serving the bundle locally form the source, with hot-reloading (can be useful for debugging issues)
- webpack.config.js : webpack config for building the bundle
