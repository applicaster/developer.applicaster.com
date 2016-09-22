## How to add analytic plugin in IOS integration application:
Applicaster supports a variety of analytics providers to which you can send your analytics data. On iOS, all the analytics providers are handled via a “plugin” system.  
The directions below outline how to add an analytic plugin to an Applicaster product or features integrated into a non-Applicaster app:  

1. Get json plugin manifest (from Zapp plugin section). 
2. Concatenate the dependency_name and the dependency_version and past the result dependency in shared_pods.  
    For example:  
    ```bash
        def shared_pods
            pod 'ZappAnalyticsPlugins/Flurry', '~> 0.4.0'
        end 
    ```
    *  if it already there, this is because it default plugin. Please jump to step 4.

3. If the ‘dependency_repository_url’ property exist, copy it and set it as source in shared_pods,  
 For example: 
    ```bash
        source 'git@github.com:CocoaPods/Specs.git'
    ```
4. In ‘Resources’ folder create new file ‘plugin_configurations.json’ and copy     the json below:
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
    * In the ‘Configuration_json’ you need to configure the json variable, you can find the json variable list in custom_configuration_fields property in plugin manifest.  
    
    For example:  
You can see from the left the plugin_configurations.json’ file and from the right the plugin manifest.  
    (./ios_analytics_plugins_example.png)
