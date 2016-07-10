# Morpheus Developer Documentation
Morpheus is Applicaster’s client-side system for collecting analytics data and delivering that externally to third party analytics providers. [Click here](https://github.com/applicaster/developer.applicaster.com/blob/cfdb95b89fe5fd4741382107578b34dd2ad55934/content/morpheus_release_notes/morpheus_release_notes.md) to learn more.


Web-developers can use [JS-2-Morpheus](https://github.com/applicaster/developer.applicaster.com/blob/589dab3d4f75735f387b105c0eee3ad605cac231/content/JS-2-Morpheus/JS-2-Morpheus.md) to send analytics data from in-app web-products through Morpheus.


Native client developers can use the Morpheus client-side API to delivery custom events, event properties, user properties, and default properties, as outlined in the documentation below.


Custom events and event properties are handled via the Morpheus Analytic Events Manager[a] and user and default properties are handled via the Morpheus Analytic Properties Storage[b].




# Morpheus Analytic Events Manager:
##### Business Value:


Developers can use the Morpheus custom events API to track specific actions that users take within Applicaster’s app. For example, a developer can track when a user makes a purchase, plays a vod, or shares on Facebook. Every pull request which includes a feature in which a user can interact should use Morpheus to capture information about user interaction.


This helps us and our customers understand how users interact with our app, empowering stakeholders (both internal and external) to use analytics to have a positive impact on several business domains such as content editing, iterative development of products, marketing campaigns, and more. See the
[Product Analytics Procedure](https://github.com/applicaster/developer.applicaster.com/blob/2e2ebea5e0f5ddc3f73c9fe6cbb58bf8e70d5e62/content/product_analytics_procedure/Product_Analytics_Procedure.md) for more details on the value of including measurement and product guidelines on how to determine what to measure.


This example will show you how to easily capture this information from a developer standpoint.
## Events with Two-Level Structures:
Events have a two-level structure. The highest level is the specific action. For our example, the action will be when a user reads of an article. We will name this Event “Read Article.”
By tracking this event, you will be able to measure how many users are reading articles, how often, and so on.
### Android:
AnalyticsAgentUtil.logEvent(“Read Article”);
### iOS:
 [APAnalyticsManager trackEvent:@"Read Article"];
## Capture Event Properties:
The second level in the Event structure is the Event properties. These are characteristics of the Event itself or the user performing it. For instance, a characteristic of the Read Article event is the author of the article. A characteristic of the user is their status (i.e. registered or anonymous). 
Some characteristics of users should be stored as user properties[c]. This is particularly useful for the types of characteristics which are not dependent on time, state, or action. For example, a user’s gender or name should be stored as a user property. However, other user properties change according to behavior and are more a reflection of status. If a customer would want to see where in a funnel that user status changes, it should also be stored as an event property (i.e. registered or anonymous).


Properties let us easily view the distribution of Event characteristics so we can answer questions such as who is the most read author or what percentage of users reading articles are registered?
### Android:
// Capture author info & user status
<Enter>Map<String, String> articleParams = new HashMap<String, String>();
<Enter>//param keys and values have to be of String type
<Enter>articleParams.put("Author", "John Q");
<Enter>articleParams.put("User Status", "Registered");
<Enter>// sending event parameter
<Enter>AnalyticsAgentUtil.logEvent("Article Read", articleParams); 
### iOS:
<Enter>NSDictionary *analyticsDictionary = @{@”Author” : @”"John Q",
<Enter>@User Status": @"Registered" };
<Enter>[APAnalyticsManager trackEvent:@"Article Read" withParameters:analyticsDictionary];
## Capture Event Duration:
A developer can also add the dimension of time to any Event that s/he tracks. Morpheus will automatically record the duration of the Event, which enables analysts to run analysis on characteristics like average duration for an Event overall, by session and by user.
You can capture Event duration (along with the Event and its properties) with a single log following this pattern:
### Android:
<Enter>// Capture author info & user status
<Enter>Map<String, String> articleParams = new HashMap<String, String>();
<Enter>articleParams.put("Author", "John Q");
<Enter>articleParams.put("User Status", "Registered");
<Enter>//Log the timed event when the user starts reading the article
<Enter>//setting the third param to true creates a timed event
<Enter>AnalyticsAgentUtil.logTimedEvent("Article Read", articleParams);


<Enter><Enter>// ...
<Enter>// End the timed event, when the user navigates away from article
<Enter>AnalyticsAgentUtil.endTimedEvent("Article Read");
### iOS:
NSDictionary *analyticsDictionary = @{@”Author” : @”"John Q", @User Status": @"Registered" };
<Enter>//setting Timed param to true creates a timed event
<Enter>[APAnalyticsManager trackEvent:@”Article Read” Timed:YES];
<Enter>[APAnalyticsManager trackEvent:@”Article Read” withParameters:analyticsDictionary timed:YES];


/<Enter>/ End the timed event, when the user navigates away from article
[<Enter>APAnalyticsManager endTimedEvent:@”Article Read”  withParameters:nil];
[<Enter>APAnalyticsManager endTimedEvent:@”Article Read” withParameters:analyticsDictionary];

# Morpheus Analytic Properties Storage
Analytic storage contains all the default properties and user profile properties.

#### Business Value
Customers can change/add analytics providers via Morpheus in Zapp. We want to ensure that the data delivered to providers are aligned, with the same user profile and default properties.

So, we want to save and locally maintain user profile properties and default properties that were collected during previous app sessions, updating providers with this data when it is updated and upon app launch, including providers who weren't configured when the initial data was collected.

User profile properties are characteristics about a user. User properties can remain relatively constant (i.e. Name, E-mail Address) or change with behavior (i.e. Score, Registeration Status). Make sure if your user property belongs to the second type, to store it as an event property as well.

Default properties are properties that you want to send along as an event property with *every* event. For example, it might be useful to filter all behavioral data by environment (Production, Developer, QA).

The Morpheus Analytic Storage API enables Applicaster client developers to deliver user profile and default properties to the analytics storage container where this data is held.

## API Details
### iOS
Storage is a dictionary that looks like: 

    "analytics_storage" : {
     "default_event_properties": dictionary 1,
     "user_profile": dictionary 2,
     "standard_event_properties": dictionary 3,
     etc.
     }
 
 ##### Dependencies
 #import <ApplicasterSDK/APAnalyticsStorage.h>
 
#import <ApplicasterSDK/APAnalytics.h>
 
 ##### Methods List
 
 
 Method | Explanation | Usage 
 ------ | ----------- | ----- 
 + (instancetype) sharedInstance; | Return instance of the analytics’ storage | 
- (NSDictionary *) defaultEventProperties; | Return default_event_properties dictionary from the storage | [[APAnalyticsStorage sharedInstance] defaultEventProperties];
- (NSDictionary *) standardEventProperties; | Return standard_event_properties dictionary from the storage | [[APAnalyticsStorage sharedInstance] standardEventProperties];
- - (NSDictionary *) userProfile; | Return user_profile dictionary from the storage | [[APAnalyticsStorage sharedInstance] userProfile];

If developer wants to update all providers with default properties and/or user properties and update the storage:

 Method | Explanation | Usage 
 ------ | ----------- | ----- 
 + (void) setDefaultEventProperties:(NSDictionary *)defaultProperties | defaultProperties - contains dictionary of properties.  New properties will be added. Existing ones will be replaced with new values |  [APAnalytics setDefaultEventProperties:@{@”default1” : @”defaultValue”}];
 + (void) setStandardEventProperties:(NSDictionary *)standardProperties | standardProperties - contains dictionary of properties. New properties will be added. Existing ones will be replaced with new values |   [APAnalytics setStandardEventProperties:@{@”default1” : @”defaultValue”}]; 
 + (void) setUserProfileWithParameters:(NSDictionary *)parameter | parameter - contains dictionary of properties. New properties will be added. Existing ones will be replaced with new values |   [APAnalytics setUserProfileWithParameters:@{@”default1” : @”defaultValue”}];

### Android
_____ |
----- |
void setUserProperties(JSONObject inProperties). inProperties - contains new properties. New properties will be added. Existing ones will be replaced with new values |
void setStandardProperties(JSONObject inProperties). inProperties - contains new properties. New properties will be added. Existing ones will be replaced with new values |
JSONObject getUserProperties() |
JSONObject getStandardProperties() |
void setDefaultProperties(JSONObject inProperties) |
void setDefaultProperty(String key, String value) |
String getID() |


# Best Practices:
Here are a few additional best practices when implementing Events:
* Outline your business goals and the questions you want to answer, then map Events to track each action you need to measure. For more details, check out the [Product Analytics Procedure](https://github.com/applicaster/developer.applicaster.com/blob/2e2ebea5e0f5ddc3f73c9fe6cbb58bf8e70d5e62/content/product_analytics_procedure/Product_Analytics_Procedure.md)
* Organize your Events for easy identification and categorization. If you have more than one product/feature which has similar functionality, name the Events the same way across features so you can more easily compare performance. Put descriptive information (location triggered, states, names, IDs, etc.) in properties rather than creating separate events to capture this information.
   * For example, if you have a reminder function for live programs which can be triggered from multiple places in the app, rather than have the events:
      * Live Drawer: Set Reminder
      * EPG: Set Reminder
      * Set Reminder from Cell
   * Have one event:
      * Set Reminder
   * With a property for “Location” with values of “Live Drawer, EPG, Cell”
   * In this case, don’t forget about the need for an event “Remove Reminder”
* Add Event properties on every Event wherever applicable.
* Use timed Events wherever applicable.
* Whenever possible, keep property values under 100 characters
    * Facebook App Analytics will not accept larger values and we will cut off such values at 100 characters
* Default properties should only be for qualities that are important to answering questions about the data across all levels of behavior.
    *  For example, "environment", or whether the data was generated in the production environment is releavant to all behavioral events.
*  For characteristics about are user which are depedent on state, time, or actions, make sure to stores these as event properties as well as user profile properties.
    *   For example, if an analyst wants to understand the user flow for users registering via the SSO, being able to filter the data on the event level for whether or not the user was registered at any given point in time will help them break the behavior into 'before' and 'after' stages of the conversion point.
    *   If this state is only stored in the analytic properties storage according to last status, such analysis would not be possible. 


## Best Practices for Naming:
* When possible, use active voice for Event names (start with a verb)
   * For example, “Read Article” instead of “Article Read” or "Reading Article"
* Avoid special characters other than ‘-’, or ‘_’
   * FB Analytics does not accept any other special characters in event or property names. If used, they will be replaced as such:
      * ‘:’ will be replaced with ‘ -’  
      * ‘/’, ‘\’ and ‘  \ \’ will be replaced with ‘_’
      * All else will be replaced with a space
* When creating a series of events for a product, it is recommended to start with the “X - ” where X = the name of the Product
   * For example, all the events for the Feed begin with “Feed - ”
* Use [Proper Case](http://www.computerhope.com/jargon/p/proper-case.htm), unless you have a valid reason not to (i.e. using the acronym VOD)
