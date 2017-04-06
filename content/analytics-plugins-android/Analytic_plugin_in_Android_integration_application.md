## How to add analytic plugin in Android integration application:
Applicaster supports a variety of analytics providers to which you can send your analytics data. All our analytics providers are handled via a “plugin” system.

The directions below outline how to add an analytic plugin to an Applicaster product or feature integrated into a non-Applicaster app:
  
1. Get plugin manifest json(Plugin section in Zapp).
2. Concatenate the dependency_name and the dependency_version with ‘:’ between.  
    for example:  
    ```bash
    ‘flurry:analytic-providers-android:0.1.0’.  
    ```
    past the result dependency on the build gradle in the dependencies section.  
For example:  

    ```bash
    dependencies {   
        compile ‘flurry:analytic-providers-android:0.1.+’
        compile 'akamai:akamai-analytic-providers-android:1.1.+'
        compile 'comscore:comscore-analytic-providers-android:1.1.+'
        compile 'mixpanel:mixpanel-analytic-providers-android:1.0.+'
        compile 'google_analytics:google-analytic-providers-android:1.0.+'
    }
    ```
3. Copy proguard_rules property into the ‘proguard-rules.pro’
4. If dependency_repository_url property is not empty, create new maven repository in the build.gradle and copy it into. If not, make sure you have credentials for applicaster account in maven.
5. In ‘res/raw’ folder create new file ‘plugin_configurations.json’ and copy the
    json below:

    ```bash
      [
            {
          "plugin": ‘Here past the content of the plugin manifest’,
          “Configuration_json”:{
            "api_key": "23498efsdhkj324"
          }
        }
      ]
    ```
    *   In the ‘plugin’ property past the content of the plugin manifest.  
    Remove proguard_rules and dependency_repository_url properties.
    * In the ‘Configuration_json’ you need to configure the json variable, you can find the json variable list in custom_configuration_fields property in plugin manifest.  
    
    For example:  
You can see from the left the plugin_configurations.json’ file and from the right the plugin manifest.  
   ![Difference](./android_analytics_plugins_example.png)


   You can found below more examples of our analytics plugins:
   
    ```bash
      [
        {
          "plugin": {
            "api": {
              "class_name": "google.analytics.applicaster.GoogleAnalyticsAgent",
              "proguard_rules": "-keep public class google.analytics.applicaster.GoogleAnalyticsAgent {public <fields>; public <methods>;}"
            },
            "dependency_repository_url": [],
            "author_name": "Elad Ben David",
            "author_email": "e.bendavid@applicaster.com",
            "manifest_version": "0.0.3",
            "name": "Google Analytics",
            "description": "provide Google Analytics as agent",
            "identifier": "google_analytics_android",
            "type": "analytics",
            "platform": "android",
            "min_zapp_sdk": "",
            "dependency_name": "google_analytics:google-analytic-providers-android",
            "dependency_version": "1.0.+",
            "react_native": false
          },
          "configuration_json": {
            "mobile_app_account_id": "UA-xxx",
            "custom_dimensions": "1",
            "anonymize_user_ip": "1",
            "screen_views": "1"
          }
        },
        {
          "plugin": {
            "api": {
              "class_name": "applicaster.analytics.mixpanel.MixPanelAgent",
              "proguard_rules": "-keep public class applicaster.analytics.mixpanel.MixPanelAgent {public <fields>;public <methods>;} -keep public class com.mixpanel.** {public <fields>;public <methods>;}"
            },
            "dependency_repository_url": [],
            "author_name": "Elad Ben David",
            "author_email": "e.bendavid@applicaster.com",
            "manifest_version": "0.0.3",
            "name": "Mixpanel",
            "description": "provide Mixapnel as analytics agent",
            "identifier": "mixpanel_android",
            "type": "analytics",
            "platform": "android",
            "min_zapp_sdk": "",
            "dependency_name": "mixpanel:mixpanel-analytic-providers-android",
            "dependency_version": "1.0.+",
            "react_native": false
          },
          "configuration_json": {
            "token": "xxx",
            "people": "1",
            "engagement": "1",
            "filter_out_pii": "1"
          }
        },
        {
          "plugin": {
            "api": {
              "class_name": "applicaster.analytics.akamai.AkamaiAnalyticsAgent",
              "proguard_rules": "-keep public class applicaster.analytics.akamai.AkamaiAnalyticsAgent{public <fields>;public <methods>;} -keep public class com.akamai.** {public <fields>; public <methods>;}"
            },
            "dependency_repository_url": [],
            "author_name": "Elad Ben David",
            "author_email": "e.bendavid@applicaster.com",
            "manifest_version": "1.0.0",
            "name": "Akamai",
            "description": "akamai analytics provider",
            "identifier": "akamai_android",
            "type": "analytics",
            "platform": "android",
            "min_zapp_sdk": "",
            "dependency_name": "akamai:akamai-analytic-providers-android",
            "dependency_version": "1.0.+",
            "react_native": false
          },
          "configuration_json": {
            "vod_beacons": "1234",
            "live_beacons": "1234"
          }
        },
        {
          "plugin": {
            "api": {
              "class_name": "applicaster.analytics.comscore.ComScoreAgent",
              "proguard_rules": "-keep public class applicaster.analytics.comscore.ComScoreAgent {public <fields>;public <methods>;}"
            },
            "dependency_repository_url": [],
            "author_name": "Elad Ben David",
            "author_email": "e.bendavid@applicaster.com",
            "manifest_version": "1.0.0",
            "name": "Comscore",
            "description": "comscore analytics provider",
            "identifier": "comscore_android",
            "type": "analytics",
            "platform": "android",
            "min_zapp_sdk": "",
            "dependency_name": "comscore:comscore-analytic-providers-android",
            "dependency_version": "1.0.+",
            "react_native": false
          },
          "configuration_json": {
            "customer_c2": "678",
            "app_name": "678",
            "publisher_secret": "678",
            "ns_site": "678",
            "stream_sense": "678"
          }
        }
      ]
    ```
