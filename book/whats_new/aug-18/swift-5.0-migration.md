# Swift 5.0 Migration
In this section, we update about all the latest changes we did for Zapp-iOS project and plugins.

1. Upgrade from Cocoapods 1.5.3 to 1.7.5.
2. Use the new cocoapods CDN source  - CocoaPods is moving to use a CDN which is located at `https://cdn.cocoapods.org/` and is still considered experimental. A future release will make it the default spec source. A CDN is a Content Delivery Network - what this means for CocoaPods is that using CocoaPods won't require you to have a local copy of all the public Podspecs on your computer. Saving you about a GB of file storage, and shaving a lot of time off `pod install`'s.
3. We cache the new cocoapod repo dir as it is very small and would save even more time by adding `~/.cocoapods/repos/cocoapods-` to the `circle-ci` caching steps scripts. 
4. Upgrade to the latest Fastlane version - this upgrade required us to update the fastlane script as well.
5. Create a combine Framework-Swift.h file - We added a solution for all out build scripts. In general, if you’re building a framework containing Swift code and using `lipo` to create a binary that supports both device and simulator platforms, you must also combine the generated Framework-Swift.h headers for each platform to create a header that supports both device and simulator platforms [reference](https://developer.apple.com/documentation/xcode_release_notes/xcode_10_2_release_notes?language=objc).

    For example, if you’ve built:

    ```
    - iOS/Framework.framework
    - iOS Simulator/Framework.framework
    ```
    Take:
    ```
    - iOS/Framework.framework/Headers/Framework-Swift.h
    - iOS Simulator/Framework.framework/Framework-Swift.h
    ```
    Create a new:
    ```
    - iOS + iOS Simulator/Framework.framework/Headers/Framework-Swift.h
    ```
    The contents of the new Framework-Swift.h should be:
    ```
    #if TARGET_OS_SIMULATOR
    <contents of original iOS Simulator/Framework.framework/Framework-Swift.h>
    #else
    <contents of original iOS/Framework.framework/Framework-Swift.h>
    #endif
    ```

## Internal Applicaster Plugin Migration

The following instructions are an for Internal Applicaster plugins that creates a closed frameworks.

1. Install cocoapods version 1.7.5 using the following command:
    ```
    sudo gem install cocoapods
    ```

2. Upgrade the following gems inside the Gemfile:
    ```
    gem 'xcpretty'
    gem 'cocoapods', '= 1.7.5'
    gem 'fastlane' (remove the versioning)
    ```

3. Update the Gemfile.lock by running `bundle install` in your main plugin directory.

4. Go to circle-ci confog.yml file and change the following:
    * Change the xcode version to 10.2.1
    * Change the deploy version to 0.8.11
    * Increment the caching key to a new version, for example: 
        ```
        KanCentralizedViewsPlugin-v3-{<other_values>} 
        ```
        Should changed to:
        
        ```
        KanCentralizedViewsPlugin-v4-{<other_values>}.
        ```
    * Make sure that all caching key’s have the same prefix name.
    * Cache the pod directory by adding to circle script the following `Restore Pods cache` and `save_cache` caching phases (check Zapp-iOS project as an example):
5. Update podspec dependencies to support swift 5.0, please check the following:
    * Make sure you also update the podspec files located inside the /Podspec-templates directory.
    * Inside each podspec file, make sure that the s.xcconfig.'SWIFT_VERSION' value is set to 5.0.
    * Update all dependencies to support swift 5.0 specs.
6. Update podfile structure according to the following steps:
    * dependencies to support swift 5.0 specs.
    * Use the new cocoapods CDN source:
        * Remove `source 'git@github.com:CocoaPods/Specs.git'`.
        * Add the new CDN `source  'https://cdn.cocoapods.org/'` (If you have private specs, add the new source below all of the other sources).
        * Run `pod deintegrate` to deintegrate CocoaPods from your project. The move to the latest CDN source may cause problems, therefore, it’s recommended to clean all cocoapods related files.
        * Run `pod install`.
7. Run pod update command and open the project with Xcode 10.2.1.
8. In side Xcode, in each of your TARGETS, change the “swift language version” to swift 5.
9. Build the framework in Xcode and make sure it’s working without errors.
10. Increment the plist framework version to a major change version notion.
11. Push your code with GIT and make sure circle-ci build process ended successfully.
12. Verify that a new podspec file was created inside our private [CocoaPods-Private](https://github.com/applicaster/CocoaPods-Private) or public [CocoaPods](https://github.com/applicaster/CocoaPods) repositories.
13. Create a new manifest file that correlates to the same version number in the framework plist and upload to Zapp.

## 3rd Party Plugins Migration

The following instructions are for 3th party developers that are not using the applicaster closed frameworks logic.

1. Install cocoapods version 1.7.5 using the following command: 
    ```
    sudo gem install cocoapods
    ```
2. Update podspec dependencies to support swift 5.0.
    * Inside each podspec file, make sure that the s.xcconfig.'SWIFT_VERSION' value is set to 5.0.
    * Update all dependencies to support swift 5.0 specs.
3. Increment the podspec to a major change version notion.
4. Create an empty xcode test project with xocde 10.2.1 and a new podfile that points to your upgraded podspec file.
5. Update podfile structure (if you already have a test project)
    * Move dependencies to support swift 5.0 specs
    * Use the new cocoapods CDN source and do the following:
        * Remove source `'git@github.com:CocoaPods/Specs.git'`.
        * Add the new CDN `source ’https://cdn.cocoapods.org/'`  (If you have private specs, add the new source below all of the other sources).
        * Run pod deintegrate to deintegrate CocoaPods from your project. The move to the latest CDN source may cause problems, therefore, it’s recommended to clean all cocoapods related files.
        * Run `pod install`.
6. Update the podfile dependencies to support swift 5.0 specs.
7. In side xcode, in each of your TARGETS, change the “swift language version” to swift 5.
8. Build the test project and make sure it’s working without errors.
9. Push your code using git.
10. Create a new manifest file that correlates to the same version number that was created in the specs directory and upload to Zapp.
