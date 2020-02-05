# Set up your QuickBrick project

## Prerequisites

### React - node.js

QuickBrick runs on node.js ^12.0.x 
Please refer to [the environment setup guide](/dev-env/node.md) to set up your node environment

### Native

QuickBrick relies on the ZappAppleBuilder & Zapp-Android apps to run on devices or on the emulator. This means that you need to have fully functionnal ZappAppleBuilderS & Zapp-Android environment.
This includes:

- access to both ZappAppleBuilder & Zapp-Android repos
- [ruby environment](/dev-env/ruby.md)
- latest zapptool
- Xcode 11.2.x
- Android studio 3.1.1 with Gradle 4.5.1

The ZappAppleBuilder and Zapp-Android workspaces don't need to be in the same folder. They can be located anywhere on your environment.

## Project workflow

First thing you need is a Zapp app. Create one version for iOS and one for android. You can use any recent SDK, but for a start we recommend the latest dev on each platform.
Pick up your your app version ids and save them for later.

### Prepare your QuickBrick workspace (when contributing on the main repository)

First of all, clone [the QuickBrick repo](https://github.com/applicaster/QuickBrick), and run `yarn setup` to automatically install all dependencies.
Then run the following process inside the cloned repo :

```
$ yarn zapplicaster prepare -a <app_version_id>
```

You can run the script for both your iOS & android version - the QuickBrick workspace allows you to set up simultaneously for one android & one iOS version, without one replacing the other. This is particularly helpful to work simultaneously on a the iOS and android version of a given app.

This command will retrieve the zapp configuration files for these versions and inject them in the `zapp-react-native-development-app` package.
Please note that if you add / remove plugins, or change the rivers.json configuration in Zapp, you will need to run the prepare command again to get the most recent configuration file locally.

### Prepare your plugin workspace (when creating a plugin)

When creating a plugin, you don't have to work within the Zapp-React-Native repo.
Simply follow these steps:

- Create a folder for your project
- Initialize your git repository by running `git init`
- run `npm init` to initialize your package.json file for your plugin.
- Run `npx @applicaster/zapplicaster-cli prepare -a <app_version_id> -d .` to bootstrap your plugin's workspace. You can optionaly use the `-y` option to use yarn instead of npm in your project. This will install all the required initial dependencies and add some npm scripts for your project.
- Add a `main` property to your package.json which points to the file where your plugin's entry point will be. This is the file which will be reached when importing your plugin through npm
- Add a `.npmignore` file with all the files you don't want to push to npm (like the QuickBrick bootstrap files for instance)
- Edit `index.js` to import your plugin code, and either push it to the plugin's array, or in the `components` property of the `createZappApp` function call if your plugin is a Ui Builder `ui_component`
- Manually update the file `config/rivers.json` to insert data which will result in your plugin showing up in the app. If you're not sure how to achieve this, ask #support or a member of the Zapp Team

That's it, you're ready to run your app and start coding !

### run on iOS emulator

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
