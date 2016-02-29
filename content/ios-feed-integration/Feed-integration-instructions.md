# Applicaster Feed Integration Guide (iOS)

This document will explain how to intergrate Applicaster Feed to your project using CocoaPods.  
Demo projects can be found on [GitHub](https://github.com/applicaster/FeedDemo-iOS)
+ [Swift Project](https://github.com/applicaster/FeedDemo-iOS/tree/master/FeedDemo-Swift)
+ [Objective-C Project](https://github.com/applicaster/FeedDemo-iOS/tree/master/FeedDemo-ObjectiveC)

### Requirements
+ Xcode 7.2  
+ Deployment target 7.0 or above (valid architectures - armv7, arm64)  
+ [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)  

### Setup
1. Create a file named `Podfile` in the root directory of your project (note it does not contain an extension)
2. Add Official CocoaPods PodSpecs repository to your Podfile:  
    `source 'https://github.com/CocoaPods/Specs.git'`
3. Add Applicaster private PodSpecs repository to your Podfile  
    `source 'git@github.com:applicaster/CocoaPods.git'`
4. Add Applicaster Feed to your Podfile.  
    `pod 'APFeed'`  
5. Using *terminal*, with your project root directory as the *working path*,  
run: `pod install`  
>This will download all the necessary files which are required to integrate the Applicaster Feed into your project. Visit the CocoaPods web page for more information.  
**Notice**: CocoaPods automatically created a new Xcode workspace, open the workspace.

6. Due to a limitation it is necessary to change **recursive** in the `HEADER_SEARCH_PATHS` that points to the headers of the generated `Applicaster`, `APFeed` frameworks in your project target (otherwise you will receive a compile error due to missing headers).

##### 3rd Party Dependencies
Libraries that are directly linked within the Applicaster SDK:   
+ MPNotificationView 1.1 forked (Bug fixes)
+ Formatter Kit 1.7.2
+ Zipkit 1.0.2
+ SHMKit (commit 7a964057e218d1582a3c91e268755cdd9538bfcb)  
+ CSURITemplate Kit 0.4
+ Appoxee 3.2.7
+ FreeWheel
+ ePlanning
+ AWS 1.71
> Note: If these libraries cause duplicate symbols in your code - please notify us.

Pod sub dependencies by Applicaster SDK:
+ CocoaLumberjack = 1.9.2
+ FBSDKCoreKit = 4.7.0
+ FBSDKLoginKit = 4.7.0
+ FBSDKShareKit = 4.7.0
+ GoogleAnalytics = 3.14.0
+ Google-Mobile-Ads-SDK = 7.6.0
+ HockeySDK = 3.8.5
+ Flurry-iOS-SDK = 7.3.0
+ Mixpanel ~> 2.9.0
+ comScore-iOS-SDK = 3.1509.15
+ AFNetworking = 2.6.3
+ TTTAttributedLabel = 1.13.1

#### Other required configurations

When compiling with iOS 9 BaseSDK:
+ Set `Enable Bitcode` to `No` (Selected Target-->Build Settings-->Build Options-->Enable Bitcode)
+ Add the following entry to your target's Info.plist:
```plist
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
```  
+ URL Scheme support, add your app url scheme to the URL types and to the `LSApplicationQueriesSchemes`  
+ Add Facebook SDK related entries to your target's Info.plist  (https://developers.facebook.com/docs/ios/ios9):
```plist
<key>LSApplicationQueriesSchemes</key>
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

### Configurations

The following header should be included in the files which access the Applicaster Feed API:

__objective-c__
```objective-c
#import <Applicaster/APApplicaster.h>
```

__swift__  
Add bridging `<#Target-Name>-Bridging-Header.h` if it dosen't exist in your project. Add the objective-c header to bridging header.

**AppDelegate:**

+ Declare appDelegate implements `APApplicasterControllerDelegate` protocol
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
    [APApplicasterController initSharedInstanceWithPListSettingsWithSecretKey:<#Provided by Applicaster#>];
    [[APApplicasterController sharedInstance] setDelegate:self];
    [[APApplicasterController sharedInstance] setRootViewController:self.window.rootViewController];
    [[APApplicasterController sharedInstance] load];

    self.appLaunchURL = [launchOptions objectForKey:UIApplicationLaunchOptionsURLKey];
    self.remoteLaunchInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    self.sourceApplication = [launchOptions objectForKey:UIApplicationLaunchOptionsSourceApplicationKey];
```

+ Facebook integration, In `application:didFinishLaunchingWithOptions:` add the following:
```objective-c
    [[FBSDKApplicationDelegate sharedInstance] application:application
                             didFinishLaunchingWithOptions:launchOptions];
```

+ In case no deep linking is done by the app, add the following to the `AppDelegate`:
```objective-c
 - (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    // If the launch URL handling is being delayed, return YES.
    if (self.appLaunchURL == nil) {
        // The return can be used to check if Applicaster handled the URL scheme and add additional implementation
        return [[APApplicasterController sharedInstance] application:application openURL:url sourceApplication:self.sourceApplication annotation:annotation];
    }
    else {
        // Or other URL scheme implementation
        return YES;
    }
}
```
In case deep linking is used inside the app - you can use the previous function. We will return `NO` if we haven't handled the `URL scheme` and enable to further check if handling is needed.
> Note: We also check internally with Facebook iOS SDK, if it handles the URL scheme.

+ In `application:didRegisterForRemoteNotificationsWithDeviceToken:` add the following:  
```objective-c
	[[APApplicasterController sharedInstance].notificationManager registerToken:deviceToken];
```

+ In `application:didRecieveRemoteNotification:` add the following:
```objective-c
    BOOL launchedApplication = application.applicationState == UIApplicationStateInactive;
    [[APApplicasterController sharedInstance].notificationManager appDidReceiveRemoteNotification:userInfo launchedApplication:launchedApplication];
```

+ In `application:didRecieveLocalNotification:` add the following:
```objective-c
    BOOL launchedApplication = application.applicationState == UIApplicationStateInactive;
    [[APApplicasterController sharedInstance].notificationManager appDidReceiveLocalNotification:notification launchedApplication:launchedApplication];
```

+ An example of a basic `APApplicasterControllerDelegate` implementation:
```objective-c
 - (void)applicaster:(APApplicasterController *)applicaster loadedWithAccountID:(NSString *)accountID {
	if (self.appLaunchURL) {
    	[[APApplicasterController sharedInstance] application:[UIApplication sharedApplication] openURL:self.appLaunchURL sourceApplication:self.sourceApplication annotation:nil];
		self.appLaunchURL = nil;
	} else if (self.remoteLaunchInfo != nil) {
            [applicaster.notificationManager appDidReceiveRemoteNotification:self.remoteLaunchInfo launchedApplication:YES];
            self.remoteLaunchInfo = nil;
    }
}

 - (void)applicaster:(APApplicasterController *)applicaster withAccountID:(NSString *)accountID didFailLoadWithError:(NSError *)error {
    // Present a loading error in the loading view controller
    NSLog(@"%@", [error localizedDescription]);
}
```

+ In `applicaster:loadedWithAccountID:` add the following:
```objective-c
    NSString *accountsAccountId = [[APApplicasterController sharedInstance] applicasterSettings][@"APAccountsAccountID"];
    [[APTimelinesManager sharedManager] setAccountID:accountsAccountId];
```

+ Create plist named `ApplicasterSettings.plist` assigned to the target with the following entries:
```plist
<key>APAccountID</key>
<string></string>
<key>APBucketID</key>
<string></string>
<key>APAccountsAccountID</key>
<string></string>
<key>APCurrentLanguage</key>
<string></string>
<key>APLegacyLocalizations</key>
<true/>
```
`APCurrentLanguage` - Current application language, for example: `en`
The values for the following keys will be provided by Applicaster `APAccountID`,`APBucketID`,`APAccountsAccountID`

### Feed usage

+ In any class that contains the Feed button, add the following (In the ViewDidLoad in case of a ViewController, or AwakeFromNib in case of a View):
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
 - (void)timelineStatusChanged:(NSNotification *)notification {
    if (!notification.userInfo || ![notification.userInfo objectForKey:kIsTimelineAvailableKey]) {
        self.feedButton.hidden = YES
    } else {
        self.feedButton.hidden = NO;
    }
}
```
```objective-c
 - (void)episodeStatusChanged:(NSNotification *)notification
{
    // This implementation enables you to have a button visible only when the feature
    // is live from the Applicaster Stars CMS and only enable the button when an episode is currently available.
    if (notification.userInfo && [notification.userInfo objectForKey:kIsEpisodeAvailableKey]) {
        self.feedButton.enabled = YES;
    }
    else {
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

### Using multiple timelines

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
 -(void)timelineStatusChanged:(NSNotification *)notification
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
```
```objective-c
 - (void)episodeStatusChanged:(NSNotification *)notification {
    if ([[notification.userInfo objectForKey:@"kTimelineID"]  isEqual: <correct timeline id>]) {
        if (notification.userInfo && [notification.userInfo objectForKey:kIsEpisodeAvailableKey]) {
            self.feedButton.enabled = YES;
        }
        else {
            self.feedButton.enabled = NO;
        }
    }
}
```

### Pulling Episodes for a specific timeline

Applicaster Feed allows you to pull all the available episodes for a specific timeline. You can use this ability only for retrieving episodes from a timeline checked as "Live" in Applicaster's management system.
One possible usage of this ability is creating a custom page and promote live/future episodes, for example.

+ The next example shows you how to retrieve all the live and future episodes for a specific timeline. In this case it only pulls the episodes for the first timeline if exists:  
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

### Analytics

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
