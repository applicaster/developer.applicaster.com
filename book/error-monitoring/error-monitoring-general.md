# Error Monitoring Plugins

A Zapp Error Monitoring plugin is used to implement an error reporting provider SDK.

Error Monitoring plugins are used in order to integrate the following capabilities:
- Monitor the health of an application
- Deliver the data needed to understand what happens when an app fails
- Collects information about crashes and errors in your apps and uploads them to the portal for analysis by the development team

The base functionality contains the following actions:
- Application activation on startup
- Generation of a crash log every time your app crashes on a real device or in a device simulator

Min supported version:
- Android: 4.1.1  
- iOS: 12.2.0

Please use one of the following guides in order to develop a Error Monitoring plugin for the relevant platform:
- [iOS](/error-monitoring/error-monitoring-ios.md)
- [Android](/error-monitoring/error-monitoring-android.md)
