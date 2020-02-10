# Get ready to work on Quick-Brick

## iOS/tvOS Quick-Brick
The following chapter will explain how to create and prepare a project for iOS/tvOS platforms with quick-brick. Please use it when you need to develop or test your iOS/tvOS apps.

### Prerequisites for iOS/tvOS with Quick-Brick

To prepare a project for iOS or tvOS with quick-brick you need to `git clone` the following repositories:

* [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) - the actual native application that will run the react-native quick-brick bundle.
* [QuickBrick](https://github.com/applicaster/QuickBrick) - this Repo contains the source code for the Quick Brick Project, which enables to create a Zapp App with a 100% react-native-flavored UI.

Both repositories readme files contains information about the setup prerequisites.  

### Create an app for iOS/tvOS with Quick-Brick Q.A using Xcode simulators

The following steps will guide you how to create a quick-brick app that will utilize the react-native quick-brick bundle from the CDN.

1. Choose a Zapp app from the [Zapp](https://zapp.applicaster.com/) website, copy the app version id and save it for later stage.
2. Go to the `ZappAppleBuilder` project folder and choose the platform you want to test: 
    * iOS -  open the `ZappiOS` folder
    * tvOS - open the `ZappTvOS` folder
3. Create the project by running inside the chosen directory the following command: 
    ```
    zapptool -vi <app_version_id> -pu
    ```

    In case you need to work with a local React-Native bundle, please use the following command: 

    ```
    zapptool -vi <app_version_id> -pu -rn localhost:8081
    ```
    *Notes:* 
    * The `app_version_id` is the app version id string value from earlier stage.
    * If you prefer to run `pod update` separately, you can remove `-pu` which will execute `pod update` as part of the zapptool build process. 
4. To build the quick-brick react-native bundle go to the `QuickBrick` project folder and execute the following script:

    ```
    yarn zapplicaster prepare -a <app_version_id>
    ```

    *Notes:* 
    * The `app_version_id` is the app version id string value from earlier stage.
    
5. Run the quick-brick react-native bundle from localhost by executing the following command:
    ```
    yarn start
    ```
6. Open `ZappiOS.xcworkspace` or `ZappTvOS.xcworkspace` according to earlier section.
7. Build and run on some (iPhone / Apple TV) Simulator.

### Extra information for iOS/tvOS Quick-Brick

We have created extra documentations about the following issues:
* [How to install a debug build on AppleTV]() - This Document will explain how to download and setup a debug version of an app on your Apple TV device using the Quickbrick SDK.
* [How to install a release build on AppleTV](/quick-brick/tvOS/Environment/DebugBuildIntegration.md) - This Document will explain how to download and setup a release version of an app on your Apple TV device using the Quickbrick SDK.
