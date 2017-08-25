#How to create a new analytics provider plugin or update an existing one

[Morpheus](/analytics/morpheus/morpheus.md) and its [client-side API](analytics/client_side_api/client_side_api.md) can be used to ensure any features you are tracking have proper measurement coverage, such as behavioral events, user tracking, and screen views. However, you may have customers requesting to work with particular analytic providers that aren't currently already supported by Applicaster. In this case, you'll need to build a plug-in to support that particular provider.

Additionally, initial launches of plugins typically involve basic support for an analytics provider integrated with our custom analytic events. However, many analytics providers have advanced functionality and additional configuration options that aren't included in a basic integration. If such needs arise for currently supported providers for which plugins already exist, you'll need to update the relevant plugin.

This document outlines how to create a new analytics provider plugin or update an existing one to address these scenarios.

Note: If you would like to improve this documentation, please submit a Pull Request with your proposed changes and submit it for review to Elad Ben David and Yoni Osteen. You could send your questions or suggestions to e.bendavid@applicaster.com and y.osteen@applicaster.com.

##Android

**Follow the steps below to create a new analytics provider plug-in on the Android platform, Skip sections 1 and 2 if you want to update an existing analytics agent:**

**1. Set Your Local Environment:**<br />
  <ol>
    **a.** Ask somebody with admin rights on Github to create a new repository of you. If you don't know who has admin rights, ask on Slack. The repository should be using the naming convention 'xxxAnalyticsPlugin-Android', where xxx is the provider name<br/>
    **b.** Create a new branch from master and start adding your code there. Even though the repository was created for you, it belongs to your team.<br />
    **c.** Create a new Android library in Android Studio with a name that is based on your repository name.<br />
    **d.** Make sure your repo contains the relevant .gitigonre file, like the example [here](https://gist.github.com/vtanathip/9414323).<br />
  </ol>
**2. Prepare your project:**<br />
 <ol>
    **a.** Update build.gradle, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/build.gradle).<br />
    **b.** *Optional* - If you are using Circle CI, create circle.yml so as to set up your project on the Circle CI continuous integration system, you can find an example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/circle.yml).<br />
    **c.** Update gradle.properties, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/gradle.properties).<br />
    **d.** Specify the public fields and methods of your class that you want to keep in proguard-rules.pro. You can find an example  [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/proguard-rules.pro).<br />
  </ol>
**3. Create a New Analytics Agent Or Update an Existing One:**<br />
  <ol>
      **a.** If you are creating a new agent, it must inherit from the BaseAnalyticsAgent abstract class (com.applicaster.analytics.BaseAnalyticsAgent).<br />
    **b.** Use meaningful names for your private members and methods. Add documentation in Javadoc format. In general, your code should be well documented.<br />
    **c.** Add documentation for the class, and set link to the provider manual.<br />
    **d.** Add Unit tests for any non-trivial logic.<br />
    **e.** Add unit tests in BaseAnalyticsAgentTests for any inherited function.<br />
    **f.** Commit and push your changes<br />
    **g.** Make sure that the build was successful on CircleCI.<br />
  </ol>
  **4. Update the README file and merge your branch to master:**<br />
   <ol>
    **a.** Add release notes for any meaningful changes, including the plug-in version.<br />
    **b.** Create a Pull Request and ask another developer to review your code. After your Pull Request is approved, merge your code to the master branch. You should follow our [working agreements](https://github.com/applicaster/zapp-awesome/blob/master/working_agreements.md).<br />
  </ol>
    
**6. Create dependency to your Agent:**<br />
  <ol>
  **a.** Add an ascending tag beginning with 0.1.x. Use [semantic versioning](http://semver.org). Push your tag to the remote repository. <br />
  **b.** Verify that your plug-in binary was created successfully on a Maven repo.<br />
 </ol>
**7. Create a Plugin in Zapp:**<br />
  <ol>
  **a.** Go to [Zappifest](https://github.com/applicaster/zappifest) repository and follow the instructions there.<br />
  **b.** Make sure your plugin is working well by testing it on a Zapp application.<br />
</ol>

##iOS

**Note: For any suggested edits or improvements to this section, please submit a PR to Yael Bochman and Yoni Osteen for review. You can reach them at y.bochman@applicaster.com and y.osteen@applicaster.com.**

**Step 1 - Zapp Side**

In Zapp, you can see all the apps plugins which are configured under [the “Plugins” menu](https://zapp.applicaster.com/admin/plugins).

Each plugin contains a manifest file that contains all the configurations the plugin needs.
For Example:

```
{
  "api": {
    "class_name": "APAnalyticsProviderAgof"
  },
  "author_name": "Alex Zchut",
  "author_email": "a.zchut@applicaster.com",
  "manifest_version": "0.2.0",
  "name": "AnalyticsProviderAgof",
  "description": "Agof Analytics wrapper",
  "type": "analytics",
  "platform": "ios",
  "dependency_repository_url": [],
  "dependency_name": "ZappAnalyticsPlugins/Agof",
  "dependency_version": "0.2.0",
  "custom_configuration_fields": [
    {
      "type": "text",
      "key": "offerIdentifier"
    }
  ]
}
```

In order to create a new plugin, please read about [zappifest command](https://github.com/applicaster/zappifest).

Once you create a plugin, in order to test your work, have a look at the manifest and see that:
"type": "analytics",
"platform": "ios",
And “Custom_configuration_fields” contains the specific parameters that should be configured by the app for your plugin.

**Step 2 - iOS Side:**

❏ Create a new provider for the analytics plugin under https://github.com/applicaster/ZappAnalyticsPlugins-iOS in a new folder.
❏ Create a new provider on Swift and implement all the relevant methods.

Look at [Flurry](https://github.com/applicaster/ZappAnalyticsPlugins-iOS/blob/master/Flurry/APAnalyticsProviderFlurry/Classes/APAnalyticsProviderFlurry.swift) to see how swift provider is implemented.
Look at [Mixpanel](https://github.com/applicaster/ZappAnalyticsPlugins-iOS/tree/master/Mixpanel/APAnalyticsProviderMixpanel/Classes) in order to see how Objective C provider is implemented.

**Step 3 - Podspec and Basic Providers:**

Each provider must be added as new subspec in ```ZappAnalyticsPlugins.podspec``` file [here](https://github.com/applicaster/ZappAnalyticsPlugins-iOS/blob/master/ZappAnalyticsPlugins.podspec). The purpose of this is to enable us to use the same pod but different subspecs. For example:

```pod 'ZappAnalyticsPlugins/Flurry'```
```pod 'ZappAnalyticsPlugins/GoogleAnalytics'```

You must add a section which contains the new provider structure as illustrated below:
```
s.subspec 'GoogleAnalytics' do |ga|
    ga.public_header_files = 'GoogleAnalytics/**/*.h'
    ga.source_files = 'GoogleAnalytics/**/*.{h,m,swift}'

    ga.frameworks = 'AdSupport', 'CoreData', 'SystemConfiguration'
    ga.libraries = 'sqlite3.0', 'z'

    ga.resources = [
                  "GoogleAnalytics/**/*.xcassets",
                  "GoogleAnalytics/**/*.storyboard",
                  "GoogleAnalytics/**/*.xib",
                  "GoogleAnalytics/**/*.png"]

    ga.xcconfig =  { 'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
                      'OTHER_LDFLAGS' => '$(inherited) -l"GoogleAnalytics"',
                      'LIBRARY_SEARCH_PATHS' => '$(inherited) "${PODS_ROOT}"/**',
                      'ENABLE_BITCODE' => 'NO'
                }

    ga.dependency 'GoogleAnalytics', '~> 3.14.0'

  end
```
If you want to add it as a default provider (one that is included by default in new builds across customers), include Yoni Osteen in the PR for approval. It is worth checking before you start your work if that will be fine. 

If you get that approved, you need to add it here:

```
s.subspec 'Basic' do |basic|
    basic.dependency 'ZappPlugins'
    basic.dependency 'ApplicasterSDK'
    basic.dependency 'ZappAnalyticsPlugins/GoogleAnalytics'
    basic.dependency 'ZappAnalyticsPlugins/Mixpanel'
    basic.dependency 'ZappAnalyticsPlugins/Flurry'
    basic.dependency 'ZappAnalyticsPlugins/ComScore'
    basic.dependency 'ZappAnalyticsPlugins/Akamai'
    basic.dependency 'ZappAnalyticsPlugins/Facebook'
  end
```

Only in this situation (default provider), add it on [APAnalytics](https://github.com/applicaster/ApplicasterSDK-iOS/blob/master/applicasterSDK/Classes/Analytics/Core/APAnalytics.m) file in createAnalyticsProvidersArray method with your new provider class name.

```
//add default providers -------------
//add GA
    [self addDefaultAnalyticsProviderWithClassName:@"APAnalyticsProviderGoogleAnalytics"];
```

**Step 4 - Add new plugin to Zapp:**
Add the new plugin to the relevant app and configure its keys.

![iOS_Step4](./ios_step4.png)


