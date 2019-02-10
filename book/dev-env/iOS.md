# iOS

iOS plugins can be written with Swift or Objective C.

To be able to write iOS native plugins, you will need to make sure you are setting your iOS environment to:

* [Xcode version 10.0.0](https://download.developer.apple.com/Developer_Tools/Xcode_10/Xcode_10.xip)
* Swift version `4.1`
* Make sure that your plugin is `bitcode enable`
* Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) version `1.5.3`

## Download iOS development project

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRBD1LkNz5SoSH8XM1DkSrFlL5k5wyLtK2uWxoqkC4Mr7aGnL3UWx1mbVhdAXj9m64ptDiB9gp-JaBX/embed?start=false&loop=false&delayms=5000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

Enable developers to develop and debug their plugins on a real env/project.

After downloading the Development Project please make sure to add your local plugin pod by:
1. Updating the `Podfile` to include your `podspec` local path.
2. Run `pod install --no-repo-update` on your terminal to add your plugin pod.
3. Run `pod update YourPlugin --no-repo-update` to update your changes.