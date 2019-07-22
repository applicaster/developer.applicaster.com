# Push plugin - Android

The iOS push plugin for Zapp is based on implementing the `PushContract`.
The protocol goes through all of the functions for initializing a push provider.

## Create a new push provider

This chapter describes how to build a push provider plugin. What kind of preparations are necessary, which interface methods should be implemented etc.

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
    * You should already have a valid Bintray privileges, if this is not the case go back to [getting-started](/getting-started/zapp-plugins.html) guides and read it in depth.

3. In the app level build.gradle file add a dependency to `com.applicaster:applicaster-android-sdk` as follows:

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

4. Create a public class for your push provider plugin and implement the `PushContract` interface inside. In terms of class imports, the `PushContract` interface requires the following:

    ```java
    import com.applicaster.plugin_manager.push_plugin.PushContract
    import com.applicaster.plugin_manager.push_plugin.helper.PushPluginsType
    import com.applicaster.plugin_manager.push_plugin.listeners.PushTagLoadedI
    import com.applicaster.plugin_manager.push_plugin.listeners.PushTagRegistrationI
    ```

### Interface description

The below describe the `PushContract` interface methods.

#### Initialization

Initialize your push provider

```java
void initPushProvider(Context context);
```

#### Registration

Register to your push provider

```java
void registerPushProvider(Context context, String registerID);
```

#### Configuration JSON Parameters

Get the plugin configuration JSON in a map form for later usage

```java
void setPluginParams(Map params);
```

#### UNSubscribe/Subscribe for Tags

UNSubscribe/Subscribe to a push provider tags

```java
void addTagToProvider(Context context, List<String> tag, PushTagRegistrationI pushTagRegistrationListener);

void removeTagToProvider(Context context, List<String> tag,PushTagRegistrationI pushTagRegistrationListener);
```

#### Tag List

Get the push provider tag list

```java
void getTagList(Context context, PushTagLoadedI listener);
```

#### Get Plugin Type

Return the plugin type, choose `Applicaster` for now

```java
PushPluginsType getPluginType();
```

*__Note__:*
The received Context is a Application Context.

## Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)
