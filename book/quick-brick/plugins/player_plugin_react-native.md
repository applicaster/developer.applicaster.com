# Player Plugin

NB: is doc is left here for future reference, in case we want to add the possibility to create player plugins based from RN.

for the doc regarding native player plugin, go [here](player_plugin.md)

This document explains how to create a player plugin for the Quick Brick framework.

## Requirements

In order to create your Player plugin, you will need have an understanding of the following tools and frameworks

- node.js / npm
- yarn & yarn workspaces
- React & React-Native

## Anatomy of a QuickBrick player plugin

Quick Brick plugins are React-Native modules, published as npm packages. They should contain all the relevant code for the feature, both the javascript front-end and the backing native layer.

When building the app, we first install the npm package for the plugin. Then the native layer will pull the plugin native code to build from the `node_modules` folder, where the npm package of the plugin is installed. The manifests for each platform will provide the information for the native SDKs to find the proper path to the ios podspec and the android gradle file

Eventually, your plugin source code will look like this

```
|-- ios
|    |-- MyPlayerPlugin.podspec
|    |-- MyPlayerPlugin/... // native code
|-- android
|    |-- build.gradle
|    |-- com/package/src/main/java/... // native code
|-- src
|    |-- index.js
|    |-- ...
|-- manifests
|    |-- tvos.json
|    |-- android.json
|    |-- samsung_tv.json
|    |-- ...
|-- package.json
|-- .gitignore
|-- .npmignore
|-- README.md
```

And the manifests will include the following information:

```json
// for all platforms, you need to provide the identifier, name & version of the npm package :

{
  "name": "My Player Plugin",
  "identifier": "my-player-plugin",
  "dependency_name": "@my-org/my-player-plugin", // this is the name of the npm package
  "dependency_version": "1.0.0", // current version on npm
  "manifest_version": "1.0.0", // version of the plugin in Zapp*
  "react_native": true,
  "type": "player",
  "targets": ["tv"],
  // + other available manifest properties...
}

// Then you need to provide information so the native layer can
//   - make sure the npm package is installed
//   - retrieve the native code inside node_modules

// tvos
{
  "platform": "tvos",
  "api": { "class_name": "<native class name>"},
  // this will tell the native layer to install this npm dependency
  "npm_dependencies":["@my-org/my-player-plugin@1.0.0"],
  "extra_dependencies": [
    // This will be used by the native app to know where to pull the native layer for that plugin,
    // by adding this line in the app's main Podfile
    { "MyPlayerPlugin": ":path =\u003e './node_modules/@my-org/my-player-plugin/ios" }
  ]
}

// android tv
{
  "platform": "android",
  "api": {
    "class_name": "com.applicaster.reactnative.plugins.APReactNativeAdapter",
    "react_packages": [
      // should point to the class that registers your native module to the React Native manager
      "com.my-org.my-player-plugin.MyPlayerPluginReactPackage",
    ]
  },
  // this will tell the native layer to install this npm dependency
  "npm_dependencies":["@my-org/my-player-plugin@1.0.0"],
  "project_dependencies": [
    {
      // this will tell gradle to configure a project entry in settings.gradle, pointing
      // to the provided path, and add a compile project statement in the app's main gradle file
      "my-player-plugin": "node_modules/@my-org/my-player-plugin/android",
    }
  ]
}


// * although this is not mandatory, we encourage to keep the plugin manifest version in sync with the npm package version
```

## Setting up your plugin

### web

### ios / tvos

### android / amazon fire

## Create your plugin project

In order to have a working environment for your plugin, you will need several things :

- a repository for your plugin code
- tooling to create the Quick Brick react-native entry point, so you can start the React-Native server locally
- Native source code for the app you are working with.

# Javascript front-end API

# Connecting to Native

React Native provides an extensive API to allow communication between the javascript app and the native layer.
You can refer here ([ios](https://facebook.github.io/react-native/docs/native-components-ios) - [android](https://facebook.github.io/react-native/docs/native-components-android) ) for their documentation on native modules for more details.

## tvos / ios

On Apple platforms, you need 3 pieces to connect the native code to the javascript front-end:

1. an extension of the `RCTViewManager` class :

```swift

import React
import AVFoundation

@objc(MyPlayerPlugin)
public class MyPlayerPlugin: RCTViewManager {
  // you need to define a name to require the native module on the JS side.
  // this must match the string in the @objc annotation above, and must be returned
  // by the moduleName method
  static let nativeModuleName = "MyPlayerPlugin"

  override public static func moduleName() -> String? {
    return MyPlayerPlugin.nativeModuleName;
  }

  override public class func requiresMainQueueSetup() -> Bool {
    return true
  }

  override open var methodQueue: DispatchQueue {
    return bridge.uiManager.methodQueue
  }

  override public func view() -> UIView? {
    guard let eventDispatcher = bridge?.eventDispatcher() else { return nil }
    // here you simply return an instance of your player's native view.
    // it will be initialized with the eventDispatcher which you can use
    // to send events from native to JS
    return MyPluginPlayerView(eventDispatcher: eventdispatcher);
  }

  @objc public override func constantsToExports() -> [AnyHashable: Any]! {
    return [
      "ScaleNone": AVLayerVideoGravity.resizeAspect as Any,
      "ScaleToFill": AVLayerVideoGravity.resize as Any,
      "ScaleAspectFit": AVLayerVideoGravity.resizeAspect as Any,
      "ScaleAspectFill": AVLayerVideoGravity.resizeAspectFill as Any
    ]
  }
}
```

2. A declaration of the props available on the native component, using React Native's macros

```obj-c

@import React;
#import <AVFoundation/AVFoundation.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MyPlayerPlugin, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(src, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(entry, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(adTagUri, NSString);
RCT_EXPORT_VIEW_PROPERTY(resizeMode, NSString);
RCT_EXPORT_VIEW_PROPERTY(repeatVideo, BOOL);
RCT_EXPORT_VIEW_PROPERTY(allowsExternalPlayback, BOOL);
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);
RCT_EXPORT_VIEW_PROPERTY(controls, BOOL);
RCT_EXPORT_VIEW_PROPERTY(volume, float);
RCT_EXPORT_VIEW_PROPERTY(playInBackground, BOOL);
RCT_EXPORT_VIEW_PROPERTY(playWhenInactive, BOOL);
RCT_EXPORT_VIEW_PROPERTY(ignoreSilentSwitch, NSString);
RCT_EXPORT_VIEW_PROPERTY(rate, float);
RCT_EXPORT_VIEW_PROPERTY(seek, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(currentTime, float);
RCT_EXPORT_VIEW_PROPERTY(fullScreen, BOOL);
RCT_EXPORT_VIEW_PROPERTY(filter, NSString);
RCT_EXPORT_VIEW_PROPERTY(progressUpdateInterval, float);
RCT_EXPORT_VIEW_PROPERTY(onVideoLoadStart, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoLoad, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoBuffer, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoError, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoProgress, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoSeek, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoEnd, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onTimedMetadata, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoAudioBecomingNoisy, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoFullscreenPlayerWillPresent, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoFullscreenPlayerDidPresent, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoFullscreenPlayerWillDismiss, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoFullscreenPlayerDidDismiss, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onReadyForDisplay, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPlaybackStalled, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPlaybackResume, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPlaybackRateChange, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoExternalPlaybackChange, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoSaved, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdChangedState, RCTBubblingEventBlock);

@end
```

3. An extension of UI View to implement your player

```swift
import AVKit
import Foundation
import React

@objc public class MyPluginPlayerView: UIView {
  // all variables of type RCTBubblingEventBlock are javascript
  // functions passed as prop to the native component
  // you can easily invoke these javascript function
  // from the native side by calling them as a function, and passing
  // a dictionary of arguments
  @objc public var onVideoLoadStart: RCTBubblingEventBlock?
  @objc public var onVideoLoad: RCTBubblingEventBlock?
  @objc public var onVideoBuffer: RCTBubblingEventBlock?
  @objc public var onVideoError: RCTBubblingEventBlock?
  @objc public var onVideoProgress: RCTBubblingEventBlock?
  @objc public var onVideoSeek: RCTBubblingEventBlock?
  @objc public var onVideoEnd: RCTBubblingEventBlock?
  @objc public var onTimedMetadata: RCTBubblingEventBlock?
  @objc public var onVideoAudioBecomingNoisy: RCTBubblingEventBlock?
  @objc public var onVideoFullscreenPlayerWillPresent: RCTBubblingEventBlock?
  @objc public var onVideoFullscreenPlayerDidPresent: RCTBubblingEventBlock?
  @objc public var onVideoFullscreenPlayerWillDismiss: RCTBubblingEventBlock?
  @objc public var onVideoFullscreenPlayerDidDismiss: RCTBubblingEventBlock?
  @objc public var onReadyForDisplay: RCTBubblingEventBlock?
  @objc public var onPlaybackStalled: RCTBubblingEventBlock?
  @objc public var onPlaybackResume: RCTBubblingEventBlock?
  @objc public var onPlaybackRateChange: RCTBubblingEventBlock?
  @objc public var onVideoExternalPlaybackChange: RCTBubblingEventBlock?
  @objc public var onAdChangedState: RCTBubblingEventBlock?

  // other props are mapped to types automatically. When a prop is set on
  // the javascript side, `didSet` is invoked
  @objc public var entry: [String: Any]?
  @objc public var src: NSDictionary? {
      didSet {
          //what to do when `src` prop is set or changed on the javascript side
      }
  }

  /* Required to publish events */
  var eventDispatcher: RCTEventDispatcher?

  public init(eventDispatcher: RCTEventDispatcher) {
      super.init(frame: .zero)
      self.eventDispatcher = eventDispatcher
  }

  public required init?(coder aDecoder: NSCoder) {
      return nil
  }

  deinit {
    // clean up when player is being unmounted from the javascript side
  }

}

```

Each of these props being properties declared on your native views, annotated with `@objc`

## Android (tv) / Amazon fire

# Native Protocols

## tvos / ios

## android (tv) / amazon fire

# Example project
