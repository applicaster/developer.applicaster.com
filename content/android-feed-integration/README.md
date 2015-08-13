# Android Feed Integration

## Prerequisite

### Preparing your workspace:

`git clone https://github.com/applicaster/feed-android-dist.git`

`cd feed-android-dist`

`git submodule update --init --recursive `.

In your IDE,add the following projects to your workspace:

1. ***feed-sdk-dist*** project.
2. ***android-sdk-dist*** project, and set the it as a library project of ***feed-sdk-dist***.
3. ***ViewPagerIndicatorLibrary*** project, and set it as a library project of the  ***feed-sdk-dist***.

**Set the ** ***feed-sdk-dist***  **as a library project of your project.**

<a name="Integrate Applicaster SDK"/>
## Integrate Applicaster SDK

Use the following link:

[Integrating Applicaster SDK](https://github.com/applicaster/android-sdk-dist/blob/master/README.md)


<a name="Integrate Feed SDK"/>
## Integrate Feed SDK

### 1. Create the UI for launching Feed.

The button for launching the Feed (from the Action Bar / Top Navigation Bar) can be either ON or OFF, depending on whether or not the Feed feature is active and there is an episode running while using the app.
The Feed SDK is responsible for checking the Feed availability.

The assets for this button (default mode and selected mode) are loaded from the CMS, to allow the broadcaster to change them for different shows, without the need to release a new app. 

* Add the following code to you layout xml:



```xml
	<com.applicaster.feed.ui.FeedButtonView
        android:id="@+id/feed_btn_container"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:visibility="gone" />
```



The app should contain default assets for cases when the loading of the assets from the CMS fail. If the Feed is disabled, the “selected” asset will be displayed, and so the button will appear as not clickable.

**Customizing the Feed Button**

In order to customize the default button, do the following:

1. Override the “unselected” drawable: feed_button.png
2. Override the “selected” drawable - feed_button_selected.png
3. Override the button selector - feed_button_selector.xml




### 2. AndroidManifest.xml

#### Add the following activities to the AndroidManifest file:

```xml
<activity
	android:name="com.applicaster.activities.CombinedFeedActivity"
	android:screenOrientation="portrait"
	android:configChanges="orientation"
    android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>	

<activity
    android:name="com.applicaster.activities.FeedItemActivity"
    android:screenOrientation="portrait"
	android:configChanges="orientation"
    android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>

<activity
    android:name="com.applicaster.activities.PostOnFeedActivity"
    android:screenOrientation="portrait"
 	android:configChanges="orientation"
    android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen"
    android:windowSoftInputMode="stateVisible|adjustPan"
>
</activity>

```


### 3. Fonts 

* In **/assets/fonts** of the project copy all *Roboto* fonts from the sample project


### 4. Banners 

 In order to populate a bottom screen banner, create a class that implements 
**BannersConfigurationI** and add your banner implementation to the *** populateFeedBanners ** method:

```java
public class BannerConfiguration implements BannersConfigurationI{
	
	@Override
    public void populateCrossmatesBanners(Context context, ViewGroup viewGroup) {

    }

    @Override
    public void populateFeedBanners(Context context, ViewGroup bannerContainer, String adId) {

        APBannerViewController bannerController = new APBannerViewController(context, bannerContainer, null, null, adId, "%@");
        bannerController.displayBanners();
    }

    @Override
    public void populateGenericAppMainActivityBanners(Context context, ViewGroup viewGroup) {

    }

    @Override
    public void populateGenericAppShowActivityBanners(Context context, ViewGroup viewGroup, String s) {

    }

}

```


 
 Please consult Applicaster's developers for more information.





