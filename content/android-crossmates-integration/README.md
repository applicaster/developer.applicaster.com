Applicaster Crossmates
==================

<a name="Prerequisite"/>
## Prerequisite

### Preparing your workspace:

1. Add the Feed dependencies to your project.
```
   compile ('com.applicaster:crossmates_android:3.4.0')
```

2.
Add to the build.gradle in the Project level, maven (Bintray) authentication.
If you already have a Bintray user, send us reqest to "applicaster-ltd" organization.
Otherwise, we can provide you with a Reader user and password.

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

[Integrating Applicaster SDK](https://github.com/applicaster/android-sdk-dist/blob/master/README.md)


<a name="Integrate Crossmates SDK"/>
## Integrate Crossmates SDK

### 1. Create the UI for Launching Crossmates

The button for launching the Crossmates (from the Action Bar / Top Navigation Bar) can be either ON or OFF, depending on whether or not the Crossmates feature is active.
The Crossmates SDK is responsible for checking the Crossmates availability.



* Add the following code to your layout xml:



```xml
	<com.applicaster.crossmates.ui.CrossmateButtonView
            android:id="@+id/crossmates_btn_container"
            android:layout_width="48dp"
            android:layout_height="48dp"
            android:layout_marginLeft="4dp"
            android:clickable="true" >
        </com.applicaster.crossmates.ui.CrossmateButtonView>
```



The app should contain default assets for cases when the loading of the assets from the CMS fails.

**Customizing the Crossmates Button**

In order to customize the default button, do the following:

Override crossmates_icon_no_notifications.png,crossmates_icon_no_notifications_pressed.png, crossmates_icon_notification.png ,crossmates_icon_notification_pressed.png



### 2. AndroidManifest.xml

#### Add the following permissions to the AndroidManifest file:

```xml
<uses-permission android:name="your.package.name.permission.C2D_MESSAGE" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />

<permission
    android:name="your.package.name.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />
```

#### Add the following receivers and service to the AndroidManifest file:
```xml
<receiver
    android:name="com.applicaster.identityservice.push.APGCMBroadcastReciever"
    android:permission="com.google.android.c2dm.permission.SEND" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />

        <category android:name="your.package.name" />
    </intent-filter>
</receiver>
<receiver android:name="com.applicaster.identityservice.push.OfflinePushReceiver" >
    <intent-filter>
        <action android:name="com.applicaster.intent.PUSH" />

        <category android:name="your.package.name" />
    </intent-filter>
</receiver>

<service android:name="com.applicaster.services.GCMIntentService" />
```

#### Add the following activities to the AndroidManifest file:

```xml
<activity
        android:name="com.applicaster.crossmates.activities.CrossmatesVideoPlayer"
        android:configChanges="orientation"
        android:screenOrientation="landscape"
        android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
        android:name="com.applicaster.crossmates.activities.SelectFeedActivity"
        android:configChanges="keyboardHidden|orientation|screenSize"
        android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
        android:name="com.applicaster.crossmates.activities.PrimaryInboxActivity"
        android:configChanges="orientation|screenSize"
        android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
  	    android:name="com.applicaster.crossmates.activities.FeedDetailedActivity"
   		android:configChanges="keyboardHidden|orientation|screenSize|keyboard"
   		android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
   		android:name="com.applicaster.crossmates.activities.EventsInboxActivity"
    	android:configChanges="orientation|screenSize"
    	android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
   		android:name="com.applicaster.crossmates.activities.CrossmatesFullScreenImageActivity"
  		android:configChanges="orientation"
  		android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
		android:name="com.applicaster.crossmates.activities.CrossmatesTutorialActivity"
		android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
		android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" >
</activity>

```


### 3. Fonts

* In **/assets/fonts** of the project, copy all *Roboto* fonts from the sample project.

### 4. **Banners**

####  Banner Layout

Create *crossmates_banner.xml* according to the Ad provider.

For different banner layouts for different devices, add different xmls to the relevant folder (layout, layout-xlarge, etc.).

An example can be found in the CrossmatesSample project.

####  Banner Implementation

 In order to implement banners, create a new Class which implements `CrossmatesBannersConfigurationI`.
 Override `populateCrossmatesBanners(Context context, ViewGroup bannerContainer)` and add the relevant code.

 An example can be found in **CrossmatesSample** project.

 Add to `onCreate` method of your Intro/splash activity the following code:

 ```
  //loading app specific banners configuration
   APDynamicConfiguration.setCrossmatesBannerConfiguration(new CrossmatesSampleBannersConfiguration());
```

This will set the banner configuration class as the default class and invoke the *populateBanners* method on each one of the Crossmates activities.
 Please consult Applicaster's developers for more information.