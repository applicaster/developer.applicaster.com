# Morpheus Developer Documentation
Morpheus is Applicaster’s client-side system for collecting analytics data and delivering that externally to third party analytics providers. [Click here](https://github.com/applicaster/developer.applicaster.com/blob/cfdb95b89fe5fd4741382107578b34dd2ad55934/content/morpheus_release_notes/morpheus_release_notes.md) to learn more.


Web-developers can use [JS-2-Morpheus](https://github.com/applicaster/developer.applicaster.com/blob/589dab3d4f75735f387b105c0eee3ad605cac231/content/JS-2-Morpheus/JS-2-Morpheus.md) to send analytics data from in-app web-products through Morpheus.


Native client developers can use the Morpheus client-side API to delivery custom events, event properties, user properties, and default properties, as outlined in the documentation below.


Custom events and event properties are handled via the Morpheus Analytic Events Manager[a] and user and default properties are handled via the Morpheus Analytic Properties Storage[b].




# Morpheus Analytic Events Manager:
Business Value:


Developers can use the Morpheus custom events API to track specific actions that users take within Applicaster’s app. For example, a developer can track when a user makes a purchase, plays a vod, or shares on Facebook. Every pull request which includes a feature in which a user can interact should use Morpheus to capture information about user interaction.


This helps us and our customers understand how users interact with our app, empowering stakeholders (both internal and external) to use analytics to have a positive impact on several business domains such as content editing, iterative development of products, marketing campaigns, and more. See the
[Product Analytics Procedure](https://github.com/applicaster/developer.applicaster.com/blob/2e2ebea5e0f5ddc3f73c9fe6cbb58bf8e70d5e62/content/product_analytics_procedure/Product_Analytics_Procedure.md) for more details on the value of including measurement and product guidelines on how to determine what to measure.


This example will show you how to easily capture this information from a developer standpoint.
## Events with Two-Level Structures:
Events have a two-level structure. The highest level is the specific action, in this case the reading of an article. For this example, we are naming this Event “Read Article.”
By tracking this event, you will be able to measure how many users are reading articles, how often, and so on.
### Android:
AnalyticsAgentUtil.logEvent("“Read Article”);
### iOS:
 [APAnalyticsManager trackEvent:@"Read Article"];
## Capture Event Properties:
The second level in the Event structure is the Event properties. These are characteristics of the Event itself or the user performing it. For instance, a characteristic of the Read Article event is the author of the article. A characteristic of the user is their status (i.e. registered or anonymous). 
Some characteristics of users should be stored as user properties[c]. This is particularly useful for the types of characteristics which are not dependent on time, state, or action. For example, a user’s gender or name should be stored as a user property. However, other user properties change according and are more a reflection of status. If a customer would want to see where in a funnel that user status changes, it should also be stored as an event property (i.e. registered or anonymous).


 Parameters let us easily view the distribution of Event characteristics so we can answer questions such as who is most read author or what percentage of users reading articles are registered?
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
A developer can also add the dimension of time to any Event that he track. Morpheus will automatically record the duration of the Event and provide us metrics on average Event length overall, by session and by user.
You can capture Event duration (along with the Event and its parameters) with a single log following this pattern:
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
## Best Practices:
Here are a few additional best practices when implementing Events:
* Outline your business goals and the questions you want to answer, then map Events to track each action you need to measure. For more details, check out the [Product Analytics Procedure](https://github.com/applicaster/developer.applicaster.com/blob/2e2ebea5e0f5ddc3f73c9fe6cbb58bf8e70d5e62/content/product_analytics_procedure/Product_Analytics_Procedure.md)
* Organize your Events for easy identification and categorization. If you have more than one application that has similar Events, name them the same across apps so you can more easily compare performance. Put descriptive information (location triggered, states, names, IDs, etc.) in properties rather than creating separate events to capture this information.
   * For example, if you have a reminder function for live programs which can be triggered from multiple places in the app, rather than have the events:
      * Live Drawer: Set Reminder
      * EPG: Set Reminder
      * Set Reminder from Cell
   * Have one event:
      * Set Reminder
   * With a property for “Location” with values of “Live Drawer, EPG, Cell”
   * In this case, don’t forget about the need for an event “Remove Reminder”
* Add Event properties on every Event wherever applicable.
* Use timed Events wherever relevant.
## Best Practices for Naming Events:
* When possible, use active voice (start with a verb)
   * For example, “Read Article” instead of “Article Read”
* Avoid special characters other than ‘-’, or ‘_’
   * FB Analytics does not accept any other special characters in event or parameter names. If used, they will either be replaced as such:
      * ‘:’ will be replaced with ‘ -’  
      * ‘/’, ‘\’ and ‘\\’ will be replaced with ‘_’
      * All else will be replaced with a space
* When creating a series of events for a product, it is recommended to start with the “X - ” where X = the name of the Product
   * For example, all the events for the Feed begin with “Feed - ”
