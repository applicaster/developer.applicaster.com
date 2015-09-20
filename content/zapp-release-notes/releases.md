# Zapp Release Notes

* [Release Notes](#)
* [Known Issues](#known-issues)


## 1.4.0 Zapp-Roles - (Sep 20, 2015)

### New Features

* You can access Zapp production form [zapp.applicaster.com](https://zapp.applicaster.com)
* Zapp now has 3 types of roles of authorisation (managed from applicaster accounts)
	* **SDK Developer** - Can create edit & deleted SDK versions
	* **App Admin** - Can create edit & delete apps. Can create edit & delete app versions. Can configure assets and localisation strings.
	* **User** - Can configure assets and localisation strings of existing app versions.

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

## <a name="known-issues"></a> Known Issues

### General
* Currently automated build is only available on Android.
* Zapp supports building a single template without the option to configure app colours.

### Assets Section

* ‘empty' thumbnail doesn’t appear after deleting an asset.
* trash doesn’t always appear when uploading an asset.




