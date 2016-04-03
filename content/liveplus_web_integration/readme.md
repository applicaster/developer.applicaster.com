# Live+ integration - web

This document describes how to integrate Live+ in a website.

## How to use it

To integrate this, you will need to things :
- your applicaster clientId (ask support@applicaster.com to provide it to you)
- a container with relative position to act as an anchor point for positionning the LivePlus widget itself. You can either specify the container's id when initializing the widget, or give it the id `liveplus_widget_container` which is the default setting.
It is highly recommended that this container exactly fits your video player's position, width and height, for better positionning of the LivePlus widget.

Then you have two options :
#### **legacy js** :  
using a script tag in your html headers :
```html
<script src="//assets-production.applicaster.com/static/liveplus/websdk/index.js"></script>
```
This will either create an Applicaster object on the window object, or attach the LivePlus object on the existing window.Applicaster object if you are using other Applicaster sdks in your app. You can then initialize the widget in your page's onload function :

```javascript
window.onload = function() {
  var options = {clientId: ''} // your applicaster account Id - required
  window.Applicaster.LivePlus.init(options);
}
```


#### **using the npm package**
install the Live+ npm package  :
```bash
$ npm install -S liveplus-web-module
```
and then import it your app's code.

```javascript
import LivePlus from 'liveplus-web-module';

let options = {clientId: ''} // your applicaster account Id - required
LivePlus.init(options);
```


## Configure your LivePlus widget
by default, the player positions itself on the right bottom corner of the given container, precisely at bottom: 100px and right: 20px, and bottom: 190px and right: 30px in fullscreen. You can customize this by passing other parameters to place it wherever you want.

Here is the default parameter's object. You can override any part you want, by passing an option object to the widget's init method. The actual config used is Object.assign({, defaultParams, options}), so any provided parameter will override the default one.

```
defaultParams = {
  containerId: "liveplus_widget_container",
  position: {
    bottom: 100,
    right: 20,
  },
  fullscreen: { // position parameters when entering fullscreen
    bottom: 190,
    right: 30
  }
}
```

## API reference

The LivePlus object currently exposes two public methods :

* **init(options)** : init method to be called with a proper options object as parameter to create the widget in the DOM.
* **toggleVisibility()** : a method you can use to show / hide the Live+ widget. Use this method if you want to add a button to your video player to toggle the widget on & off.
