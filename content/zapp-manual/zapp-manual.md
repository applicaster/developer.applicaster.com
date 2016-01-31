# Zapp Configuration Manual

## Introduction
This manual was created to guide Applicaster employees on how to create and set up a new app for a new account.

The idea is to have an app ready from a chosen Zapp template with all common Applicaster features enabled with sample of content.



### The following should be configured separately - please ask support help if needed.

* Setting up push notifications.
* Setting up app Feed, CrossMates, GroupChat in Stars or Starlight.
* Uploading videos manually or setting up ingestion.
* Setting up Atom feeds for news articles.
* Configuring app template specific collection.
* Configuring app template specific extensions.

[The road is long…](https://www.youtube.com/watch?v=Si7gu9yGz64) but its going to get shorter.

## Prerequisites
Before you begin, open a new browser window and open the following links (each one on its own separate tab) **Make sure you can login to all those links**:

* [accounts.applicaster.com - Accounts](https://accounts.applicaster.com)
* [admin.applicaster.com - Applicaster2](http://admin.applicaster.com)
* [zapp.applicaster.com](https://zapp.applicaster.com)

> Note: Each time you’ll need to move between tabs - a note with the name of the tab will be shown.

![](./prerequisites.mov.gif)

## Create a new account
On `(Accounts tab)` - Create a new account in accounts.applicaster.com
Click on Accounts → New

![](./accounts_create_new_account.png)

## Enable all relevant account features (Applicaster2 Tab)

* Click on the Management tab - it will open up in the Accounts section. Click on the account link you just created.

> Note: It might take a few minutes to have the account link available.

![](./mgmnt-accounts.png)

Check all relevant features in the Feature management section:

> Note: Make sure you do not mark the “Allow New Content System” as this will disable the option to use content ingestion.

![](./acount-features.png)


## Creating the main Content Category (Applicaster2 Tab)
Go to the VOD section (make sure you selected the account you just created)

Create the first Content Category (make it of type generic) - it’s name should be “Content”

![](./create-content.png)

Go back to the Broadcaster section under Management - and choose the Content Category you just created as the content category.

![](./broadcaster.png)

![](./broadcaster2.png)


## Create a New App (Applicaster2 Tab)
Go to Management -> Apps -> New

** If you are creating both iOS and Android apps you should do the following process twice - one for each platform.

* Give your new app a name.
* Choose Identifier - this will be used as the unique identifier in the AppStore or the GooglePlay store. The name should be as follows com.<app_name>  where <app_name> should be replaced with the desired app name - use lowercase letters and numbers only.

* Choose the desired store (only iOS or Android are currently supported).
* Pick the account you just created.
* Give the app a URL scheme - you can use the same <app_name> you used above - but make sure that you put the same scheme for both the Android and iOS apps you create.


![](./new_app.png)

![](./url-scheme.png)


## Create a New App phase 1 (Zapp Tab)
Click on the ’New App’ button
Choose the account you created and give your app a name - **name should not contain spaces or special characters**.

## Create a New App phase 2 (Zapp Tab)
Choose your preferred language (you’ll be able to change it later on)

![](./zapp-lang.png)

## Create a New App version
You’ll need to do this process per platform if you plan to release both Android and iOS versions.

Click on your newly created Zapp app.

![](./zapp-apps.png)

Click on the button to create new version.

* Select the store type (Apple Store - iOS or Android - Google Play)
* Device target - use Universal if there is a single app for both tablet and smartphone.
* App name should be pre-configured - leave as is.
* Bundle Identifier should be pre-configured - leave as is.
* Version give the wanted app version - for new apps start with version 1.0
* SDK version should be pre-configured - leave as is.
* Choose a template according to your needs. If you don’t know what template to choose please consult the Zapp PO.

> If there is already a version created for this app - you'll see another field called 'Import Settings From' - please use the ‘SDK’ option.

### Fill out optional fields
* In the URL scheme put the same URL scheme you put when you created the app on Applicaster2 (earlier in the manual).
* Facebook App ID - Please contact support if you don’t know how to set a Facebook App ID.
* Twitter API Key - Please contact support if you don’t know how to set Twitter.
* Twitter API Secret - Please contact support if you don’t know how to set Twitter.
* Crash log ID - Please contact support if you don’t know how to set the crash log id.

![](./zapp-app-version.png)

# Specific configurations Per template.
Once you finish all the steps above you should continue to configure the app’s content - collections and categories according to the app structure & template. Please refer to the specific template manual for more information.

