# LivePlus integration - iOS

## Installation

LivePlus_widget_iosBundle is available through
[CocoaPods](http://cocoapods.org). To install it, simply add the following lines
to your Podfile:

```ruby
use_frameworks!

pod 'LivePlus_widget_iosBundle', :git => 'https://github.com/applicaster/LivePlus_widget_iosBundle'
```

and then run `pod install`. This will install the latest available version directly from the private GitHub
repository.

## Usage

The pod provides a single class called `LivePlusWidgetView`. This class inherits
from UIView and thus it can be placed and sized like any other view. However,
the recommended size is 325x125 pixels, since the messages  displayed will have
that size.

First of all, import the pod's library into the file where you will be using it:

```swift
import LivePlus_widget_iosBundle
```

Then, to instantiate the widget, use this code:

```swift
let widget: LivePlusWidgetView = LivePlusWidgetView(frame: CGRectMake(x, y, 325, 125), clientId: "my_client_id")
```

where `my_client_id` is your LivePlus client ID and `x` and `y` determine the
position of the widget in its parent view. Of course, you can also use
autolayout and constraints to position the widget in its parent view (see the
[Example project](https://github.com/applicaster/LivePlus_widget_iosBundle/Example/LivePlus_widget_iosBundle/ViewController.swift) for an
example).

To add the widget into a parent view, simply add it as you would with any other
UIView:

```swift
parentView.addSubview(widget)
```

Finally, you have to enable the view for it to start displaying messages. This
is done by setting the `enabled` property to `true`:

```swift
widget.enabled = true
```

If you want to temporally disable the widget (without removing it from its
parent view nor destroying it), just set the `enabled` property to `false`
again:

```swift
widget.enabled = false
```

Of course the widget can be enabled again at any point by setting the `enabled`
property to `true` again.

**NOTE:** in order to allow the loading of user images from Twitter, it may be
necessary adding an ATS exception in your app's `Info.plist` file for Twitter's
image domain. For that, add these lines inside the main `<dict>` of your
`Info.plist` (this has been done in the Example project's
[Info.plist](https://github.com/applicaster/LivePlus_widget_iosBundle/Example/LivePlus_widget_iosBundle/Info.plist)):

```xml
  <key>NSAppTransportSecurity</key>
	<dict>
		<key>NSExceptionDomains</key>
		<dict>
			<key>twimg.com</key>
			<dict>
				<key>NSIncludesSubdomains</key>
				<true/>
				<key>NSTemporaryThirdPartyExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
	</dict>
```

## Example project

To run the example project, clone the repo, and run `pod install` from the
Example directory first.

This simple Swift project launches an `AVPlayerVideoController` that contains an
`AVPlayer` to display a video from an Internet URL. Then a `LivePlusWidgetView`
is created and added on top of the `AVPlayerVideoController`'s view following
the instructions provided above. Also, a button that allows enabling/disabling
the widget is added to the player view.

In order to test this project with your own shows, you should replace the
`clientId` provided to the widget by your own.
