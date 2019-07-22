# Push plugin - Android

## Create a new push provider

### General Implementation

Before you start please do the following important steps:

1. Create a `library` android studio project.
2. In the app level build.gradle go to the repositories section add the applicaster private bintray server as follows: 

    ```gradle
    repositories {
        jcenter()
        mavenCentral()
        maven { url 'https://maven.google.com' }
        maven { url 'https://jitpack.io' }
        maven {
            credentials {
                username System.getenv("MAVEN_USERNAME")
                password System.getenv("MAVEN_PASSWORD")
            }
            url 'https://dl.bintray.com/applicaster-ltd/maven'
        }
    }
    ```
2. In the app level build.gradle file add a depedentcy to `com.applicaster:applicaster-android-sdk` as follows:
    ```gradle
    dependencies {
        // Applicaster SDK
        def applicasterSDKPath = 'com.applicaster:applicaster-android-sdk:2.38.2'

        // Check if an open SDK is defined - if not use the closed one.
        def devSDK = findProject(':applicaster-android-sdk')
        if(devSDK != null){
            implementation project(':applicaster-android-sdk')
        }
        else{
        implementation (applicasterSDKPath)
    }
    ```
3. create a public class for your push provider plugin and implement the `PushContract` interface inside. In terms of class imports, the `PushContract` interface requires the following: 

    ```java
    import com.applicaster.plugin_manager.push_plugin.PushContract
    import com.applicaster.plugin_manager.push_plugin.helper.PushPluginsType
    import com.applicaster.plugin_manager.push_plugin.listeners.PushTagLoadedI
    import com.applicaster.plugin_manager.push_plugin.listeners.PushTagRegistrationI
    ```

### Interface description

The below table describe the `PushContract` interface mehtods.

| Method | Description |
| --- | --- |
| registerPushProvider | Register to your push provider|
| initPushProvider | Initialize your push provider|
| setPluginParams | Get the plugin configuration JSON for later usage|
| addTagToProvider | Subscribe to a push provider tags |
| removeTagToProvider | Unsubscribe to a push provider tags |
| getPluginType | Return the plugin type, choose `Applicaster` for now|
| getTagList | get the push provider tag list |

*__Notes__:*

* The received Context is an application Context.

### Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)


### Public examples

We have created a public Github repository plugin for [firebase](https://github.com/applicaster/zapp-push-plugin-firebase) for both iOS/Android.