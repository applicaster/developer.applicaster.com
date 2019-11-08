# Error Monitoring plugin - Android

The Android Error Monitoring plugin for Zapp is based on implementing the `CrashlogPlugin` interface.
The interface goes through all of the functions for initializing an Error Monitoring provider.

## Create a new Error Monitoring plugin

This guide describes how to build an Error Monitoring plugin, what kind of preparations are necessary, which interface methods should be implemented etc.

### General Implementation

Before you start, please do the following important steps:

1. Create a `library` project using Android Studio.
2. At the app level build.gradle go to the repositories section and add the Applicaster private Bintray server as follows:

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

    *__Note__*
    * make sure you already have a valid Bintray privileges, if this is not the case go back to [getting-started](/getting-started/zapp-plugins.html) guides and read it in depth.

3. At the app level build.gradle file add a dependency to `com.applicaster:applicaster-android-sdk` as follows:

    ```gradle
    dependencies {
        // Applicaster SDK
        def applicasterSDKPath = 'com.applicaster:applicaster-android-sdk:4.1.1'

        // Check if an open SDK is defined - if not use the closed one.
        def devSDK = findProject(':applicaster-android-sdk')
        if(devSDK != null){
            implementation project(':applicaster-android-sdk')
        }
        else{
        implementation (applicasterSDKPath)
    }
    ```

4. Create a public class for your push provider plugin and implement the `CrashlogPlugin` interface inside. In terms of class imports, the `CrashlogPlugin` interface requires the following:

    ```java
    import com.applicaster.plugin_manager.crashlog.CrashlogPlugin
    ```
5. Start the plugin development.

### Interface description

The below describe the `CrashlogPlugin` interface methods.

#### Initialization

Initialize your push provider passing the plugin configuration JSON form later usage

```java
fun init(configuration: Map<String, String>?)
```

#### Activation

Activate your Error Monitoring provider passing the application.

```java
fun activate(applicationContext: Application)
```

### Plugin Manifest

Make sure to specify plugin type as `error_monitoring`
```json
  "type": "error_monitoring"
```

## Links to Examples

* [Crashlog Plugin Manifest](https://zapp.applicaster.com/admin/plugin_versions?id=crashlogs_appcenter&platform=android)
* [Crashlog Plugin Repository](https://github.com/applicaster/AppCenterCrashlogPlugin-Android)

## Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)
