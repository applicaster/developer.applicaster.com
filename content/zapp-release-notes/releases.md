# Zapp Release Notes

## 1.7.0 Bulk Upload - (Jan 6, 2016)

* You can now upload all assets in a bulk using zip file.
> Note: folder structure, file names and sizes are crucial for a successful upload.
* Apps home new UI. + Option for searching the apps.


## 1.6.0 L1 - (Dec 23, 2015)

## New Features

* Bug Fix - keys are updated when upgrading an SDK.
* Bug Fix - Debug dialog is enabled on Android on debug versions.
* Monitoring of app build status on Slack - channel #platform_notifictions



## 1.5.0 L1 - (Dec 22, 2015)

## New Features

* L1 layout ready for use for both iOS & Android.
* Full keys support for assets, styles, analytics, localization.
* Support for left to right and right to left from the Zapp UI.
* UI improvements - add breadcrumbs in Zapp.


## Known Issues

* Keys are being reset when upgrading the SDK.
* No debug dialog on debug version on Android.
* No notifications when build failed.

***

## 1.4.0 Zapp-Roles - (Sep 20, 2015)

### New Features

* You can access Zapp production form [zapp.applicaster.com](https://zapp.applicaster.com)
* Zapp now has 3 types of roles of authorization (managed from applicaster accounts)
	* **SDK Developer** - Can create edit & deleted SDK versions
	* **App Admin** - Can create edit & delete apps. Can create edit & delete app versions. Can configure assets and localization strings.
	* **User** - Can configure assets and localization strings of existing app versions.

## 1.3.0 Open-Customer-Permissions - (Sep 7, 2015)

### New Features

* Customers can now configure their apps’ texts remotely without going through the
project manager.
* Customers can now set their apps’ assets.

> **Note:** To see the assets changes in action. A new build is required.

* Zapp now alerts the user if there are any configurations missing for a
successful build.

## 1.2.0 Android-Automation - (Aug 27, 2015)

### New Features

Allow to build an Android app for a specific account with a given single template.

> Follow [Account setup manual](https://docs.google.com/document/d/1MzUKNgwbYy8HtVl0apN6Wqk6POr7CkBtb-sKM0eYqyk/edit) To configure manual settings that currently are not included on the auto-build process.


***

## 1.1.0 Assets-Control (Aug 4, 2015)

### New Features

Allow to configure all app image assets.
developers can download the created asset library and embed it in their code.

> Any update of the assets will require a new build.


***

## 1.0.0 Remote-Localisation (Jul 8, 2015)

### New Features

Allow to configure remotely all texts of the app including their translations.

***
