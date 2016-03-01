Feed-Demo-Android
==================

Feed integration pack + demo app - Android

**This is a sample project demonstrating how to integrate Feed in your project.**


Now you can use this sample as a reference for your integration.


<a name="Prerequisite"/>
## Prerequisite

### Preparing your workspace:

1. Add the Feed dependencies to your project.

```
   compile ('com.applicaster:feed_android:3.7.0')
```

2.
Adding 3rd party dependencies:

```
    compile 'com.nhaarman.listviewanimations:library:2.5.2@aar'
    compile 'com.daimajia.androidanimations:library:1.0.6@aar'
    compile 'com.daimajia.easing:library:1.0.0@aar'
```

3.
Add to the build.gradle in the Project level, maven (Bintray) authentication.
If you already have a Bintray user, please send us a request to "applicaster-ltd" organization.
Otherwise, we can provide you with a Reader user and  password.

```
allprojects {
    repositories {
        jcenter()
        mavenCentral()
        maven {
            credentials{
                username 'bintray_user_name'
                password 'bintray_api_key'
            }
            url 'https://dl.bintray.com/applicaster-ltd/maven'
        }
    }
}
```

<a name="Integrate Applicaster SDK"/>
## Integrate Applicaster SDK

Use the following link:

[Integrating Applicaster SDK](http://developer.applicaster.com/docs/public/android-applicaster-sdk-integration)


<a name="Integrate Feed SDK"/>
## Integrate Feed SDK

### 1. Create the UI for Launching Feed

The button for launching the Feed (from the Action Bar / Top Navigation Bar) can be either ON or OFF, depending on whether or not the Feed feature is active and there is an episode running while using the app.
The Feed SDK is responsible for checking the Feed availability.

The assets for this button (default mode and selected mode) are loaded from the CMS, to allow the broadcaster to change them for different shows, without the need to release a new app.

* Add the following code to your layout xml:



```xml
	<com.applicaster.feed.ui.FeedButtonView
        android:id="@+id/feed_btn_container"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:visibility="gone" />
```



The app should contain default assets for cases when the loading of the assets from the CMS fails. If the Feed is disabled, the “selected” asset will be displayed, and so the button will appear as not clickable.

**Customizing the Feed Button**

In order to customize the default button, do the following:

1. Override the “unselected” drawable: feed_button.png
2. Override the “selected” drawable - feed_button_selected.png
3. Override the button selector - feed_button_selector.xml



### 2. Fonts

* In **/assets/fonts** of the project, copy all *Roboto* fonts from the sample project.


### 3. Banners

 In order to populate a bottom screen banner, create a class that implements
**BannersConfigurationI** and add your banner implementation to the *** populateFeedBanners ** method:

```
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
