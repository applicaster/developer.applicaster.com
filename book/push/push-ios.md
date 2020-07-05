# Zapp Push Plugins
The iOS push plugin for Zapp is based on implementing the `ZPPushProviderProtocol`.
The `ZPPushProviderProtocol` goes through all of the functions for initializing a push provider.

1. [Create a New Push Provider](#create)
2. [Rich Media Notifications](#rich)
3. [Plist Addition](#plist)
4. [Useful Related Documentation](#useful)
4. [Podspec additions for the notification extensions](#podspec)

### Create a New Push Provider {#create}

This chapter describes how to build a push provider plugin. What kind of preparations are necessary, which protocol methods should be implemented etc.

##### General Implementation

Before you start, please do the following important steps:

1. In your cocoapods file, add the following sources:
```ruby
source 'git@github.com:applicaster/CocoaPods.git'
source 'git@github.com:applicaster/PluginsBuilderCocoaPods.git'
```
then add `pod 'ZappPushPluginsSDK` to your target/s
2. Create a new file for you plugin adapter that imports `ZappPushPluginsSDK`
3. Create a new class inherit from `ZPPushProvider`
4. Start the plugin development

*__Notes__:*

* By inheriting `ZPPushProvider` which is a base class for a push provider protocol you can wrap your push provider logic and use it inside the Zapp app.
* The `ZPPushProvider` class implements the `ZPPushProviderProtocol` protocol which is the protocol you should implement in every push provider plugin.

###### Protocol description

The below describes the `ZPPushProviderProtocol` protocol methods.

###### Base Parameters

Add base parameters

```swift
func setBaseParameter(_ value:NSObject?, forKey key:String)
```

###### Get Provider Key

Return a unique `string` base key

```swift
func getKey() -> String
```

###### Configure Provider

Initialize and register to your push provider and return the state setup

```swift
func configureProvider() -> Bool
```

###### Add/Remove Tags

UNSubscribe/Subscribe to all relevant tags

```swift
@objc optional func addTagsToDevice(_ tags: [String]?, completion: @escaping (_ success: Bool ,_ tags: [String]?) -> Void)

@objc optional func removeTagsToDevice(_ tags: [String]?, completion: @escaping (_ success: Bool, _ tags: [String]?) -> Void)
```

###### Get Device Tags

Get device's tag list

```swift
@objc optional func getDeviceTags() -> [String]?
```

###### Notifications

Register Token with push server

```swift
@objc optional func didRegisterForRemoteNotificationsWithDeviceToken(_ deviceToken: Data)
```

Register userNotificationSettings with push server

```swift
@objc optional func didRegisterUserNotificationSettings(_ notificationSettings: UIUserNotificationSettings)
```

## Rich Media Notifications {#rich}

When push notification arrives in an iOS app,  you may want to be able to download content in response to it or edit the content before it’s shown to the user. In iOS 10 and later, Apple allows apps to do that using new Notification Service Extension.

The following steps will help you setup and add a Notification Service Extension to an app:

1. Add an extra dependency inside the plugin manifest for the `Notification Service Extension` or `Notification Content Extension`  which should be published with cocoapods. In the following example, we added support for the `UrbanAirship App Extensions` file.

    Here's an example taken from the urban airship:

    ```json
    "extra_dependencies": [
        {
            "NotificationServiceExtension": {
                "ZappPushPluginUrbanAirship/ServiceExtension": "'~> 12.0.0'"
            },
            "NotificationContentExtension": {
                "ZappPushPluginUrbanAirship/ContentExtension": "'~> 12.0.0'"
            }
        }
    ],
    ```

    *__Note:__* If the app extension's pod spec is included in a separate specs repository, please add it to the `dependency_repository_url` array inside the manifest JSON.

2. The following keys should be added to the manifest's `custom_configuration_fields` as shown below in order to allow: 
    * push notifications in debug builds
    * service extension for store builds
    * content extension for store builds

    ```json
    "custom_configuration_fields": [
        {
            "type": "checkbox",
            "key": "allow_enterprise_rich_push_notifications",
            "default": 1
        },
        {
            "type": "uploader",
            "key": "notification_service_extension_provisioning_profile",
            "tooltip_text": "Upload Notification Service Extension Provisioning Profile for Store builds only"
        },
        {
            "type": "uploader",
            "key": "notification_content_extension_provisioning_profile",
            "tooltip_text": "Upload Notification Content Extension Provisioning Profile for Store builds only"
        }
    ]
    ```

    *__note__:* We are using the extension provisioning profile file on the Zapp app release proccess.  

## Plist Addition {#plist}

We give that ability to add key-value parameters to app plist file. You can add new values in the plugin manifest `api.plist` section.

In the following example we added three parameters to the plist:

```json
"api": {
    "require_startup_execution": false,
    "class_name": "APPushProviderUrbanAirship",
    "modules": [
      "ZappPushPluginUrbanAirship"
    ],
    "plist": {
      "NSLocationAlwaysAndWhenInUseUsageDescription": "Your current location will be used to enable location based push notifications.",
      "NSLocationWhenInUseUsageDescription": "Your current location will be used to enable location based push notifications.",
      "NSLocationAlwaysUsageDescription": "Your current location will be used to enable location based push notifications."
    }
}
```

## Podspec {#podspec} 

* Min version for QB iOS SDK: 0.1.0
* Min version for Native iOS SDK: 14.1.10


To be able to add your custom implementation for the notification extension target on the project (one or more extensions)
1. Create following folders structure in your repo (for one or both extension types)
```bash
    |-- Extensions  
    |   |-- service 
    |       |-- NotificationService.swift
    |   |-- content 
    |       |-- NotificationViewController.swift
    |
    |-- Scripts 
    |   |-- prepare_service_extension.sh
    |   |-- prepare_content_extension.sh
```
Extensions folder will have the implementation for the notification extension main class that will replace default implementation exists on our project.

2. Add `prepare_service_extension.sh` script with following code for the service extension

* for QB SDK, set project base folder to : BASE_FOLDER="ZappiOS"
* for Native SDK, set project base folder to : BASE_FOLDER="Zapp-iOS"

```bash
    #set project base folder
    BASE_FOLDER="ZappiOS"

    #Finds the project level dir
    export ZAPP_HOME=`find /Users/$USER -name $BASE_FOLDER | head -n 1`
    echo "The ZAPP_HOME dir is $ZAPP_HOME"

    # Get NotificationService.swift file path
    old_file_path=`find "$ZAPP_HOME" -maxdepth 3 -name "NotificationService.swift" | tail -1`
    new_file_path="Extensions/service/NotificationService.swift"

    echo "Replacing file: $old_file_path"

    if [ -z "$old_file_path" ]; then
        echo "Can't find the NotificationService.swift file, going to skip this script."
    else
        mv $new_file_path $old_file_path
    fi
```
3. Add `prepare_content_extension.sh` script with following code for the content extension

* for QB SDK, set project base folder to : BASE_FOLDER="ZappiOS"
* for Native SDK, set project base folder to : BASE_FOLDER="Zapp-iOS"

```bash
    #set project base folder
    BASE_FOLDER="ZappiOS"

    #Finds the project level dir
    export ZAPP_HOME=`find /Users/$USER -name $BASE_FOLDER | head -n 1`
    echo "The ZAPP_HOME dir is $ZAPP_HOME"

    # Get NotificationService.swift file path
    old_file_path=`find "$ZAPP_HOME" -maxdepth 3 -name "NotificationViewController.swift" | tail -1`
    new_file_path="Extensions/content/NotificationViewController.swift"

    echo "Replacing file: $old_file_path"

    if [ -z "$old_file_path" ]; then
        echo "Can't find the NotificationViewController.swift file, going to skip this script."
    else
        mv $new_file_path $old_file_path
    fi
```
4. Add `prepare_command` to the podspec file which will run separate scripts created above to replace main notification swift class with your implementation
```ruby
    s.prepare_command = <<-CMD
                            sh Scripts/prepare_service_extension.sh
                            sh Scripts/prepare_content_extension.sh
                            CMD
```

## Useful related documentation {#useful}

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)
* [How to Enable Rich Push Notifications for Store Versions on iOS](https://applicaster.zendesk.com/hc/en-us/articles/360021701432-How-to-Enable-Rich-Push-Notifications-for-Store-Versions-on-iOS-Notification-Service-Extension-)
* [How to Enable Rich Push Notifications for Debug Enterprise Versions on iOS](https://applicaster.zendesk.com/hc/en-us/articles/360024894431-How-to-Enable-Rich-Push-Notifications-for-Debug-Enterprise-Versions-on-iOS)
