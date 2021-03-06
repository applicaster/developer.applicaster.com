# Zapp React Native Starter Project
The Zapp React Native starter project is a template project meant to streamline the development of React Native plugins for the Zapp platform.

This project can be used both for local development and as a template for a brand new plugin.
The code for the project can be found [here](https://github.com/applicaster/Zapp-ReactNative-Starter). It is a Github template that can be used to simplify generating a new project.

## Contents
The template repository contains the following:
* React Native app based on RN 0.59 with 1 screen containing a headline and a printout of the initial props
* Sample plugin manifest

## Running the React Native Bundle
In order to run this project simply:
* Run either `npm i` or `yarn` to install all the necessery dependencies.
* Run `react-native start` to start the React Native web server.

## Building Deployable Files
The starter project contains a basic build script to generate deployable React Native bundles by running either `npm run-script build` or `yarn build`.

The following structure is used to generate the bundles:
```
 <project_folder>/build/android
 <project_folder>/build/ios
```

This can be used in a CI script in order to generate bundles and then deploy them to S3 for example.

Note: For single bundle instructions - an NPM package should be used. For more info on Single Bundle - [click here](/plugins/android/single-bundle.md).

## Testing
In order to simplify testing we have created a Zapp app that contains a React Native screen plugin to be used during development with a local running React server.
By following these steps, a developer could run their local version of the plugin within a fully featured Zapp App enviornment.

### iOS

#### Testing on a Device (Preferred methodology)

1. If you have access to Zapp, please use the [following app family](https://zapp.applicaster.com/app_families/1554) and download the latest iOS build or alternatively [download the version from hockey app](https://rink.hockeyapp.net/apps/e96cb5f66bb34ad99e0d10bdf2637ce0)
2. After the app is installed on the device, launch it and then kill it from the background
3. Go to the device settings app -> Zapp React Native Starter App
4. Under React Native Bundle -> Turn off `Allow Caching`
5. On the device -> Change the server type to `Custom` and change the IP to your computer's IP address running the RN project in the `Custom` field
6. Run the app
7. Click on the side menu in the top left corner of the screen (It's a white button, it may be hard to see)
8. Select `RN Starter`
9. Shake the phone to display the pop up debug menu and select `Enable Remote Debugging`

#### Testing on the Simulator (Advanced)

This option will run the Zapp project inside Xcode and is mainly meant to enable debugging both the React Native and Native integrations.
For more about downloading dev projects please click [here](/getting-started/download-development-project.md).

1. Download the latest zipped dev project for iOS from: https://zapp.applicaster.com/app_families/1554
2. Open the workspace file from the unzipped directory
3. Choose the simulator as the target. Run the app and stop it once it launched.
4. Go to the device settings app -> Zapp React Native Starter App
5. Under React Native Bundle -> Turn off `Allow Caching`
6. Change the React Native server type to `Local`
7. Run the app
8. Click on the side menu in the top left corner of the screen (It's a white button, might be hard to see)
9. Select `RN Starter`
10. Click `Cmd + d` on the simulator to display the pop up debug menu