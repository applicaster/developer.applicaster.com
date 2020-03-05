# Set up your QuickBrick project

## Prerequisites

### React - node.js

QuickBrick runs on node.js ^12.0.x 
Please refer to the [environment setup guide](/dev-env/node.md) to setup your node environment.

To prepare a project for quick-brick you need to [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the official [QuickBrick](https://github.com/applicaster/QuickBrick) repository. This Repo contains the source code for the Quick Brick Project, which enables to create a Zapp App with a 100% react-native-flavored UI.

### Native

QuickBrick relies on the [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) & [Zapp-Android](https://github.com/applicaster/Zapp-Android) apps to run on devices or on the emulator. This means that you need to have fully functional ZappAppleBuilder & Zapp-Android environments. 

This includes:

- Access to both [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) & [Zapp-Android](https://github.com/applicaster/Zapp-Android) repositories.
- Align with our [Ruby environment](/dev-env/ruby.md) requirements. 
- Use the latest [Zapptool](https://github.com/applicaster/ZappTool)
- Xcode 11.2.1
- Android studio 3.5.3 with Gradle 4.5.1

Please clone the [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) & [Zapp-Android](https://github.com/applicaster/Zapp-Android) repositories. Note that they don't need to be in the same folder. They can be located anywhere on your environment.


## Development Workflow

Before development, make sure you have a working iOS or Android application on the [Zapp](https://zapp.applicaster.com/) website.

In case you don't have a working iOS or Android application, create one for your platforms. You can use any recent SDK. We recommend to use the latest stable on each platform.

Copy your app version ids and save them for later usage. Note that each version has its unique app id.

### Prepare a QuickBrick workspace

Go to the [forked](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) [QuickBrick](https://github.com/applicaster/QuickBrick) repository directory and run `yarn setup` to automatically install all dependencies.

Then run the following process inside the cloned repo :

```
$ yarn zapplicaster prepare -a <app_version_id>
```

The command will retrieve the zapp configuration files for these versions and inject them in the `zapp-react-native-development-app` package.

Please note that if you add / remove plugins, or change the rivers.json configuration in Zapp, you will need to run the prepare command again to get the most recent configuration file locally.

You can run the script for both your iOS & Android versions. The QuickBrick workspace allows you to set up simultaneously for one android & one iOS version, without one replacing the other. This is particularly helpful to work simultaneously on iOS and Android versions of a given app.

### Add a plugin to a QuickBrick workspace

When creating a plugin, follow these steps:

- In your forked [QuickBrick](https://github.com/applicaster/QuickBrick) repository, create a folder for your plugin project. The folder should be located inside the `plugins` directory. 
- Run `npm init` to initialize your package.json file for your plugin.
- The `package.json` file should contain the following base values:

    ```json
    {
        "name": "@your_npm_account/plugin_name",
        "version": "1.0.0",
        "description": "plugin_description",
        "main": "index.js",
        "scripts": {
            "test": "jest"
        },
        "author": "",
        "license": "ISC",
        "peerDependencies": {
            "react": "16.8.3",
            "react-native": "0.59.10",
        },
        "devDependencies": {
            "react": "16.8.3",
            "react-native": "0.59.10",
        },
        "dependencies": {
            "react": "16.8.3",
            "react-native": "0.59.10"
        },
        "jest": {
            "preset": "react-native"
        },
        "applicaster": {
            "supportedPlatforms": [
                "ios",
                "android"
            ]
        }
    }
    ```
    Notes:
    - A `main` property in your `package.json` points to the file where your plugin's entry point will be. This is the file which will be reached when importing your plugin through NPM. You can change it at any time.
    - The `license` type Varies between plugins.
    - Your plugin can support multiple platforms, please specify it in the `supportedPlatforms` JSON array.
- Add a `.npmignore` file for all the files you don't want to push to npm (like the QuickBrick bootstrap files for instance). We suggests to add [iOS](https://github.com/github/gitignore/blob/master/Global/Xcode.gitignore), [Android](https://github.com/github/gitignore/blob/master/Android.gitignore) and [react native](https://github.com/facebook/react-native/blob/master/.gitignore) git ignores.
- Edit `index.js` to import your plugin code, and either push it to the plugin's array, or in the `components` property of the `createZappApp` function call if your plugin is a Ui Builder `ui_component`.
- Manually update the file `config/rivers.json` to insert data which will result in your plugin showing up in the app. If you're not sure how to achieve this, ask #support or a member of the Zapp Team.

### iOS/tvOS Quick-Brick

The following chapter will explain how to create and prepare a project for iOS/tvOS platforms with quick-brick. Please use it when you need to develop or test your iOS/tvOS apps.

### Prerequisites for iOS/tvOS with Quick-Brick

To prepare a project for iOS or tvOS with quick-brick you need to `git clone` the [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) repository. The [ZappAppleBuilder](https://github.com/applicaster/ZappAppleBuilder) repository readme contains information about the setup prerequisites.  

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

### Run directly on iOS emulator

The Zapp-React-Native repo provides a script to configure your iOS project. If you have an up-to-date and working local Zapp-iOS folder, simply run the following command from the root of the Zapp-React-Native folder

```
$ yarn setup:ios <path/to/Zapp/App/folder> <app_version_id>
```

This will run zapptool and configure your iOS workspace. Alternatively, you can configure your Zapp-iOS project manually by running the following command in the Zapp-iOS folder

```
$ zapptool -vi <app_version_id> -rn dev && pod update
```

The `-rn dev` flag will tell your Zapp App to use the react native metro bundler packager rather than the bundled react-native resource created with Zapptool.
From this point, you should be able to run the app in your emulator without even opening Xcode, by running the following command from the Zapp-React-Native folder.

Then simply run:

```
ZAPP_APP_PATH=<path/to/Zapp/App/folder> yarn run:ios
```

This will automatically build the app, open the simulator, launch your app, and start react native's dev packager.

Happy coding !

### run on Android emulator

Inside your Zapp-Android project, configure your workspace like you would with any Zapp-Android app by running:

```
rake prepare_workspace VERSION=<app_version_id>
```

In order to enable the use of the react native packager, follow these steps :

- Open Android Studio
- go to `Preferences > Build, Execution, development > Compiler > Command line options`
- add this flag `-PREACT_NATIVE_PACKAGER_ROOT=localhost:8081`. It will instruct the app to use the react native metro bundler packager instead of the bundled react-native resource created by the rake task
- in the terminal, run `adb reverse tcp:8081 tcp:8081`. This will make sure that all calls to `http://localhost:8081` on the emulator will reach the metro bundler instance running on your machine
- in the Zapp-React-Native project root or in your plugin workspace, run `yarn start`
- in Android Studio, run the app in your terminal

Happy coding !

NB : on Android, you can access react-native's development by pressing `⌘ + M`, and you can reload the bundle by pressing the `R` key twice

## Next Step

Now that you are all set up, it's time to learn more about [how QuickBrick works](/quick-brick/Inside-QuickBrick.md)
