# iOS - Integrate Applicaster Feed by CocoaPods
This document will explain how to add the Applicaster SDK using CocoaPods to your project   

**A few notes:**
***
+ Applicaster iOS SDK Requires Xcode 7.1, deployment target 7.0 or above and has 64 bit support (valid architectures - armv7, arm64).
+ It uses CocoaPods as a distribution platfrom and to manage 3rd party dependencies.
+ A demo project can be found on [GitHub](https://github.com/applicaster/ApplicasterFeedDemo-iOS)


**3rd party libraries**
***
The following libraries are directly linked with the Applicaster library:   
+ MPNotificationView 1.1 + private bugfixes  
+ Formatter Kit 1.7.2  
+ Zipkit 1.0.2  
+ SHMKit (commit 7a964057e218d1582a3c91e268755cdd9538bfcb)  
+ CSURITemplate Kit 0.4  
+ Appoxee 3.0  
+ FreeWheel  
+ ePlanning  

If these libraries cause duplicate symbols in your code - please notify us and we will also move it to a Pod.

The following Pods are used by Applicaster:
+ CocoaLumberjack = 1.9.2
+ FBSDKCoreKit = 4.7.0
+ FBSDKLoginKit = 4.7.0
+ FBSDKShareKit = 4.7.0
+ google-cast-sdk ~> 2.5.2
+ GoogleAnalytics-iOS-SDK ~> 3.10
+ Google-Mobile-Ads-SDK ~> 6.11.1
+ HockeySDK ~> 3.6
+ FlurrySDK ~> 5.4
+ Mixpanel ~>2.9.0
+ comScore-iOS-SDK
+ AFNetworking ~> 2.4
+ TTTAttributedLabel ~> 1.13.1

**Applicaster SDK integration guide**
***
1. Install the CocoaPods framework: https://guides.cocoapods.org/using/getting-started.html
2. Create a file named "Podfile" in the root directory of your project (note it does not contain an extension)
3. Edit the file and make sure it has the basic configuration: https://guides.cocoapods.org/using/using-cocoapods.html
4. Make sure the following official CocoaPods PodSpecs repository is used by your Podfile:  
    `source 'https://github.com/CocoaPods/Specs.git'`
5. Applicaster uses the following private PodSpecs repository (for which you should have access to)  
    `source 'git@github.com:applicaster/CocoaPods.git'`
6. The repository provides the core Applicaster Pod which you may include to your Podfile:  
    `pod 'Applicaster'`
7. The APFeed and APCrossmates Pods are also available (note that they already include a reference to the required core Applicaster Pod so you may omit it):  
    `pod 'APFeed'`  
    `pod 'APCrossmates'`  
8. The Applicaster SDK also depends on the following `Amazon SDK` Pod which must be added:  
    `pod 'AWSiOSSDK', '1.7.1'` 
9. Using *terminal*, with your project root directory as the *working path*, run `pod install`. This will download all the necessary files which are required to integrate the Applicaster SDK into your project. Visit the CocoaPods web page for more information.
10. You will notice the CocoaPods installer automatically created a new Xcode `workspace`, into which your original project was added with an additional `Pods` project.
11. Due to a limitation with the required specific version of the `Amazon SDK` Pod, it is necessary to make **recursive** the `HEADER_SEARCH_PATHS` that points to the headers of the generated `AWSiOSSDK` target in the automatically created `Pods` project in your workspace (otherwise you will receive a compile error).

**Other required configurations**
***
+ Add the following entry to your target's Info.plist:
```objective-c
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
```  
+ When compiling with iOS 9, add the following Facebook SDK related entries to your target's Info.plist (https://developers.facebook.com/docs/ios/ios9):
```objective-c
    <array>
        <string>fbapi</string>
        <string>fbapi20130214</string>
        <string>fbapi20130410</string>
        <string>fbapi20130702</string>
        <string>fbapi20131010</string>
        <string>fbapi20131219</string>    
        <string>fbapi20140410</string>
        <string>fbapi20140116</string>
        <string>fbapi20150313</string>
        <string>fbapi20150629</string>
        <string>fbauth</string>
        <string>fbauth2</string>
        <string>fb-messenger-api20140430</string>
    </array>
```
+ Add your Facebook AppId to the URL types as a scheme (https://developers.facebook.com/docs/ios/getting-started#settings, see section 5)  

**Usage**
***

The following headers should be included in the files which access the Applicaster API:

```objective-c
#import <Applicaster/APApplicaster.h>
#import <ApplicasterCore/ApplicasterCore.h>
```  
  
**AppDelegate:**

+ Add implementation for `APApplicasterControllerDelegate`
+ Add the following properties:
```objective-c
    // These properties will help forwarding launch information and recieved URL scheme 
    // after Applicaster Controller does it's initial loading
    @property (nonatomic, strong) NSURL *appLaunchURL;
    @property (nonatomic, strong) NSDictionary *remoteLaunchInfo;
    @property (nonatomic, strong) NSString *sourceApplication;
```

+ In `application:didFinishLaunchingWithOptions:` add the following:
```objective-c
    [APApplicasterController initSharedInstanceWithPListSettingsWithSecretKey:<Provided by Applicaster>];

    [[APApplicasterController sharedInstance] setDelegate:self];
    [[APApplicasterController sharedInstance] setRootViewController:self.viewController];
    [[APApplicasterController sharedInstance] load];

    self.appLaunchURL = [launchOptions objectForKey:UIApplicationLaunchOptionsURLKey];
    self.remoteLaunchInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    self.sourceApplication = [launchOptions objectForKey:UIApplicationLaunchOptionsSourceApplicationKey];
```

+ In case no deep linking is done by the app, add the following to the `AppDelegate`:
```objective-c
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
    // If the launch URL handling is being delayed, return YES.
    if (!self.appLaunchURL)
    {
        // The return can be used to check if Applicaster handled the URL scheme and add additional implementation
        return [[APApplicasterController sharedInstance] application:application openURL:url sourceApplication:self.sourceApplication annotation:annotation];
    }
    else
    {
        // Or other URL scheme implementation
        return YES;
    }
}
```

+ In case deep linking is used inside the app - you can use the previous function. We will return `NO` if we haven't handled the `URL scheme` and enable to further check if handling is needed. Do note - we internally also check with `Facebook iOS SDK` if they are handling the `URL scheme`.
+ In the `application:didRegisterForRemoteNotificationsWithDeviceToken:` add the following:
```objective-c
	[[APApplicasterController sharedInstance].notificationManager registerToken:deviceToken];

```  

+ In `application:didRecieveRemoteNotification:` add the following:
```objective-c
	[[APApplicasterController sharedInstance].notificationManager appDidReceiveRemoteNotification:userInfo launchedApplication:(application.applicationState == UIApplicationStateInactive)];
```

+ In `application:didRecieveLocalNotification:` add the following:
```objective-c
        [[APApplicasterController sharedInstance].notificationManager  appDidReceiveLocalNotification:notification launchedApplication:(application.applicationState == UIApplicationStateInactive)];
```

+ An example of a basic `APApplicasterControllerDelegate` implementation:
```objective-c
- (void)applicaster:(APApplicasterController *)applicaster loadedWithAccountID:(NSString *)accountID
{    
    if (self.appLaunchURL)
    {
        [[APApplicasterController sharedInstance] application:[UIApplication sharedApplication] openURL:self.appLaunchURL sourceApplication:self.sourceApplication annotation:nil];
        self.appLaunchURL = nil;
    }
    else
    {
        if (self.remoteLaunchInfo != nil)
        {
            [applicaster.notificationManager appDidReceiveRemoteNotification:self.remoteLaunchInfo launchedApplication:YES];
            self.remoteLaunchInfo = nil;
        }
    }
}

- (void)applicaster:(APApplicasterController *)applicaster withAccountID:(NSString *)accountID didFailLoadWithError:(NSError *)error
{
    // Present a loading error in the loading view controller
}
```

**Feed usage**

+ Add the following code to applicaster:loadedWithAccountID: in your `AppDelegate`:
```objective-c
[[APTimelinesManager sharedManager] setAccountID:<Timeline account provided by Applicaster>];
```

+ In the class that will contain the Feed button - Add the following (In the ViewDidLoad in case of a ViewController, or AwakeFromNib in case of a View):
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

+ Below is a basic implementation that should be added in the class for updating the buttons according to the notifications (The Feed button should be initially hidden):
```objective-c
- (void)timelineStatusChanged:(NSNotification *)notification
{
    if (!notification.userInfo || ![notification.userInfo objectForKey:kIsTimelineAvailableKey])
    {
        self.feedButton.hidden = YES
    }
    else
    {
        self.feedButton.hidden = NO;
    }
}

- (void)episodeStatusChanged:(NSNotification *)notification
{
    // This implementation enables you to have a button visible only when the feature
    // is live from the Applicaster Stars CMS and only enable the button when an episode is currently available.
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

+ Add the following implementation to the button action to open the Feed:
```objective-c
- (IBAction)feedButtonTapped:(id)sender
{
    [[APTimelinesManager sharedManager] presentFirstLiveTimelineFeedWithCompletionHandler:^(BOOL success) {
    }];
}
```

**Using multiple timelines**

Applicaster Feed supports multiple timelines (feeds), in order to handle them a small change should be done as both the launch command and the notification for the feed status change should be checked for the relevant timeline.

+ In order to launch a specific timeline:
```objective-c
- (IBAction)feedButtonTapped:(id)sender
{
    [[APTimelinesManager sharedManager] presentFeedWithTimelineID:<Timeline id> completionHandler:^(BOOL success) {
        
    }];
}
```

+ The notification handling should also change in the following way:

```objective-c
- (void)timelineStatusChanged:(NSNotification *)notification
{
    if ([[notification.userInfo objectForKey:@"kTimelineID"]  isEqual: <correct timeline id>])
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
}

- (void)episodeStatusChanged:(NSNotification *)notification
{
    if ([[notification.userInfo objectForKey:@"kTimelineID"]  isEqual: <correct timeline id>])
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
}
```

**Pulling Episodes for a specific timeline**

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

+ In order to get all events from Feed, all you have to do is listen to our user default notification named `kAPFeedAnalyticsNotification`:

```objective-c
#import <APFeed2/APNewFeedManager.h>

[[NSNotificationCenter defaultCenter] addObserver:self
                                         selector:@selector(applicasterFeedAnalytics:)
                                             name:kAPFeedAnalyticsNotification
                                           object:nil];

- (void)applicasterFeedAnalytics:(NSNotification *)notification
{
    NSDictionary *dicitonary = notification.userInfo;
}
```

+ The dictionary contains all data you need for the event including the event name. here is an example of a real event dictionary which indicates that a user is opened the Feed:
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