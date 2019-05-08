# Advertisement Tutorial: ZappAdvertisementPluginExample-iOS

The [ZappAdvertisementPluginExample](https://github.com/applicaster/zapp-plugins-examples/tree/master/Advertisement/iOS) is an example project for creating an advertisement plugin for the Applicaster Zapp Platform. You can use this example project as a reference for how to build your own advertisement plugin.

If you are not familiar with Zapp please visit [our website](http://applicaster.com/?page=product) for more details.

The full [Zapp](http://zapp.applicaster.com) plugins documentation is available [here](/getting-started/zapp-plugins.md).

When you are starting a new iOS plugin our recommendation is to install our [Xcode templates for Applicaster plugins](https://github.com/applicaster/zapp-plugins-ios-templates). The templates will enable you to chose the plugin type in the Xcode "new project" screen. After selecting the plugin type, you will need to provide few general details on the plugin. Then, it will generate a new plugin project that includes the deployment files, like podspec and the plugin_manifest.json, and the plugin class itself including the relevant Zapp protocol.

For more info about Initial iOS Plugin Setup, [Click Here](/dev-env/iOS.md).

## Getting Started
Clone this project `$ git clone https://github.com/applicaster/zapp-plugins-examples.git`.
and navigate to Advertisement -> iOS
Run `$ pod update` in order to set the workspace.

Open `ZappAdvertisementPluginExample-iOS.xcworkspace` with Xcode 10.0.

## Implementation
The Zapp advertisement plugin API enables developers to integrate different advertisement providers to the the Zapp Platform.

Advertisement Plugin is using the MVP pattern, so your plugin needs to implement the interface for the presenter (ZPAdPresenterProtocol) and it will hold a reference to the view (ZPAdViewProtocol) whose implementation is a real View used in Applicaster SDK.

Also your plugin will need to implement ZPAdPluginProtocol, the main entry point that Applicaster SDK will use and it will be the constructor of the presenter's instances, as we will need to have one presenter per banner that we want to show.

In order to access the `ZPAdPluginProtocol` and the `ZPAdPresenterProtocol`, you will need to import `ZappPlugins` framework:
``` swift
import ZappPlugins
```

### ZPAdPluginProtocol

``` swift
public class MyAdvertisementPlugin: NSObject, ZPAdPluginProtocol {...}
```

First of all we need to implement a variable and 2 constructors that are common to any plugin in our SDK:

``` swift
	//Dictionary containing the Plugin settings as defined in the plugin manifest
	public let configurationJSON: NSDictionary?

    required override public init() {
        self.configurationJSON = nil
        super.init()
    }

    required public init(configurationJSON: NSDictionary?){
        self.configurationJSON = configurationJSON
        super.init()
    }
```


###### NOTE: Using the Zapp Plugin Configuration JSON

When creating a plugin in Zapp we can create custom configuration fields. 
This enables the Zapp user to fill in relevant details for the specific plugin. More details can found in the [Zapp Plugin Manifest Format](/zappifest/plugins-manifest-format.md).

You can use that on the plugin level like this:

``` swift
    guard let customParam = configurationJSON?["customParam"] as? String else {
        print("Failed to create customParam from the plugin configuration JSON.")
        return nil
    }
```

After we will need to implement some methods specific for advertisement plugins.
The first will be the creation of our presenter:

``` swift
    public func createAdPresenter(adView:ZPAdViewProtocol, parentVC:UIViewController) -> ZPAdPresenterProtocol {
        return MyAdvertisementPresenter(adView: adView, parentVC: parentVC)
    }
```

Here we are passing as parameters the view protocol that Applicaster SDK will implement and that our presenter is going to use to call some methods, and the parent view controller that we will need to use to present the interstitial or in case we need access to some of their parameters.

After we need to implement a method that is used by our analytics system to know the name of the plugin

``` swift
    public func providerName() -> String {
        return "MyAdvertisementPlugin"
    }
```

Lastly we need a method to know the size for inline banners.

There are 3 types of banners: **screen banners** (fixed banners that always appear at the bottom of the screen), **interstitial** (banners that pop up, usually fullscreen, when you open a new screen) and **inline banners** (banners that mix with the content of a screen, usually between cells).
Inline banners can have different sizes, each different size is represented by a string. This string can have any value and your plugin must define those values, but usually there are 3 that are common to any kind of plugin provider, these are: **BANNER** (standar size banners), **BOX_BANNER** (squared size banners) and **SMART_BANNER** (usually occupying the full width of the device and a fixed height).

Here is our implementation (as we will need to use as well in the presenter we extracted the code to its own class).

``` swift
    public func size(forInlineBannerSize inlineBannerSize: String) -> CGSize {
        return AdSizeMapper.size(forAdType: .inlineBanner, inlineBannerSize: inlineBannerSize)
    }
```

``` swift
public class AdSizeMapper {
    static func size(forAdType adType: ZPAdType, inlineBannerSize: String = "") -> CGSize {
        var size = CGSize.zero

        switch adType {
        case .inlineBanner:
            if inlineBannerSize == "BANNER" {
                size = CGSize(width: 320, height: 50)
            }else if inlineBannerSize == "BOX_BANNER" {
                size = CGSize(width: 320, height: 150)
            }else if inlineBannerSize == "SMART_BANNER" {
                size = CGSize(width: UIScreen.main.bounds.width, height: 50)
            }

        case .screenBanner:
            size = CGSize(width: 320, height: 50)

        default:
            size = CGSize(width: 320, height: 50)
        }

        return size
    }
}
```

### ZPAdPresenterProtocol

``` swift
public class MyAdvertisementPresenter: NSObject, ZPAdPresenterProtocol {...}
```

We will need some variables. The **parentVC** and **adView** we explained before, we store them to be able to call them in other parts of our code. **adConfig** is a model that hold the different parameters we need to configure our ad (the type of ad, its size, and the unit id). We also need a variable to hold the view controller for our **interstitial** banner.

``` swift
	var parentVC: UIViewController
    var adView: ZPAdViewProtocol
    var adConfig :ZPAdConfig?
    var interstitial: UIViewController?
```

After we will implement the methods of ZPAdPresenterProtocol.

We need a constructor with the **adView** and **parentVC** as parameters:

``` swift
required public init(adView: ZPAdViewProtocol, parentVC: UIViewController) {
        self.parentVC = parentVC
        self.adView = adView
        super.init()
    }
```

After we need a method to load our banner. We need to detect the type of banner so we can create the correct one. Once created we need to call our **adView** with the view created (in case of interstitial we don't need to pass any view as we are going to present it ourself).

``` swift
public func load(adConfig: ZPAdConfig) {
        self.adConfig = adConfig
        adView.stateChanged(adViewState: .loading )

        if adConfig.adType == .interstitial {
            interstitial = UIViewController()
            interstitial?.view.backgroundColor = UIColor.yellow
            adView.adLoaded(view: nil)
        }else if adConfig.adType == .screenBanner {
            let view = UIView(frame: CGRect(x: 0, y: 0, width: getSize().width, height: getSize().height))
            view.backgroundColor = UIColor.red
            adView.adLoaded(view: view)
        }else if adConfig.adType == .inlineBanner {
            let view = UIView(frame: CGRect(x: 0, y: 0, width: getSize().width, height: getSize().height))
            view.backgroundColor = UIColor.green
            adView.adLoaded(view: view)
        }
        adView.stateChanged(adViewState:.loaded)
    }
```

###### NOTE: Notifying ad events with stateChanged

```
We need to notify our adView when there is a change in the state of the ad, this can be: loading (the ad was requested to load), failed (the ad has failed to being loaded), loaded (the ad has being loaded with success), impressed (the add has been shown on screen with atleast 50% visibility), clicked (the add has been clicked) and closed (the interstitial ad is closed).
```

Similar to what we created for the **ZPAdPluginProtocol**, we need a method to know the size of the different types of banners. We are relying in our **AdSizeMapper** class.

``` swift
public func getSize() -> CGSize {
        if let adType = adConfig?.adType, let inlineBannerSize = adConfig?.inlineBannerSize {
            return AdSizeMapper.size(forAdType: adType, inlineBannerSize: inlineBannerSize)
        }
        return CGSize.zero
    }
```

To finish with our plugin, we need a method to present our interstitial ad:

``` swift
public func showInterstitial() {
        guard let interstitial = interstitial else {
            return
        }
        parentVC.present(interstitial, animated: true) {
            interstitial.dismiss(animated: true, completion: nil)
        }
        adView.stateChanged(adViewState:.impressed)
    }
```

## How to publish your plugin

Once you have implemented your plugin, you are ready to publish it.
You can read more about publishing [here](/getting-started/deploy-and-submit.md).


## Custom sizes

As we mentioned earlier:
```
Inline banners can have different sizes, each different size is represented by a string. This string can have any value and your plugin must define those values, but usually there are 3 that are common to any kind of plugin provider, these are: **BANNER** (standar size banners), **BOX_BANNER** (squared size banners) and **SMART_BANNER** (usually occupying the full width of the device and a fixed height).
```
If your plugin wants different sizes that the standard defined, you need to declared them in the manifest using the **exporting attributes functionality** to override these 3 values with your desired ones. 

For the full documentation, [Click Here](/zappifest/plugins-manifest-format.md)

This is an example of what you should add to the manifest (here we add 2 new sizes, apart of the 3 standard ones):
```
"export": {
		"allowed_list": [{
			"identifier": "banner",
			"group": {
				"label": "Ads",
				"folded": false
			},
			"section": "styles",
			"allowed_fields": [{
				"section": "styles",
				"key": "banner_type",
				"min_zapp_sdk": {
					"ios": "6.0.0",
					"android": "7.0.0"
				}
			}]
		}, {
			"identifier": "list",
			"group": {
				"label": "Ads",
				"folded": false
			},
			"section": "advertising",
			"allowed_fields": [{
				"section": "advertising",
				"key": "banner_type",
				"min_zapp_sdk": {
					"ios": "6.0.0",
					"android": "7.0.0"
				}
			}]
		}, {
			"identifier": "grid",
			"group": {
				"label": "Ads",
				"folded": false
			},
			"section": "advertising",
			"allowed_fields": [{
				"section": "advertising",
				"key": "banner_type",
				"min_zapp_sdk": {
					"ios": "6.0.0",
					"android": "7.0.0"
				}
			}]
		}]
	},
	"styles": {
		"fields": [{
			"key": "banner_type",
			"label_tooltip": "SOM supports Smart Banners, Standard Banners (320x50 for smartphone and 728x90 for tablet), Box Banners (300x250, often referred to as \"medium rectangles\"), Billboard banners (320x150) and Sponsor banners (320x51). Please select the size banner you'd like to use",
			"type": "select",
			"options": [{
					"label": "STANDARD BANNER",
					"value": "BANNER"
				},
				{
					"label": "SMART BANNER",
					"value": "SMART_BANNER"
				},
				{
					"label": "BOX BANNER",
					"value": "BOX_BANNER"
				},
				{
					"label": "BILLBOARD BANNER",
					"value": "BILLBOARD_BANNER"
				},
				{
					"label": "SPONSOR",
					"value": "SPONSOR"
				}
			]
		}]
	},
	"advertising": {
		"fields": [{
			"key": "banner_type",
			"label_tooltip": "SOM supports Smart Banners, Standard Banners (320x50 for smartphone and 728x90 for tablet), Box Banners (300x250, often referred to as \"medium rectangles\") Billboard banners (320x150) and Sponsor banners (320x51). Please select the size banner you'd like to use",
			"type": "select",
			"options": [{
					"label": "STANDARD BANNER",
					"value": "BANNER"
				},
				{
					"label": "SMART BANNER",
					"value": "SMART_BANNER"
				},
				{
					"label": "BOX BANNER",
					"value": "BOX_BANNER"
				},
				{
					"label": "BILLBOARD BANNER",
					"value": "BILLBOARD_BANNER"
				},
				{
					"label": "SPONSOR",
					"value": "SPONSOR"
				}
			]
		}]
	}
```