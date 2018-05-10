# Advertisement Plugin System Architecture

### Quick Overview:

The main goal is to allow developers to develop plugins for an ad provider they want to support in their applications. Every ad plugin has the ability to support one or more ad types. Currently, available ad types are:

* Video
* Banner
* Interstitials

### Architecture:

The interface architecture of the plugin system introduces 3 interfaces (new interfaces will be added in the future).

In order to understand what each interface does, this document will briefly go into detail for all three interfaces and explain what the job is for each.

###### AdProviderContract Interface
___

```java
public interface AdProviderContract extends ApplicationLoaderHookUpI {

  enum AdType {
    BANNER,
    VIDEO,
    INTERSTITIAL
  }

  List<AdType> getSupportedAdTypes();

  Single<AdContract> loadAd(@NonNull AdType type);

  Map getPluginConfigurationParams();
}
```

This is the base interface that your plugin's starting point should implement. The `AdProviderContract` extends `ApplicationLoaderHookUpI` which exposes two methods that will run at the application start up, this should be used as the `init` of your plugin.

`getSupportedAdTypes()` should return what AdTypes does your plugin supports. It's important that you return the correct types because this will be used as a condition when loading the plugins

`loadAd()` is the place where you should load your ad asynchronously and return an RXJava observable to indicate when is the ad loading is completed and we get the ad object, which is this case should be an instance of `AdContract`

###### AdContract Interface
___

```java
public interface AdContract {

  enum AdState {
    LOADING,
    LOADED,
    PLAYING,
    COMPLETED,
    ERROR
  }

  interface AdStateCallback {
  	void onStateChanged(AdState state);
  }

  void showAd(@Nullable View view, @Nullable AdStateCallback callback);
}
```

This interface is mainly used as a base interface for other interfaces like the `VideoAdContract` and will include all common functionality between all ad types implementation.

###### VideoAdContract Interface
___

```java
public interface VideoAdContract extends AdContract {

	void setPlayable(@NonNull Playable playable);
}
```

This interface will be our basic implementation of a video ad contract type, which the only functionality it adds over the base interface is setting the `Playable` so we can retrieve it if needed.

### SDK Changes:

Currently, only video ads are implemented in our SDK. Even though the ad plugin system supports other ad types.

The logic has be added to our `DefaultPlayerWrapper` class. We check if we have a relevant plugin configured in our application then we use it to display ads, else we use default behavior.

All the logic for the ad system can found in a class called `AdManager`


### Notes:

Try not to pass an Activity to the plugin. If you must, make sure you manage the reference so it will not be leaked. Application context can be used sometimes instead of an Activity context.
