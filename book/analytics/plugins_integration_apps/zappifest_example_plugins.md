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