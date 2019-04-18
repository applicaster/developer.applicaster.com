# Player Plugin - Android

The Android Player plugin for Zapp is based on implementing the `PlayerContract`.

In order to see a basic implementation of a player, we suggest reviewing the [Player demo project](https://github.com/applicaster/zapp-plugins-examples/tree/master/VideoPlayer/Android) as it's a good starting point for implementing a player.
Another good example to see of a current open source implementation of an Android and iOS player plugin is [Brightcove player](https://github.com/applicaster/zapp-player-plugin-brightcove).

This guide will go through the basic terms and functions that need to be implemented in order to create a player plugin.

## Playable item
All objects handed to the player conform to the Playable contract.

The Playable contract contains, among others, the following mandatory properties:
* Name
* Description
* Content video URL (Might return only after loading the object when an entitlement exists - In case of an Applicaster VOD item or Channel)
* Is the item a Live channel (`isLive`)
* Public page URL (Web page with deep linking supporting app store installation)
* Analytics parameters

The following properties are optional and available on some of the items:
* Last playback time (set/get)
* Playback duration
* Extra playable info (Depending on the datasource)
* Extension dictionary (Depending on the datasource)

## Key functions for implementation
Here are most of the key functions to be implemented for a player with some details.
Where relevant, consider inheriting the Applicaster `BasePlayer` by importing `com.applicaster.player.defaultplayer.BasePlayer`.

Note: Please refer to the `PlayerContract` in the current stable SDK in order to determine the exact methods you'll need to implement.

### Initialization methods
The player protocol includes 2 optional initialization methods:
``` java
  public void init(Playable playable, Context context)
  public void init(List<Playable> playList, Context context)
```
The methods differ with the option to pass either one item or multiple items.

### Set Plugin Configurations
The player should implement the following method in order to recieve the plugin configuration:
``` java
  public void setPluginConfigurationParams(Map params)
```

Player configuration object is a map handed in the player playback setup stage and contains some info for the player to be used at launch such as:
* Start time - Set player starting time
* End time - Set player end time (optional - it is used if wanting to display a "clip").
* Animated - control player display (if animated or not).
* Player should start muted - This should be used for inline playback only and should offer a unmute button or other unmuting functionality.
* Custom configurations - Dictionary that allows further custom configurations to be passed for the player configuration

### Fullscreen player presentation
The following function will trigger fullscreen player playback:
``` java
  public void playInFullscreen(PlayableConfiguration playableConfiguration, int requestCode, Context context)
```
This function is expected to create a new intent and use the context to start an activity using that intent.

### Inline playback methods
The following function should be use to display and remove inline players by adding the video view to the view group.
``` java
  public void attachInline(ViewGroup viewGroup)
  public void removeInline(ViewGroup viewGroup)
```

### Playback controls - Inline Playback
The following player methods should be implemented for playback controls:
``` java
  public void playInline(PlayableConfiguration configuration)
  public void stopInline()
  public void pauseInline()
  public void resumeInline()
```

Note: these playback controls do not replace the need for the player to display its own custom or out of the box controls

## Supporting login and other hooks with Screen plugin implementations
In order for a player to support various code hooks before playback, the player should implement screen plugins protocol by defining a screen that is presented in a modal way.
Please refer to the [Screen Plugins](/ui-builder/intro.md) guide for more info about screens and pre-hooks.

## Supporting ads from datasources
Some of the Applicaster datasources provide ad information in a uniform structure.
While this is optional, it should be implemented if the integrated player supports this feature.
