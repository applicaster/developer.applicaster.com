# Client Side API - Adding new analytics events

Morpheus is Applicaster’s system for collecting analytics data and delivering that externally to third party analytics providers. [Click here](/analytics/morpheus/morpheus.md) to learn more.

Web-developers can use [JS-2-Morpheus](/analytics/mobile_web_support/mobile_web_support.md) to send analytics data from in-app web-products through Morpheus.

Native client developers can use the Morpheus client-side API to deliver custom events, event properties, user properties, default properties, and screen viewes, as outlined in the documentation below.

Custom events and event properties are handled via the Morpheus Analytic Events Manager and user and default properties are handled via the Morpheus Analytic Properties Storage.

## Table of Contents

- [Terminology](client_side_api.md#terminology)
- [Morpheus Analytic Events Manager](client_side_api.md#morpheus-analytic-events-manager)
- [Morpheus Analytic Property Storage](client_side_api.md#morpheus-analytic-properties-storage)
- [Morpheus Screen Views API](client_side_api.md#morpheus-screen-views-api)
- [General Best Practices](client_side_api.md#best-practices)

## Terminology

**Custom Events** - Many analytics providers include their own events which come out of the box (i.e. App Launched, Session). Custom Events are events that are specific to our products and not to the analytics provider. "Play VOD Item" is an example of such an event.

**Event Properties** - Properties are qualities or characterstics of an event. For example, the event "Play VOD Item" has a property for "Item Name", whose value might be something like "Episode 1 - A New Dawn".

The terminology here can differ for different analyic providers, often named `parameters` or `dimensions`.

**Default Properties** - Default Properties are qualities or characteristics that we want to send along with every event. For example "Environment" (Production, Development, QA) can be sent as a default property as it is relevant to all events.

**User Properties** - User Properties are properties specific about a user, such as "Name" or "Gender". They will always be stored in the analytics provider as the last value that was populated for them.

## Morpheus Analytic Events Manager

##### Business Value:

Developers can use the Morpheus custom events API to track specific actions that users take within Applicaster’s app. For example, a developer can track when a user makes a purchase, plays a VOD, or shares on Facebook. Every pull request which includes a feature in which a user can interact should use Morpheus to capture information about this interaction.

This helps us and our customers understand how users interact with our app, empowering stakeholders (both internal and external) to use analytics to have a positive impact on several business domains such as content editing, iterative development of products, marketing campaigns, and more. See the
[Product Analytics Procedure](https://github.com/applicaster/developer.applicaster.com/blob/f167559acd075d63b68340f753769e92c268f9b6/content/product_analytics_procedure/Product_Analytics_Procedure.md) for more guidelines on how to determine what to measure and information about the value that can be derived from this measurement.

The example in this documentation will show you how to easily capture this information from a developer's standpoint.

## Events with Two-Level Structures:

Events have a two-level structure. The highest level is the specific action. For our example, the action will be when a user reads of an article. We will name this Event “Read Article.”
By tracking this event, you will be able to measure how many users are reading articles, how often, and so on.

### Android:

``` java
  AnalyticsAgentUtil.logEvent(“Read Article”);
```

### iOS:
``` obj-c
  [APAnalyticsManager trackEvent:@"Read Article"];
```

## Capture Event Properties:

The second level in the Event structure is the Event properties. These are characteristics of the Event itself or the user performing it. For instance, a characteristic of the Read Article event is the author of the article. A characteristic of the user is their status (i.e. registered or anonymous).

Some characteristics of users should be stored as user properties[c]. This is particularly useful for the types of characteristics which are not dependent on time, state, or action. For example, a user’s name or gender should be stored as a user property. However, other user properties change according to behavior and are more a reflection of status. If a customer would want to see where in a funnel that user status changes, it should also be stored as an event property (i.e. registered or anonymous, subscribed or free user) for any events it relates to. If the characteristic is relevant for all events, it is worth considering creating as a default property.

Properties let us easily view the distribution of Event characteristics so we can answer questions such as "who is the most read author?" or "what percentage of users reading articles are registered?"

### Android:
``` java
  // Capture author info & user status  
  Map<String, String> articleParams = new HashMap<String, String>();  
  //param keys and values have to be of String type  
  articleParams.put("Author", "John Q");  
  articleParams.put("User Status", "Registered");  
  // sending event parameter  
  AnalyticsAgentUtil.logEvent("Article Read", articleParams);
```

### iOS:
``` obj-c
  NSDictionary *analyticsDictionary = @{@”Author” : @”"John Q", @User Status": @"Registered"};  
  [APAnalyticsManager trackEvent:@"Article Read" withParameters:analyticsDictionary];
```

## Capture Event Duration:

A developer can also add the dimension of time to any Event that s/he tracks. Morpheus will automatically record the duration of the Event, which enables analysts to run analysis on characteristics like average duration for an Event overall, by session and by user. This is useful for events like "Play VOD Item" or "Feed Session"
You can capture Event duration (along with the Event and its properties) with a single log following this pattern:

### Android:
``` java
  // Capture author info & user status
  Map<String, String> articleParams = new HashMap<String, String>();  
  articleParams.put("Author", "John Q");  
  articleParams.put("User Status", "Registered");  
  //Log the timed event when the user starts reading the article  
  //setting the third param to true creates a timed event  
  AnalyticsAgentUtil.logTimedEvent("Article Read", articleParams);

  // ...  
  // End the timed event, when the user navigates away from article  
  AnalyticsAgentUtil.endTimedEvent("Article Read");
```

### iOS:
``` obj-c
  NSDictionary *analyticsDictionary = @{@”Author” : @”"John Q", @User Status": @"Registered" };  
  //setting Timed param to true creates a timed event  
  [APAnalyticsManager trackEvent:@”Article Read” Timed:YES];  
  [APAnalyticsManager trackEvent:@”Article Read” withParameters:analyticsDictionary timed:YES];

  // End the timed event, when the user navigates away from article  
  [APAnalyticsManager endTimedEvent:@”Article Read” withParameters:nil];  
  [APAnalyticsManager endTimedEvent:@”Article Read” withParameters:analyticsDictionary];
```

## Morpheus Analytic Properties Storage

Analytic storage contains all the default properties and user profile properties.

#### Business Value

Customers can change/add analytics providers via Morpheus in Zapp. We want to ensure that the data delivered to providers are aligned, with the same user profile and default properties.

So, we want to save and locally maintain user profile properties and default properties that were collected during previous app sessions, updating providers with this data when it is updated and upon app launch, including providers who weren't configured when the initial data was collected.

User profile properties are characteristics about a user. User properties can remain relatively constant (i.e. Name, E-mail Address) or change with behavior (i.e. Score, Registeration Status). Make sure if your user property belongs to the second type, to store it as an event property as well.

Default properties are properties that you want to send along as an event property with _every_ event. For example, it might be useful to filter all behavioral data by environment (Production, Developer, QA).

The Morpheus Analytic Storage API enables Applicaster client developers to deliver user profile and default properties to the analytics storage container where this data is held.

Please carefully read the following segment on PII vs Non PII data - and make sure to use the user properties function with the correct distribution of fields between general and personally identifiable information accordingly

##### PII data vs. Non PII data

Personally identifiable Information (PII) is information which can be used to distinguish or trace an individual's identity alone, such as their name, social security number, biometric records, etc., or can be used to identify an individual when combined with other personal or identifying information which is linked or linkable to the specific individual, such as date and place of birth, mother’s maiden name, etc.

Applicaster currently supports several fields which are considered PII. Morpheus, our infrastructure allowes seperating these two types of fields to different groups when setting them so that they will not be sent to providers who do not accept PII. This also enables customers to filter out the delivery of PII because of regional/legal needs even to providers who can receive PII. Please make sure to map any PII data and send it only in the PII dictionary / hash accordingly.

A few examples for fields of these type:
* Name
* First Name
* Last Name
* User Name
* Email
* Phone
* Social IDs

## API Details

### iOS

Storage is a dictionary that looks like:
``` json
  "analytics_storage" : {
  "default_event_properties": dictionary 1,
  "user_profile": dictionary 2,
  "standard_event_properties": dictionary 3,
  etc.
  }
```

##### Dependencies
``` obj-c
  #import <ApplicasterSDK/APAnalyticsStorage.h>
  #import <ApplicasterSDK/APAnalytics.h>
```

##### Methods List

| Method                                       | Explanation                                                  | Usage                                                          |
| -------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| `+ (instancetype) sharedInstance;`             | Return instance of the analytics’ storage                    |
| `- (NSDictionary \*) defaultEventProperties;`  | Return default_event_properties dictionary from the storage  | `[[APAnalyticsStorage sharedInstance] defaultEventProperties];`  |
| `- (NSDictionary \*) standardEventProperties;` | Return standard_event_properties dictionary from the storage | `[[APAnalyticsStorage sharedInstance] standardEventProperties];` |
| `- (NSDictionary \*) userProfile;`             | Return user_profile dictionary from the storage              | `[[APAnalyticsStorage sharedInstance] userProfile];`             |

If a developer wants to update all providers with default properties and/or user properties and update the storage:

| Method                                                                   | Explanation                                                                                                                          | Usage                                                                        |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `+ (void) setDefaultEventProperties:(NSDictionary \*)defaultProperties;`   | defaultProperties - contains dictionary of properties. New properties will be added. Existing ones will be replaced with new values  | `[APAnalytics setDefaultEventProperties:@{@”default1” : @”defaultValue”}];`    |
| `+ (void) setStandardEventProperties:(NSDictionary \*)standardProperties;` | standardProperties - contains dictionary of properties. New properties will be added. Existing ones will be replaced with new values | `[APAnalytics setStandardEventProperties:@{@”default1” : @”defaultValue”}];`   |
| `+ (void) setUserProfileWithParameters:(NSDictionary \*)parameter;`        | parameter - contains dictionary of properties. New properties will be added. Existing ones will be replaced with new values          | `[APAnalytics setUserProfileWithParameters:@{@”default1” : @”defaultValue”}];` |

### Android

| **\_**                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `void setUserProperties(JSONObject inProperties)`. inProperties - contains new properties. New properties will be added. Existing ones will be replaced with new values     |
| `void setStandardProperties(JSONObject inProperties)`. inProperties - contains new properties. New properties will be added. Existing ones will be replaced with new values |
| `JSONObject getUserProperties()`                                                                                                                                            |
| `JSONObject getStandardProperties()`                                                                                                                                        |
| `void setDefaultProperties(JSONObject inProperties)`                                                                                                                        |
| `void setDefaultProperty(String key, String value)`                                                                                                                         |
| `String getID()`                                                                                                                                                            |

## Morpheus Screen Views API

**Business Value:** Measuring screen views allows us to see which screens are viewed most by end-users, and how they are navigating through the app. Customers who are more familiar with screen-view analysis models can track navigation more easily, enabling deeper and more flexible analysis. For example, some content is often accessible on different screens (such as the home screen and a specific show screen). Seeing which screen is driving users to content will help customers identify how to place content as well as how to evaluate ad placements on different screens.  
Additionally, some analytics providers (like comScore, AGOF, or Nielsen), create consumption scores based on screen views, which affect advertising dollars more broadly for our customers.

**Best Practice:** The best practice for naming a screen should be X - Y, where X = The name of the type of screen and Y = the value of the screen as rendered within the app (and set in the CMS), such as “Show - The Voice.” You can always look to the existing implementation and reach out to the M&M team for guidance or help.

For example:  
IOS:

```obj-c
  [APAnalyticsManager trackScreenView:@"Splash - App Loading Screen"];
```

Android:

```java
  AnalyticsAgentUtil.setScreenView(activity, AnalyticsAgentUtil.SETTING_SCREEN + " - " + "Login");
```

For the dynamic screens like ‘home’, ‘season’, Etc. you need to add screen name in the app screens configuration.  
For example:  
Android:

```java
componentsMetaData.properties
"mDataSourceType": "CATEGORY",
      "mComponentType": "LIST",
      "mHeader": {
        "mShowTitle": true,
            },
      "analytics_screen_name": "Home - Highlights Section",
```

IOS:

```obj-c
  AppDefine.json: {
    "class": ["screen"],
    "rel": ["screens:ipad"],
    "title": "Highlights Section",
    "properties": {
      "analytics_screen_name": "Home - Highlights Section"
    }
  }
```

Android screen view tracking example:

```java
  AnalyticsAgentUtil.setScreenView(activity, “screen name”);
```

IOS screen view tracking example:
```obj-c
  [APAnalyticsManager trackScreenView:@"screen name"];
```

**Note:** If a screen has several tabs, and when a user changes the tab the content of the screen re-populates, this should be considered a separate screen view, with a format of X - Y - Z, building on the best practice above but where Z = the name of the tab as set in the CMS. For example, if a user is in “The Voice” with Tabs by season. Loading the screen would cause a screen view to be sent with a screen name like “Season - The Voice - Season 1”. When the user switches tabs, it would repopulate to something like “Season - The Voice - Season 2”.

## Best Practices

Here are a few additional best practices when implementing Events:

- Outline your business goals and the questions you want to answer, then map Events to track each action you need to measure. For more details, check out the [Product Analytics Procedure](https://github.com/applicaster/developer.applicaster.com/blob/2e2ebea5e0f5ddc3f73c9fe6cbb58bf8e70d5e62/content/product_analytics_procedure/Product_Analytics_Procedure.md).
  - Make sure the product or business lead of your team follows this procedure.
- Organize your Events for easy identification and categorization. If you have more than one product/feature which has similar functionality, name the Events the same way across features so you can more easily compare performance.
- Put descriptive information (location triggered, states, names, IDs, etc.) in properties rather than creating separate events to capture this information.
  - For example, if you have a reminder function for live programs which can be triggered from multiple places in the app, rather than have the events:
    - Live Drawer: Set Reminder
    - EPG: Set Reminder
    - Set Reminder from Cell
  - Have one event:
    - Set Reminder
  - With a property for “Location” with values of “Live Drawer, EPG, Cell”
  - In this case, don’t forget about the need for an event “Remove Reminder”
- Add Event properties on every Event wherever applicable.
- Use timed Events wherever applicable.
- Whenever possible, keep property values under 100 characters
  - Facebook App Analytics will not accept larger values and we will cut off such values at 100 characters
- Default properties should only be for qualities that are important to answering questions about the data across all levels of behavior.
  - Please get approval from the Zapp team before putting in the time and effort to create a default property.
- For characteristics about a user which are depedent on state, time, or actions, make sure to stores these as event properties as well as user profile properties.
  - For example, if an analyst wants to understand the user flow for users registering via the SSO, being able to filter the data on the event level for wether or not the user was registered at any given point in time will help them break the behavior into 'before' and 'after' stages of the conversion point.
  - If this state is only stored in the analytic properties storage as a user property according to last status, such analysis would not be possible.

##### Best Practices for Naming:

- When possible, use active voice for Event names (start with a verb)
  - For example, “Read Article” instead of “Article Read” or "Reading Article"
- Avoid special characters other than ‘-’, or ‘\_’
  - FB Analytics does not accept any other special characters in event or property names. If used, they will be replaced as such:
  - ‘:’ will be replaced with ‘ -’
  - ‘/’, ‘\’ and ‘ \ \’ will be replaced with ‘\_’
  - All else will be replaced with a space
- When creating a series of events for a product, it is recommended to start with the “X - ” where X = the name of the Product
  - For example, all the events for the Feed begin with “Feed - ”
- Use [Proper Case](http://www.computerhope.com/jargon/p/proper-case.htm), unless you have a valid reason not to (i.e. using the acronym VOD)
