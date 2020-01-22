## Running on an Android Device

It's always a good idea to test your app on an actual device before releasing it to your users. This document will guide you through the necessary steps to run your React Native app.

### Connecting to the Development Server

You can also iterate quickly on a device by connecting to the development server that is running on your development machine. There are several ways of accomplishing this, depending on wether you have access to a USB cable or a Wi-Fi network.

#### Genymotion

In case you are using **Genymotion**, due to the fact that Genymotion does not map directly to `localhost` of your computer, you will need to follow **Method 1: Using adb reverse** instructions in order to make it work.

#### Method 1: Using adb reverse (recommended)

You can use this method if your device is running Android 5.0 (Lollipop) or newer, it has USB debugging enabled, and it is connected via USB to your development machine.

Run the following in a command prompt:

```bash
$ adb reverse tcp:8081 tcp:8081
```

You can now enable Live reloading from the Developer menu. Your app will reload whenever your JavaScript code has changed.

#### Method 2: Connect via Wi-Fi

You can also connect to the development server over Wi-Fi. You'll first need to install the app on your device using a USB cable, but once that has been done you can debug wirelessly by following these instructions. You'll need your development machine's current IP address before proceeding.

You can find the IP address in **System Preferences → Network.**

1. Make sure your laptop and your phone are on the same Wi-Fi network
2. Open your React Native app on your device
3. You'll see a red screen with an error. This is OK. The following steps will fix that.
4. Open the in-app Developer menu
5. Go to **Dev Settings → Debug server host for device**
6. Type in your machine's IP address and the port of the local dev server (e.g. `10.0.1.1:8081`)
7. Go back to the **Developer menu** and select **Reload JS**

You can now enable Live reloading from the Developer menu. Your app will reload whenever your JavaScript code has changed.
