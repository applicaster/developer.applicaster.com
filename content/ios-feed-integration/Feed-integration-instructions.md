# Applicaster Feed Integration Guide (iOS)

This document will explain how to intergrate Applicaster Feed into your project using CocoaPods.
Demo projects can be found on [GitHub](https://github.com/applicaster/FeedDemo-iOS)
+ [Swift Project](https://github.com/applicaster/FeedDemo-iOS/tree/master/FeedDemo-Swift)
+ [Objective-C Project](https://github.com/applicaster/FeedDemo-iOS/tree/master/FeedDemo-ObjectiveC)

### Requirements
+ Xcode 8.3.3
+ Deployment target 9.0 or above (valid architectures - armv7, arm64)
+ [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

### Setup
1. Create a file named `Podfile` in the root directory of your project (note it does not contain an extension)
2. Add Official CocoaPods PodSpecs repository to your Podfile:
    `source 'https://github.com/CocoaPods/Specs.git'`
3. Add Applicaster private PodSpecs repositories to your Podfile:
    `source 'git@github.com:applicaster/CocoaPods.git'`
    `source 'git@github.com:applicaster/CocoaPods-Private.git'`
4. Add Applicaster Feed to your Podfile:
    ```
    pod 'APFeed', '~> 3.6.0'
    pod 'ZappAnalyticsPlugins/GoogleAnalytics','~> 1.7.0'
    pod 'ZappAnalyticsPlugins/Flurry','~> 1.7.0'
    pod 'ZappAnalyticsPlugins','~> 1.7.0'
    ```
5. Add the following pre-install script to your Podfile (CocoaPods transitive dependencies workaround):

    ```
    pre_install do |installer|
        # workaround for https://github.com/CocoaPods/CocoaPods/issues/3289
        def installer.verify_no_static_framework_transitive_dependencies; end
    end
    ```
6. Add the following post-install script to you Podfile (Setting swift version to 3.0):
    ```
    post_install do |installer|
        installer.pods_project.targets.each do |target|
            target.build_configurations.each do |config|
                config.build_settings['SWIFT_VERSION'] = '3.0'
            end
        end
    end
    ```
7. Using *terminal*, with your project root directory as the *working path*, run:
    `pod install`
>This will download all the necessary files which are required to integrate the Applicaster Feed into your project. Visit the CocoaPods web page for more information.
**Notice**: CocoaPods automatically created a new Xcode workspace, use only the workspace to work with the project.

8. Due to a limitation, it is necessary to change **recursive** in the `HEADER_SEARCH_PATHS` that points to the headers of the generated `Applicaster`, `APFeed` frameworks in your project target (otherwise you will receive a compile error due to missing headers).

##### 3rd Party Dependencies
Libraries that are directly linked within the Applicaster SDK:
 forked (Bug fixes)
+ SHMKit (commit 7a964057e218d1582a3c91e268755cdd9538bfcb - based 0.1.3)
> Note: If these libraries cause duplicate symbols in your code - please notify us.

Pod sub dependencies by Applicaster SDK:
+ CocoaLumberjack/Swift = 3.0.0
+ FBSDKCoreKit = 4.18.0
+ FBSDKLoginKit = 4.18.0
+ FBSDKShareKit = 4.18.0
+ GoogleAnalytics = 3.17.0
+ Firebase/AdMob ~> 4.0.0
+ Firebase/Core ~> 4.0.0
+ HockeySDK ~> 4.1.3
+ Flurry-iOS-SDK = 7.6.6
+ AFNetworking ~> 3.1.0
+ TTTAttributedLabel ~> 2.0.0
+ AppoxeeSDK (~> 4.0.13)
+ MPNotificationView 1.1.2
+ Formatter Kit ~> 1.8.0
+ FreeWheel ~> 5.18.2
+ Akamai Analytics ~> 1.3
+ NKJWT ~> 0.1.0

#### Other required configurations

##### Firebase Screen reporting in Info PLIST:
+ Unless using Firebase screen reporting - please add the following to the info.plist:
```plist
    <key>FirebaseScreenReportingEnabled</key>
    <false/>
```

##### When compiling with iOS 10 BaseSDK:
+ Set `Enable Bitcode` to `No` (Selected Target-->Build Settings-->Build Options-->Enable Bitcode)
+ Add the following entry to your target's Info.plist to allow working with non HTTPS services:
```plist
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
```

+ URL Scheme support, add your app url scheme to the URL types and to the `LSApplicationQueriesSchemes`
+ Add Facebook SDK, Whatsapp and Applicaster related entries to your target's Info.plist  (https://developers.facebook.com/docs/ios/ios9):
```plist
<key>LSApplicationQueriesSchemes</key>
    <array>
    <string>fbapi</string>
	<string>fb-messenger-api</string>
	<string>fbauth2</string>
	<string>fbshareextension</string>
    <string>whatsapp</string>
    <string>applicaster</string>
  </array>
```
+ Add your Facebook AppId to the URL types as a scheme (https://developers.facebook.com/docs/ios/getting-started#settings, see section 5)

### Configurations

The following header should be included in the files which access the Applicaster Feed API:

__objective-c__
```objective-c
@import ApplicasterSDK;
```

__swift__
Add bridging `<#Target-Name>-Bridging-Header.h` if it dosen't exist in your project.
```objective-c
@import ApplicasterSDK;
```

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
    [APApplicasterController initSharedInstanceWithPListSettingsWithSecretKey:<#Provided by Applicaster#> launchOption:launchOptions];
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
        NSMutableDictionary *launchOptionsDictionary = [NSMutableDictionary new];
        [launchOptionsDictionary setObject:sourceApplication forKey:UIApplicationOpenURLOptionsSourceApplicationKey];
        
        if (annotation) {
            [launchOptionsDictionary setObject:annotation forKey:UIApplicationOpenURLOptionsAnnotationKey];
        }
        
        return [[APApplicasterController sharedInstance] application:application openURL:url options:launchOptionsDictionary];
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
    	NSDictionary *launchOptions = [NSDictionary dictionaryWithObject:self.sourceApplication
                                                                  forKey:UIApplicationOpenURLOptionsSourceApplicationKey];
        [[APApplicasterController sharedInstance] application:[UIApplication sharedApplication]
                                                      openURL:self.appLaunchURL
                                                      options:launchOptions];
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

+ Below is a basic implementation that should be added in the class for updating the buttons according to the notifications (the Feed button should be initially hidden):
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
    // is live from the Applicaster CMS and only enable the button when an episode is currently available.
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

Applicaster Feed supports multiple timelines (Feeds). In order to handle them, a small change should be done as both the launch command and the notification for the Feed status change should be checked for the relevant timeline.

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

### Pulling episodes for a specific timeline

Applicaster Feed allows you to pull all the available episodes for a specific timeline. You can use this ability only for retrieving episodes from a timeline checked as "Live" in Applicaster's management system.
One possible usage of this ability is creating a custom page and to promote live/future episodes, for example.

+ The next example shows you how to retrieve all the live and future episodes for a specific timeline. In this case it only pulls the episodes for the first timeline if exists:
```objective-c
#import <ApplicasterSDK/APFeedTimeline.h>
#import <ApplicasterSDK/APFeedEpisode.h>

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
    #import <APFeed/APNewFeedManager.h>

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(applicasterFeedAnalytics:)
                                                 name:kAPFeedAnalyticsNotification
                                               object:nil];

    - (void)applicasterFeedAnalytics:(NSNotification *)notification
    {
        NSDictionary *dicitonary = notification.userInfo;
    }
```

+ The dictionary contains all the data you need for the event including the event name. Here is an example of a real event dictionary which indicates that a user has opened the Feed:
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
