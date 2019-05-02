# Deploy your iOS plugin to CocoaPods

In order to distribute the plugin - part of the necessary steps is publishing a podspec.

There are a few approaches for doing this:
1. Post the pod publicly to the general Cocoapods repository, read [CocoaPods guides](https://guides.cocoapods.org/making/making-a-cocoapod.html) for more details.
2. Use your company's / Private Pods repository and add it to the `dependency_repository_url` field in the [plugin manifest](/zappifest/plugins-manifest-format.md).
3. Create a PR for `https://github.com/applicaster/CocoaPods` and post it inside the Applicaster Cocoapods specs repository.

For more info about Initial iOS Plugin Setup with examples for Podfile and podspec files, [Click Here](/dev-env/iOS.md)