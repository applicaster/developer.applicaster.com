# iOS Crossmates Integration

This document serves an integration guide for Applicaster iOS SDK into a new app
and adding Crossmates activity button. This guide accompanies an iOS project that
implements this integration and can be used as a reference implementation.

* Applicaster iOS SDK Requires Deployment target 7.0 or above and uses the default architectures as set in Xcode 6 and above - armv7 and arm64.

***

The provided Applicaster SDK requires the following 3rd party sdks in order to compile:
* Facebook iOS SDK - 3.20
* Flurry iOS SDK 5.4.0
* Google Analytics V1 - 3.10
* Google Ads library 6.12.2
* Amazon AWS - 1.7.1 (Partial)
* AFNetworking - 2.4.1 (Supports 2.5.0)
* FHSTwitterEngine - 1.8 - Modified to support 64 bit - Provided in this repository
* HockeySDK - 3.6
* TTTAttributedLabel - 1.13.1 (since version 1.0.29)

**Note:** The libraries must be identical to the Applicaster version.
Also attached is the relevant Podfile in order to solve all dependencies issue with one command.
Alternatively - you can use some of the libraries from different sources and use pods / add the binary files for the rest.

Applicaster SDK Also uses The following 3rd party libraries:
* Cocoa Lumberjack 1.9.2
* MPNotificationView 1.1 + private bug fixes
* Formatter Kit 1.7.2
* Zipkit 1.0.2
* SHMKit (commit 7a964057e218d1582a3c91e268755cdd9538bfcb)
* CSURITemplate Kit 0.4
* Appoxee 3.0
* TTTAttributedLabel 1.10.1 (prior to version 1.0.29)

If these libraries cause duplicated symbols in your code - please update us and we will also move it to a Pod.
Alternatively you can use your headers or the ones from the OpenSourceHeaders inside the Headers library and get the implementation from the Applicaster library.

***

**Applicaster SDK Integration guide:**
***
1. Add Applicaster static repository as a submodule:
   `git submodule add https://github.com/applicaster/Applicaster-iOS-SDK-Lite-Static.git`
2. Create a new Xcode project , Add other linker flag - "-ObjC". Project identifier must be confirmed with Applicaster as it is enforced by our server.
3. Add the .a and Resources directory into the project (As reference if using submodules). For the .a files you can also use other linker flags to separate debug and release in the following way - -lApplicaster-lite-Debug and -lApplicaster-lite-Release.
4. Copy the Podfile from Applicaster-iOS-SDK-Lite-Static submodule directory to the Root directory of your project
5. Run `pod install`
6. Add FHSTwitterEngine to the project , either from github or from the attached Third Party directory.
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

12. (optional) Add the following script to the end of the target build phase:
 `sh $CODESIGNING_FOLDER_PATH/SettingsScript.sh` (This will edit the settings bundle we use to display proper keys in debug / distribution and enable the use of QA env. during development)
  Another alternative is running it from the resources directory itself:
    ```objective-c
        sh Applicaster-iOS-SDK-Static/Resources/SettingsScript.sh

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

**Crossmates Integration guide**
***
1. Import Applicaster/APTimelinesManager.h in the Appdelegate.

2. Add the following code to applicaster:loadedWithAccountID: add the following code:
    ```objective-c
     [[APTimelinesManager sharedManager] setAccountID:<Timeline account provided by Applicaster>];

    ```
3. In the class that will contain the Crossmates button - Add the following (In the view did load in case of a View Controller , or AwakeFromNib in case of a view):

    ```objective-c
         [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(timelineStatusChanged:)
                                                 name:kCrossMatesTimeLineStatusChanged
                                               object:nil];

	```
4. Here is a basic implementation that should be added in the class for updating the buttons according to the notifications (The Crossmates button should be initially hidden):
 ```objective-c
  - (void)timelineStatusChanged:(NSNotification *)notification
{
    if (!notification.userInfo || ![notification.userInfo objectForKey:kIsTimelineAvailableKey]) {
        self.CMButton.hidden = YES;
    }
    else
    {
        self.CMButton.hidden = NO;
    }
}


 ```
   Do note - these notifications are sent when the Timelines are loaded from the Applicaster server. If your view controller is not yet ready at this stage - consider adding them in the Appdelegate and checking them in the view controllers.
4. Add the following implementation to the button action to open the Crossmates activity:
	
 ```objective-c
- (IBAction)CMButtonTapped:(id)sender
{
    [[APTimelinesManager sharedManager] presentCMWithTimelineID:<provided by applicaster> completionHandler:^(BOOL success) {
        
    }];}

 ```

6. Copy into the project the Crossmates assets - From the Crossmates directory in the Applicaster iOS SDK - APCrossmatesBundle.bundle

7. link the project against either libAPCrossmates_Debug.a or libAPCrossmates_Release.a according to the build (This can be easily done by other linker flags - -lAPCrossmates_Debug and -lAPCrossmates_Release accordingly with the library search path set to Applicaster recursively)

8. In order to notify the user that new messages arrived please implement the following code:
```objective-c
//import:
#import <APCrossmates/APCMManager.h>

// Observation code:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(updateNotificationBadge:) name:kAPCMNewEventsReceivedNotification object:nil];

- (void)updateNotificationBadge:(NSNotification *)notification
{
    APCMManager *relevantCMManager = [[[APTimelinesManager sharedManager] CMManagers] objectForKey:<provided by applicaster>];
    if ([relevantCMManager.eventsMissedForAllRelevantCharacters integerValue] > 0)
    {
        // New messages are available - change the button image.
    }else{
        // no new messages are available at the moment
    }
}
```

**Update Applicaster SDK**
***
In case Applicaster released an updated submodule version here are the steps that needs to be done:

1. Pull the latest submodule of Applicaster-iOS-SDK-Lite-Static and checkout to the relevant tag / commit

2. Remove references to the Applicaster Resources directory

3. Copy the Applicaster Resources again from the Static SDK library

4. Remove the files that exists in Applicaster override from the resources (reference only) (APApplicasterSettings.plist , APCMSettings.plist)

5. Commit the submodule change in the main git repository
