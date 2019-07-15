# Startup Hooks

Some plugins need an initial startup to either:
* Present a screen gateway at app launch
* Do an initial setup and try to silently login, update entitlements, etc.

In order to implement this, a plugin have to utilize the `ApplicationLoaderHookUpI` interface.

In addition, you will need to set a proper configuration inside the manifest file.

## Interface Methods

Those functions can be found in the `ApplicationLoaderHookUpI`, which contains the following functions:
``` java
  /***
     * this function is called after all the data loaded and before main activity opened.
     * @param context generic intro activity
     * @param listener listener to continue the application flow after execution finished.
     */
    void executeOnApplicationReady(Context context, HookListener listener);


    /***
     * this function is called after Plugins loaded, you can add logic that not related to the application data
     * as Zapp strings or applicaster models.
     * @param context APIntroActivity
     * @param listener listener to continue the application flow after execution finished.
     */
    void executeOnStartup(Context context, HookListener listener);
```