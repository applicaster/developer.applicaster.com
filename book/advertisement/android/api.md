# DFP Advertisement Plugin - Android
## OVERVIEW
Default Applicaster plugin for showing DFP (A.K.A. Google AdMob) advertising. At the moment it support only inline banners.
## INTERFACE IMPLEMENTATION
### Ad View
`BannerComponent` on generic app level implements `AdView` interface. It contains 3 callback methods:

    fun adLoaded(view: View)
    fun stateChanged(adViewState: AdViewState)
    fun adLoadFailed(exc: Exception)
###### adLoaded
Method `adLoaded` is called whenever presenter (for this plugin `DfpViewPresenter`) loads an Ad. As a parameter it has instance of`PublisherAdView`.
###### stateChanged
Method `stateChanged` is called every time the state is changing. For this plugin it is:
`LOADING` - whenever ad is loading
`LOADED` - whenever ad has been shown
`FAILED` - whenever ad view has failed to load
`OPENED` - whenever user open the ad
`LEFT` - whenever user send app to background
`CLOSED` - whenever ad view has been loaded
###### adLoadFailed
Method `adLoadFailed` is called whenever presenter (for this plugin `DfpViewPresenter`) failed to load an Ad. As a parameter it has instance of`Exception`.

### Ad View Presenter
`DfpViewPresenter` implements `AdViewPresenter` on plugin level. Interface should implement 3 methods:

    fun init(component: AdView)
    fun loadAd(adConfig: AdConfig)
    fun reloadAdWithSize(adSize: AdViewSize)

###### init
Method `init` is called whenever presenter is initialised. it creates an intance of PublisherAdView.
###### loadAd
Method `loadAd` is called whenever ad configuration need to be setup and add suppose to start loading its content. As a parameter it takes `AdConfig` which defines everything what Ad view needs to present content.
###### reloadAdWithSize
Method `reloadAdWithSize` is called whenever presenter should reload size of the Ad.

### Ad Plugin
`DfpPlugin` impements `AdPlugin` interface on plugin level to provide single layer of** Model-View-Presenter**. So for every single **Model**(`AdConfig`) and View(`BannerComponent`) there should exist only one **Presenter**(`DfpViewPresenter`). Class implemets 2 methods:

    fun createAd(context: Context, component: AdView): AdViewPresenter
    fun setPluginModel(Plugin plugin)

###### createAd
Method `createAd` is called whenever plugin need to crete presenter for add and initialize it
###### setPluginModel
Method `setPluginModel` is called from inherited interface `GenericPlugin` and provides configuration of the plugin - not used in this implementation.


