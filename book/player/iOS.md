# Player Plugin - iOS

The iOS Player plugin for Zapp is based on implementing the `ZPPlayerProtocol`.
The protocol goes through all of the functions for initializing the player with either a single item or a playlist, presenting a player (in either fullscreen or inline mode) and controlling playback (play, pause, seek, etc).

In order to see a basic implementation of a player, we suggest reviewing the [Player demo project](https://github.com/applicaster/zapp-plugins-examples/tree/master/VideoPlayer/iOS) as it's a good starting point for implementing a player.
Another good example to see of a current open source implementation of an iOS and Android player plugin is [Brightcove player](https://github.com/applicaster/zapp-player-plugin-brightcove).

This guide will go through the basic terms and functions that need to be implemented in order to create a player plugin.

## Playable item
All objects handed to the player conform to the `ZPPlayable` protocol.

The ZPPlayable protocol contains, among others, the following mandatory properties:
* Name
* Description
* Content video URL (Might return only after loading the object when an entitlement exists - In case of an `APVODItem` or `APChannel`)
* Is the item a Live channel (`isLive`)
* Public page URL (Web page with deep linking supporting app store installation)
* Analytics parameters

The following properties are optional and available on some of the items:
* Last playback time (set/get)
* Playback duration
* Extra playable info (Depending on the datasource)
* Extension dictionary (Depending on the datasource)

## Player Configuration
Player configuration object - `ZPPlayerConfiguration` - is handed in the player playback setup stage and contains some info for the player to be used at launch such as:
* Start time - Set player starting time
* End time - Set player end time (optional - it is used if wanting to display a "clip").
* Animated - control player display (if animated or not).
* Player should start muted - This should be used for inline playback only and should offer a unmute button or other unmuting functionality.
* Custom configurations - Dictionary that allows further custom configurations to be passed for the player configuration


## Key functions for implementation
Here are most of the key functions to be implemented for a player with some details.

Note: Please refer to the `ZPPlayerProtocol` in the current stable SDK in order to determine the exact methods you'll need to implement.

### Initialization methods
The player protocol includes 2 optional initialization methods:
``` swift
  @objc optional static func pluggablePlayerInit(playableItem item: ZPPlayable?) -> ZPPlayerProtocol?
  @objc optional static func pluggablePlayerInit(playableItems items: [ZPPlayable]?, configurationJSON: NSDictionary?) -> ZPPlayerProtocol?
```
The methods differ with the option to pass either one item or multiple items and a configuration dictionary.

### Fullscreen player presentation
The following functions will trigger fullscreen player playback:
``` swift
  func presentPlayerFullScreen(_ rootViewController: UIViewController, configuration: ZPPlayerConfiguration?)
  @objc optional func presentPlayerFullScreen(_ rootViewController: UIViewController, configuration: ZPPlayerConfiguration?, completion: (() -> Void)?)
```
It is preferable to implement the second function with completion, where relevant.

### Inline playback methods
The following functions should be use to display and remove inline players.
``` swift
  func pluggablePlayerAddInline(_ rootViewController: UIViewController, container : UIView)
  @objc optional func pluggablePlayerAddInline(_ rootViewController: UIViewController, container : UIView, configuration:ZPPlayerConfiguration?)
  func pluggablePlayerRemoveInline()
```

Inline players differ from fullscreen players by the fact that the view controller should be added as a child view controller to the provided controller.
Both the controller and container view are provided in order to add both - this way the player will get both the lifecycle of the view controller and will present in the correct view designated for it.
Please also make sure to completely clean up the player when the remove inline function is called.

### Playback controls
The following player methods should be implemented for playback controls:
``` swift
  func pluggablePlayerPause()
  func pluggablePlayerStop()
  @objc optional func pluggablePlayerResume()
  func pluggablePlayerPlay(_ configuration: ZPPlayerConfiguration?)
  @objc optional func pluggablePlayerPlay(_ items: [ZPPlayable]?, configuration: ZPPlayerConfiguration?)
  @objc optional func pluggablePlayerCanHandleSubscription() -> Bool
  @objc optional func pluggablePlayerSeekTo(seconds: TimeInterval)
  @objc optional func pluggablePlayerSeekBy(delta: TimeInterval)
  @objc optional func pluggablePlayerMoveBackward()
  @objc optional func pluggablePlayerMoveForward()
```

Note: these playback controls do not replace the need for the player to display its own custom or out of the box controls

### Player state
The following functions help update different states for the player and normalize the responses.

``` swift
  @objc optional func playerState() -> ZPPlayerState
  @objc optional func playbackPosition() -> TimeInterval
  @objc optional func playbackDuration() -> TimeInterval
  func pluggablePlayerIsPlaying() -> Bool
```
## Supporting login and other hooks with Screen plugin implementations
In order for a player to support various code hooks before playback, the player should implement screen plugins protocol by defining a screen that is presented in a modal way.
Please refer to the [Screen Plugins](/ui-builder/intro.md) guide for more info about screens and pre-hooks.

## Supporting ads from datasources
Some of the Applicaster datasources provide ad information in a uniform structure.
While this is optional, it should be implemented if the integrated player supports this feature.

For more info about supporting ads from datasources [Click Here](/player/ads-in-datasource.md).

## Player Analytics

Player analytics is divided to 2 types of analytics:
1. Player analytics events
2. Player analytics plugins

Player analytics events are a list of events every player should implement as fully as possible.
For more info about player analytics events [Click Here](/player/player-analytics.md).

### Player Analytics Plugins

In general we offer 2 approaches for implementing player analytics:
1. Having the player instance (Usually AVPlayer or the wrapped player) exposed in the player implementation
2. Implement a set of pre-defined notifications in order to provide a video analytics plugin the relevant state changes.

#### Player notifications

Player notifications are a set of notifications a player can optionally provide - designated specifically for implementation of video analytics.
These notifications are used to track state changes in the player.
Please refer to the Analytics section for more info on the notifications expected from the player in more details (including the parameters).

Here is a short list of the notifications expected from the player:
``` objc
extern NSString *const kAVPlayerWasCreated;
extern NSString *const kPlayerSeekStarted;
extern NSString *const kPlayerSeekEnded;
extern NSString *const kAVPlayerPlaybackCompleted;
extern NSString *const kAVPlayerKey;
extern NSString *const APPlayerControllerItemDidPlayToEndTimeNotification;      // Posted when the player finish playing an item.
extern NSString *const APPlayerControllerDidPlayNotification;                   // Posted when player's play method is called.
extern NSString *const APPlayerControllerDidPauseNotification;                  // Posted when player's pause method is called.
extern NSString *const APPlayerControllerDidStopNotification;                   // Posted when stop was called.
extern NSString *const APPlayerControllerPlayerWasCreatedNotification;          // Posted when the AVPlayer instance is created.
extern NSString *const APPlayerControllerPlayerFinishedPlaybackNotification;    // Posted when the AVPlayer finished playing playback.
```