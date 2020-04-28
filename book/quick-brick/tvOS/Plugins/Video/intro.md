## TvOS Video Player plugins

### Introduction

This document explains how Video Player plugins should be used on TvOS with QuickBrick

#### Supported Apple TV variant:

Apple TV 4th Generation or later using tvOS 11.0 or higher

#### Available from ZappSDK 10.0.0 and above

#### Required Applicaster Frameworks:

- ZappPlugins

### Content

- <a href="#general">General</a>
- <a href="#api">API</a>
- [How To Create New Plugin?](/quick-brick/tvOS/Plugins/Video/VideoPluginsHowCreate.md)

### Plugins

- [Default Player](/quick-brick/tvOS/Plugins/Video/DefaultPlayer/DefaultPlayer.md)

<a name="general" />

### General

Our tvOS SDK is using QuickBrick at its core.
This means that plugins are initialized from React Native.

The following is an example of a general implementation of an Video Player plugin based on a combination of Native and React Native code.

React Native is using video player plugin as `component`. It means that if player plugin implemented on native side it must have bridge module to export `UIView` to React Native component.

Optional: Video Player plugin may have another layer that will define customization controls.

#### Quick Brick Core

When the Player is triggered to present a video, QuickBrick will try to retrieve the first available Player plugin. This plugin will be called from the `PlayerWrapperComponent`.

Please review example of `render()` func in the `PlayerWrapperComponent`

```jsx
  render() {
    const { item = {}, Player, PlayerControls } = this.props;
    const showControls = this.shouldShowControls();
    const uri = item.content ? item.content.src : null;
    const { title, summary } = item;

    return (
      <TVEventHandlerComponent tvEventHandler={this.playerRemoteHandler}>
        <View style={style.container}>
          <Player
            source={ { uri } }
            paused={showControls}
            controls={!PlayerControls}
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            onEnd={this.onVideoEnd}
            onPlaybackRateChange={this.onPlaybackRateChange}
            onProgress={this.onProgress}
          />
          {PlayerControls ? (
            <PlayerControls
              title={title}
              subtitle={summary}
              showControls={showControls}
            />
          ) : (
            <ProgramInfo
              title={title}
              subtitle={summary}
              showControls={showControls}
            />
          )}
        </View>
      </TVEventHandlerComponent>
    );
  }
```

<a name="api" />

### React-Native API

Each Player Plugin must implement the mandatory API in the react native side, so all player plugins will use shared API structure.

#### Configurable props

---

##### source

Sets the media source. You can pass an asset loaded via require or an object with a uri.

The docs for this prop are incomplete and will be updated as each option is investigated and tested.

##### Asset loaded via require

Example:

```
const sintel = require('./sintel.mp4');

source={sintel}
```

##### URI string

A number of URI schemes are supported by passing an object with a `uri` attribute.

###### Web address (http://, https://)

Example:

```
source={ uri: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4' }
```

###### File path (file://)

Example:

```
source={ uri: 'file:///sdcard/Movies/sintel.mp4' }
```

---

##### controls

Determines whether to show player controls.

- ** false (default)** - Don't show player controls
- **true** - Show player controls

Note on iOS, controls are always shown when in fullscreen mode.

---

##### muted

Controls whether the audio is muted

- **false (default)** - Don't mute audio
- **true** - Mute audio

---

##### paused

Controls whether the media is paused

- **false (default)** - Don't pause the media
- **true** - Pause the media

#### Event props

---

##### onEnd

Callback function that is called when the player reaches the end of the media.

Payload: none

---

##### onLoad

Callback function that is called when the media is loaded and ready to play.

Payload:

| Property        | Type   | Description                                                                                                                                                                          |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| currentPosition | number | Time in seconds where the media will start                                                                                                                                           |
| duration        | number | Length of the media in seconds                                                                                                                                                       |
| naturalSize     | object | Properties:<br> _ width - Width in pixels that the video was encoded at<br> _ height - Height in pixels that the video was encoded at<br> \* orientation - "portrait" or "landscape" |

Example:

```
{
  currentTime: 0,
  duration: 5910.208984375,
  naturalSize: {
     height: 1080
     orientation: 'landscape'
     width: '1920'
  },

}
```

---

##### onLoadStart

Callback function that is called when the media starts loading.

Payload:

| Property | Description |
| -------- | ----------- |
| uri      | string      | URI for the media source |

Example:

```
{
  uri: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
}
```

---

##### onProgress

Callback function that is called every progressUpdateInterval seconds with info about which position the media is at during play.

| Property         | Type   | Description                                                                                       |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------- |
| currentTime      | number | Current position in seconds                                                                       |
| playableDuration | number | Position to where the media can be played to using just the buffer in seconds                     |
| seekableDuration | number | Position to where the media can be seeked to in seconds. Typically, the total length of the media |

Example:

```
{
  currentTime: 5.2,
  playableDuration: 34.6,
  seekableDuration: 888
}
```

---

#### onSeek

Callback function that is called when a seek completes.

Payload:

| Property    | Type   | Description                     |
| ----------- | ------ | ------------------------------- |
| currentTime | number | The current time after the seek |
| seekTime    | number | The requested time              |

Example:

```
{
  currentTime: 100.5
  seekTime: 100
}
```

Both the currentTime & seekTime are reported because the video player may not seek to the exact requested position in order to improve seek performance.

---

##### seek()

`seek(seconds)`

Seek to the specified position represented by seconds. seconds is a float value.

`seek()` can only be called after the `onLoad` event has fired. Once completed, the [onSeek](#onseek) event will be called.

Example:

```
this.player.seek(200); // Seek to 3 minutes, 20 seconds
```

---

##### onPlaybackRateChange()

Update rate change from `0` if stoped and `1` if playing

| Property     | Type   | Description           |
| ------------ | ------ | --------------------- |
| playbackRate | number | Updated playback rate |

Example:

```
{
  playbackRate: 0
}
```
