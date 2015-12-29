# Questionnaire Analytics 

The analytics description of this product is separated into two:

1. **Feature Analytics** - these are analytics that are set to examine the feature's performance, how it is contributing to end user satisfaction, and other questions that should lead us to releasing better and more beneficial future iterations of this product. We integrated these analytics to empower our customers to conduct their own product and content analysis.
1. **User Profile Analytics** - these are analytics that are the core of the value this product brings. In the case of a logged in user, this product provides user profiles within MixPanel, which allows the customer to determine the winner/s of a specific questionnaire activity.

## Feature Analytics
Note: In the Alpha version (and until further notice), these analytics are being sent to one specific Google Analytics account only, so that we can examine the way the feature works.

Event Name | Insight
--------------- | ---------------
Start questionnaire | Understand how many users start a questionnaire, in order to determine completion rate
Complete questionnaire | Understand how many users complete a questionnaire, in order to determine completion rate
Start Login | Measure how many users start the Login process, in order to see the volume login screen exposures (which together with other events, will give further login insights)
Login Success | Measure how many users successfuly the Login process, in order to see the volume of successful logins
Login Denied | Measure how many login attempts fail and why they fail, in order to see % of errors and fix them or change the login UX accordingly.
Close questionnaire | Determine at which point users close the questionnaire in order to realize the optimized number of screens that provide end user satisfaction
View Screen | See which screens are viewed most, in order to optimize questionnaire building and screen order 


## User Data Analytics
Note: All this data is currently being sent to Mixpanel only, given that MixPanel token is configured as outlined in the [Questionnaire Zendesk Article](https://applicaster.zendesk.com/hc/en-us/articles/206949946-Storyline)

Event Name | Insight
--------------- | ---------------
Answer Question | Understand which questions are answered, how much time is taken to answer them, and what percentage of responses were correct

When applicable, the following user properties are tracked on the user level upon login:

* First Name
* Last Name
* FB Link
* FB Gender
* FB Locale
* FB Timezone
* FB Photo URL
* FB ID
* Email
* Phone
* X - Answers Correct *(incremental value)*
* X - Time Taken *(incremental value)*
* Y - Answers Correct *(incremental value)*
* Y - Time Taken *(incremental value)*
* Account ID 

X = Name of Questionnaire

Y = The date 

