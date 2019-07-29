## TvOS Video Player Depandant plugins

### Introduction
This Document will explain general structure how Video Player Depandant plugin are working on TvOS with QuickBrick

#### Supported Apple TV variant:
Apple TV 4th Generation or later using tvOS 11.0 or higher

#### Available from ZappSDK 10.1.1 and above

#### Required Applicaster Frameworks:

* ZappPlugins

### Content
* <a href="#general">General</a>
* <a href="#api">API</a>
* [How To Create New Plugin?](/quick-brick/tvOS/Plugins/Video/VideoPluginsHowCreate.md)

### Plugins

* [Google Ineractive media Ads](/quick-brick/tvOS/Plugins/Video/DefaultPlayer/DefaultPlayer.md)

### Dependant Player types
* `advertismentPlaying` - Video ads plugins type

<a name="general" />

### General

Video Player Depandant plugins, plugin type that require player instance to the invocation. Example of such plugins can be GoogleIMA or Analytics for the player.

To implement type of such plugins need implemented on player plugin side two protocols:
`QBPlayerProtocol` - This protocol define what var and what func can be retrieved from the player
`ZPDependablePlayerPluginProtocol` - Implementation of this protocol will defined what types of dependant plugin player will support

On Player dependant plugins needed to be implement two protocols
`ZPPlayerDependantPluginProtocol` - This protocol defines that plugin can get player instance to retieve data
`QBPlayerObserverProtocol` - By this protocol player will send event to plugin that dependant by player

Between Player plugin and dependant plugins is `ZPPlayerDependantPluginsManager:QBPlayerObserverProtocol`. It is create dependant plugins when player intialized and remove them when player finished to work. Also it resends events to plugins that conform protocol `QBPlayerObserverProtocol`

Behind the scenes the logic is next:
1. Player send to `ZPPlayerDependantPluginsManager` its life cycles events on method `playerDidCreate:`
Manager will create instances of dependant plugins if player support current plugins types defined in `ZPDependablePlayerPluginProtocol`
2. Manager will send events to dependant plugins.
3. When Player will finish work and send event `playerDidFinishPlayItem:` manager will wait completion from plugins in case something needed to do before next video will start or close player. Can be good timing for presentation postroll ad as example.
4. When Player will call `playerDidDismiss:`  Manager will release all dependants  plugins availible for current playter.

<a name="protocols" />
#### Protocols

###### QBPlayerProtocol

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
    
###### QBPlayerObserverProtocol

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

###### ZPPlayerDependantPluginProtocol

	 /// Player plugin that dependant plugins will be used with
    var playerPlugin:(ZPDependablePlayerPluginProtocol & QBPlayerProtocol)? { set get }

###### ZPDependablePlayerPluginProtocol

	/// Dependant plugins that avalible for this player pluging
    /// Note: Use list from `ZPVideoDependantPlugins`
    var supportedDependantPluginType:[String] { get }