# Overview

The Applicaster.JS2Native SDK provides access to native capabilities in
WebViews running inside applicaster's native apps.

# Usage

To use the SDK you need to include the following in your HTML:


>```markup
<script
  src="http://assets-production.applicaster.com/js2native/v1/js2native.js">
</script>
```

# Examples

A simple example is available [here](http://assets-production.applicaster.com/js2native/v1/docs/examples.html)

# Reference

## Facebook Intgration

### FB.login(callback, force)

Login to Facebook using the Native facebook application

>```javascript
Applicaster.JS2Native.FB.login(function (response) {
  console.log("login response: " + JSON.stringify(response))
});
```

### FB.getLoginStatus(callback)

Check if user is logged in to Facebook

>```javascript
Applicaster.JS2Native.FB.getLoginStatus(function (response) {
  console.log("login status response: " + JSON.stringify(response))
});
```


### FB.ui(options)

Open Native Facebook dialogs.



>```javascript
var options = {
  method: 'feed',
  link: 'http://google.com',
  caption: "Search at Google",
  name: 'Google Inc.',
  description: 'The search engine',
  picture: 'http://google.com/logo.png'
}
js2n.FB.ui(options);
```

## SMS Integration

### SMS.showMessageComposer(options)

Open SMS Native view with pre-filled recipients (comma separated) and body text.

>```javascript
var options = {
  recipients: '*123',
  body: 'Body text'
}
js2n.SMS.showMessageComposer(options)
```

## WebView control

### WebView.close()

Closes the current WebView.

>```javascript
js2n.WebView.close()
```
