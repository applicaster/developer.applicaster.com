# Player Plugin for tvOS / AndroidTV / FireTV

This document explains how to create a player plugin for the Quick-Brick framework.

## Create your plugin project

In order to have a working environment for your plugin, you will need several things:

- A repository for your plugin code.
- Native source code for the app you are working with, for that you can use the [downloaded development project](/getting-started/download-development-project.md).

## Specific requirements

Because the Quick-Brick app is built with react-native, and react-native is still implemented in objective-C on iOS, it is important that the main player view class and all the properties declared below are annotated with `@objc` and declared as public.

## Anatomy of a QuickBrick player plugin

The main export of your player plugin should simply be a view, extending `UIView` on **tvOS**, and `FrameLayout` on **AndroidTV/FireTV**.

Your view must have the following properties below.

Everytime the react-native code is setting or changing a property in the react-native component, it invokes the setter function of the relevant property. Depending on the value of that property, you can trigger whatever action is required on the native side (play / pause, mute / unmute, seek, etc...)

Typically, the javascript front end will look something like this (there are more props and component methods, but this is just an example)

```javascript
// we get a reference to the underlying native component.
// You don't have to create a bridge, it's built-in, and will instantiate
// your player view by reflexion
const NativeVideoComponent = requireNativeComponent("NativePlayerManager");

class PlayerComponent extends React.Component {
  onVideoLoadStart = ({ uri, isNetwork, type }) => {
    // will be called when the loading start
  };

  onVideoEnd = () => {
    // this is called when the video ends
  };

  render() {
    const { item } = this.props;

    return (
      <NativeVideoComponent
        playableItem={item}
        onVideoLoadStart={this.onVideoLoadStart}
        onVideoEnd={this.onVideoEnd}
      />
    );
  }
}
```

The properties typed below as functions are callbacks which need to be invoked with the described payload when the relevant events are triggered.

On **tvOS**, things are pretty straightforward. The functions from the javascript are received as `RCTBubblingEventBlock`, and can be invoked as a function, with a dictionary as argument.

```swift

@objc public class MyPlayerView: UIView {

  // these properties can simply be called by passing a dictionary with the properties
  // described below
  @objc public var onVideoLoadStart: RCTBubblingEventBlock?
  @objc public var onVideoEnd: RCTBubblingEventBlock?

  @objc public var playableItem: NSDictionary? {
    didSet {
      // when the react component mounts, the `src` prop is assigned
      // which causes this setter to be called. if the `src` prop changes,
      // it will invoke this setter again

      stopCurrentPlaybackIfNeeded();

      if let item = playableItem as? [String: Any],
        content = playableItem["content"] as? [String: Any],
        sourceUrl = content["src"] as? String {
        preparePlayerWithContent(sourceUrl)
      }
    }
  }

  func preparePlayerWithContent(sourceUrl: String) {
    // initialize player to load new content
    // we also need to tell the js side that video loading started
    if let onVideoLoadStart = onVideoLoadStart {
      onVideoLoadStart([
        "uri": src?.uri,
        "isNetwork": true,
        "type": "video/hls",
      ])
    }
  }

  func stopCurrentPlayBackIfNeeded() {
    // ... clean up current playback if any and needed...
  }

  func videoEnds() {
    // clean up when video ends, and invoke the js function
    if let onVideoEnd = onVideoEnd {
      onVideoEnd()
    }
  }
}

```

On **AndroidTV** and **FireTV**, things are a bit more complicated. What happens practically is you fire events, and the corresponding javascript functions are invoked when this happens. The payload sent with the event is a `WritableMap` from the React library, and is received as a plain javascript object on the javascript side. Fortunately, we've created an interface which lets you directly invoke these javascript functions from the native code. You simply need to implement the `QuickBrickPlayer` interface on your player view class, and fire the events when relevant, by using the functions accessible from the interface.

```kotlin

class MyPlayerView(context: Context): FrameLayout(context), QuickBrickPlayer {

  override fun setPlayableItem(playableItem: ReadableMap) {
    // these methods are called when the prop - in this case `playableItem` -  is set on the js side
    // you can implement them freely, depending on what you want to do when these properties are set
    // in this example, you're likely to want to prepare the media for play back
    val uri = getUriStringFromPlayableItem(playableItem)
    preparePlayerWithContent(uri)
  }

  fun preparePlayerWithContent(uri: String) {
    // start loading the player - you need to call the function implemented in the interface to
    // fire the event, in this case `onVideoLoadStart`
    // the argument is a `WritableMap` and can be constructed with the provided helper class

    val arguments = ReactArgumentsBuilder()
      .putString("uri", uri)
      .putBoolean("isNetwork", true)
      .putString("type", "video/hls")
      .build()

    // in the interface, this is calling sendEvent("onVideoLoadStart", arguments)
    onVideoLoadStart(arguments)
  }

  fun videoPlaybackEnd() {
    // same with all lifecycle events, simply invoke the method provided in the interface
    // it will call the proper function prop in javascript
    onVideoEnd()
  }

}
```

## Properties

### Required

- src: { uri: string }

  the source url of the content to play

- entry: {}

  the full entry to be played. contains the source url above but also all the media item metadata
  (see [feed API](https://developer.applicaster.com/Zapp-Pipes/5.-Feed-API.html) to know more)

- paused: Boolean

  Will be set to true or false when content needs to be paused or unpaused.

- muted: Boolean

  Will be set to true or false when content needs to be muted or unmuted.

- controls: Boolean

  if set to false, the native controls shouldn't be presented at all. This prop won't be changed during the playback of the item, and shouldn't be used to check when the controls need to be dismissed after a few seconds. This is meant to provide an options in certain situations to override the native controls with custom js-based player controls.

- volume: Float

  sets the volume from [0] to [1]

- rate: Float

  sets the rate of the playback

- seek: { time: Flat, tolerance: Float }

  will move the playback to a specific time on the video playback, with a provided tolerance
  Once this is done, the `onVideoSeek` function needs to be called

- currentTime: Float

  sets the currentTime of the playback. Should set the `seek` property at that time

- fullScreen: Boolean

  allows the player to toggle fullscreen mode. The fullscreen event functions need to be called appropriately during the operation (see below `onFullscreenPlayerWillPresent`, `onFullscreenPlayerDidPresent`, `onFullscreenPlayerWillDismiss`, `onFullscreenPlayerDidDismiss`)

- onVideoLoadStart: (onLoadStartEvent) => void

  should be invoked when the loading of the video starts, with the following payload:

  ```
  onLoadStartEvent: {
    isNetwork: Boolean,
    type: string,
    uri: string,
  }
  ```

- onVideoLoad: (onLoadEvent) => void

  should be invoked when the video is loaded and playback can start, with the following payload:

  ```
  onLoadEvent: {
    currentPosition: Float,
    duration: Float,
    naturalSize: { width: Float, height: Float, orientation: "portrait" | "landscape" },
    audioTracks: [{ index: Int, title: String, language: String, type: String }],
    textTracks: [{ index: Int, title: String, language: String, type: String }],
  }
  ```

  language prop is 2-letters [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
  type prop is the mime-type

- onVideoBuffer: () => void

  should be invoked when the video starts to buffer

- onVideoError: (error) => void

  should be invoked when the playback is throwing an error. This will trigger the display of an error screen in the app

- onVideoProgress: (onVideoProgressEvent) => void

  should be invoked every second and provide the player's heartbeat, along with the following payload:

  ```
  onVideoProgressEvent : {
    currentTime: Float,
    playableDuration: Float,
    seekableDuration: Float,
  }
  ```

- onVideoSeek: (onSeekEvent) => void

  should be invoked when the `seek` operation completes

  ```
  onSeekEvent : {
    currentTime: Float,
    seekTime: Float
  }
  ```

- onVideoEnd: () => void

  should be called when the playback has reached the end of the video

- onVideoFullscreenPlayerWillPresent: () => void

  should invoked before setting the player to fullscreen

- onVideoFullscreenPlayerDidPresent: () => void

  should invoked after setting the player to fullscreen

- onVideoFullscreenPlayerWillDismiss: () => void

  should be invoked before dismissing fullscreen

- onVideoFullscreenPlayerDismiss: () => void

  should be invoked after dismissing fullscreen

- onReadyForDisplay: () => void

  should be invoked when the content is ready to be played

- onPlaybackStalled: () => void

  should be invoked when the playback of the video is stalled

- onPlaybackResume: () => void

  should be invoked when the playback of the video is resumed after being paused, stalled or bufferred

- onPlaybackRateChange: ({ playbackRate: true }) => void

  should be invoked when the playback rate of the video changes

### optional

- resizeMode: String

  provides resize mode to use for the video

- allowsExternalPlayback: Boolean

  set to true when the player should allow to play on external sources (airplay, chromecast...)

- playInBackground: Boolean

  set to true when the player should allow to play in the background

- onVideoExternalPlaybackChange: ({ isExternalPlaybackActive: Boolean }) => void

  should be invoked when the playback is set to an external source (airplay, chromecast...)
