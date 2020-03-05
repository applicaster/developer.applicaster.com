# Get ready to work on Quick-Brick

1. [Description](#description)
2. [Create run a quick-brick bundle from localhost](#localhost_qb)
3. [iOS/tvOS Quick-Brick](#ios_qb)
4. [Android and Android T.V](#android_qb)

***

## Description {#description}

This guide will provide information about how to test your react native bundle on a native simulator/emulator or actual devices.

There are two options to run a quick-brick bundle on a native device.

* [Zapplicaster-cli](https://github.com/applicaster/QuickBrick/blob/master/packages/zapplicaster-cli/README.md) - this is the offical tool Applicaster provide for developing, testing and running an app on native device.

* Manual build - you can create a native project without using the Applicaster CLI tool. With this you will understand the steps needed to create a native project.

The following guide will describe the process of a manual build. Please note that you can run everything directly by using the [Zapplicaster-cli](https://github.com/applicaster/QuickBrick/blob/master/packages/zapplicaster-cli/README.md) tooling.

***

## Create run a quick-brick bundle from localhost {#localhost_qb}

Following the plugin [plugin setup](/book/quick-brick/plugin-setup.md) guide, we'll create a react native bundle for development and testing: 

1. Run the following to populate the `development-app` folder with your quick brick app.

    ```base
    yarn zapplicaster prepare -a <app_version_id>
    ```

    *Notes:*
    * The `app_version_id` is the app version id string value from earlier stage.

2. Start the react-native packager by running `yarn start`. This will invoke the script we've just created:

    ```base
    yarn start
    ```

Note:

* If you want to run the web app for samsung development, simply point your browser to `http://localhost:4000`

***

## iOS/tvOS Quick-Brick {#ios_qb}

This chapter will explain how to test a project for iOS/tvOS platforms with quick-brick. Please use it when you need to develop or test your iOS/tvOS apps.

### Prerequisites for iOS/tvOS with Quick-Brick

To prepare a project for iOS or tvOS with quick-brick you need to `git clone` the following repositories:

* [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) - the actual native application that will run the react-native quick-brick bundle.

The repository readme files contains information about the setup prerequisites.  

### Create an app for iOS/tvOS with Quick-Brick Q.A using Xcode simulators

The following steps will guide you how to create a quick-brick app that will utilize the react-native quick-brick bundle from the CDN.

1. Choose a Zapp app from the [Zapp](https://zapp.applicaster.com/) website, copy the app version id and save it for later stage.
2. Go to the `ZappAppleBuilder` project folder and choose the platform you want to test:
    * iOS -  open the `ZappiOS` folder
    * tvOS - open the `ZappTvOS` folder
3. Create the project by running inside the chosen directory the following command:

    ```base
    zapptool -vi <app_version_id> -pu
    ```

    In case you need to work with a local React-Native bundle, please use the following command:

    ```base
    zapptool -vi <app_version_id> -pu -rn localhost:8081
    ```

    *Notes:*
    * The `app_version_id` is the app version id string value from earlier stage.
    * If you prefer to run `pod update` separately, you can remove `-pu` which will execute `pod update` as part of the zapptool build process.

4. Open `ZappiOS.xcworkspace` or `ZappTvOS.xcworkspace` according to earlier section.
5. Build and run on some (iPhone / Apple TV) Simulator.

### Extra information for iOS/tvOS Quick-Brick

We have created extra documentations about the following issues:

* [How to install a debug build on AppleTV](/quick-brick/tvOS/Environment/DebugBuildIntegration.md) - This Document will explain how to download and setup a debug version of an app on your Apple TV device using the Quickbrick SDK.
* [How to install a release build on AppleTV](/quick-brick/tvOS/Environment/DebugBuildIntegration.md) - This Document will explain how to download and setup a release version of an app on your Apple TV device using the Quickbrick SDK.

***

## Android and Android T.V {#android_qb}

To prepare a project for iOS or tvOS with quick-brick you need to `git clone` the following repositories:

* [Zapp-Android](https://github.com/applicaster/Zapp-Android) - the actual native application that will run the react-native quick-brick bundle.

The repository readme file contains information about the setup prerequisites.

### Create an app for Android and Android T.V with Quick-Brick Q.A using Android Emulators

The following steps will guide you how to create a quick-brick app that will utilize the react-native quick-brick bundle from the CDN.

1. Choose a Zapp app from the [Zapp](https://zapp.applicaster.com/) website, copy the app version id and save it for later stage.
2. Go to the `Zapp-Android` project and run the following command:

    ```base
    rbenv local 2.5.1
    sudo gem install bundler -v 1.17.3
    bundle install
    bundle exec rake prepare_workspace VERSION=<Applicastion_ID>
    ```

3. Open the Android Studio project and run the project on an Android Emulator.
4. To test the quick-brick bundle from localhost, you need to pass the following argument `-PREACT_NATIVE_PACKAGER_ROOT=localhost:8081`. For example:

    ```base
    <your_android_project_path>/.gradlew assembleDebug -PREACT_NATIVE_PACKAGER_ROOT=localhost:8081
    ```

    Note:
    You can add that within the Android Studio project by going to `Preferences > Build, Execution, Development > Compiler > Command-line Options` and add `-PREACT_NATIVE_PACKAGER_ROOT=localhost:8081`.