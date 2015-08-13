# Applicaster.JS2Native (v1.2.0)

The Applicaster.JS2Native SDK provides access to native capabilities in
WebViews running inside applicaster's native apps.

## Usage

To use the SDK you need to include the following in your HTML:

```markup
<script
  src="http://assets-production.applicaster.com/js2native/v1/js2native.js">
</script>
```

## Examples

A simple example is available [here](http://assets-production.applicaster.com/js2native/v1/docs/examples.html)

## Reference

### Facebook Intgration

#### FB.login(callback, force)

Version added: 1.0.0

Login to Facebook using the Native facebook application

```javascript
    Applicaster.JS2Native.FB.login(function (response) {
      console.log("login response: " + JSON.stringify(response))
    });
```

#### FB.getLoginStatus(callback)

Version added: 1.0.0

Check if user is logged in to Facebook

```javascript
    Applicaster.JS2Native.FB.getLoginStatus(function (response) {
      console.log("login status response: " + JSON.stringify(response))
    });
```

#### FB.ui(options)

Version added: 1.0.0

Open Native Facebook dialogs.

```javascript
    var options = {
      method: 'feed',
      link: 'http://google.com',
      caption: "Search at Google",
      name: 'Google Inc.',
      description: 'The search engine',
      picture: 'http://google.com/logo.png'
    };

    js2n.FB.ui(options);
```

### SMS Integration

#### SMS.showMessageComposer(options)

Version added: 1.0.0

Open SMS Native view with pre-filled recipients (comma separated) and body text.

```javascript
    var options = {
      recipients: '*123',
      body: 'Body text'
    };

    js2n.SMS.showMessageComposer(options);
```

### WebView control

#### WebView.close()

Version added: 1.0.0

Closes the current WebView.

```javascript
    js2n.WebView.close();
```

#### WebView.keepScreenOn(flag)

Version added: 1.1.0

Toggles the device screen behaviour, so the screen won't close
after the default device idle time.

```javascript
    // Keep the screen on even after idle time has passed.
    js2n.WebView.keepScreenOn(true);
```

```javascript
    // disable screenOn - back to default device settings.
    js2n.WebView.keepScreenOn(false);
```


### Achievement Center Integration

#### Achievement.userAction(options)

Version added: 1.1.0

Allow to send user action from the webview to an active challenge on the device.

##### Options description

**callback** - this callback will fire once a result is given from the client.
The callback returns an object with the following properties: action_points, total_points , success (boolean - if false there was an error)

**actionName** - the action name - list of available actions:

* welcome_back
* facebook_login
* facebook_comment
* facebook_post
* facebook_like
* video_watch
* share
* twitter_retweet
* twitter_post
* poll_answer
* trivia_answer_correct

*points* - number of points to give for the action.
Don't pass the param to get the default max points.

**arn** - the unique identifier of the achievement.
Get the ARN from Applicaster representative.


List is taken form: https://github.com/applicaster/achievement-center/blob/f3d444cc76c723fa36dab751cb3de4f7d67f958a/app/models/action/defaults.yml

```javascript

    var options = {
      callback: callback,
      actionName: 'trivia_answer_correct',
      points: null,
      arn: null
    };

    js2n.Achievement.userAction(options)
```
