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

