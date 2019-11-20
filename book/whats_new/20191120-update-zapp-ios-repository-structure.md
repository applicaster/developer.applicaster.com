# Update to Zapp-iOS repository structure

This article will go through recent changes in Zapp iOS repository.

1. Plugins SDKs repositories which were used as submodules on [Zapp-iOS](https://github.com/applicaster/Zapp-iOS) project, were removed. From now on, these SDKs can be used as a direct dependency for specific plugin if it needs to inherit from the base provider.
For the list of SDKs and the latest versions see section 3.

2. Plugins SDKs repositories refactored to contain only the base class of specific plugin type.
  - Protocols related to the plugins type were moved to [ZappPlugins](https://github.com/applicaster/ZappPlugins-iOS) repo, included in version `11.0.0`.
  - Manager of the specific plugin type was moved to [ZappSDK](https://github.com/applicaster/ZappSDK-iOS) repo.

3. New versions of Plugins SDKs are as follows:
  - ZappGeneralPluginsSDK (10.0.0)
  - ZappAnalyticsPluginsSDK (10.0.0)
  - ZappNavigationBarPluginsSDK (10.0.0)
  - ZappAnalyticsPluginsSDK (10.0.0)
  - ZappCrashlogsPluginsSDK (3.0.0)
  - ZappPushPluginsSDK (10.0.0)
  - ZappBroadcasterPickerPluginsSDK (10.0.0)
  - ZappRootPluginsSDK (10.0.0)

4. If specific plugin needs direct access to the manager of other plugins type, it can be done using ZAAppConnector instance pluginsDelegate property.
  - for example:
    ```
    ZAAppConnector.sharedInstance().pluginsDelegate?.loginPluginsManager?.createWithUserData()
    ZAAppConnector.sharedInstance().pluginsDelegate?.pushNotificationsPluginsManager?.getProviders()
    ZAAppConnector.sharedInstance().pluginsDelegate?.generalPluginsManager?.adapter(by: pluginIdentifier)
    ```

5. Plugins that has direct access to other plugins type managers should be updated to use latest versions of ZappPlugins and remove usage of the other plugins type SDK as not needed.

6. Min SDK for this change is 13.0.0
