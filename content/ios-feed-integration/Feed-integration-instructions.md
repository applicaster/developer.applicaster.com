# iOS Feed Integration

This document serves an integration guide for Applicaster iOS SDK into a new app
and adding Feed activity button. This guide accompanies an iOS project that implements
this integration and can be used as a reference implementation.

* Applicaster iOS SDK Requires Xcode 6.3.2, deployment target 7.0 or above and has 64 bit support (Valid Architectures - armv7, arm64).

***

The provided Applicaster SDK requires the following 3rd party sdks in order to compile:
* Facebook iOS SDK - 3.20 
* Flurry iOS SDK 5.4.0
* Google Analytics V1 - 3.10
* Google Ads library 6.12.2
* Amazon AWS - 1.7.1 (Partial)
* AFNetworking - 2.4.1
* FHSTwitterEngine - 1.8 - Modified to support 64 bit - Provided in this repository
* HockeySDK - 3.6
* TTTAttributedLabel - 1.13.1
* google-cast-sdk - 2.5.2

**Note:** The libraries must be identical to the Applicaster version.
Also attached is the relevant Podfile in order to solve all dependencies issue with one command.
Alternatively - you can use some of the libraries from different sources and use pods / add the binary files for the rest.

Applicaster SDK Also uses The following 3rd party libraries:
* Cocoa Lumberjack 1.9.2
* MPNotificationView 1.1 + private bugfixes
* Formatter Kit 1.7.2
* Zipkit 1.0.2
* SHMKit (commit 7a964057e218d1582a3c91e268755cdd9538bfcb)
* CSURITemplate Kit 0.4
* Appoxee 3.0
* FreeWheel
* ePlanning

If these libraries cause duplicated symbols in your code - please notify us and we will also move it to a Pod.
Alternatively you can use your headers or the ones from the OpenSourceHeaders inside the Headers library and get the implementation from the Applicaster library and remove them from your respective project.

***

**Applicaster SDK Integration guide:**
***
1. Add Applicaster static repository as a submodule:
   `git submodule add https://github.com/applicaster/Applicaster-iOS-SDK-Lite-Static.git`
2. Create a new Xcode project , Add the next to your other linker flags: `-ObjC -lz -lxml2 -lsqlite3 -lresolv -liconv` , Valid architectures + architectures are armv7 , arm64 and deployment target 7.0. Project identifier must be confirmed with Applicaster as it is enforced by our server.
3. Add the .a and Resources directory into the project (As reference if using submodules) 
4. Copy the Podfile from Applicaster-iOS-SDK-Lite-Static submodule directory to the Root directory of your project
5. Run `pod install` - In the pod targets - change the Valid architectures + architectures to armv7, arm64.
6. Add the directory called "Third Party" to your project.
7. Add the following frameworks to the link with binary libraries phase:
	* Relevant applicaster static library. (Please use debug library during development in order to enable using staging environment , otherwise use the Release binary)
	* libiconv.dylib
	* libresolv.dylib
	* AdSupport.framework
	* Accounts.framework
	* AudioToolbox.framework
	* AVFoundation.framework
	* CoreTelephony.framework
	* CoreMotion.framework
	* CoreMedia.framework
	* CoreLocation.framework
	* CoreData.framework
	* CoreText.framework
	* CFNetwork.framework
	* iAd.framework
	* Twitter.framework
	* QuartzCore.framework
	* MobileCoreServices.framework
	* MessageUI.framework
	* StoreKit.framework
	* SystemConfiguration.framework
	* Social.framework
	* libxml2.dylib
	* libsqlite3.0.dylib
	* libz.dylib
	* Accelerate.framework
	* MediaPlayer.framework
	* AssetLibrary.framework
	* AddressBook.framwork
	* MessageUI.framework
	* QuickLook.framework


8. Add the following Library search path - Applicaster-iOS-SDK-Lite-Static/ (recursive), $(inherited)
9. Add the following Header Search Path - Applicaster-iOS-SDK-Lite-Static/Headers (recursive), $(inherited)
10. In order to ease access to Applicaster models you can add the following headers to the PCH file in the project:

    ```objective-c
            #import <Applicaster/APApplicaster.h>
            #import <ApplicasterCore/ApplicasterCore.h>

    ```
11. Try to compile - If compilation succeeds - this means required frameworks and path configurations are successful and there are no duplicated symbols.
	In case there are duplicated symbols found during the compilation time - Please consider using the Lite version and adjusting the attached CocoaPods script according to the libraries you use.
	Do note - the versions of the other frameworks must be the same as the CocoaPods spec file - As Applicaster Lite SDK will use those libraries from your code.

12. Add the following script to the end of the target build phase and make sure you have a Settings Bundle in the project:
 `sh $CODESIGNING_FOLDER_PATH/SettingsScript.sh` (This will edit the settings bundle we use to display proper keys in debug / distribution and enable the use of QA env. during development - All keys are removed except version for release configuration. This is Appstore safe)
  Another alternative is running it from the resources directory itself:
    ```objective-c
        sh "$CODESIGNING_FOLDER_PATH/SettingsScript.sh"

    ```
13. Code entry points in the Appdelegate:
	* In Appdelegate header file
	 	* Add implementation for APApplicasterControllerDelegate:

        ```objective-c
        <UIApplicationDelegate, APApplicasterControllerDelegate>

        ```

	  * Add the following properties:

        ```objective-c
        @property (nonatomic, strong) NSURL *appLaunchURL;
        @property (nonatomic, strong) NSDictionary *remoteLaunchInfo;
        @property (nonatomic, strong) NSString *sourceApplication;

        ```

		These properties will help forwarding launch information and recieved URL scheme after Applicaster Controller does it's initial loading.

	* In the Appdelegate implementation file:
		* In the application:didFinishLaunchingWithOptions: function add the following:

```objective-c
    [APApplicasterController initSharedInstanceWithPListSettingsWithSecretKey:<Provided by Applicaster>];

    [[APApplicasterController sharedInstance] setDelegate:self];
    [[APApplicasterController sharedInstance] setRootViewController:self.viewController];
    [[APApplicasterController sharedInstance] load];
    self.appLaunchURL = [launchOptions objectForKey:UIApplicationLaunchOptionsURLKey];
    self.remoteLaunchInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    self.sourceApplication = [launchOptions objectForKey:UIApplicationLaunchOptionsSourceApplicationKey];
```

   * In case no deep linking is done by the app add the following to the app delegate:

```objective-c
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
    // If the launch URL handling is being delayed, return YES.
    if (!self.appLaunchURL) {
        // The return can be used to check if Applicaster handled the URL scheme and add additional implementation
        return [[APApplicasterController sharedInstance] application:application openURL:url sourceApplication:self.sourceApplication annotation:annotation];
    } else {
        // Or other URL scheme implementation
        return YES;
    }
}

```

  * In case deep linking is used inside the app - you can use the previous function. We will return NO if we haven't handled the URL scheme and enable to further check if handling is needed. Do note - we internally also check with Facebook iOS SDK if they are handling the URL scheme.

	* In the application:didRegisterForRemoteNotificationsWithDeviceToken: Add the following:

```objective-c
	[[APApplicasterController sharedInstance].notificationManager registerToken:deviceToken];

```

   * In the application:didRecieveRemoteNotification: Add the following:

```objective-c
	[[APApplicasterController sharedInstance].notificationManager appDidReceiveRemoteNotification:userInfo
																			  launchedApplication:(application.applicationState == UIApplicationStateInactive)];

```

* in the application:didRecieveLocalNotification: add the following:

```objective-c
        [[APApplicasterController sharedInstance].notificationManager  appDidReceiveLocalNotification:notification

                                                                              launchedApplication:(application.applicationState == UIApplicationStateInactive)];
```

   * Add the following basic ApplicasterControllerDelegat implementation:

```objective-c
- (void)applicaster:(APApplicasterController *)applicaster loadedWithAccountID:(NSString *)accountID
{    
    if (self.appLaunchURL) {
        [[APApplicasterController sharedInstance] application:[UIApplication sharedApplication] openURL:self.appLaunchURL sourceApplication:self.sourceApplication annotation:nil];
        self.appLaunchURL = nil;
    } else {
        if (self.remoteLaunchInfo != nil)
        {
            [applicaster.notificationManager appDidReceiveRemoteNotification:self.remoteLaunchInfo launchedApplication:YES];
            self.remoteLaunchInfo = nil;
        }
    }
}

- (void)applicaster:(APApplicasterController *)applicaster withAccountID:(NSString *)accountID didFailLoadWithError:(NSError *)error {
	// Present a loading error in the loading view controller
}
```

**Feed 2 Integration guide**
***
1. Add the following code to applicaster:loadedWithAccountID: add the following code:
    ```objective-c
     [[APTimelinesManager sharedManager] setAccountID:<Timeline account provided by Applicaster>];

    ```
2. In the class that will contain the Feed button - Add the following (In the view did load in case of a View Controller , or AwakeFromNib in case of a view):

    ```objective-c
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(timelineStatusChanged:)
                                                     name:kTimeFeedTimeLineStatusChanged
                                                   object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(episodeStatusChanged:)
                                                     name:kFeedEpisodeStatusChanged
                                                   object:nil];
	```
3. Here is a basic implementation that should be added in the class for updating the buttons according to the notifications (The feed button should be initially hidden):
 ```objective-c
  - (void)timelineStatusChanged:(NSNotification *)notification
  {
           if (!notification.userInfo || ![notification.userInfo objectForKey:kIsTimelineAvailableKey])
           {
                 self.feedButton.hidden = YES;
           }
           else
           {
                self.feedButton.hidden = NO;
           }
  }

  - (void)episodeStatusChanged:(NSNotification *)notification
  {
           if (notification.userInfo && [notification.userInfo objectForKey:kIsEpisodeAvailableKey])
          {
              self.feedButton.enabled = YES;
          }
          else 
          {
             self.feedButton.enabled = NO;
         }
  }

 ```
This implementation enables you to have a button visible only when the feature is live from the Applicaster Stars CMS and only enable the button when an episode is currently available.

4. Add the following implementation to the button action to open the Feed:
	
 ```objective-c
- (IBAction)feedButtonTapped:(id)sender
 {
       [[APTimelinesManager sharedManager] presentFirstLiveTimelineFeedWithCompletionHandler:^(BOOL success) {
        
       }];
 }

 ```
5. Add the libAPFeed2_Debug.a or libAPFeed2_Debug.a to link as a static library with the project. You can also do this by using other linker flags - `-lAPFeed2_Debug` for debug and `-lAPFeed2_Release` for release

**Using multiple timelines**
***
Applicaster Feed supports multiple timelines (feeds), in order to handle them a small change should be done as both the launch command and the notification for the feed status change should be checked for the relevant timeline.

In order to launch a specific timeline:
 ```objective-c
- (IBAction)feedButtonTapped:(id)sender
 {
       [[APTimelinesManager sharedManager] presentFeedWithTimelineID:<Timeline id> completionHandler:^(BOOL success) {
        
    }];
 }

 ```

The notification handling should also change in the following way:
```objective-c
- (void)timelineStatusChanged:(NSNotification *)notification
{
    if ([[notification.userInfo objectForKey:@"kTimelineID"]  isEqual: <correct timeline id>])
    {
        if (!notification.userInfo || ![notification.userInfo objectForKey:kIsTimelineAvailableKey]) {
            self.feedButton.hidden = YES;
        }
        else
        {
            self.feedButton.hidden = NO;
        }
    }
}

- (void)episodeStatusChanged:(NSNotification *)notification
{
    if ([[notification.userInfo objectForKey:@"kTimelineID"]  isEqual: <correct timeline id>])
    {
        if (notification.userInfo && [notification.userInfo objectForKey:kIsEpisodeAvailableKey]) {
            self.feedButton.enabled = YES;
        }
        else {
            self.feedButton.enabled = NO;
        }
    }
}

```

**Pulling Episodes for a specific timeline**
***
Applicaster Feed allows you to pull all the available episodes for a specific timeline. You can use this ability only for retrieving episodes from a timeline checked as "Live" in Applicaster's management system.
One possible usage of this ability is creating a custom page and promote live/future episodes, for example.

The next example shows you how to retrieve all the live and future episodes for a specific timeline. In this case it only pulls the episodes for the first timeline if exists:

```objective-c
#import <Applicaster/APFeedTimeline.h>
#import <Applicaster/APFeedEpisode.h>

- (void)timelineStatusChanged:(NSNotification *)notification
{
    NSArray *liveTimelines = [APTimelinesManager sharedManager].liveFeedTimelines;
    APFeedTimeline *firstTimeline = [liveTimelines firstObject];
    [[APTimelinesManager sharedManager] episodesForTimelineID:firstTimeline.timelineID
                                                   completion:^(NSArray *episodes) {
                                                       // episodes - array containing APFeedEpisode instances.
                                                       // Use the retrieved episodes for your needs. APFeedEpisode instance contains information such as name of episode, start date, end date and more.
                                                   }];
}

```
**Analytics**
***

In order to get all events from Feed, all you have to do is listen to our user default notification named kAPFeedAnalyticsNotification.

```objective-c
#import <APFeed2/APNewFeedManager.h>
```

```objective-c
[[NSNotificationCenter defaultCenter] addObserver:self
                                         selector:@selector(applicasterFeedAnalytics:)
                                             name:kAPFeedAnalyticsNotification
                                           object:nil];
```
```objective-c
- (void)applicasterFeedAnalytics:(NSNotification *)notification
{
    NSDictionary *dicitonary = notification.userInfo;
}
```

The dictionary contains all data you need for the event including the event name. here is an example of a real event dictionary which indicates that a user is opened the Feed:
```
 "Episode name" = "Best Episode";
    "Facebook page ID" = "";
    "Is user logged in to Facebook" = false;
    "Is user logged in to Twitter" = false;
    "Server URL" = "admin.qa.applicaster.com";
    "Time from start in minutes" = 2;
    "Timeline name" = "My show";
    "Twitter Hashtags" =     (
        "#futsal"
    );
    "event name" = "Feed - Enter Feed";
```

**Update Applicaster SDK**
***
In case Applicaster released an updated submodule version here are the steps that needs to be done:

1. Pull the latest submodule of Applicaster-iOS-SDK-Lite-Static and checkout to the relevant tag / commit

2. Remove references to the Applicaster Resources directory

3. Copy the Applicaster Resources again from the Static SDK library

4. Remove the files if exists in Applicaster override from the resources (reference only) (APApplicasterSettings.plist , APCMSettings.plist) - These files are per project configurations.

5. Commit the submodule change in the main git repository
