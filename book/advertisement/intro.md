# Introduction

Applicaster offers an array of advertising functionality for customers to use for monetization.
Video ads are typically handled by the player plugin, and for the Applicaster Player, video ads are currently part of core SDK and coupled to GAM (Google Ad Manager). However, we’ve made display ads (banners and interstitials) fully pluggable so that developers can build advertising plugins which can take advantage of this functionality.
This means for customers who prefer to work with options other than GAM, plugins can be built and supported and these can be used to deliver display ads within the apps. The functionality provided includes:

* Inline Banners

![inline_baners1.png](./img/inline_baners1.png) ![inline-banners2.png](./img/inline-banners2.png)

* Fixed (aka “Sticky”) Banners
  * Screen-level
  * Set a default for the app-level

![screen_banner.png](./img/screen_banner.png)

* Interstitials
  * Screen-level
  * Set a default for the app-level

![interstitial_banner.png](./img/interstitial_banner.png)

The developer documentation here outlines how to build and maintain advertising plugins, and how to enable these plugins to utilize this functionality. For both platforms, we provide a tutorial with an example as well API Documentation

## Documentation:

* [Android](advertisement/android/android.md)
  * [Tutorial](/advertisement/android/tutorial.md)
  * [API](/advertisement/android/api.md)
* [iOS](advertisement/ios/android.md)
  * [Tutorial](/advertisement/ios/tutorial.md)
  * [API](/advertisement/ios/api.md)
