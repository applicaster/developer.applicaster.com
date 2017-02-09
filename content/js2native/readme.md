# Applicaster.JS2Native (v2)

The Applicaster.JS2Native SDK provides access to native capabilities in
WebViews running inside applicaster's native apps.

## Usage

To use the SDK you need to include the following in your HTML:

```markup
<script
src="http://assets-production.applicaster.com/js2native/v2/js2native.js">
</script>
```

## Example

A simple example is available [here](http://assets-production.applicaster.com/js2native/v2/docs/examples.html)

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

### Morpheus Integration

Morpheus is Applicaster’s internally developed analytics infrastructure tool used to pipe
data from our products to analytics providers. Click [here][http://developer.applicaster.com/docs/public/morpheus] to
learn more about it.

*Note:* the iOS JS-2-Native SDK cannot receive two message simultaneously. As such, make sure to send a separate message for each event or user profile, and not to send two or more such messages separately.

#### Morpheus.emit(key, properties)

Emit an analytics event. The event will be piped to and handled on the native client.

**key** - Category and action of the event in the format of "Category: Action".
It will appear in the console of our analytics providers as "Category: Action", except
Google Analytics where "Catgory" will map to category, and "Action" to action.
For example, if sending the event "Side Menu: Area Switched" :

* For most providers, the event will appear as: “Side Menu: Area Switched"
* For Google Analytics, it will appear as a Category which is set to “Side Menu” and an
Action which is set to “Area Switched".

*best practice* - use the product name as the "Category". (i.e. "Feed", or "Stitcher")

**properties** - The corresponding properties of the event key. The keys of the
JSON object should be formatted as pascal case (*PascalCase*).

```javascript
var key = "Questionnaire: Answer Question";

var properties = {
QuestionName: "Are you the one?",
QuestionID: "1",
QuestionnaireName: "blue pill or red pill?",
QuestionnaireID: "1",
AnswerText: "Yes",
AnswerCorrect: true,
TimeTaken: 1,
FeedName: "nebuchadnezzar",
FeedID: "1",
FeedEpisodeName: "reloaded",
FeedEpisodeID: "1",
TVShowName: "zion underground",
TVShowID: "1",
}

js2n.Morpheus.emit(key, properties);
```

#### Morpheus.updateUserProfile()

Update user profile information. The old properties will be overwritten by the new ones.

**userProperties** - The user properties information. The keys of the
JSON object should be formatted as pascal case (*PascalCase*). Morevoer,
properties which are not *custom properties* are called *special properties*.
They are not required, but if delivered, should be written as follows:

* Name
* FirstName
* LastName
* UserName
* Email
* Phone

We split the user properties for two set, the PII and the Generic(non PII Properies).
Personally identifiable Information (PII) is information which can be used to distinguish or trace an individual's identity alone, such as their name, social security number, biometric records, etc., or can be used to identify an individual when combined with other personal or identifying information which is linked or linkable to the specific individual, such as date and place of birth, mother’s maiden name, etc." 

* Note in the example sections for "generic" and "pii" properties, as well as a broader set of all user properties combined. We are aware that this leads to the duplication of the propeties; we are doing that to support backwards compatibility, and will contiue doing so until the SDKs which require the combined set of user properties are no longer supported, at which point we will update the documentation.

```javascript
var userProperties = {
    "generic" : {
        "favorite team sport" : "FC Barcelona",
        "customer type" : "paid"
        "Custom1": "1",
        "Custom2": "2"
    },
    "pii" : {
        "Name":"Neo",
        "FirstName":"Thomas",
        "LastName":"Anderson",
        "Email":"t.anderson@metacortex.com",
        "Phone":"1",
        "custom3": "3",
        "Facebook":{
            "ID": "123"
        },
        "twitter":{
            "ID": "123"
        },
        "google":{
            "ID": "123"
        }
    },
    "Name":"Neo",
    "FirstName":"Thomas",
    "LastName":"Anderson",
    "Email":"t.anderson@metacortex.com",
    "Phone":"1",
    "Custom1": "1",
    "Custom2": "2",
    "custom3": "3",
    "SocialIDs":{
    "Facebook":{
        "ID": "123"
    },
    "twitter":{
        "ID": "123"
    },
    "google":{
        "ID": "123"
    }
}

js2n.Morpheus.updateUserProfile(userProperties);
```

### Native player

### Video.playNative(options)

Launches native player with specific URL.

```javascript
 var options = {
   video_url: "http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8"
 };

 js2n.Video.playNative(options);
```
### Native sharing

### NativeShare.show(options)

Launches native sharing menu. Options will be passed into the choosen sharing functionality.

```javascript
 var options = {
   link_url: "http://www.bbc.com/weather",
   title: "Wheater"
 };

 js2n.NativeShare.show(options);
```


### Question Integration
Version added: 2.1.0

<i>This feature is experimental and currently in beta testing.</i>
### Question.AnswerQuestion

Sends notification to native that a question has been answered with specific question id.

```
var options = {
    question_id: "some_id",
    asnwer_value: "some_value",
    callback: function(response) { 
        if (response.success) {
            console.log("do something on success");
        }
    }
};

js2n.Question.answerQuestion(options);
```

### Question.isQuestionAnswered

Ask native if a question with a given question_id has been previously answered on the current device.
Returns the answer value if question had been answered.

```
var options = {
    question_id: "some_id",
    callback: function(response) { 
        if (response.success) {
            console.log("question was answered in the past.");
            console.log("answer_value = ", response.answer_value);
        }
    }
};

js2n.Question.isQuestionAnswered(options);
```


### Note
The current iOS webview SDK prevents the native iOS device from being able to receive multiple commands simultaneously. If you need to send more than one command at the same time, maintain the timestamp for when the event/user profile creation was triggered, but create a 5 second delay in the actual delivery of each command to iOS

[morpheus_release_notes]: http://developer.applicaster.com/docs/internal/morpheus_release_notes
