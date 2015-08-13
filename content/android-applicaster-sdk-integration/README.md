# Applicaster SDK

<a name="Integrate Applicaster SDK"/>
## Integrate Applicaster SDK

### 1. Preparing your Application class:

* The following behaviour should be included in the Application class or simply extend *com.applicaster.app.CustomApplication* class.


```java
public class YourApplication extends Application{
	
	@Override
	public void onCreate() {
		super.onCreate();
		CustomApplication.onCreateBehaviour(this);
	}
	
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		CustomApplication.onConfigurationChangedBehaviour(this, newConfig);
		super.onConfigurationChanged(newConfig);
	}

}

```

### 2. Intro/splash Activity:

* The following behaviour should be included in the **Intro/splash** Activity class or simply extend *com.applicaster.activities.base.AppIntroActivity* class.

```java
 @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // loading Applicaster's application data
        APAccountLoader applicasterAccountLoader = new APAccountLoader(new ApplicasterAccountLoaderListener(this),
        		AppData.getProperty(APProperties.ACCOUNT_ID_KEY));
        applicasterAccountLoader.loadBean();
    }


    @Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		
		// handle returning from  Feed screen launched by Url Scheme (use if implementing Feed)
		if ( requestCode == UrlSchemeUtil.FEED_REQUEST_CODE ){
			onApplicasterIntroFinished();
		}
       // handle returning from  Crossmates screen launched by Url Scheme(use if implementing Crossmates)
		if ( requestCode == UrlSchemeUtil.CROSSMATES_REQUEST_CODE ){
			onApplicasterIntroFinished();
		} 
	}

    /**
     * This method is called when Applicaster initializing flow has finished. 
     * Usually should launch the main activity here
     */
	private void onApplicasterIntroFinished() {
		Intent intent = new Intent(this, Main.class);
		startActivity(intent);
		finish();
		
	}
	
	/**
	 * 
	 *  AsyncTask listener of Applicaster initial data loading
	 *
	 */
	public class ApplicasterAccountLoaderListener extends APAccountLoaderListener {
		
		private Activity activity;

		public ApplicasterAccountLoaderListener(Activity activity) {
			super(activity);
			this.activity = activity;
		}
		
		@Override
		protected void handleApplicationDataLoaded(APAccount account) {
			AppData.persistAppData(activity);
			
			// handling launching Crossmates/Feed from web links, etc.
			if(!UrlSchemeUtil.playItemForResult(activity, getIntent())){
				onApplicasterIntroFinished();
			}
		}

		@Override
		protected void handleApplicationDataLoadFailed(Exception e) {
			// if failed to load Applicaster data continue with application flow
			onApplicasterIntroFinished();
		}
	}


```


### 2. AndroidManifest.xml

#### Add the following activities to the AndroidManifest file:

```xml
<activity
            android:name="com.applicaster.activities.APFacebookAuthoriziation"
            android:configChanges="orientation|screenSize"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" >              </activity>
<activity
            android:name="com.applicaster.activities.SyncButtonActivity"
            android:configChanges="orientation"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" >
</activity>
<activity
            android:name="com.applicaster.activities.URLLauncherActivity"
            android:configChanges="orientation"
            android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
            android:name="com.applicaster.activities.OrientedWebView"
            android:configChanges="orientation"
            android:screenOrientation="landscape"
            android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>
<activity
            android:name="com.applicaster.activities.TakeoverEventActivity"
            android:configChanges="orientation"
            android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
</activity>

```

#### add the following facebook activity:
```xml
<activity
            android:name="com.facebook.LoginActivity"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" >
</activity>
```


#### Add the following intent filter to the app launcher activity:

```xml
 <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data android:scheme="@string/scheme_url_prefix" />
 </intent-filter>
```

#### Add permissions:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />

```

### 3. Dependencies

* *facebook sdk 3.20*


### 4. *applicaster.properties* 

 Add *applicaster.properties* file to the **/assets** folder.
 
 Please consult Applicaster's developers for more information.

### 5. Strings

add to your *strings.xml*


`<string name="scheme_url_prefix">ask_Applicaster_developers_for_this_string</string>`

`<string name="fb_app_id">add_your_facebook_app_id</string>`

`<string name="app_name">your_app_name</string>`

`<string name="facebook_share_caption">Via your_app_name</string>`



