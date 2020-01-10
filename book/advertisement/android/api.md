# Advertisement Plugin - Android
## OVERVIEW

The following document describes the Applicaster API for pluggable advertisement
### BANNER FLOW

The diagrams below show the Banner and the interstitial loading flows. The blue part is called by the `SDK`, the green by `plugin`.

#### Success

![banner-success.png](./img/banner-success.png)

#### Failure

![ad-failed.png](./img/ad-failed.png)

### INTERSTITIAL FLOW

#### Success

![interstitial-success.png](./img/interstitial-success.png)

#### Failure

![ad-failed.png](./img/ad-failed.png)

## INTERFACE IMPLEMENTATION
### Ad View - implemented in the Applicaster SDK
`BannerComponent` on generic app level implements the `AdView` interface. It contains 3 callback methods:

    fun adLoaded(sender: AdViewPresenter, view: View)
    fun stateChanged(sender: AdViewPresenter, adViewState: AdViewState)
    fun adLoadFailed(sender: AdViewPresenter, exc: Exception)

###### adLoaded

Method `adLoaded` is called whenever the presenter loads an Ad. As a parameter it takes`View` and sender which is an implementation of `AdViewPresenter`.

|Parameters|Type           | Description                                                  |
|----------|---------------|--------------------------------------------------------------|
|sender    |AdViewPresenter|  AdViewPresenter implementation instance - caller            |
|view      |View           |  AdView returned by the advertisement provider                   |

###### stateChanged

|Parameters |Type           | Description                                                  |
|-----------|---------------|--------------------------------------------------------------|
|sender     |AdViewPresenter|  AdViewPresenter implementation instance - caller            |
|adViewState|AdViewState    |  Current state of the advert. States are listed below            |


The method `stateChanged` is called every time the state was changed. For this plugin we have defined states:
`Uninitialized` - whenever the ad hasn't been initialized yet,
`Loading` - whenever the ad is loading,
`Loaded` - whenever the ad has been loaded,
`Impressed` - whenever the ad has been shown on screen with at least 50% visibility,
`Failed` - whenever ad view has failed to load,
`Clicked` - whenever the user opened the ad,
`Closed` - whenever the ad view has been closed

###### adLoadFailed

The method `adLoadFailed` is called whenever the presenter failed to load an Ad. As a parameter it has an instance of`Exception`.


|Parameters|Type           | Description                                                  |
|----------|---------------|--------------------------------------------------------------|
|sender    |AdViewPresenter|  AdViewPresenter implementation instance - caller            |
|exc       |Exception      |  Reason of advertisement failure                             |

### Ad View Presenter
`AdViewPresenter` should be implemented on the plugin level. The following methods from the interface should be implemented:

    fun init(component: AdView)
    fun loadAd(adConfig: AdConfig)
    fun getSize(withContainer:Boolean): Size
    fun getProviderName(): String
    fun reloadAdWithSize(adSize: String)
    fun showInterstitial()
    fun getConfig() : AdConfig

###### init
The method `init` is called whenever the presenter is initialised. It creates an intance of Ad Provider views.
```
fun init(component: AdView)
```
|Parameters|Type           | Description                                                  |
|----------|---------------|--------------------------------------------------------------|
|component |AdView         |  Imprementation of the AdView interface on the Applicaster SDK level |


###### loadAd
The method `loadAd` is called whenever the ad configuration needs to be set and the ad is supposed to start loading its content. As a parameter it takes `AdConfig` which defines everything what Ad view needs so as to present content.

|Parameters|Type           | Description                                                  |
|----------|---------------|--------------------------------------------------------------|
|adConfig  |AdConfig       |  Configuration of a specific advert (size, type, unit id)      |

###### getSize
Method get advertisement size in dp

|Return type                                    | Description                        |
|-----------------------------------------------|------------------------------------|
|com.applicaster.plugins.advertisement.view.Size|  Return Size class specified below |

```
class Size(var width: Int, var height: Int){
    override fun toString(): String {
        return "(${width}x${height})"
    }
}
```

###### reloadAdWithSize
The method `reloadAdWithSize` is called whenever the presenter should reload the size of the Ad.

|Parameters|Type           | Description                                                  |
|----------|---------------|--------------------------------------------------------------|
|adSize    |String         |  Key name of the ad size eg. "BOX_BANNER", "SMART_BANNER"        |

###### getProviderName
Returns a human friendly name of the advertisement provider

|Return type  | Description                           |
|-------------|---------------------------------------|
|String       |  A human friendly name of the advertisement provider |

###### showInterstitial
Fire show interstitial on presenter class.

###### getConfig
The method returns the advert configuration

|Return type                                    | Description                            |
|-----------------------------------------------|----------------------------------------|
|AdConfig                                       |  Returns the AdConfig class specified below |

```
class AdConfig (var adUnitId : String,
                var component : AdView) {

    var customizedLayout = false

}
```


### Ad Plugin
The `AdPlugin` interface should be implemented at the plugin level so as to provide a single layer of ** Model-View-Presenter**. So for every single **Model**(`AdConfig`) and View there should exist a **Presenter**. The class implemets 2 methods:

    fun createAd(context: Context, component: AdView): AdViewPresenter
    fun setPluginModel(Plugin plugin)


###### createAd
The method `createAd` is called whenever the plugin needs to crete a presenter for the ad and initialize it

|Parameters|Type           | Description                                                  |
|----------|---------------|--------------------------------------------------------------|
|context   |Context        |  Context in which the advert will be presented                   |
|component |AdView         |  Imprementation of AdView interface                          |

|Return type                                    | Description                            |
|-----------------------------------------------|----------------------------------------|
|AdViewPresenter                                |  Returns an instance of AdViewPresenter    |

###### setPluginModel
The method `setPluginModel` is called from the inherited interface `GenericPlugin` and provides configuration of the plugin - not used in this implementation.


