# Player plugins

A player plugin is used to implement a player (usually for on demand or live videos).
The player itself will be generated and called by the SDK whenever a media item is clicked.

## Playback modes
There are 2 playback modes supported that can be implemented in a Player Plugin:
* Fullscreen Playback - Fullscreen playback will allow a player plugin to present a fullscreen player on top of the entire app. This mode is used out of the box and is the default entry point to call a player plugin
* Inline Playback - A player can implement inline playback (optionally). In this case, the player can be integrated to any other screen (both native and react native based) in order to provide an inline playback mode. Please note - the player must gracefully handle a case in which the video ends but the player is not yet dismissed.

Note: When no player plugin is selected for an app, the default Applicaster player will be launched.
The applicaster player is a full fledged player implementing all of the optional capabilities available for a plugin.

* [iOS](/player/iOS.md)
* [Android](/player/Android.md)
* [TV Quick-Brick based platforms](/player/quickbrick-tv-player.md)
* [Player Analytics](/player/player-analytics.md)


#### Datasource Protocols

The following pages contain protocols for datasource providers to send additional data on a video item. 
Video players that implement these features should rely on these protocols to obtain the data:
* [Video Advertising](/Zapp-Pipes/protocols/video_advertising_protocol.md)
* [Text Tracks](/Zapp-Pipes/protocols/video_text_tracks_protocol.md) 
