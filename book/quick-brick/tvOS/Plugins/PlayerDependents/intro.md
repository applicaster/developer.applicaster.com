# tvOS Video Player Dependent plugins

## Introduction
This document will explain the general structure of Video Player Dependent Plugins and how they work on tvOS using QuickBrick.

## Supported Apple TV variant:
Apple TV 4th Generation or later using tvOS 11.0 or higher
Available from ZappSDK 10.1.1 and above

## Required Applicaster Frameworks:

* ZappPlugins

## Content
* <a href="#general">General</a>
* <a href="#api">API</a>
* [How To Create New Plugin?](/quick-brick/tvOS/Plugins/PlayerDependents/DependentPluginsHowCreate.md)

## Existing plugins

* [Google Ineractive media Ads](/quick-brick/tvOS/Plugins/Video/DefaultPlayer/DefaultPlayer.md)

## Dependant Player types
* `video_advertisement` - Plugins that present video advertisment during playing video

<a name="general" />

## General

Video player dependent plugins are plugins that require a player for invocation. An example for such a plugin is Google IMA or video player analytics.

In order for the player dependent plugins to be called, the player plugin itself must implement the following protocol:
`QBPlayerProtocol` - Contains implementation as of what variables and functions the player contains.
`ZPDependablePlayerPluginProtocol` - Contains implementation that defines which types of dependent plugins this player supports.

Player dependent plugins should implement the following protocols:
`ZPPlayerDependentPluginProtocol` - Contains implementation that defines the plugin ability to retrieve data from the player instance.
`QBPlayerObserverProtocol` - Contains implementation that allows the player to send events to the dependent plugins.

In order to manage this relationship and initialize and release the plugins (according to the player lifecycle), there is a manager class - ZPPlayerDependentPluginsManager:QBPlayerObserverProtocol.
This class dispatches the player events to the relevant plugins that implement the `QBPlayerObserverProtocol` protocol.

Here is the behind the scenes flow:
1. Player sends the playerDidCreate: to the ZPPlayerDependentPluginsManager on creation.
The manager will then create instances of the relevant dependent plugins as defined in the `ZPDependablePlayerPluginProtocol` protocol.
2. The manager will then continuously send any following events to all the dependent plugins.
3. When the player finishes it's playback session it will send a playerDidFinishPlayItem: event.
At this point the manager will call all the plugins with a completion in order to allow potential processing or actions to finish before potentially displaying the next video or closing the player.
This can be used for example to either send final events or present a postroll.
4. The player will then call `playerDidDismiss:`.
At this point the manager will release all dependent plugins that were created for the current player.

<a name="protocols" />
## Protocols

###### QBPlayerProtocol

```swift
	// DS raw atom entry format
    @objc var entry:[String:Any]? { get }
    
    /// Player instance that represents Player
    @objc  var playerObject:NSObject? { get }
    
    /// Container where player was added
    @objc  var pluginPlayerContainer:UIView? { get }
    
    /// UIViewController instance if player plugin is using it
    @objc  var pluginPlayerViewController:UIViewController? { get }
    
    /// Pauses active player
    @objc  func pluggablePlayerPause()
    
    /// Resume playing loaded item
    @objc  func pluggablePlayerResume()
    
    /// Position of the video item that player is playing
    ///
    /// - Returns: TimeInterval value
    @objc func playbackPosition() -> TimeInterval
    
    /// Duration of the video item that player is playing
    ///
    /// - Returns: TimeInterval value
    @objc func playbackDuration() -> TimeInterval
```

###### QBPlayerObserverProtocol
```swift
	/// Player finished play video item
    ///
    /// - Parameters:
    ///   - player: instance of the player that conform QBPlayerProtocol protocol
    ///   - completion: completion when all dependant item will be completed player can start next move or can be closed
    func playerDidFinishPlayItem(player:QBPlayerProtocol,
                                 completion:@escaping (_ finished:Bool) -> Void)
    
    /// Player instance did created
    ///
    ///  - player: instance of the player that conform QBPlayerProtocol protocol
    func playerDidCreate(player:QBPlayerProtocol)
    
    /// Player instance did dismiss
    ///
    ///  - player: instance of the player that conform QBPlayerProtocol protocol
    func playerDidDismiss(player:QBPlayerProtocol)
    
    /// Player instance update current time
    ///
    /// - Parameters:
    ///  - player: instance of the player that conform QBPlayerProtocol protocol
    ///   - currentTime: current time
    ///   - duration: video item duration
    func playerProgressUpdate(player:QBPlayerProtocol, currentTime:TimeInterval, duration:TimeInterval)
```

###### ZPPlayerDependentPluginProtocol
```swift
	 /// Player plugin that dependant plugins will be used with
    var playerPlugin:(ZPDependablePlayerPluginProtocol & QBPlayerProtocol)? { set get }
```
###### ZPDependeblePlayerPluginProtocol
```swift
	/// Dependent plugins that avalible for this player pluging
    /// Note: Use list from `ZPVideoDependentPlugins`
    var supportedDependentPluginType:[String] { get }
```