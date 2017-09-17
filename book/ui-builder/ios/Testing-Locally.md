# Testing UI Builder Locally

Local changes can only be tested on the iOS Simulator, included with Xcode.

## Setup

In order to test changes to UI builder:

1. Install a local server program, such as [ws](https://www.npmjs.com/package/ws)
2. Run `ws` from the command terminal.
3. In the root folder from which you are running `ws`, create a folder called `ui_builder`.
4. Download the latest version of the UI builder's [AppDefine.json](http://components.applicaster.com.s3.amazonaws.com/ui_builder/v1.0/AppDefine.json) file into that folder.
5. Download your app's `rivers.json` file:
  1. In [Zapp](https://zapp.applicaster.com), find your app and open the its Info screen, as shown below.
    ![App info](/assets/App-Info.png)

  2. Find the "rivers" JSON URL at the bottom, which represents the layouts defined in UI builder.
    ![Rivers JSON URL](/assets/rivers_url.png)
    Download the JSON and save it to your `ui_bulider` folder (created in step 3).
6. Your `ui_builder` folder should now look like this:
   ![ui_builder folder](/assets/ui_builder_folder.png)

## Running in app

In order to test your changes in the app:

1. Open the `Settings` app and find your app in the bottom section.
![App-Settings](/assets/App-Settings.png)
   
2. In the app settings, change the `APPLICASTER COMPONENTS SERVER` to `Local`.
![Server-Type](/assets/Server-Type.png)
   
3. Restart the application.