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
1. Ensure that the plugin you are working on has been installed on Zapp
    1. Go to the version you are working on -> Plugin configuration, find your plugin and add to build.
    2. If you added the plugin in the step above, run the build again following the steps above. 
2. Download the project, and edit the podfile:
    1. Comment out your pod under the line `Zapptool pods - Do not remove or change` and add another line pointing to your local version like
    `pod '<pod name>', :path => '<path to podspec>'`
    2. If necessary also comment out `target ’NotificationServiceExtension’`
3. In the downloaded project folder in your terminal program run `pod update <pod name as appears in the podfile> —no-repo-update`

If this fails to work - please contact Applicaster Dev relation team for an alternative solution / development project [here](/contact_us/help_desk.md).

### Android

1. Download a development project from Zapp and verfiy its working on a simulator or device.
2. Go to `app/assets/applicaster.properties` and set or add: `avoidRemotePluginConfigurationsFetching=true`.
3. Go to `app/res/raw/plugin_configurations.json` and add this JSON object to the top of the JSON array file: 

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
    __Notes__
    * The `class_name` has to be a meaningful name, in this example `com.example.exampleAdapter` represents the `<package-name>.<class-adapter-name>`.

    * If your plugin supports react-native set `react_native` to true otherwise set it to false.

    * If your plugin is a screen-plugin set `screen` to true otherwise set it to false.
    *  Since there is more than one startup hook plugin, it’s best to add your plugin to the first location of the plugin configuration JSON array file in order to be called first.

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
5. To be able to debug correctly, please turn off pro-guard from the app level Gradle script.

6. Build and test your app on a simulator or device. Make sure you delete the app or perform a clean cache before installing the app again.
