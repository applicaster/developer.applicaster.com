# Download a development project

In order to help developers iterate on plugins, after submitting an initial version or making code fixes to an existing version, Zapp gives the option to prepare a downloadable project.

This project enables developers to debug and add features using their development repository and to run the project in the full context of an existing app.

## Building a development project from Zapp
In zapp - choose the app family you are developing the plugin with.
It is preferable to do this after an initial plugin is already published and attached to the version.

### Build project
In order to trigger a build from zapp please follow the steps below.

1. Click the build button on the version the plugin is attached to:
![](/assets/download-development-project-1-build.png)
2. Click `For Plugin Developers`:
![](/assets/download-development-project-2-build.png)
3. Click the checkbox:
![](/assets/download-development-project-3-build.png)

### Download project
After build finishes successfully you are now ready to download the project.

1. Click the download button:
![](/assets/download-development-project-4-download.png)
2. click `Development Project`:
![](/assets/download-development-project-5-download.png)

## Configuring project per platform
The downloaded projects are ready to run at this stage with no additional steps for debugging the initial version of the plugin.
However sometimes it makes more sense to point to a local development version of the dependancy.

The following instructions per platform will assist with changing your local project.

### iOS

__Note__: before testing make sure that the project is working for you out of the box. There is no need to run pod update or pod install on this step.

#### Internal developers with access to Applicaster private repositories:
1. Update the `Podfile` to include your `podspec` local path.
2. Run `pod install --no-repo-update` in order to point to your local pod.

If you are adding files or assets in your development pod - run `pod update YourPlugin --no-repo-update` to update your changes in the project.

#### External developers with no access to Applicaster private repositories (EXPERIMENTAL)
1. Update the `Podfile` to include your `podspec` local path.
2. In the `Podfile` comment out `source 'git@github.com:applicaster/CocoaPods-Private.git'`
3. Run `pod update YourPlugin --no-repo-update`.

If this fails to work - please contact Applicaster Dev relation team for an alternative solution / development project.

### Android

1. Download a development project from Zapp and verfiy its working on a simulator or device.
2. Go to `app/assets/applicaster.properties` and set or add: `avoidRemotePluginConfigurationsFetching=true`.
3. Go to `app/res/raw/plugin_configurations.json` and add this JSON object to the bottom on the JSON array: 

    ```javascript
    { 
        "plugin": {
            "api": {
                "require_startup_execution": true,
                "class_name": "com.example.exampleAdapter"
            },
            "author_name": "developer E-mail",
            "manifest_version": "0.1.0",
            "name": "name of your plugin",
            "description": "short plugin description",
            "type": "general",
            "identifier": "string based identifier",
            "ui_builder_support": false,
            "whitelisted_account_ids": [],
            "min_zapp_sdk": "6.5.0",
            "react_native": true/false,
            "screen": true/false,
            "react_bundle_url": {}
        }
    }
    ```
    __Note__: the `class_name` has to be a meaningful name, in this example `com.example.exampleAdapter` represents the `<package-name>.<class-adapter-name>`.

    __Note__: If your plugin supports react-native one set `react_native` to true otherwise set it to false.

    __Note__: If your plugin is a screen-plugin set `screen` to true otherwise set it to false.




4. Connect your plugin to the development app by adding the module in the project and app level.
    * Go to the app `setting.gradle` file and append the plugin as new project to the app, for example:
        ```gradle
        include <other_values>, ':myPlugin'
        project(':myPlugin').projectDir = new File('mainPluginFolder')
        ```
        __Note__: `myPlugin` is your plugin name, choose something meaningful.

    * Connect the plugin the the app-level gradle file by setting the following following:
        ```gradle
        implementation (project(':myPlugin')) {
            exclude group: 'com.applicaster',
            module: 'applicaster-android-sdk'
        }
        ```
5. build and test your app on a simulator or device.
